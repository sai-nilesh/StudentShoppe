import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig"; 
// import logo from "../assets/logo.png"; 
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import app from "../firebaseConfig";
import Alert from "./Alert";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
const SignUpForm = () => {
  const [email, setEmail] = useState(""); // State for email input
  const [password, setPassword] = useState(""); // State for password input
  const [error, setError] = useState(""); // State for error message
  const [loading, setLoading] = useState(false); // State for loading status
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
 const navigate = useNavigate();
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("User Info:", user);
      navigate("/")
      alert("Sign Up successful!");
    } catch (error) {
      console.error("Error during Google Sign-In:", error);
    }
  };

  // Handle sign up with email and password
  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(""); // Reset error
  

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log("User signed up successfully:", user);
      alert("Sign Up successful!");
    } catch (err) {
      console.error("Error during sign up:", err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <><Navbar/>
    <div className="bg-base-100 h-screen flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        
        <h2 className="mt-50 text-center text-2xl/9  tracking-tight ">
          Create your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSignUp} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm/6  font-medium ">
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
                className="block w-full rounded-md bg-base-300 px-3 py-3 text-base text-gray-300  sm:text-sm/6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm/6 font-medium ">
                Password
              </label>
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
                className="block w-full rounded-md bg-base-300 px-3 py-3 text-base text-gray-300  sm:text-sm/6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="flex w-full justify-center rounded-md bg-base-200 px-3 py-2.5 text-sm/6 font-semibold  shadow-sm  "
            >
              {loading ? "Signing Up..." : "Sign Up"}
            </button>
          </div>
          
        </form>
        <button onClick={handleGoogleSignIn} className="btn btn-md my-5  ">Signup With Google</button>
        {error && <p style={{ color: "red" }}>{error}</p>}

        <p className="mt-3 text-center text-sm/6 text-gray-500">
          Already a member?{' '}
          <Link to="/login" className="font-semibold  hover:text-gray-100">
            Sign in here
          </Link>
        </p>
      </div>
    </div>   <Footer/> </>
  );
};

export default SignUpForm;
