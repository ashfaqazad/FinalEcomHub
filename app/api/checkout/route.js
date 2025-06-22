import Stripe from 'stripe';
import { NextResponse } from 'next/server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
console.log("✅ BASE_URL in production:", process.env.BASE_URL);

export async function POST(req) {
  try {
    const body = await req.json();
    const items = body?.items;

    console.log("Received items from frontend:", items);

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: "No items provided in request body" }, { status: 400 });
    }

    const line_items = items.map(item => {
      const name = item.name || 'Unnamed Product';
      const price = Number(item.price);
      const qty = Number(item.qty) || 1;

      console.log(`Mapping item: name=${name}, price=${price}, qty=${qty}`);

      return {
        price_data: {
          currency: 'usd',
          product_data: { name },
          unit_amount: Math.round(price * 100),
        },
        quantity: qty,
      };
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      success_url: `${process.env.BASE_URL}/success`,
      cancel_url: `${process.env.BASE_URL}/cancel`,
    });

    console.log("Stripe session created:", session.id);

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Stripe Checkout Error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}







// // app/api/checkout/route.js
// import Stripe from 'stripe';
// import { NextResponse } from 'next/server';

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
// console.log("✅ NEXT_PUBLIC_BASE_URL in production:", process.env.NEXT_PUBLIC_BASE_URL);


// export async function POST(req) {
//   try {
//     const body = await req.json();
//     const items = body?.items;

//     console.log("Received items from frontend:", items);

//     // Validate items
//     if (!items || !Array.isArray(items) || items.length === 0) {
//       return NextResponse.json({ error: "No items provided in request body" }, { status: 400 });
//     }

//     const line_items = items.map(item => {
//       const name = item.name || 'Unnamed Product';
//       const price = Number(item.price);
//       const qty = Number(item.qty) || 1;

//       console.log(`Mapping item: name=${name}, price=${price}, qty=${qty}`);

//       return {
//         price_data: {
//           currency: 'usd',
//           product_data: { name },
//           unit_amount: Math.round(price * 100),
//         },
//         quantity: qty,
//       };
//     });

//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ['card'],
//       line_items,
//       mode: 'payment',
//       success_url: `${process.env.BASE_URL}/success`,
//       cancel_url: `${process.env.BASE_URL}/cancel`,

//       // success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
//       // cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cancel`,
//     });

//     console.log("Stripe session created:", session.id);

//     return NextResponse.json({ url: session.url });
//   } catch (err) {
//     console.error("Stripe Checkout Error:", err);
//     return NextResponse.json({ error: err.message }, { status: 500 });
//   }
// }

















// import { NextResponse } from 'next/server';

// export async function POST(req) {
//   try {
//     const body = await req.json();
//     console.log("✅ Checkout Body:", body);  // 👈 Yeh dekhna zaroori hai

//     // Simulated error (replace this with actual logic)
//     // e.g., Stripe or DB code

//     return NextResponse.json({ success: true });
//   } catch (error) {
//     console.error("❌ Checkout API Error:", error); // 👈 Real error message yahan print hoga

//     return new NextResponse(
//       JSON.stringify({ message: 'Checkout failed', error: error.message }),
//       { status: 500 }
//     );
//   }
// }
















// // app/api/checkout/route.js (App Router version)
// import Stripe from 'stripe';
// import { NextResponse } from 'next/server';

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// export async function POST(req) {
//   try {
//     const { items } = await req.json(); // cart items from frontend

//     const line_items = items.map(item => ({
//       price_data: {
//         currency: 'usd',
//         product_data: {
//           name: item.name,
//         },
//         unit_amount: item.price * 100, // price in cents
//       },
//       quantity: item.qty,
//     }));

//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ['card'],
//       line_items,
//       mode: 'payment',
//       success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
//       cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cancel`,
//     });

//     return NextResponse.json({ url: session.url });
//   } catch (err) {
//     return NextResponse.json({ error: err.message }, { status: 500 });
//   }
// }
