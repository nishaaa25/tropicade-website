"use client";
import { useEffect, useState } from "react";
import AddProductForm from "@/components/AddProductForm";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [form, setForm] = useState({
    title: "",
    price: "",
    image: "",
    category: "",
    sizes: [],
    colors: [],
    inStock: false,
    desc: "",
  });

  async function fetchProducts() {
    setLoading(true);
    const res = await fetch("/api/products");
    if (res.ok) {
      setProducts(await res.json());
      setError("");
    } else {
      setError("Failed to fetch products");
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  function openCreate() {
    setEditProduct(null);
    setForm({
      title: "",
      price: "",
      image: "",
      category: "",
      sizes: [],
      colors: [],
      inStock: false,
      desc: "",
    });
    setShowForm(true);
  }

  function openEdit(product) {
    setEditProduct(product);
    setForm({
      title: product.title || "",
      price: product.price || "",
      image: product.image || "",
      category: product.category || "",
      sizes: product.sizes || [],
      colors: product.colors || [],
      inStock: product.inStock || false,
      desc: product.desc || "",
    });
    setShowForm(true);
  }

  function closeForm() {
    setShowForm(false);
    setEditProduct(null);
    setForm({
      title: "",
      price: "",
      image: "",
      category: "",
      sizes: [],
      colors: [],
      inStock: false,
      desc: "",
    });
  }

  async function handleDelete(id) {
    if (!confirm("Delete this product?")) return;
    const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
    if (res.ok) fetchProducts();
    else alert("Failed to delete");
  }

  async function handleSubmit(e, updatedForm = null) {
    e.preventDefault();
    const formData = updatedForm || form;
    const method = editProduct ? "PUT" : "POST";
    const url = editProduct
      ? `/api/products/${editProduct._id}`
      : "/api/products";
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    if (res.ok) {
      closeForm();
      fetchProducts();
    } else {
      alert("Failed to save product");
    }
  }

  return (
    <div className="min-h-screen w-full relative pt-[15vh] px-[5vw]">
      <h1 className="text-2xl font-bold mb-6">Products</h1>
      <button
        onClick={openCreate}
        className="mb-4 px-4 py-2 bg-purple-700 text-white rounded hover:bg-purple-800"
      >
        + Add Product
      </button>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <table className="w-full bg-white/20 rounded shadow mt-4">
          <thead>
            <tr className="bg-gray-100/20">
              <th className="p-2 text-left">Title</th>
              <th className="p-2 text-left">Price</th>
              <th className="p-2 text-left">Category</th>
              <th className="p-2 text-left">Sizes</th>
              <th className="p-2 text-left">Colors</th>
              <th className="p-2 text-left">Stock</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p._id} className="border-t">
                <td className="p-2">{p.title}</td>
                <td className="p-2">${p.price}</td>
                <td className="p-2">{p.category}</td>
                <td className="p-2">
                  {Array.isArray(p.sizes) ? p.sizes.join(", ") : ""}
                </td>
                <td className="p-2">
                  {Array.isArray(p.colors) ? p.colors.join(", ") : ""}
                </td>
                <td className="p-2">
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      p.inStock
                        ? "bg-green-500 text-white"
                        : "bg-red-500 text-white"
                    }`}
                  >
                    {p.inStock ? "In Stock" : "Out of Stock"}
                  </span>
                </td>
                <td className="p-2 flex gap-2">
                  <button
                    onClick={() => openEdit(p)}
                    className="px-2 py-1 bg-blue-600 text-white rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(p._id)}
                    className="px-2 py-1 bg-red-600 text-white rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <AddProductForm
        showForm={showForm}
        editProduct={editProduct}
        form={form}
        setForm={setForm}
        onSubmit={handleSubmit}
        onClose={closeForm}
      />
    </div>
  );
}
