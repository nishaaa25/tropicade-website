import connectDB from "@/lib/mongodb";
import Product from "@/lib/models/Product";

export async function GET(request, { params }) {
  try {
    await connectDB();
    const { id } = params;
    
    const product = await Product.findById(id).lean();
    
    if (!product) {
      return new Response(
        JSON.stringify({ message: "Product not found" }),
        { status: 404 }
      );
    }
    
    return Response.json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    return new Response(
      JSON.stringify({
        message: "Failed to fetch product",
        error: error.message,
      }),
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    await connectDB();
    const { id } = params;
    const updateData = await request.json();
    
    // Convert price to number if it's a string
    if (updateData.price) {
      updateData.price = Number(updateData.price);
    }
    
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );
    
    if (!updatedProduct) {
      return new Response(
        JSON.stringify({ message: "Product not found" }),
        { status: 404 }
      );
    }
    
    return Response.json(updatedProduct);
  } catch (error) {
    console.error("Error updating product:", error);
    return new Response(
      JSON.stringify({
        message: "Failed to update product",
        error: error.message,
      }),
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    await connectDB();
    const { id } = params;
    
    const deletedProduct = await Product.findByIdAndDelete(id);
    
    if (!deletedProduct) {
      return new Response(
        JSON.stringify({ message: "Product not found" }),
        { status: 404 }
      );
    }
    
    return Response.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    return new Response(
      JSON.stringify({
        message: "Failed to delete product",
        error: error.message,
      }),
      { status: 500 }
    );
  }
} 