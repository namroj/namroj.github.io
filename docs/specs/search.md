# Specification: Global & Enhanced Blog Search

## Goal
Improve the search experience by indexing both blog post content and projects, making everything searchable from a central global search interface.

## Technical Strategy
- **Library:** `FlexSearch` (lightweight, high-performance).
- **Indexing:** Client-side indexing of MDX content and JSON project data.
- **Trigger:** Command+K or search icon.

## Components
### GlobalSearch
- Modal/Dialog component.
- Input field with autofocus.
- Results list with categories (Posts, Projects).
- Keyboard navigation (Arrow keys, Enter).

### SearchIndex
- Singleton or Provider to manage the FlexSearch index.
- Handles content extraction from MDX files.

## Features
- **Snippets:** Show a small portion of the content where the match was found.
- **Highlighting:** Highlight the search terms in the results.
- **Metadata Search:** Search by tags, title, and description.

## Implementation Details
1. Install `flexsearch`.
2. Create `app/_utils/search-index.ts`.
3. Implement `GlobalSearch.tsx` modal.
4. Integrate with `Posts.tsx` (blog-specific search).
