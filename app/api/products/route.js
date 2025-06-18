import connectDB from "@/lib/mongodb";
import Product from "@/lib/models/Product";

export async function GET() {
  try {
    await connectDB();
    const products = await Product.find().lean();
    return Response.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    return new Response(
      JSON.stringify({
        message: "Failed to fetch products",
        error: error.message,
      }),
      { status: 500 }
    );
  }
}
