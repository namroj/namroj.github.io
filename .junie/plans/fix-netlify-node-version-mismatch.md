---
sessionId: session-260711-122112-1g0u
---

# Requirements

### Overview & Goals
The goal is to resolve the Netlify build error caused by a Node.js version mismatch. Currently, the project is forced to use Node 18 via `netlify.toml`, while Next.js (or its dependencies) requires at least Node 20.9.0. We will update the project to use Node 22 (LTS).

### Scope
- **In Scope**:
    - Updating `netlify.toml` to set `NODE_VERSION` to `22`.
    - Creating an `.nvmrc` file to set the Node version to `22` for local development.
    - Updating `package.json` to include the `engines` requirement.
- **Out of Scope**:
    - Changing the package manager from `npm` to `pnpm` in the build command (unless requested).
    - Upgrading other dependencies or fixing other build warnings.

# Technical Design

### Current Implementation
- `netlify.toml` explicitly sets `NODE_VERSION = "18"` in the `[build.environment]` section.
- No `.nvmrc` or `.node-version` file exists.
- `package.json` does not specify an `engines` field.

### Proposed Changes
1. **Update `netlify.toml`**:
   Modify the `[build.environment]` section to set `NODE_VERSION = "22"`. This is the highest precedence for Netlify builds.

2. **Add `.nvmrc`**:
   Create a root `.nvmrc` file with content `22`. This helps tools like `nvm` or `fnm` automatically switch to the correct Node version and serves as a fallback for Netlify.

3. **Update `package.json`**:
   Add the `engines` field to specify the Node.js version requirement:
   ```json
   "engines": {
     "node": ">=22.0.0"
   }
   ```

### File Structure
- `netlify.toml` (Modified)
- `.nvmrc` (New)
- `package.json` (Modified)

# Delivery Steps

### ✓ Step 1: Update Node.js environment configuration
Update the Node.js version in `netlify.toml` and create a `.nvmrc` file.

- Change `NODE_VERSION` from `18` to `22` in `netlify.toml`.
- Create a new `.nvmrc` file in the root directory containing `22`.
- This ensures Netlify uses the correct version and provides a consistent environment for local development.

### ✓ Step 2: Specify Node.js version in package.json
Add the `engines` field to `package.json` to formally specify the Node.js requirement.

- Add `"engines": { "node": ">=22.0.0" }` to `package.json`.
- This provides a clear signal to both Netlify and other developers about the required Node.js version.