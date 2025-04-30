// app/api/orders/route.js
import { NextResponse } from 'next/server';
import connectDB from '@/lib/connectDB';
import Order from '@/models/Order';

export async function POST(req) {
  console.log("✅ Request received!");

  try {
    await connectDB();
    const body = await req.json();

    const newOrder = new Order({
      email: body.email,
      order_date: new Date(),
      orders_data: body.orders_data,
    });

    await newOrder.save();

    return NextResponse.json({ success: true, message: "Order placed successfully" });
  } catch (err) {
    console.error("❌ Order Error:", err);
    return NextResponse.json({ success: false, error: "Failed to place order" }, { status: 500 });
  }
}







// // app/api/orders/route.js
// import { NextResponse } from 'next/server';
// import connectDB from '@/lib/db';
// import Order from '@/models/Order';

// export async function POST(req) {
//   console.log("✅ Request received!");

//   try {
//     await connectDB();
//     const body = await req.json();

//     const newOrder = new Order({
//       email: body.email,
//       order_date: new Date(),
//       orders_data: body.orders_data,
//     });

//     await newOrder.save();

//     return NextResponse.json({ success: true, message: "Order placed successfully" });
//   } catch (err) {
//     console.error("❌ Order Error:", err);
//     return NextResponse.json({ success: false, error: "Failed to place order" }, { status: 500 });
//   }
// }
