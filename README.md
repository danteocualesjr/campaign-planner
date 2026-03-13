This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Stripe Integration

The app includes a pricing page with Stripe Checkout for subscriptions.

### Setup

1. Copy `.env.example` to `.env.local`
2. Add your Stripe keys from [dashboard.stripe.com/apikeys](https://dashboard.stripe.com/apikeys)
3. Create Products and Prices in [dashboard.stripe.com/products](https://dashboard.stripe.com/products):
   - Create 3 products: Starter (₱999/mo), Pro (₱2,999/mo), Enterprise (₱7,999/mo)
   - Use **recurring monthly** prices
   - Copy each Price ID (`price_...`) into `.env.local` as `STRIPE_PRICE_STARTER`, `STRIPE_PRICE_PRO`, `STRIPE_PRICE_ENTERPRISE`

### Test Mode

Use test keys (`sk_test_...`, `pk_test_...`) and test card `4242 4242 4242 4242` for development.
# campaign-planner
