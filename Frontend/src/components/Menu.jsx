import React,{ useEffect, useState }  from 'react'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from 'react-router-dom';



const Menu = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const fetchData = () => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        console.log("User is signed in:", currentUser);
      } else {
        setUser(null);
        console.log("No user is signed in");
      }
    });
    return () => unsubscribe();
  }
  const HandleProduct = ()=>{
    if(!user){
        navigate("/login");
    }else{
        navigate("/profile/add")
    }
 }
  useEffect(fetchData(), []);
    
  
  

  return (
    <div className=' '>
        <ul className="menu mt-16 absolute inset-0  bg-opacity-50 text-gray-200 font-bold lg:menu-horizontal bg-base-700 rounded-box ">
  <li onClick={HandleProduct} ><a>Sell Products</a></li>
  <li>
    <details close>
      <summary>Category</summary>
      <ul>
        <li><a>Books</a></li>
        <li><a>Electronics</a></li>
        <li><a>Furniture</a></li>
        <li><a>Accessories</a></li>
        <li><a>Others</a></li>
      </ul>
    </details>
  </li>
  <li>
          <details close>
            <summary className='w-full'>Sort By</summary>
            <ul className='w-44'>
              <li className=''><a>Price: Low-High</a></li>
              <li><a>Price: High-Low</a></li>
            </ul>
          </details>
        </li>
  <li><a>Item 3</a></li>
</ul>
    </div>
  )
}

export default Menu