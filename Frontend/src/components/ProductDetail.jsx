import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import axios from "axios";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null); // Changed initial state to null instead of an empty array
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState(null); // Track any error
  
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {

        const API_URL = import.meta.env.VITE_API_URL;

const response = await axios.get(`${API_URL}/product/${id}`, {
  withCredentials: true,
});

        // Before
        // const response = await axios.get(`http://localhost:5000/product/${id}`, {
        //   withCredentials: true,
        // });
        setProduct(response.data);
        console.log(product);
        
        setLoading(false);
      } catch (err) {
        console.error("Error fetching product:", err);
        setError("Failed to load product details.");
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

  // Show loading indicator if data is being fetched
  if (loading) {
    return <p>Loading product details...</p>;
  }

  // Show error if there was an issue fetching the product
  if (error) {
    return <p>{error}</p>;
  }

  // If no product found, show an error message
  if (!product) {
    return <p>Product details not available. Try accessing from the product list.</p>;
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 my-2">
        <div className="flex justify-center">
          <div className="card bg-base-100 shadow-xl w-full md:w-4/5 lg:w-2/3 xl:w-1/2">
            <figure>
              <img
                src={product.image_url}
                alt={product.name}
                className="h-96 w-full object-cover rounded-t-md"
              />
            </figure>
            <div className="card-body p-3">
              <h2 className="card-title text-2xl md:text-3xl">{product.name}</h2>
              <p className="text-gray-600 text-sm my-2">{product.short_description}</p>
              <p className="text-gray-500 font-semibold text-lg">Price: ${product.price}</p>
              <p className="text-gray-500 text-sm">Category: {product.category}</p>
              <p className="text-gray-500 text-sm">Condition: {product.condition}</p>
              <div className="card-actions justify-end mt-4">
                <button
                  className="btn btn-outline btn-info  "
                  onClick={() => handlePage(product)} // Ensure this function is defined
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductDetail;
