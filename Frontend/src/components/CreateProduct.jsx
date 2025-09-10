import React, { useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import Footer from "./Footer";

const CreateProduct= () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    condition: "",
    image_url: "",
    warranty: "",
    Owner_Name:"",
    Owner_Number:""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    console.log(formData); // Check the form data here
  
    try {
      const response = await axios.post("http://localhost:5000/product/post", formData);
      alert("Product created successfully!");
      setFormData({
        name: "",
        description: "",
        price: "",
        category: "",
        condition: "",
        image_url: "",
        warranty: "",
        Owner_Name:"",
        Owner_Number:"",
      });
    } catch (error) {
      console.error("Error creating product:", error);
      alert("Failed to create product.");
    }
  };
  

  return (
    <><Navbar/>
    <div className="container mx-auto px-4  text-white">
      <h1 className="text-3xl font-bold text-center my-6">Create New Product</h1>
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
          placeholder="Owner_Name"
          className="input input-bordered w-full"
          required
        />
        <input
          type="text"
          name="Owner_Number"
          value={formData.Owner_Number}
          onChange={handleChange}
          placeholder="Owner_Number"
          className="input input-bordered w-full"
          required
        />
        <button type="submit" className="btn btn-primary w-full">
          Create Product
        </button>
      </form>
    </div>  <Footer/></>
  );
};

export default CreateProduct;
