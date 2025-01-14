'use client';
import React, { useState, useEffect } from 'react';
import type { Product } from '../../types';  // Use relative path instead of @/types

export default function AdminPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: '',
    price: 0,
    description: '',
    features: [],
    imageUrl: '',
    purchaseUrl: '',
    category: '',
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const res = await fetch('/api/products');
    const data = await res.json();
    setProducts(Object.values(data));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newProduct),
    });
    fetchProducts();
    setNewProduct({
      name: '',
      price: 0,
      description: '',
      features: [],
      imageUrl: '',
      purchaseUrl: '',
      category: '',
    });
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Product Management</h1>
      
      {/* Add New Product Form */}
      <form onSubmit={handleSubmit} className="mb-8 space-y-4 max-w-2xl">
        <input
          type="text"
          placeholder="Product Name"
          value={newProduct.name}
          onChange={e => setNewProduct({...newProduct, name: e.target.value})}
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          placeholder="Price"
          value={newProduct.price}
          onChange={e => setNewProduct({...newProduct, price: Number(e.target.value)})}
          className="w-full p-2 border rounded"
        />
        <textarea
          placeholder="Description"
          value={newProduct.description}
          onChange={e => setNewProduct({...newProduct, description: e.target.value})}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Features (comma separated)"
          onChange={e => setNewProduct({...newProduct, features: e.target.value.split(',')})}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Image URL"
          value={newProduct.imageUrl}
          onChange={e => setNewProduct({...newProduct, imageUrl: e.target.value})}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Purchase URL"
          value={newProduct.purchaseUrl}
          onChange={e => setNewProduct({...newProduct, purchaseUrl: e.target.value})}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Category"
          value={newProduct.category}
          onChange={e => setNewProduct({...newProduct, category: e.target.value})}
          className="w-full p-2 border rounded"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Add Product
        </button>
      </form>

      {/* Product List */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold">Products</h2>
        {products.map((product: Product) => (
          <div key={product.id} className="border p-4 rounded">
            <h3 className="font-bold">{product.name}</h3>
            <p>${product.price}</p>
            <p>{product.description}</p>
            <div className="mt-2">
              <small className="text-gray-500">Added: {new Date(product.addedDate).toLocaleDateString()}</small>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}