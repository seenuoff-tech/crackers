import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, ShieldCheck, Truck, Package, CheckCircle2, LogIn } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useOrders } from '../context/OrderContext';
import { sendOrderStatusEmail } from '../services/EmailService';

const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const { cart, totalAmount, clearCart } = useCart();
  const { isAuthenticated, user } = useAuth();
  const { addOrder } = useOrders();
  const [isOrdered, setIsOrdered] = useState(false);
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const [showAdminToast, setShowAdminToast] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    state: '',
    pincode: ''
  });

  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        name: user.name,
        email: user.email
      }));
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSendingEmail(true);
    
    // Create the order in the shared context
    const orderAmount = `₹${(totalAmount * 1.12).toFixed(2)}`;
    addOrder({
      customer: formData.name,
      email: formData.email,
      phone: formData.phone,
      amount: orderAmount
    });

    // Send initial confirmation email in background
    sendOrderStatusEmail(formData.email, 'NEW_ORDER', 'Pending').catch(error => {
      console.error('Failed to send confirmation email:', error);
    });

    setShowAdminToast(true);
    setTimeout(() => {
      setIsOrdered(true);
      setIsSendingEmail(false);
      setShowAdminToast(false);
      clearCart();
    }, 2000);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
        <div className="bg-red-50 p-8 rounded-full mb-8">
          <LogIn className="w-16 h-16 text-red-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4 tracking-tight">Login Required</h1>
        <p className="text-gray-600 mb-10 max-w-md">You must be logged in to place an order. Please sign in to your account or create a new one.</p>
        <div className="flex gap-4">
          <Link
            to="/login"
            className="bg-gray-900 text-white px-10 py-4 rounded-full text-lg font-bold hover:bg-red-600 transition-all shadow-xl"
          >
            Sign In
          </Link>
          <Link
            to="/register"
            className="bg-white text-red-600 border-2 border-red-600 px-10 py-4 rounded-full text-lg font-bold hover:bg-red-50 transition-all shadow-xl"
          >
            Register
          </Link>
        </div>
      </div>
    );
  }

  if (isOrdered) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
        <div className="bg-green-50 p-8 rounded-full mb-8">
          <CheckCircle2 className="w-16 h-16 text-green-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4 tracking-tight">Order Placed Successfully!</h1>
        <p className="text-gray-600 mb-10 max-w-md">Thank you for choosing Crackers. Your order has been received and will be processed shortly. We'll send you a confirmation email to <strong>{user?.email}</strong> with details.</p>
        <Link
          to="/"
          className="bg-red-600 text-white px-10 py-4 rounded-full text-lg font-bold hover:bg-red-700 transition-all shadow-xl"
        >
          Back to Home
        </Link>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4 tracking-tight">Your cart is empty</h1>
        <Link to="/shop" className="text-red-600 font-bold hover:underline">Go to shop</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {showAdminToast && (
          <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-top-4 duration-300">
            <div className="bg-gray-900 text-white px-8 py-4 rounded-2xl shadow-2xl flex items-center gap-4 border border-white/10">
              <div className="bg-green-500 p-2 rounded-full">
                <CheckCircle2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-bold text-sm">Order Placed Successfully!</p>
                <p className="text-xs text-gray-400">Order details sent to admin dashboard.</p>
              </div>
            </div>
          </div>
        )}
        <div className="flex items-center gap-4 mb-12">
          <Link to="/cart" className="p-2 hover:bg-gray-200 rounded-full transition-colors">
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 tracking-tight">Checkout</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Checkout Form */}
          <div className="lg:col-span-2 space-y-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Customer Information */}
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-8 uppercase tracking-wider text-sm flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-red-600" />
                  Customer Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Full Name</label>
                    <input
                      required
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="John Doe"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-red-500 outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Phone Number</label>
                    <input
                      required
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-red-500 outline-none transition-all"
                    />
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Email Address</label>
                    <input
                      required
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="john@example.com"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-red-500 outline-none transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-8 uppercase tracking-wider text-sm flex items-center gap-2">
                  <Truck className="w-5 h-5 text-red-600" />
                  Shipping Address
                </h2>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Street Address</label>
                    <input
                      required
                      type="text"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      placeholder="123 Firework Lane"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-red-500 outline-none transition-all"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-700">City</label>
                      <input
                        required
                        type="text"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        placeholder="Sivakasi"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-red-500 outline-none transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-700">State</label>
                      <input
                        required
                        type="text"
                        value={formData.state}
                        onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                        placeholder="Tamil Nadu"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-red-500 outline-none transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-700">Pincode</label>
                      <input
                        required
                        type="text"
                        value={formData.pincode}
                        onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                        placeholder="626123"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-red-500 outline-none transition-all"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSendingEmail}
                className={`w-full py-5 rounded-2xl font-bold text-xl transition-all shadow-xl flex items-center justify-center gap-3 ${
                  isSendingEmail 
                    ? 'bg-gray-400 cursor-not-allowed text-white' 
                    : 'bg-red-600 text-white hover:bg-red-700'
                }`}
              >
                {isSendingEmail ? (
                  <>Processing Order... <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /></>
                ) : (
                  <>Place Order Now <CheckCircle2 className="w-6 h-6" /></>
                )}
              </button>
            </form>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 sticky top-28">
              <h2 className="text-xl font-bold text-gray-900 mb-8 uppercase tracking-wider text-sm flex items-center gap-2">
                <Package className="w-5 h-5 text-red-600" />
                Order Summary
              </h2>
              <div className="space-y-4 mb-8 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between items-center text-sm">
                    <div className="flex items-center gap-3">
                      <span className="w-5 h-5 bg-gray-100 rounded flex items-center justify-center text-[10px] font-bold text-gray-600">
                        {item.quantity}x
                      </span>
                      <span className="text-gray-700 font-medium">{item.name}</span>
                    </div>
                    <span className="font-bold text-gray-900">₹{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>
              <div className="space-y-4 pt-6 border-t border-gray-100">
                <div className="flex justify-between text-gray-600 text-sm">
                  <span>Subtotal</span>
                  <span className="font-semibold text-gray-900">₹{totalAmount}</span>
                </div>
                <div className="flex justify-between text-gray-600 text-sm">
                  <span>Tax (GST 12%)</span>
                  <span className="font-semibold text-gray-900">₹{(totalAmount * 0.12).toFixed(2)}</span>
                </div>
                <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
                  <span className="text-lg font-bold text-gray-900">Total Amount</span>
                  <span className="text-2xl font-bold text-red-600">₹{(totalAmount * 1.12).toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #ddd;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #ccc;
        }
      `}</style>
    </div>
  );
};

export default Checkout;
