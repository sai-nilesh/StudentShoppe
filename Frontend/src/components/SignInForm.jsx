import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import logo from '../assets/logo.png'; // Logo import
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
const SignInForm = () => {
  const [email, setEmail] = useState(""); // State for email input
  const [password, setPassword] = useState(""); // State for password input
  const [error, setError] = useState(""); // State for error message
  const [loading, setLoading] = useState(false); // State for loading status

  const navigate =  useNavigate();
  // Handle sign in with email and password
  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(""); // Reset error

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log("User signed in successfully:", user);
      alert("Sign In successful!");
    navigate("/")
      
    } catch (err) {
      console.error("Error during sign in:", err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (<> <Navbar/>
    <div className="bg-base-100   flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          alt="Company"
          src={logo}
          className="mx-auto h-10 w-auto"
        />
        <h2 className="mt-10 text-center text-2xl/9  tracking-tight ">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSignIn} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm/6 ">
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)} // Update email state
                className="block w-full rounded-md bg-base-300 px-3 py-3 text-gray-300  sm:text-sm/6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm/6  text-gray-300">
                Password
              </label>
              <div className="text-sm">
                <a href="#" className="font-semibold text-gray-10" >
                  Forgot password?
                </a>
              </div>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)} // Update password state
                className="block w-full rounded-md bg-base-300 px-3 py-3 text-gray-300  sm:text-sm/6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="flex w-full justify-center rounded-md bg-base-200 px-3 py-2.5 text-sm/6  text-gray-300 hover:text-gray-100"
            >
              {loading ? "Signing In..." : "Sign in"}
            </button>
          </div>
        </form>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <p className="mt-10 text-center text-sm/6 text-gray-500">
          New User?{' '}
          <Link to="/signup" className=" text-gray-500 hover:text-gray-100">
            Sign Up
          </Link>
        </p>
      </div>
    </div> <Footer/> </>
  );
};

export default SignInForm;
