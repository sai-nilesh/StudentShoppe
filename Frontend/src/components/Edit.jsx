import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import axios from 'axios';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import app from '../firebaseConfig';

const Edit = () => {
  const { state } = useLocation();
  const { product } = state || {}; // Get the product passed from the previous page
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    condition: '',
    image_url: '',
    warranty: '',
    Owner_Name: '',
    Owner_Number: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (product) {
      setFormData({ ...product }); // Populate the form with the existing product data
    }
  }, [product]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!product || !product._id) {
      alert("Product data is invalid");
      return;
    }
  
    try {
      const auth = getAuth(app);
  
      // Wait for the user to be authenticated
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          // Send PUT request to update the product

          const API_URL = import.meta.env.VITE_API_URL;
          const response = await axios.put(
            `${API_URL}/${user.email}/product/${product._id}`,
            formData,
            { withCredentials: true }
          );
  
          alert('Product updated successfully');
          navigate(`/user`); // Navigate back to the user's profile page
        } else {
          
          navigate(`/login`); // Navigate to login if user is not authenticated
        }
      });
    } catch (err) {
      console.error('Error updating product:', err);
      alert('Failed to update the product');
    }
  };
  

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 text-white">
        <h1 className="text-3xl font-bold text-center my-6">Edit Product</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Product Name"
            className="input input-bordered w-full"
            required
          />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Product Description"
            className="input input-bordered w-full"
            required
          />
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Price"
            className="input input-bordered w-full"
            required
          />
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="Category"
            className="input input-bordered w-full"
            required
          />
          <input
            type="text"
            name="condition"
            value={formData.condition}
            onChange={handleChange}
            placeholder="Condition"
            className="input input-bordered w-full"
            required
          />
          <input
            type="text"
            name="image_url"
            value={formData.image_url}
            onChange={handleChange}
            placeholder="Image URL"
            className="input input-bordered w-full"
            required
          />
          <input
            type="text"
            name="warranty"
            value={formData.warranty}
            onChange={handleChange}
            placeholder="Warranty"
            className="input input-bordered w-full"
            required
          />
          <input
            type="text"
            name="Owner_Name"
            value={formData.Owner_Name}
            onChange={handleChange}
            placeholder="Owner Name"
            className="input input-bordered w-full"
            required
          />
          <input
            type="text"
            name="Owner_Number"
            value={formData.Owner_Number}
            onChange={handleChange}
            placeholder="Owner Number"
            className="input input-bordered w-full"
            required
          />
          <button type="submit" className="btn btn-primary w-full">
            Update Product
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default Edit;
