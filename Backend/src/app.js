const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const Product = require("./models/Products");
const User = require("./models/User");

const app = express();


const port = process.env.PORT || 5000;

app.use(express.json()); // To parse JSON bodies

const corsOptions = {
  origin: process.env.CLIENT_URL || "*", // set CLIENT_URL on Render later
  credentials: true
};
app.use(cors(corsOptions));

//  Before Deploy
// app.use(
//   cors({
//     origin: "http://localhost:5173", // Replace with your frontend URL
//     credentials: true, // Allow credentials (cookies, authentication headers)
//   })
// );

main().catch((err) => console.log(err));

async function main() {
  await mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("mongodb connetecd"))
    .catch((e) => console.log(e));
}

app.post("/product/post", async (req, res) => {
  console.log(req.body);
  try {
    const {
      name,
      description,
      price,
      category,
      condition,
      image_url,
      history,
      warranty,
      Owner_Name,
      Owner_Number,
    } = req.body;

    // Validate required fields
    if (
      !name ||
      !description ||
      !price ||
      !category ||
      !condition ||
      !image_url ||
      !warranty ||
      !Owner_Number ||
      !Owner_Number
    ) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Create a new product
    const newProduct = new Product({
      name,
      description,
      price,
      category,
      condition,
      image_url,
      history, // Optional field
      warranty,
      Owner_Name,
      Owner_Number,
    });

    // Save to database
    await newProduct.save();

    res.status(201).json({
      message: "Product created successfully",
      product: newProduct,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

app.get("/product/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Find the user based on the ID
    const user = await User.findOne({ "products._id": id });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find the product within the user's products array
    const product = user.products.id(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product); // Return the product data
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

app.get("/product", async (req, res) => {
  const data = await Product.find();
  res.json(data);
});

app.post("/profile/post", async (req, res) => {
  try {
    console.log("Received data:", req.body); // Log the incoming request body

    const { email, products } = req.body;

    if (!email || !products) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      // If you want to update existing user data
      existingUser.products.push(...products); // Append new products
      await existingUser.save();
      return res.status(200).json({ message: "Profile updated successfully" });
    }

    const user = new User({
      email,
      products,
    });

    await user.save();
    res.status(201).json({ message: "Profile created successfully" });
  } catch (err) {
    console.error("Error saving profile:", err);
    res
      .status(500)
      .json({ message: "Error saving profile", error: err.message });
  }
});

app.delete("/profile/:email/product/:productId", async (req, res) => {
  const { email, productId } = req.params;
  try {
    const user = await User.findOne({ email: email });
    if (user) {
      user.products = user.products.filter(product => product._id.toString() !== productId);
      await user.save();
      res.status(200).send({ message: "Product deleted successfully." });
    } else {
      res.status(404).send({ message: "User not found." });
    }
  } catch (error) {
    res.status(500).send({ message: "Error deleting product." });
  }
});
app.put('/profile/:email/product/:productId', async (req, res) => {
  try {
    const { email, productId } = req.params;
    const updatedProductData = req.body; // Updated product data

    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Find the product in the user's products array by its ID
    const productIndex = user.products.findIndex(
      (product) => product._id.toString() === productId
    );

    if (productIndex === -1) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Update the product details
    user.products[productIndex] = {
      ...user.products[productIndex]._doc, // Existing product data
      ...updatedProductData, // New data to update
    };

    // Save the updated user data
    await user.save();

    return res.status(200).json({
      message: 'Product updated successfully',
      product: user.products[productIndex],
    });
  } catch (err) {
    console.error('Error updating product:', err);
    return res.status(500).json({ message: 'Server error' });
  }
});


app.get("/profile", async (req, res) => {
  const data = await User.find();
  res.json(data);
});

app.get("/", (req, res) => {
  res.send("hello world");
});

app.listen(5000);
