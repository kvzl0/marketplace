import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

// Dashboard
import Dashboard from "./pages/Dashboard.jsx";

// Original
import Shoes from "./pages/Shoes.jsx";
import Add from "./pages/Add.jsx";
import Update from "./pages/Update.jsx";

// Products
import Products from "./pages/Products.jsx";
import AddProduct from "./pages/AddProduct.jsx";
import UpdateProduct from "./pages/UpdateProduct.jsx";

// Users
import Users from "./pages/Users.jsx";
import AddUser from "./pages/AddUser.jsx";
import UpdateUser from "./pages/UpdateUser.jsx";

// Orders
import Orders from "./pages/Orders.jsx";
import AddOrder from "./pages/AddOrder.jsx";
import UpdateOrder from "./pages/UpdateOrder.jsx";
import ViewOrder from "./pages/ViewOrder.jsx";

// Navbar
import Navbar from "./components/Navbar.jsx";

import "./style.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          {/* Dashboard Route */}
          <Route path="/dashboard" element={<Dashboard/>}></Route>

          {/* Original Shoes Routes */}
          <Route path="/" element={<Shoes/>}></Route>
          <Route path="/add" element={<Add/>}></Route>
          <Route path="/update/:id" element={<Update/>}></Route>

          {/* Products Routes */}
          <Route path="/products" element={<Products/>}></Route>
          <Route path="/products/add" element={<AddProduct/>}></Route>
          <Route path="/products/update/:id" element={<UpdateProduct/>}></Route>

          {/* Users Routes */}
          <Route path="/users" element={<Users/>}></Route>
          <Route path="/users/add" element={<AddUser/>}></Route>
          <Route path="/users/update/:id" element={<UpdateUser/>}></Route>

          {/* Orders Routes */}
          <Route path="/orders" element={<Orders/>}></Route>
          <Route path="/orders/add" element={<AddOrder/>}></Route>
          <Route path="/orders/update/:id" element={<UpdateOrder/>}></Route>
          <Route path="/orders/view/:id" element={<ViewOrder/>}></Route>
        </Routes>
      </BrowserRouter>
    </div> 
  );
}

export default App;