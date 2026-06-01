import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-red-600 text-white pt-16 pb-12 relative overflow-hidden">
      {/* Background Cracker Illustrations (Decorative) */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <img 
          src="https://picsum.photos/seed/fireworks-display/1920/1080?blur=5" 
          alt="Background" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start mb-16">
          
          {/* Left Column: Profile & Quick Links */}
          <div className="space-y-10">
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">Our Profile</h3>
              <p className="text-sm leading-relaxed font-medium">
                We "Spark Star Crackers" acknowledged as the renowned super stockist & wholesale supplier of an exclusive range of firecrackers.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-white mb-6">Quick Links</h3>
              <div className="flex flex-wrap gap-2">
                {[
                  { name: 'Home', path: '/' },
                  { name: 'About', path: '/about' },
                  { name: 'Shop', path: '/shop' },
                  { name: 'Contact', path: '/contact' },
                  { name: 'Privacy Policy', path: '/privacy-policy' },
                  { name: 'Terms & Conditions', path: '/terms' },
                  { name: 'Admin', path: '/admin-dashboard/dashboard' },
                ].map((link) => (
                  <Link 
                    key={link.name}
                    to={link.path}
                    className="bg-white text-red-600 px-4 py-2 rounded-lg text-xs font-bold italic hover:bg-gray-100 transition-colors shadow-md"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Center Column: Logo */}
          <div className="flex flex-col items-center justify-center text-center py-8">
            <div className="relative">
              <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-48 h-48 bg-red-500/10 rounded-full blur-3xl" />
              <img 
                src="https://picsum.photos/seed/sivakasi-fireworks-logo/300/150" 
                alt="Spark Star Logo" 
                className="h-32 object-contain mb-4 relative z-10"
                referrerPolicy="no-referrer"
              />
              <div className="text-gray-900 font-black text-3xl tracking-tighter italic uppercase">
                Spark Star
              </div>
              <div className="text-white font-bold text-[10px] tracking-[0.3em] uppercase mt-1">
                Celebrate Loud Celebrate Bright
              </div>
            </div>
          </div>

          {/* Right Column: Location & Order */}
          <div className="space-y-10 lg:pl-12">
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">Our Location</h3>
              <div className="flex items-start gap-4">
                <div className="bg-white p-2 rounded-lg text-red-600 mt-1">
                  <MapPin className="w-4 h-4" />
                </div>
                <p className="text-sm font-medium leading-relaxed">
                  426/1 ss street vrirudhunagar,<br />
                  Tamilnadu
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-white mb-6">For Order</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="bg-white p-2 rounded-lg text-red-600">
                    <Phone className="w-4 h-4" />
                  </div>
                  <span className="font-bold text-white">(+91) 8428470009</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-white p-2 rounded-lg text-red-600">
                    <Mail className="w-4 h-4" />
                  </div>
                  <span className="font-bold text-white">crackers@gmail.com</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Disclaimer Text */}
        <div className="max-w-5xl mx-auto text-center border-t border-white/20 pt-12">
          <p className="text-[13px] text-white/80 leading-relaxed font-medium">
            As per 2018 supreme court order, online sale of firecrackers are not permitted! We value our customers and at the same time, respect jurisdiction. 
            We request you to add your products to the cart and submit the required crackers through the enquiry button. 
            We will contact you within 24 hrs and confirm the order through WhatsApp or phone call. 
            Please add and submit your enquiries and enjoy your Diwali with Spark Star Crackers. 
            Our License No.----. Spark Star Crackers as a company following 100% legal & statutory compliances and all our shops, 
            go-downs are maintained as per the explosive acts. We send the parcels through registered and legal transport service providers as like every other major companies in Sivakasi is doing so.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
