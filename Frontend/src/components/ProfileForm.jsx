import React, { useState, useEffect } from "react";
import axios from "axios";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";

const ProfileForm = () => {
  const [emailID, setEmailId] = useState(""); // Fixed email ID from Firebase\
  const categories = ['Books', 'Electronics', 'Furniture', 'Accessories', 'Others'];
  const naviagte = useNavigate();
  const [products, setProducts] = useState([
    {
      name: "",
      price: "",
      description: "",
      category: "",
      image_url: "",
      condition: "",
      history: "",
      warranty: "",
      Owner_Name: "",
      Owner_Number: "",
    },
  ]);

  // Fetch email from Firebase
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setEmailId(user.email); // Set email from Firebase user
      } else {
        console.error("No authenticated user found.");
      }
    });

    // Cleanup to avoid memory leaks
    return () => unsubscribe();
  }, []);

  const handleProductChange = (index, event) => {
    const updatedProducts = [...products];
    updatedProducts[index][event.target.name] = event.target.value;
    setProducts(updatedProducts);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const profileData = {
      email: emailID, // Use the fixed email ID from Firebase
      products: products,
    };

    try {
      const response = await axios.post("http://localhost:5000/profile/post", profileData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("Profile saved successfully:", response.data);
      alert("Product saved successfully");
      naviagte("/");
      
    } catch (error) {
      console.error("Error saving profile:", error.response ? error.response.data : error.message);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 text-white">
        <h1 className="text-3xl font-bold text-center my-6">Create Profile</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-lg">Email:</label>
            <input
              type="email"
              value={emailID} // Fixed email ID value
              readOnly // Make the field read-only
              className="input input-bordered w-full"
              required
            />
          </div>

          {products.map((product, index) => (
            <div key={index}>
              <h3 className="text-xl font-semibold mb-4">Product {index + 1}</h3>

              <div>
                <label>Product Name:</label>
                <input
                  type="text"
                  name="name"
                  value={product.name || ""}
                  onChange={(e) => handleProductChange(index, e)}
                  className="input input-bordered w-full"
                  required
                />
              </div>

              <div>
                <label>Price:</label>
                <input
                  type="number"
                  name="price"
                  value={product.price || ""}
                  onChange={(e) => handleProductChange(index, e)}
                  className="input input-bordered w-full"
                  required
                />
              </div>

              <div>
  <label>Category:</label>
  <select
    name="category"
    value={product.category || ""}
    onChange={(e) => handleProductChange(index, e)}
    className="input input-bordered w-full"
    required
  >
    <option value="" disabled>Select a category</option>
    {categories.map((category, idx) => (
      <option key={idx} value={category}>
        {category}
      </option>
    ))}
  </select>
</div>

              <div>
                <label>Condition:</label>
                <input
                  type="text"
                  name="condition"
                  value={product.condition || ""}
                  onChange={(e) => handleProductChange(index, e)}
                  className="input input-bordered w-full"
                  required
                />
              </div>

              <div>
                <label>Image URL:</label>
                <input
                  type="text"
                  name="image_url"
                  value={product.image_url || ""}
                  onChange={(e) => handleProductChange(index, e)}
                  className="input input-bordered w-full"
                  required
                />
              </div>

              <div>
                <label>Warranty:</label>
                <input
                  type="text"
                  name="warranty"
                  value={product.warranty || ""}
                  onChange={(e) => handleProductChange(index, e)}
                  className="input input-bordered w-full"
                  required
                />
              </div>

              <div>
                <label>Owner Name:</label>
                <input
                  type="text"
                  name="Owner_Name"
                  value={product.Owner_Name || ""}
                  onChange={(e) => handleProductChange(index, e)}
                  className="input input-bordered w-full"
                  required
                />
              </div>

              <div>
                <label>Owner Phone Number:</label>
                <input
                  type="text"
                  name="Owner_Number"
                  value={product.Owner_Number || ""}
                  onChange={(e) => handleProductChange(index, e)}
                  className="input input-bordered w-full"
                  required
                />
              </div>
            </div>
          ))}

          <button type="submit" className="btn btn-primary w-full mt-4">
            Submit Profile
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default ProfileForm;
