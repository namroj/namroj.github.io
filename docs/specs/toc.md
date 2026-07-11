# Specification: Table of Contents (ToC)

## Goal
Improve long-form readability of blog posts by providing a sticky, interactive Table of Contents.

## Technical Strategy
- **Extraction:** Parse MDX content for `h1`, `h2`, `h3` tags.
- **Scroll-Spy:** Use `IntersectionObserver` to track the active section.
- **Navigation:** Smooth scroll to sections when clicking ToC items.

## Components
### ToC
- List of headings with hierarchical indentation.
- Sticky positioning on the right side of the blog post (desktop).
- Active state highlighting.

## Implementation Details
1. Create a utility to extract headings from MDX.
2. Implement the `ToC.tsx` component.
3. Add `IntersectionObserver` logic for active section tracking.
4. Integrate into `app/blog/[slug]/page.tsx`.
