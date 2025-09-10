import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { getAuth, signOut,onAuthStateChanged } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
const Navbar = () => {
  const auth = getAuth();
  const [unsubscribe, setUnsubscribe] = useState(null);
  const navigate =  useNavigate();

    const HandleSignout = async () => {
        try {
            await signOut(auth);
            console.log("User signed out successfully");
            // Optionally redirect the user
            window.location.href = "/"; // Replace with navigate("/login") if using react-router-dom
        } catch (error) {
            console.error("Error signing out:", error.message);
        }
    };
    const HandleSignin = (profile) => {
      const auth = getAuth();
  
      // Set up the onAuthStateChanged listener
      const unsubscribeFunction = onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in, navigate to the homepage
          console.log("User is signed in:", user);
          if(profile){
            console.log(user.email);
            
            navigate("/user");
            
          }else{
          alert("User is signed in:")
          navigate("/");}
        } else {
          // User is not signed in, navigate to the login page
          alert("Please signin");
          navigate("/login");
        }
      });
  
      // Save the unsubscribe function in state for later use
     setUnsubscribe(() => unsubscribeFunction);
    };
  return (
    <div>
        <div className="navbar bg-base-200">
  <div className="flex-1">
    <Link to= "/" className="btn btn-ghost text-xl">Shoppe</Link> 
     <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
     {/* <ul className=" flex my-4  bg-base-200 rounded-t-none p-2">
            <Link to={"/product/post"} className='mx-4'><a>Sell</a></Link>
            
          </ul> */}
  </div>
  <div className="flex-none">
    <div className="dropdown dropdown-end">
        
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
        <div className="indicator">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <span className="badge badge-sm indicator-item">8</span>
        </div>
      </div>
      
      <div
        tabIndex={0}
        className="card card-compact dropdown-content bg-base-100 z-[1] mt-3 w-52 shadow">
        <div className="card-body">
          <span className="text-lg font-bold">8 Items</span>
          <span className="text-info">Subtotal: $999</span>
          <div className="card-actions">
            <button className="btn btn-primary btn-block">View cart</button>
          </div>
        </div>
      </div>
    </div>
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS Navbar component"
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
        <li>
          <Link onClick={()=>HandleSignin("profile")}className="justify-between">
            Profile
            <span className="badge">New</span>
          </Link>
        </li>
        
        <li><Link onClick={HandleSignin}>Sign In</Link></li>
        <li><Link onClick={()=>HandleSignout()} >Sign Out</Link></li>
      </ul>
    </div>
  </div>
</div>
    </div>
  )
}

export default Navbar