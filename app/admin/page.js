export default function AdminDashboard() {
  return (
    <div className="min-h-screen w-full pt-[20vh] p-8">
      <h1 className="text-3xl font-bold mb-8">Admin Panel</h1>
      <nav className="mb-8 flex gap-6">
        <a href="/admin/products" className="text-lg text-purple-700 hover:underline">Products</a>
        <a href="/admin/orders" className="text-lg text-purple-700 hover:underline">Orders</a>
      </nav>
      <div className="text-gray-600">Welcome to the admin dashboard. Use the navigation above to manage products and orders.</div>
    </div>
  );
} 