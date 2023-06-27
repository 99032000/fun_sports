import type { NextRequest } from "next/server";

// This is your test secret API key.
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const calculateOrderAmount = (items: any) => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  return 1400;
};

export async function POST(req: NextRequest) {
  const { items } = await req.json();;

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: "aud",
    automatic_payment_methods: {
      enabled: true,
    },
  });

  return new Response(JSON.stringify({
    clientSecret: paymentIntent.client_secret,
  }));
};