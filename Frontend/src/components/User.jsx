import React, { useEffect, useState, useMemo } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import axios from "axios";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import app from "../firebaseConfig"; // Your Firebase configuration file
import { useNavigate } from "react-router-dom";

const User = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [emailID, setEmail] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();

    const auth = getAuth(app);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setEmail(user.email); // Get the user's email
      } else {
        setEmail(null); // User is signed out
      }
    });

    // Cleanup subscription on component unmount
    return () => unsubscribe();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/profile", {
        withCredentials: true,
      });
      setProducts(response.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching products:", err);
      setError("Failed to load products.");
      setLoading(false);
    }
  };

  // Memoize filtered products based on the logged-in user's email ID
  const filteredProductsMemo = useMemo(() => {
    if (emailID) {
      return products
        .filter((user) => user.email === emailID)
        .flatMap((user) => user.products); // Extract products from matching users
    }
    return [];
  }, [products, emailID]);

  const handlePage = (product) => {
    // Example navigation logic
    navigate(`/product/${product._id}`);
  };

  const handleDelete = async (product) => {
    try {
      // Send delete request to the backend to remove product
      await axios.delete(`http://localhost:5000/profile/${emailID}/product/${product._id}`, {
        withCredentials: true,
      });

      // Remove the product from the local state
      setProducts((prevProducts) =>
        prevProducts.map((user) => {
          if (user.email === emailID) {
            // Filter out the deleted product
            return {
              ...user,
              products: user.products.filter((p) => p._id !== product._id),
            };
          }
          return user;
        })
      );
    } catch (err) {
      console.error("Error deleting product:", err);
      setError("Failed to delete the product.");
    }
  };
  const handleProductClick = (product)=>{
    console.log(product);
    
    navigate(`/product/edit/${product._id}`, { state: { product } });
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProductsMemo.map((product) => (
              <div
                key={product._id}
                className="card bg-base-100 shadow-xl hover:shadow-2xl transition duration-300"
              >
                <figure>
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="h-48 w-full object-cover rounded-t-md"
                    loading="lazy" // Lazy load images for faster page load
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title text-gray-300">{product.name}</h2>
                  <p className="text-gray-400 text-sm my-2">
                    {product.description || "No description available."}
                  </p>
                  <p className="text-gray-300 font-semibold">
                    &#8377;{product.price}
                  </p>
                  <p className="text-gray-400 text-sm">
                    Category: {product.category}
                  </p>
                  <p className="text-gray-400 text-sm">
                    Condition: {product.condition}
                  </p>
                  <div className="card-actions justify-end mt-4">
                    {/* <button
                      className="btn btn-primary"
                      onClick={() => handlePage(product)}
                    >
                      Buy Now
                    </button> */}
                    <button onClick={()=>handleProductClick(product)} className="btn btn-outline btn-warning">Edit</button>
                    <button
                      onClick={() => handleDelete(product)}
                      className="btn btn-outline btn-error"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default User;
