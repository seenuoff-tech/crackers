import React, { useState, useEffect } from 'react';
import { Save, Building2, Mail, Phone, MapPin, CheckCircle2 } from 'lucide-react';

const AdminSettings: React.FC = () => {
  const [settings, setSettings] = useState({
    businessName: 'Crackers Pvt Ltd',
    gstNumber: '33AAAAA0000A1Z5',
    email: 'crackers@gmail.com',
    phone: '+91 8428470009',
    address: '426/1 ss street vrirudhunagar, Tamil Nadu - 626001, India',
    city: 'Virudhunagar',
    state: 'Tamil Nadu',
    country: 'India'
  });

  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const savedSettings = localStorage.getItem('adminBusinessSettings');
    if (savedSettings) {
      const parsed = JSON.parse(savedSettings);
      if (parsed.phone === '+91 98765 43210') {
        parsed.phone = '+91 8428470009';
        localStorage.setItem('adminBusinessSettings', JSON.stringify(parsed));
      }
      setSettings(parsed);
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem('adminBusinessSettings', JSON.stringify(settings));
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setSettings(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="max-w-4xl space-y-10">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Business Settings</h1>
          <p className="text-gray-500 mt-1">Manage your business profile and contact information</p>
        </div>
        <button 
          onClick={handleSave}
          className="bg-red-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-red-700 transition-all flex items-center gap-2 shadow-xl shadow-red-600/20 active:scale-95"
        >
          <Save className="w-5 h-5" /> Save Changes
        </button>
      </div>

      {isSaved && (
        <div className="bg-green-50 border border-green-200 text-green-600 p-4 rounded-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4">
          <CheckCircle2 className="w-5 h-5" />
          Settings saved successfully!
        </div>
      )}

      <div className="grid grid-cols-1 gap-8">
        {/* General Information */}
        <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 mb-8 flex items-center gap-3">
            <div className="bg-red-100 p-2 rounded-xl">
              <Building2 className="w-6 h-6 text-red-600" />
            </div>
            General Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Business Name</label>
              <input
                type="text"
                name="businessName"
                value={settings.businessName}
                onChange={handleChange}
                className="w-full px-5 py-4 rounded-2xl bg-gray-50 border border-transparent focus:bg-white focus:border-red-500 focus:ring-4 focus:ring-red-500/10 outline-none transition-all font-semibold text-gray-900"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">GST Number</label>
              <input
                type="text"
                name="gstNumber"
                value={settings.gstNumber}
                onChange={handleChange}
                className="w-full px-5 py-4 rounded-2xl bg-gray-50 border border-transparent focus:bg-white focus:border-red-500 focus:ring-4 focus:ring-red-500/10 outline-none transition-all font-semibold text-gray-900"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  name="email"
                  value={settings.email}
                  onChange={handleChange}
                  className="w-full pl-14 pr-5 py-4 rounded-2xl bg-gray-50 border border-transparent focus:bg-white focus:border-red-500 focus:ring-4 focus:ring-red-500/10 outline-none transition-all font-semibold text-gray-900"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Phone Number</label>
              <div className="relative">
                <Phone className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="tel"
                  name="phone"
                  value={settings.phone}
                  onChange={handleChange}
                  className="w-full pl-14 pr-5 py-4 rounded-2xl bg-gray-50 border border-transparent focus:bg-white focus:border-red-500 focus:ring-4 focus:ring-red-500/10 outline-none transition-all font-semibold text-gray-900"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Address Information */}
        <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 mb-8 flex items-center gap-3">
            <div className="bg-red-100 p-2 rounded-xl">
              <MapPin className="w-6 h-6 text-red-600" />
            </div>
            Business Address
          </h2>
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Full Address</label>
              <textarea
                rows={3}
                name="address"
                value={settings.address}
                onChange={handleChange}
                className="w-full px-5 py-4 rounded-2xl bg-gray-50 border border-transparent focus:bg-white focus:border-red-500 focus:ring-4 focus:ring-red-500/10 outline-none transition-all font-semibold text-gray-900 resize-none"
              ></textarea>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">City</label>
                <input
                  type="text"
                  name="city"
                  value={settings.city}
                  onChange={handleChange}
                  className="w-full px-5 py-4 rounded-2xl bg-gray-50 border border-transparent focus:bg-white focus:border-red-500 focus:ring-4 focus:ring-red-500/10 outline-none transition-all font-semibold text-gray-900"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">State</label>
                <input
                  type="text"
                  name="state"
                  value={settings.state}
                  onChange={handleChange}
                  className="w-full px-5 py-4 rounded-2xl bg-gray-50 border border-transparent focus:bg-white focus:border-red-500 focus:ring-4 focus:ring-red-500/10 outline-none transition-all font-semibold text-gray-900"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Country</label>
                <input
                  type="text"
                  name="country"
                  value={settings.country}
                  onChange={handleChange}
                  className="w-full px-5 py-4 rounded-2xl bg-gray-50 border border-transparent focus:bg-white focus:border-red-500 focus:ring-4 focus:ring-red-500/10 outline-none transition-all font-semibold text-gray-900"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
