---
sessionId: session-260711-113052-hl7m
---

# Requirements

### Overview & Goals
When searching for blog posts, if no results are found, the filters (search bar and tags) currently disappear. This leaves the user stuck on a "No results found" message without an easy way to clear the search or try another keyword.

The goal is to:
1. Keep the filters visible at all times.
2. Provide a clear "Reset" or "Clear all filters" button in the "No results" message.

### Scope
- **In Scope**:
    - Modification of `Posts` component to always show filters.
    - Addition of a reset button in the empty results state.
    - Translation updates for the new button.
- **Out of Scope**:
    - Changing the actual search/filtering logic.
    - Redesigning the entire blog page.


# Technical Design

### Current Implementation
In `app/blog/components/Posts.tsx`, the filters are rendered conditionally:
```tsx
{filteredPosts.length > 0 && filters}
```
This causes the search bar to disappear when `filteredPosts` is empty.

### Proposed Changes

#### Components
- **`Posts.tsx`**:
    - Update rendering logic to `{posts.length > 0 && filters}` (or just `{filters}` since `BlogPage` only renders `Posts` if there are visible posts).
    - Add `handleResetFilters` to clear both `searchTerm` and `selectedTags`.
    - Enhance the `empty` result JSX to include the reset button.

#### Styles
- **`Posts.module.scss`**:
    - Add styles for `.resetButton` within `.empty` to match the project's existing button styles (e.g., similar to the clear button in `TagsFilter`).

#### Locales
- **`es.json` & `en.json`**:
    - Add `blog.clear_filters` translation key.

### File Structure
- `app/blog/components/Posts.tsx` (Modified)
- `app/blog/components/Posts.module.scss` (Modified)
- `app/_locales/es.json` (Modified)
- `app/_locales/en.json` (Modified)


# Testing

### Validation Approach
I will use Playwright to verify the fix:
1. Navigate to `/blog/`.
2. Type a keyword that returns no results.
3. Verify that the search bar and tags remain visible.
4. Verify that the "No results found" message appears with a reset button.
5. Click the reset button and verify that all posts are shown again and the search input is cleared.


# Delivery Steps

###   Step 1: Ensure filters are always visible on the blog page
Filters (search bar and tags) are always available even when no matches are found.

- Remove the conditional rendering `{filteredPosts.length > 0 && filters}` in `app/blog/components/Posts.tsx`.
- Ensure `filters` are rendered as long as the initial `posts` list is not empty.

###   Step 2: Enhance the "No results found" UI with a reset button
The "No results found" state includes a clear reset action.

- Implement `handleResetFilters` in `app/blog/components/Posts.tsx` to clear both search term and tags.
- Add a "Clear all filters" button to the `empty` state div in `app/blog/components/Posts.tsx`.
- Apply consistent styling to the new button in `app/blog/components/Posts.module.scss`.

###   Step 3: Update translation files with the new labels
The UI supports multiple languages for the new reset button.

- Add `clear_filters` key to `app/_locales/es.json` ("Limpiar todos los filtros") and `app/_locales/en.json` ("Clear all filters").