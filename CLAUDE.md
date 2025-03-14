# CLAUDE.md - Project Guidelines

## Build/Lint Commands
- Dev server: `npm run dev`
- Build: `npm run build` (runs TypeScript build + Vite build)
- Lint: `npm run lint`
- Preview build: `npm run preview`

## Code Style Guidelines

### TypeScript
- Strict mode enabled (noImplicitAny, strictNullChecks, etc.)
- No unused locals or parameters
- No unchecked side effect imports
- No fallthrough cases in switch statements

### React
- Use functional components with hooks
- Follow React hooks rules (enforced by eslint-plugin-react-hooks)
- Export components with allowConstantExport for HMR compatibility

### Imports/Modules
- Use ESM format (type: "module")
- Bundler module resolution
- Can import TypeScript files with extensions

### Formatting
- Single quotes for strings
- 2-space indentation
- Semicolons required
- Trailing commas in multiline objects/arrays

### Error Handling
- Prefer try/catch for async operations
- Use TypeScript for type safety to prevent runtime errors