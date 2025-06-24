import connectDB from "@/lib/mongodb";
import Product from "@/lib/models/Product";

export async function GET() {
  try {
    await connectDB();
    const products = await Product.find().lean();
    console.log('Found products:', products.length);
    console.log('First product:', products[0]);
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

export async function POST(request) {
  try {
    await connectDB();
    const productData = await request.json();
    
    // Convert price to number if it's a string
    if (productData.price) {
      productData.price = Number(productData.price);
    }
    
    const product = new Product(productData);
    const savedProduct = await product.save();
    
    return Response.json(savedProduct, { status: 201 });
  } catch (error) {
    console.error("Error creating product:", error);
    return new Response(
      JSON.stringify({
        message: "Failed to create product",
        error: error.message,
      }),
      { status: 500 }
    );
  }
}
