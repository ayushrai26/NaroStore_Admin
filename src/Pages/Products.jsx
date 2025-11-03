import React, { useEffect, useState } from "react";
import { Plus, Trash2, Edit, Save, X, Upload } from "lucide-react";
import toast from "react-hot-toast";
import { FaRupeeSign } from "react-icons/fa";
const Products = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    category: "",
    images: [],
    description: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);

  
  const fetchProducts = async () => {
    try {
      const res = await fetch("http://localhost:3000/products/fetch-all-products", {
        credentials: "include",
      });
      const data = await res.json();
      if (data?.allProducts) setProducts(data.allProducts);
    } catch (err) {
      console.error("Failed to fetch products:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  
  const uploadImage = async (file) => {
    
    const formData = new FormData();
    formData.append("image", file);

    const res = await fetch("http://localhost:3000/api/upload/product-photos", {
      method: "POST",
      credentials: "include",
      body: formData,
    });

    const data = await res.json();
    console.log(data)
    if (data?.images) {
      return data.images; 
    } else {
      alert("Image upload failed");
      return "";
    }
  };

  
  const handleAddProduct = async (e) => {
    e.preventDefault();

    try {
       let uploadedImageUrl = newProduct.images;

      
      if (imageFile) {
        uploadedImageUrl = await uploadImage(imageFile);
      }
     console.log(uploadedImageUrl,'image')
      const res = await fetch("http://localhost:3000/products/create-product", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...newProduct, images: uploadedImageUrl }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success('Product Addedd')
        setNewProduct({
          name: "",
          price: "",
          category: "",
          images: [],
          description: "",
        });
        setImageFile(null);
        fetchProducts();
      } else {
        alert(data.message || "Error adding product");
      }
    } catch (err) {
      console.error(err);
    }
  };

  
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      const res = await fetch(`http://localhost:3000/products/delete-product/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (res.ok) {
        setProducts(products.filter((p) => p._id !== id));
        toast.success('Product deleted')
        
      }
    } catch (err) {
      console.error(err);
    }
  };

  
  const handleUpdate = async (e) => {
    e.preventDefault();
    console.log(editingProduct)
    try {
      const res = await fetch(`http://localhost:3000/products/edit-product/${editingProduct._id}`, {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingProduct),
      });
      if (res.ok) {
        setEditingProduct(null);
        fetchProducts();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6">
      
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Product Management</h1>
      </div>

    
      <form
        onSubmit={handleAddProduct}
        className="bg-white shadow p-4 rounded-lg mb-6 flex flex-wrap gap-3 items-center"
      >
        <input
          type="text"
          placeholder="Product Name"
          value={newProduct.name}
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
          className="border p-2 rounded w-48"
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
          className="border p-2 rounded w-32"
          required
        />
        <input
          type="text"
          placeholder="Category"
          value={newProduct.category}
          onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
          className="border p-2 rounded w-48"
          required
        />
        <input
          type="text"
          placeholder="Description"
          value={newProduct.description}
          onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
          className="border p-2 rounded w-64"
        />

        
        <label className="flex items-center gap-2 bg-gray-100 border p-2 rounded cursor-pointer hover:bg-gray-200">
          <Upload size={18} />
          <span>{imageFile ? imageFile.name : "Upload Image"}</span>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0])}
            className="hidden"
          />
        </label>

        <button
          type="submit"
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          <Plus size={18} /> Add Product
        </button>
      </form>

      
      <div className="bg-white shadow p-4 rounded-lg overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b text-gray-600">
              <th className="py-3 px-2">Image</th>
              <th className="py-3 px-2">Name</th>
              <th className="py-3 px-2">Category</th>
              <th className="py-3 px-2">Price</th>
              <th className="py-3 px-2">Description</th>
              <th className="py-3 px-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p._id} className="border-b hover:bg-gray-50">
                <td className="py-2 px-2">
                  <img
                    src={p.images || "https://via.placeholder.com/50"}
                    alt={p.name}
                    className="w-12 h-12 rounded object-cover"
                  />
                </td>
                <td className="py-2 px-2 font-medium">{p.name}</td>
                <td className="py-2 px-2">{p.category}</td>
                <td className="py-2 px-2 flex justify-center items-center"><FaRupeeSign /><span>{p.price}</span></td>
                <td className="py-2 px-2 text-gray-600">{p.description}</td>
                <td className="py-2 px-2 text-center">
                  <div className="flex justify-center gap-3">
                    <button
                      onClick={() => setEditingProduct(p)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(p._id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {products.length === 0 && (
          <p className="text-center text-gray-500 py-4">No products found.</p>
        )}
      </div>

      
      {editingProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
          <div className="bg-white p-6 rounded-xl shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Edit Product</h2>
            <form onSubmit={handleUpdate} className="space-y-3">
              <input
                type="text"
                value={editingProduct.name}
                onChange={(e) =>
                  setEditingProduct({ ...editingProduct, name: e.target.value })
                }
                className="border p-2 rounded w-full"
              />
              <input
                type="number"
                value={editingProduct.price}
                onChange={(e) =>
                  setEditingProduct({ ...editingProduct, price: e.target.value })
                }
                className="border p-2 rounded w-full"
              />
              <input
                type="text"
                value={editingProduct.category}
                onChange={(e) =>
                  setEditingProduct({ ...editingProduct, category: e.target.value })
                }
                className="border p-2 rounded w-full"
              />
              <textarea
                value={editingProduct.description}
                onChange={(e) =>
                  setEditingProduct({ ...editingProduct, description: e.target.value })
                }
                className="border p-2 rounded w-full"
                rows={3}
              />
              <input
                type="text"
                value={editingProduct.image}
                onChange={(e) =>
                  setEditingProduct({ ...editingProduct, image: e.target.value })
                }
                className="border p-2 rounded w-full"
                placeholder="Image URL"
              />
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg"
                >
                  <X size={16} />
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                >
                  <Save size={16} /> Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
