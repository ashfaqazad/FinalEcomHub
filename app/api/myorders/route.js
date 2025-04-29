// /app/api/myOrderData/route.js
import { NextResponse } from 'next/server';
import connectDB from '@/lib/connectDB';
import Order from '@/models/Order';

export async function POST(req) {
  try {
    await connectDB();
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const userOrders = await Order.find({ email }).sort({ order_date: -1 });
    return NextResponse.json({ orderdata: userOrders }, { status: 200 }); // ✅ Match MERN format
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
  }
}




















// import { NextResponse } from 'next/server';
// import connectDB from '@/lib/connectDB';
// import Order from '@/models/Order';

// export async function POST(req) {
//   console.log("📥 Incoming request to /api/myOrderData");

//   try {
//     await connectDB();
//     const { email } = await req.json();

//     console.log("📧 Email received:", email);


//     if (!email) {
//       return NextResponse.json({ success: false, message: "Email is required" }, { status: 400 });
//     }

//     const orders = await Order.find({ email }).sort({ order_date: -1 });

//     console.log("📝 Orders found:", orders.length);


//     return NextResponse.json({ success: true, orders });
//   } catch (error) {
//     console.error("Fetch Orders Error:", error);
//     return NextResponse.json({ success: false, error: "Failed to fetch orders" }, { status: 500 });
//   }
// }

















// // /app/api/myOrderData/route.js
// import { NextResponse } from 'next/server';
// import connectDB from '@/lib/connectDB';
// import Order from '@/models/Order';

// export async function POST(req) {
//   try {
//     await connectDB();
//     const { email } = await req.json();

//     const orders = await Order.find({ email }).sort({ order_date: -1 });
//     return NextResponse.json({ orderdata: orders });
//   } catch (err) {
//     console.error("Fetch Orders Error:", err);
//     return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
//   }
// }


// router.post('/myOrderData', async (req, res) => {
//   const { email } = req.body;

//   if (!email) {
//       return res.status(400).json({ error: 'Email is required' });
//   }

//   try {
//       const userOrders = await Orders.find({ email }); // Email ke basis par orders fetch karein
//       res.status(200).json({ orderdata: userOrders });
//   } catch (error) {
//       console.error('Error fetching orders:', error);
//       res.status(500).json({ error: 'Failed to fetch orders' });
//   }
// });

