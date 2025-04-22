// app/api/eshop/route.js
import { connectToDatabase } from "@/lib/connectDB";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const client = await connectToDatabase();
    const db = client.db(); // default DB from URI
    const eShopCollection = db.collection("eShop");

    const data = await eShopCollection.find({}).toArray();

    const transformedData = data.map((item) => ({
      _id: item._id.toString(),
      title: item.title,
      image: item.image,
      description: item.description, // ✅ Description added
      price: Number(item.price?.$numberInt || item.price || 0),
    }));

    return NextResponse.json({ eShop: transformedData }, { status: 200 });
  } catch (error) {
    console.error("Error fetching eShop data:", error);
    return NextResponse.json({ error: "Failed to fetch eShop data" }, { status: 500 });
  }
}
