import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

// Layout
import Layout from "./components/Layout.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

// Pages
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Shoes from "./pages/Shoes.jsx";
import Add from "./pages/Add.jsx";
import Update from "./pages/Update.jsx";
import Products from "./pages/Products.jsx";
import AddProduct from "./pages/AddProduct.jsx";
import UpdateProduct from "./pages/UpdateProduct.jsx";
import Users from "./pages/Users.jsx";
import AddUser from "./pages/AddUser.jsx";
import UpdateUser from "./pages/UpdateUser.jsx";
import Orders from "./pages/Orders.jsx";
import AddOrder from "./pages/AddOrder.jsx";
import UpdateOrder from "./pages/UpdateOrder.jsx";
import ViewOrder from "./pages/ViewOrder.jsx";
import Cart from "./pages/Cart.jsx";

import "./style.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected routes with Layout */}
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/" element={<Shoes />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/add" element={<AddProduct />} />
            <Route path="/products/update/:id" element={<UpdateProduct />} />
            <Route path="/users" element={<Users />} />

            {/* Admin-only routes */}
            <Route
              path="/users/add"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <AddUser />
                </ProtectedRoute>
              }
            />
            <Route
              path="/users/update/:id"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <UpdateUser />
                </ProtectedRoute>
              }
            />

            <Route path="/orders" element={<Orders />} />
            <Route path="/orders/add" element={<AddOrder />} />
            <Route path="/orders/update/:id" element={<UpdateOrder />} />
            <Route path="/orders/view/:id" element={<ViewOrder />} />

            {/* Cart: customer-only route */}
            <Route
              path="/cart"
              element={
                <ProtectedRoute allowedRoles={["customer"]}>
                  <Cart />
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;