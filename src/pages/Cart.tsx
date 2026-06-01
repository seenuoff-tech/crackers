import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, ChevronLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Cart: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, totalAmount } = useCart();

  if (cart.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
        <div className="bg-red-50 p-8 rounded-full mb-8">
          <ShoppingBag className="w-16 h-16 text-red-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4 tracking-tight">Your cart is empty</h1>
        <p className="text-gray-600 mb-10 max-w-md">Looks like you haven't added any crackers to your cart yet. Start shopping to light up your celebrations!</p>
        <Link
          to="/shop"
          className="bg-red-600 text-white px-10 py-4 rounded-full text-lg font-bold hover:bg-red-700 transition-all shadow-xl flex items-center gap-2"
        >
          Explore Shop <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 mb-12">
          <Link to="/shop" className="p-2 hover:bg-gray-200 rounded-full transition-colors">
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 tracking-tight">Shopping Cart</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Cart Items List */}
          <div className="lg:col-span-2 space-y-6">
            {cart.map((item) => (
              <div key={item.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col sm:flex-row items-center gap-6 group hover:shadow-md transition-shadow">
                <div className="w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden bg-gray-100">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="flex-grow text-center sm:text-left">
                  <h3 className="font-bold text-gray-900 text-lg mb-1">{item.name}</h3>
                  <p className="text-gray-500 text-sm mb-2">
                    {item.productNumber ? `#${item.productNumber} - ${item.category}` : item.category}
                  </p>
                  <p className="text-red-600 font-bold">₹{item.price}</p>
                </div>
                <div className="flex items-center gap-4 bg-gray-50 p-2 rounded-xl border border-gray-200">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="p-1 hover:bg-white hover:shadow-sm rounded-lg transition-all text-gray-600"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="font-bold text-gray-900 w-8 text-center">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="p-1 hover:bg-white hover:shadow-sm rounded-lg transition-all text-gray-600"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <div className="text-right min-w-[100px]">
                  <p className="font-bold text-gray-900 text-lg mb-2">₹{item.price * item.quantity}</p>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-full transition-all"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 sticky top-28">
              <h2 className="text-xl font-bold text-gray-900 mb-8 uppercase tracking-wider text-sm">Order Summary</h2>
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-semibold text-gray-900">₹{totalAmount}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="text-green-600 font-semibold uppercase text-xs">Free</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax (GST 12%)</span>
                  <span className="font-semibold text-gray-900">₹{(totalAmount * 0.12).toFixed(2)}</span>
                </div>
                <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
                  <span className="text-lg font-bold text-gray-900">Total Amount</span>
                  <span className="text-2xl font-bold text-red-600">₹{(totalAmount * 1.12).toFixed(2)}</span>
                </div>
              </div>
              <Link
                to="/checkout"
                className="w-full bg-gray-900 text-white py-4 rounded-xl font-bold hover:bg-red-600 transition-all flex items-center justify-center gap-2 shadow-xl"
              >
                Proceed to Checkout <ArrowRight className="w-5 h-5" />
              </Link>
              <p className="text-center text-gray-400 text-xs mt-6">Secure checkout powered by Crackers</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
