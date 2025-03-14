# create-vite-shadcn-stripe

A template generator for creating React applications with modern tooling and payment integration.

## Overview

This npm package provides a template for creating React applications with:

- Vite for lightning-fast development and optimized builds
- React 19+ with TypeScript for type safety
- TailwindCSS for utility-first styling
- shadcn/ui for beautiful, accessible UI components 
- Stripe integration for payment processing
- Supabase as backend for Stripe integration
- Fully configured ESLint and TypeScript

## Usage

You can create a new project with:

```bash
# Using npm
npm create vite-shadcn-stripe my-project

# Using yarn
yarn create vite-shadcn-stripe my-project

# Using pnpm
pnpm create vite-shadcn-stripe my-project

# Using bun
bun create vite-shadcn-stripe my-project
```

The template will provide a complete starting point with all dependencies configured and ready for development, including authentication, payment flows, and responsive UI components.

## Features

- **Modern Stack:** Built with React 19, TypeScript, and Vite for an optimal development experience
- **Stripe Integration:** Pre-configured payment processing with Stripe Checkout
- **Supabase Backend:** Ready-to-deploy Supabase Edge Functions for handling Stripe webhooks
- **shadcn/ui Components:** Beautiful, accessible UI components that you own
- **Hidden Button Checkout:** Interactive checkout flow with a hidden button that appears on mousemove
- **Success Page:** Confirmation page after successful checkout
- **TypeScript:** Type safety throughout the codebase with strict mode enabled

## Instructions for Users

After creating your project:

```bash
# Change into project directory
cd my-project

# Install dependencies
npm install
# or
bun install

# Initialize shadcn/ui
npx shadcn-ui@latest init
# or
bunx --bun shadcn@latest init

# Start the development server
npm run dev
# or
bun run dev
```

## For Contributors

If you want to contribute to this template generator:

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/vite-shadcn-stripe.git
   cd vite-shadcn-stripe
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   bun install
   ```

3. Make your changes to the template files in the `template/` directory

4. Test your changes locally:
   ```bash
   # Link the package locally
   npm link
   
   # Create a test project using your local version
   npm create vite-shadcn-stripe test-project
   ```

5. Submit a pull request with your changes

## Publishing

To publish a new version to npm:

```bash
# Login to npm
npm login

# Bump version (patch, minor, or major)
npm version patch

# Publish
npm publish
```

## License

MIT