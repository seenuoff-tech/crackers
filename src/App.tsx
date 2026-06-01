import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { BillingProvider } from './context/BillingContext';
import { OrderProvider } from './context/OrderContext';
import { SliderProvider } from './context/SliderContext';
import { ProductProvider } from './context/ProductContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingButtons from './components/FloatingButtons';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Shop from './pages/Shop';
import Contact from './pages/Contact';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Register from './pages/Register';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Terms from './pages/Terms';
import PriceList from './pages/PriceList';

// Admin Pages
import AdminLayout from './components/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProducts from './pages/admin/AdminProducts';
import AdminOrders from './pages/admin/AdminOrders';
import AdminBilling from './pages/admin/AdminBilling';
import AdminSalesReport from './pages/admin/AdminSalesReport';
import AdminSettings from './pages/admin/AdminSettings';
import AdminSlider from './pages/admin/AdminSlider';
import AdminTrash from './pages/admin/AdminTrash';

const AppContent: React.FC = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin-dashboard');

  return (
    <div className="flex flex-col min-h-screen">
      {!isAdminRoute && <Navbar />}
      <main className="flex-grow">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/price-list" element={<PriceList />} />

          {/* Admin Routes (Publicly accessible via secret URL) */}
          <Route path="/admin-dashboard" element={<AdminLayout />}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="billing" element={<AdminBilling />} />
            <Route path="sales-report" element={<AdminSalesReport />} />
            <Route path="settings" element={<AdminSettings />} />
            <Route path="slider" element={<AdminSlider />} />
            <Route path="trash" element={<AdminTrash />} />
          </Route>
        </Routes>
      </main>
      {!isAdminRoute && <Footer />}
      {!isAdminRoute && <FloatingButtons />}
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <BillingProvider>
        <OrderProvider>
          <SliderProvider>
            <ProductProvider>
              <CartProvider>
                <Router>
                  <AppContent />
                </Router>
              </CartProvider>
            </ProductProvider>
          </SliderProvider>
        </OrderProvider>
      </BillingProvider>
    </AuthProvider>
  );
}
