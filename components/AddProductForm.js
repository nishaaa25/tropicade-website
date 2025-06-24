"use client";
import { useState, useEffect } from "react";

export default function AddProductForm({
  showForm,
  editProduct,
  form,
  setForm,
  onSubmit,
  onClose
}) {
  const [sizesInput, setSizesInput] = useState("");
  const [colorsInput, setColorsInput] = useState("");

  // Initialize input fields when form opens
  useEffect(() => {
    if (showForm) {
      setSizesInput(Array.isArray(form.sizes) ? form.sizes.join(', ') : '');
      setColorsInput(Array.isArray(form.colors) ? form.colors.join(', ') : '');
    }
  }, [showForm, form.sizes, form.colors]);

  if (!showForm) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Convert comma-separated strings to arrays before submitting
    const sizesArray = sizesInput
      .split(',')
      .map(item => item.trim())
      .filter(item => item.length > 0);
    
    const colorsArray = colorsInput
      .split(',')
      .map(item => item.trim())
      .filter(item => item.length > 0);

    // Update form with arrays
    const updatedForm = {
      ...form,
      sizes: sizesArray,
      colors: colorsArray
    };

    // Call the original onSubmit with updated form
    onSubmit(e, updatedForm);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <form onSubmit={handleSubmit} className="bg-white/10 backdrop-blur-sm p-8 rounded shadow w-1/2 relative max-h-[90vh] overflow-y-auto">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-400 hover:text-red-500 cursor-pointer"
        >
          ✕
        </button>
        <h2 className="text-xl font-bold mb-4 text-white">
          {editProduct ? "Edit" : "Add"} Product
        </h2>

        <div className="relative w-full flex-center gap-3">
          <input
            className="w-full mb-3 p-2 border rounded bg-white/20 text-white placeholder-gray-300"
            placeholder="Title"
            value={form.title || ''}
            onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
            required
          />
           <input
            className="w-full mb-3 p-2 border rounded bg-white/20 text-white placeholder-gray-300"
            placeholder="Price"
            type="number"
            value={form.price || ''}
            onChange={e => setForm(f => ({ ...f, price: e.target.value }))}
            required
          />
        </div>

        <div className="relative w-full flex-center gap-3">
          <input
            className="w-full mb-3 p-2 border rounded bg-white/20 text-white placeholder-gray-300"
            placeholder="Category"
            value={form.category || ''}
            onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
          />
          <input
            className="w-full mb-3 p-2 border rounded bg-white/20 text-white placeholder-gray-300"
            placeholder="Sizes (comma separated: S, M, L, XL)"
            value={sizesInput}
            onChange={e => setSizesInput(e.target.value)}
          />
        </div>
        <div className="relative w-full flex-center gap-3">
           <input
            className="w-full mb-3 p-2 border rounded bg-white/20 text-white placeholder-gray-300"
            placeholder="Colors (comma separated: Red, Blue, Black)"
            value={colorsInput}
            onChange={e => setColorsInput(e.target.value)}
          />
        </div>
        <input
          className="w-full mb-3 p-2 border rounded bg-white/20 text-white placeholder-gray-300"
          placeholder="Image URL"
          value={form.image || ''}
          onChange={e => setForm(f => ({ ...f, image: e.target.value }))}
        />

        <div className="mb-3 flex items-center">
          <input
            type="checkbox"
            id="inStock"
            checked={form.inStock || false}
            onChange={e => setForm(f => ({ ...f, inStock: e.target.checked }))}
            className="mr-2"
          />
          <label htmlFor="inStock" className="text-white">In Stock</label>
        </div>

        <textarea
          className="w-full mb-3 p-2 border rounded bg-white/20 text-white placeholder-gray-300"
          placeholder="Description"
          value={form.desc || ''}
          onChange={e => setForm(f => ({ ...f, desc: e.target.value }))}
          rows="4"
        />

        <button
          type="submit"
          className="w-full bg-purple-700 text-white py-2 rounded hover:bg-purple-800 transition"
        >
          {editProduct ? "Update" : "Create"}
        </button>
      </form>
    </div>
  );
} 