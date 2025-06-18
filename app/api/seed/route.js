// import connectDB from "@/lib/mongodb";
// import Product from "@/lib/models/Product";
// import { products } from "@/lib/data";

// export async function GET() {
//   try {
//     await connectDB();
    
//     // Clear existing products
//     await Product.deleteMany({});
    
//     // Add new products
//     const seededProducts = await Product.insertMany(
//       products.map(product => ({
//         name: product.name,
//         price: product.price,
//         image: product.image,
//         category: product.category,
//         sizes: ["S", "M", "L", "XL", "XXL"],
//         colors: ["#416d8a", "#418a5c", "#8a5641", "#8a4180"],
//         inStock: true
//       }))
//     );

//     return Response.json({
//       message: "Database seeded successfully",
//       products: seededProducts
//     });
//   } catch (error) {
//     console.error("Error seeding database:", error);
//     return new Response(
//       JSON.stringify({ message: "Failed to seed database", error: error.message }),
//       { status: 500 }
//     );
//   }
// } 