"use client";
import { useEffect, useState } from "react";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [viewOrder, setViewOrder] = useState(null);

  async function fetchOrders() {
    setLoading(true);
    const res = await fetch("/api/orders");
    if (res.ok) {
      setOrders(await res.json());
      setError("");
    } else {
      setError("Failed to fetch orders");
    }
    setLoading(false);
  }

  useEffect(() => { fetchOrders(); }, []);

  async function handleDelete(id) {
    if (!confirm("Delete this order?")) return;
    const res = await fetch(`/api/orders/${id}`, { method: "DELETE" });
    if (res.ok) fetchOrders();
    else alert("Failed to delete");
  }

  return (
    <div className="min-h-screen bg-gray-50/10 px-[5vw] pt-[15vh]">
      <h1 className="text-2xl font-bold mb-6">Orders</h1>
      {loading ? <div>Loading...</div> : error ? <div className="text-red-500">{error}</div> : (
        <table className="w-full bg-white rounded shadow mt-4">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 text-left">Order ID</th>
              <th className="p-2 text-left">Customer</th>
              <th className="p-2 text-left">Total</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o._id} className="border-t">
                <td className="p-2">{o._id}</td>
                <td className="p-2">{o.customerName || o.customer || "-"}</td>
                <td className="p-2">{o.total || o.amount || "-"}</td>
                <td className="p-2 flex gap-2">
                  <button onClick={() => setViewOrder(o)} className="px-2 py-1 bg-blue-600 text-white rounded">View</button>
                  <button onClick={() => handleDelete(o._id)} className="px-2 py-1 bg-red-600 text-white rounded">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {viewOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded shadow w-[32rem] relative">
            <button type="button" onClick={() => setViewOrder(null)} className="absolute top-2 right-2 text-gray-400 hover:text-black">✕</button>
            <h2 className="text-xl font-bold mb-4">Order Details</h2>
            <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto max-h-96">{JSON.stringify(viewOrder, null, 2)}</pre>
          </div>
        </div>
      )}
    </div>
  );
} 