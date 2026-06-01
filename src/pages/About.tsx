import React from 'react';
import { ShieldCheck, Zap, Star, Users, History, Award } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-24 bg-gray-900 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://images.unsplash.com/photo-1467810563316-b5476525c0f9?q=80&w=1920&blur=2"
            alt="About Background"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">Our Story</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            From a small shop in Sivakasi to India's leading online fireworks destination, we've been lighting up celebrations for over three decades.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="inline-block bg-red-100 text-red-600 px-4 py-1 rounded-full text-sm font-bold uppercase tracking-widest">
                Our Mission
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                To provide safe, high-quality, and vibrant fireworks that create lasting memories.
              </h2>
              <p className="text-gray-600 leading-relaxed">
                We believe that every celebration deserves to be special. Our commitment to safety and innovation drives us to source only the most reliable and spectacular crackers from the best manufacturers in Sivakasi.
              </p>
              <div className="grid grid-cols-2 gap-8 pt-4">
                <div>
                  <div className="text-3xl font-bold text-red-600 mb-1">30+</div>
                  <div className="text-sm text-gray-500 uppercase tracking-wider font-semibold">Years Experience</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-red-600 mb-1">1M+</div>
                  <div className="text-sm text-gray-500 uppercase tracking-wider font-semibold">Happy Customers</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1533230393619-bcad81548223?auto=format&fit=crop&q=80&w=800&h=800"
                  alt="Crackers Shop"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-8 -left-8 bg-white p-8 rounded-2xl shadow-xl border border-gray-100 hidden lg:block">
                <div className="flex items-center gap-4">
                  <div className="bg-red-600 p-3 rounded-xl text-white">
                    <Award className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">Certified Safe</div>
                    <div className="text-sm text-gray-500">ISO 9001:2015 Registered</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <div className="w-24 h-1 bg-red-600 mx-auto rounded-full" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { icon: <ShieldCheck className="w-12 h-12" />, title: 'Safety First', desc: 'We never compromise on the safety of our products or our customers.' },
              { icon: <Users className="w-12 h-12" />, title: 'Customer Centric', desc: 'Your satisfaction and joy are the primary goals of our business.' },
              { icon: <Zap className="w-12 h-12" />, title: 'Innovation', desc: 'Constantly bringing new and exciting patterns to the night sky.' },
            ].map((value, i) => (
              <div key={i} className="text-center space-y-4">
                <div className="text-red-600 flex justify-center">{value.icon}</div>
                <h3 className="text-xl font-bold text-gray-900">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
