import React from 'react';
import { Mail, Phone, MapPin, Send, Clock, MessageSquare } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">Get in Touch</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Have questions about our products or need help with your order? We're here to help you 24/7.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Info Cards */}
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex items-start gap-6 group hover:shadow-md transition-shadow">
              <div className="bg-red-100 p-4 rounded-2xl text-red-600 group-hover:bg-red-600 group-hover:text-white transition-colors">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-lg mb-1">Call Us</h3>
                <p className="text-gray-600 text-sm mb-2">Mon-Sun, 9am to 9pm</p>
                <p className="text-red-600 font-bold">+91 8428470009</p>
              </div>
            </div>
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex items-start gap-6 group hover:shadow-md transition-shadow">
              <div className="bg-red-100 p-4 rounded-2xl text-red-600 group-hover:bg-red-600 group-hover:text-white transition-colors">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-lg mb-1">Email Us</h3>
                <p className="text-gray-600 text-sm mb-2">We'll respond within 24 hours</p>
                <p className="text-red-600 font-bold">crackers@gmail.com</p>
              </div>
            </div>
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex items-start gap-6 group hover:shadow-md transition-shadow">
              <div className="bg-red-100 p-4 rounded-2xl text-red-600 group-hover:bg-red-600 group-hover:text-white transition-colors">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-lg mb-1">Visit Us</h3>
                <p className="text-gray-600 text-sm mb-2">Our main warehouse</p>
                <p className="text-red-600 font-bold">426/1 ss street vrirudhunagar, Tamilnadu</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white p-10 rounded-3xl shadow-xl border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                <MessageSquare className="w-6 h-6 text-red-600" />
                Send us a Message
              </h2>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Full Name</label>
                    <input
                      required
                      type="text"
                      placeholder="John Doe"
                      className="w-full px-4 py-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-red-500 outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Email Address</label>
                    <input
                      required
                      type="email"
                      placeholder="john@example.com"
                      className="w-full px-4 py-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-red-500 outline-none transition-all"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Subject</label>
                  <input
                    required
                    type="text"
                    placeholder="How can we help?"
                    className="w-full px-4 py-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-red-500 outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Message</label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Write your message here..."
                    className="w-full px-4 py-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-red-500 outline-none transition-all resize-none"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-red-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-red-700 transition-all shadow-xl flex items-center justify-center gap-3"
                >
                  Send Message <Send className="w-5 h-5" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
