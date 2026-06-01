import React from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, Phone, Star, ShoppingCart, Download } from 'lucide-react';
import { downloadPriceListPDF } from '../services/pdfService';

const FloatingButtons: React.FC = () => {
  return (
    <>
      {/* Left Side: Google Review Badge */}
      <div className="fixed left-0 top-1/2 -translate-y-1/2 z-40 hidden md:block">
        <div className="bg-white p-3 rounded-r-2xl shadow-xl border border-gray-100 flex items-center gap-3 transform -translate-x-1 hover:translate-x-0 transition-transform cursor-pointer">
          <div className="bg-white shadow-sm border border-gray-100 p-1 rounded-lg">
            <img 
              src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png" 
              alt="Google" 
              className="h-4 object-contain"
              referrerPolicy="no-referrer"
            />
          </div>
          <div>
            <div className="flex items-center gap-1">
              <span className="text-sm font-bold text-gray-900">4.9</span>
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-current" />)}
              </div>
            </div>
            <p className="text-[10px] text-gray-500 font-medium">74 reviews</p>
          </div>
        </div>
      </div>

      {/* Right Side: Price List Badge */}
      <div className="fixed right-0 top-1/2 -translate-y-1/2 z-40">
        <button 
          onClick={downloadPriceListPDF}
          className="bg-red-600 text-white py-4 px-2 rounded-l-2xl shadow-xl flex flex-col items-center gap-1 group cursor-pointer hover:bg-red-700 transition-colors w-10"
        >
          <div className="flex flex-col items-center">
            <span className="text-[10px] font-bold uppercase tracking-tighter [writing-mode:vertical-rl] rotate-180">Price</span>
            <span className="text-[10px] font-bold uppercase tracking-tighter [writing-mode:vertical-rl] rotate-180">List</span>
          </div>
          
          {/* Ribbon effect */}
          <div className="absolute -bottom-2 right-0 w-full h-2 bg-red-800 rounded-bl-lg -z-10" />
        </button>
      </div>

      {/* Bottom Left: WhatsApp Button */}
      <div className="fixed bottom-6 left-6 z-40">
        <a
          href="https://wa.me/918428470009"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#25D366] text-white p-3 rounded-full shadow-2xl hover:bg-[#128C7E] transition-all hover:scale-110 flex items-center justify-center group relative border-4 border-white"
        >
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" 
            alt="WhatsApp" 
            className="w-8 h-8"
            referrerPolicy="no-referrer"
          />
          <span className="absolute left-full ml-4 bg-gray-900 text-white text-[10px] font-bold uppercase tracking-widest py-2 px-3 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-xl">
            Chat on WhatsApp
          </span>
        </a>
      </div>

      {/* Bottom Right: Call Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <a
          href="tel:+918428470009"
          className="bg-red-600 text-white p-4 rounded-full shadow-lg hover:bg-red-700 transition-all hover:scale-110 flex items-center justify-center group relative"
        >
          <Phone className="w-6 h-6" />
          <span className="absolute right-full mr-3 bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Call us now
          </span>
        </a>
      </div>
    </>
  );
};

export default FloatingButtons;
