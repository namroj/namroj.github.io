---
sessionId: session-260708-130953-qjtv
---

# Requirements

### Overview & Goals
The goal of this task is to modernize the project by aligning it with Next.js 15 best practices, fixing current configuration issues (especially linting), and cleaning up the codebase for better maintainability and SEO.

### Scope
- **In Scope**:
    - Stabilizing and updating dependencies.
    - Migrating to ESLint 9 flat config.
    - Implementing Next.js 15 metadata and SEO standards.
    - Modernizing analytics and MDX processing.
    - Refactoring hardcoded data into JSON files.
    - Cleaning up temporary/legacy directories.
- **Out of Scope**:
    - Major UI/UX redesign (unless specific bugs are found).
    - Adding new features or pages.
    - Migrating to a different styling solution (sticking with SCSS).

### Functional Requirements
- The site must build successfully without non-standard flags.
- Linting must work correctly with `npm run lint`.
- All pages must have proper SEO metadata and follow Next.js 15 standards.
- Data-heavy components (Skills, Tools) must be data-driven.
- The project structure must be clean, removing the `astro-sidey-temp` folder.

### Non-Functional Requirements
- **Performance**: Improved LCP and overall performance through optimized analytics and metadata handling.
- **Maintainability**: Centralized data in JSON files and standardized linting rules.
- **SEO**: Better search engine visibility with sitemaps and robots.txt.


# Technical Design

### Current Implementation
- **Framework**: Next.js (claiming to be 16.2.10, but likely a misconfigured 15).
- **Linting**: Broken ESLint 9 setup using old `.eslintrc.json`.
- **Data**: Mix of hardcoded components and JSON-driven pages.
- **Metadata**: Using `Metadata` API but including `viewport` which is deprecated in that object.
- **MDX**: Using `next-mdx-remote` with redundant rehype plugins.

### Key Decisions
- **Decision: Revert to Stable Versions**
    - **Rationale**: The current versions in `package.json` (e.g., Next 16.2.10, TS 6.0.3) are either experimental or mislabeled. Moving to stable Next.js 15 and TS 5.x ensures better support and reliability.
- **Decision: Migrate to Flat Config (ESLint 9)**
    - **Rationale**: ESLint 9 is the future and the current setup is broken. Migrating now future-proofs the project and fixes the `lint` script.
- **Decision: Use JSON for All Data Lists**
    - **Rationale**: Consistency across `Experience`, `Formation`, `Skills`, and `Tools` makes the site easier to update without touching JSX.

### Proposed Changes
- **Dependency Update**: Align `package.json` with standard Next.js 15 ecosystem.
- **ESLint Migration**: Implement `eslint.config.mjs` using `@next/eslint-plugin` (Next 15's new way to handle linting).
- **SEO & Metadata**:
    - Move `viewport` to separate export in `layout.tsx`.
    - Add `app/sitemap.ts` and `app/robots.ts`.
- **Analytics**: Replace `Script` tags with `GoogleAnalytics` from `@next/third-parties/google`.
- **Cleanup**: Remove `astro-sidey-temp` and the `--webpack` flag.

### File Structure Changes
- **New Files**:
    - `eslint.config.mjs`
    - `app/sitemap.ts`
    - `app/robots.ts`
    - `app/_components/skills/data.json`
    - `app/_components/tools/data.json`
- **Removed Files**:
    - `.eslintrc.json`
    - `.eslintignore`
    - `astro-sidey-temp/` (entire directory)


# Testing

### Validation Approach
I will verify the changes through build checks, linting, and manual inspection of the generated metadata and structure.

### Key Scenarios
- **Build Success**: Run `npm run build` to ensure the site builds correctly without the `--webpack` flag.
- **Linting Check**: Run `npm run lint` to confirm that the new flat config works and no errors are present.
- **SEO Verification**: Inspect the HTML source to ensure `viewport` and other metadata are correctly rendered.
- **Data Integrity**: Verify that `Skills` and `Tools` sections still render correctly after refactoring to JSON.
- **Analytics Check**: Ensure the Google Analytics script is correctly injected via the new component.


# Delivery Steps

### ✓ Step 1: Stabilize dependencies and cleanup project structure
Stabilize the project's foundation by correcting the unusual version numbers in `package.json` and cleaning up the project structure.

- Update `package.json` with current stable versions for `next` (15.x), `react` (19.x), `typescript` (5.x), and `eslint` (9.x).
- Remove the `--webpack` flag from the `build` script.
- Delete the `astro-sidey-temp` directory.
- Run `pnpm install` to synchronize the `node_modules`.

### ✓ Step 2: Migrate to ESLint 9 flat configuration
Fix the broken linting by migrating to the ESLint 9 flat configuration format.

- Create `eslint.config.js` (or `.mjs`) to replace `.eslintrc.json` and `.eslintignore`.
- Configure the new flat config with `next/core-web-vitals`, `typescript-eslint`, and `prettier`.
- Remove `.eslintrc.json` and `.eslintignore`.
- Update the `lint` and `lint:fix` scripts in `package.json` to remove deprecated flags.

### ✓ Step 3: Implement Next.js 15 best practices and SEO improvements
Implement Next.js 15 best practices for SEO, metadata, and analytics.

- Update `app/layout.tsx` to use the `viewport` export (or `generateViewport`) instead of including it in the `metadata` object.
- Migrate Google Analytics to use `@next/third-parties/google` for better performance and easier management.
- Add `sitemap.ts` and `robots.ts` in the `app` directory for improved SEO.
- Remove redundant `rehypeHighlight` from `app/blog/[slug]/page.tsx` and stick with `rehypePrettyCode`.

### ✓ Step 4: Refactor hardcoded components to data-driven patterns
Refactor components with hardcoded data to use external JSON files, ensuring a cleaner and more maintainable codebase.

- Extract data from `app/_components/skills/Skills.tsx` into a new `data.json` file in the same directory.
- Extract data from `app/_components/tools/Tools.tsx` into a new `data.json` file.
- Update both components to use the `readJsonFile` utility to fetch their data.