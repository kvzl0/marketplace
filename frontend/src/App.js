import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

// 👇 Import CartProvider
import { CartProvider } from "./CartContext.jsx";

// Layout
import Layout from "./components/Layout.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

// Pages
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Shoes from "./pages/Shoes.jsx";
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
import OrderConfirmation from "./pages/OrderConfirmation.jsx";
import About from "./pages/About.jsx";
import Community from "./pages/Community.jsx";
import Support from "./pages/Support.jsx";

import "./style.css";

function App() {
  return (
    <CartProvider> {/* 👈 Wrap entire app */}
      <div className="App">
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/order-confirmation" element={<OrderConfirmation />} />
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

              <Route path="/about" element={<About />} />
              <Route path="/community" element={<Community />} />
              <Route path="/support" element={<Support />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </CartProvider>
  );
}

export default App;