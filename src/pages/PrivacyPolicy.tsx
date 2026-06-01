import React from 'react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-white p-12 rounded-3xl shadow-sm border border-gray-100">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 tracking-tight">Privacy Policy</h1>
        <div className="space-y-8 text-gray-600 leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Information We Collect</h2>
            <p>We collect information you provide directly to us when you create an account, make a purchase, or contact us for support. This may include your name, email address, phone number, and shipping address.</p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. How We Use Your Information</h2>
            <p>We use the information we collect to process your orders, provide customer support, and send you updates about our products and promotions. We do not sell your personal information to third parties.</p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Data Security</h2>
            <p>We implement a variety of security measures to maintain the safety of your personal information. Your sensitive information is transmitted via Secure Socket Layer (SSL) technology and then encrypted into our payment gateway providers database.</p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Cookies</h2>
            <p>We use cookies to help us remember and process the items in your shopping cart and understand and save your preferences for future visits.</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
