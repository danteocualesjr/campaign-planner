/**
 * Pricing plans for Campaign Planner.
 * Create these Products and Prices in your Stripe Dashboard, then add the Price IDs here.
 * See: https://dashboard.stripe.com/products
 */
export const PRICING_PLANS = [
  {
    id: "starter",
    name: "Starter",
    description: "Perfect for small teams getting started",
    price: "₱999",
    priceId: process.env.STRIPE_PRICE_STARTER ?? "", // Stripe Price ID (monthly)
    features: [
      "Up to 5 campaigns",
      "1 user",
      "Basic templates",
      "Email support",
    ],
    recommended: false,
  },
  {
    id: "pro",
    name: "Pro",
    description: "For growing franchises",
    price: "₱2,999",
    priceId: process.env.STRIPE_PRICE_PRO ?? "",
    features: [
      "Unlimited campaigns",
      "Up to 10 users",
      "All templates",
      "Calendar view",
      "Priority support",
    ],
    recommended: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description: "For large franchise networks",
    price: "₱7,999",
    priceId: process.env.STRIPE_PRICE_ENTERPRISE ?? "",
    features: [
      "Everything in Pro",
      "Unlimited users",
      "Custom integrations",
      "Dedicated account manager",
      "SLA guarantee",
    ],
    recommended: false,
  },
] as const;

export type PlanId = (typeof PRICING_PLANS)[number]["id"];
