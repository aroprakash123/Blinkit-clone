import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import { AuthProvider, useAuth } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AddressPage from "./pages/AddressPage";
import PaymentPage from "./pages/PaymentPage";
import OrderConfirmation from "./pages/OrderConfirmation";
import ProductDetail from "./pages/ProductDetail";
import CategoryProducts from "./pages/CategoryProducts";  // ✅ ADD THIS IMPORT

// Footer Pages
import Blog from "./pages/Blog";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Faqs from "./pages/Faqs";
import Contact from "./pages/Contact";
import Partner from "./pages/Partner";
import Franchise from "./pages/Franchise";
import Seller from "./pages/Seller";
import Warehouse from "./pages/Warehouse";
import Deliver from "./pages/Deliver";
import Resources from "./pages/Resources";

//Checkout
import Checkout from "./pages/Checkout";
import Success from "./pages/Success";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="h-screen flex items-center justify-center">Loading...</div>;
  }

  return user ? children : <Navigate to="/login" />;
};

function AppRoutes() {
  return (
    <Routes>

      {/* AUTH */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* PUBLIC FOOTER PAGES */}
      <Route path="/blog" element={<Blog />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/faqs" element={<Faqs />} />
      <Route path="/contact" element={<Contact />} />

      <Route path="/partner" element={<Partner />} />
      <Route path="/franchise" element={<Franchise />} />
      <Route path="/seller" element={<Seller />} />
      <Route path="/warehouse" element={<Warehouse />} />
      <Route path="/deliver" element={<Deliver />} />
      <Route path="/resources" element={<Resources />} />

      {/* PUBLIC CATEGORY PAGE - No authentication required */}
      <Route path="/category/:categoryName" element={<CategoryProducts />} />  {/* ✅ ADD THIS ROUTE */}

      {/* PROTECTED */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/product/:id"
        element={
          <ProtectedRoute>
            <ProductDetail />
          </ProtectedRoute>
        }
      />

      <Route
        path="/address"
        element={
          <ProtectedRoute>
            <AddressPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/payment"
        element={
          <ProtectedRoute>
            <PaymentPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/order-confirmation"
        element={
          <ProtectedRoute>
            <OrderConfirmation />
          </ProtectedRoute>
        }
      />

      <Route path="/checkout" element={<Checkout />} />
<Route path="/success" element={<Success />} />

    </Routes>

    
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <AppRoutes />
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;