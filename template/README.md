# Vite Shadcn Stripe Project

A batteries-included React application with modern tooling and payment integration.

## Overview

This project was created with [create-vite-shadcn-stripe](https://www.npmjs.com/package/create-vite-shadcn-stripe), a template for React applications with:

- Vite for lightning-fast development and optimized builds
- React 19+ with TypeScript for type safety
- TailwindCSS for utility-first styling
- shadcn/ui for beautiful, accessible UI components 
- Stripe integration for payment processing
- Supabase as backend for Stripe integration
- Fully configured ESLint and TypeScript

## Getting Started

### Installation

Make sure you have Node.js (version 18 or higher) installed.

```bash
# Install dependencies
npm install
# or with bun
bun install

# Start the dev server
npm run dev
# or with bun
bun run dev
```

### Environment Variables

Create a `.env` file in the root of your project with the following variables:

```
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_key
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_SUPABASE_FUNCTIONS_URL=https://your-project.supabase.co/functions/v1
```

### Supabase Setup

1. Create a Supabase project at [supabase.com](https://supabase.com)
2. Set up the necessary tables:
   - `payments` table with columns for tracking payment information
3. Deploy the Edge Functions in the `/supabase/functions` directory

### Stripe Setup

1. Create a Stripe account at [stripe.com](https://stripe.com)
2. Get your API keys from the Stripe Dashboard
3. Configure your Stripe webhook endpoint to point to your Supabase function

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview the production build locally

## Features

- **Hidden Button Checkout:** Interactive checkout flow with a hidden button that appears on mousemove
- **Stripe Integration:** Complete payment processing with Supabase backend
- **Success Page:** Confirmation page after successful checkout
- **Type Safety:** Full TypeScript support throughout the codebase

## License

MIT