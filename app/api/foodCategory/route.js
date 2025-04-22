// app/api/foodCategory/route.js
import connectDB from "@/lib/connectDB";
import FoodCategory from "@/models/FoodCategory";

export async function GET(req) {
  try {
    await connectDB();

    const foodCategory = await FoodCategory.find({});

    return new Response(
      JSON.stringify({ foodCategory }),
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Error:", error);
    return new Response(
      JSON.stringify({ error: "Internal Server Error" }),
      { status: 500 }
    );
  }
}
