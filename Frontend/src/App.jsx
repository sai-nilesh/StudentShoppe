import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import SignInForm from "./components/SignInForm";
import SignUpForm from "./components/SignUpForm";
import ProductDetail from "./components/ProductDetail";
import CreateProduct from "./components/CreateProduct";
import User from "./components/User";
import ProfileForm from "./components/ProfileForm";
import Edit from "./components/Edit";




const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/login" element={<SignInForm/>} />
      <Route path="/signup" element={<SignUpForm/>} />
      <Route path="/product/add" element={<ProfileForm/>} />
      <Route path="/user" element={<User/>} />
      <Route path="/product/:id" element={<ProductDetail />} />
      <Route path="/product/post" element={<ProfileForm />} />
      <Route path="/product/edit/:id" element={<Edit />} />
     
    </Routes>
  </Router>
);

export default App;
