// import Stripe from "stripe";
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// export async function POST(req) {
//   const { items, total } = await req.json();

//   const paymentIntent = await stripe.paymentIntents.create({
//     amount: total * 100, // ₹ to paise
//     currency: "inr",
//     metadata: { integration_check: "accept_a_payment" },
//   });

//   return Response.json({ clientSecret: paymentIntent.client_secret });
// }
