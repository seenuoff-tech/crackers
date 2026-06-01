import React from 'react';

const Terms: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-white p-12 rounded-3xl shadow-sm border border-gray-100">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 tracking-tight">Terms & Conditions</h1>
        <div className="space-y-8 text-gray-600 leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
            <p>By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.</p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Safety Warning</h2>
            <p>Fireworks are inherently dangerous. By purchasing from Crackers, you agree to follow all safety instructions provided with the products and use them only as intended. We are not liable for any injuries or damages resulting from misuse.</p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Age Restriction</h2>
            <p>You must be at least 18 years of age to purchase fireworks from this website. By placing an order, you represent that you are of legal age.</p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Shipping & Delivery</h2>
            <p>Delivery times may vary based on your location and local regulations regarding the transport of fireworks. We only ship to areas where fireworks are legal.</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Terms;
