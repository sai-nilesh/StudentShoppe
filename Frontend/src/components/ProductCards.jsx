import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ProductCards = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const navigate = useNavigate();

  const categories = ['Books', 'Electronics', 'Furniture', 'Accessories', 'Others'];

  const filteredProductsMemo = useMemo(() => {
    return filteredProducts.length > 0 ? filteredProducts : products;
  }, [filteredProducts, products]);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/profile", { withCredentials: true });
      const users = response.data;

      // Extract and merge products from all users
      const allProducts = users.flatMap((user) => user.products);

      setProducts(allProducts);
      setFilteredProducts(allProducts); // Initially show all products
      setLoading(false);
    } catch (err) {
      console.error("Error fetching products:", err);
      setError("Failed to load products.");
      setLoading(false);
    }
  };

  const handleCategoryClick = (category) => {
    if (category === 'Others') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter((product) => product.category === category);
      setFilteredProducts(filtered);
    }
  };

  const handlePage = (product) => {
    navigate(`/product/${product._id}`, { state: { product } });
  };

  const handleSort = (order) => {
    const sortedProducts = [...products].sort((a, b) => {
      if (order === "asend") {
        return a.price - b.price;
      } else if (order === "desend") {
        return b.price - a.price;
      }
      return 0;
    });
    setFilteredProducts(sortedProducts);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <p className="text-center text-gray-500">Loading products...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <>
      <div className="relative">
        <ul className="menu mt-3 inset-0 bg-opacity-50 text-gray-300 font-bold lg:menu-horizontal bg-base-700 rounded-box mb-7 z-50">
          <li>
            <a onClick={() => navigate("/product/post")}>Sell Products</a>
          </li>
          <li>
            <details className="group relative">
              <summary className="cursor-pointer hover:text-gray-300">Category</summary>
              <ul className="absolute left-0 bg-base-100 text-gray-300 p-2 rounded shadow-lg mt-1 group-open:block hidden z-50">
                {categories.map((category) => (
                  <li
                    key={category}
                    onClick={() => handleCategoryClick(category)}
                    className="hover:bg-gray-700 p-1 rounded"
                  >
                    <a>{category}</a>
                  </li>
                ))}
              </ul>
            </details>
          </li>
          <li>
            <details className="group relative">
              <summary className="cursor-pointer hover:text-gray-300">Sort By</summary>
              <ul className="absolute left-0 bg-base-100 text-gray-300 p-2 w-32 rounded shadow-lg mt-1 group-open:block hidden z-50">
                <li onClick={() => handleSort("asend")} className="hover:bg-gray-700 p-1 rounded">
                  <a>Price: Low-High</a>
                </li>
                <li onClick={() => handleSort("desend")} className="hover:bg-gray-700 p-1 rounded">
                  <a>Price: High-Low</a>
                </li>
              </ul>
            </details>
          </li>
        </ul>
      </div>

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
                  loading="lazy"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title text-gray-300">{product.name}</h2>
                <p className="text-gray-400 text-sm my-2">{product.description || "No description provided."}</p>
                <p className="text-gray-300 font-semibold">&#8377;{product.price}</p>
                <p className="text-gray-400 text-sm">Category: {product.category}</p>
                <p className="text-gray-400 text-sm">Condition: {product.condition}</p>
                <p className="text-gray-400 text-sm">Warranty: {product.warranty || "N/A"}</p>
                
                <div className="card-actions justify-end mt-4">
                  <button
                    className="btn btn-outline"
                    onClick={() => handlePage(product)}
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductCards;
