import React from 'react';
import { Download, FileText, Search, Tag, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { priceListData, downloadPriceListPDF } from '../services/pdfService';

const PriceList: React.FC = () => {
  const handleDownloadPDF = () => {
    downloadPriceListPDF();
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-red-100 text-red-600 px-4 py-2 rounded-full text-sm font-bold mb-4"
          >
            <Sparkles className="w-4 h-4" />
            <span>2024 Festival Season</span>
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Our Price List</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our wide range of premium crackers at the most genuine prices. Download the full PDF for offline viewing.
          </p>
        </div>

        {/* Search and Download Bar */}
        <div className="flex flex-col md:flex-row gap-6 mb-12 items-center justify-between bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Search for crackers..." 
              className="w-full pl-12 pr-4 py-3 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-red-500 outline-none transition-all"
            />
          </div>
          <button 
            onClick={handleDownloadPDF}
            className="w-full md:w-auto flex items-center justify-center gap-3 bg-red-600 text-white px-8 py-3 rounded-2xl font-bold hover:bg-red-700 transition-all shadow-lg shadow-red-600/20"
          >
            <Download className="w-5 h-5" /> Download PDF Price List
          </button>
        </div>

        {/* Price List Table */}
        <div className="space-y-12">
          {priceListData.map((section, idx) => (
            <motion.div
              key={section.category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden"
            >
              <div className="bg-gray-900 px-8 py-6 flex items-center justify-between">
                <h2 className="text-xl font-bold text-white uppercase tracking-wider">{section.category}</h2>
                <Tag className="text-red-500 w-6 h-6" />
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-gray-100">
                      <th className="px-8 py-4 text-sm font-bold text-gray-400 uppercase tracking-wider">Product Name</th>
                      <th className="px-8 py-4 text-sm font-bold text-gray-400 uppercase tracking-wider">Unit</th>
                      <th className="px-8 py-4 text-sm font-bold text-gray-400 uppercase tracking-wider text-right">Price</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {section.items.map((item) => (
                      <tr key={item.name} className="hover:bg-gray-50 transition-colors">
                        <td className="px-8 py-5 font-bold text-gray-900">{item.name}</td>
                        <td className="px-8 py-5 text-gray-600 font-medium">{item.unit}</td>
                        <td className="px-8 py-5 text-right font-black text-red-600 text-lg">{item.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Note */}
        <div className="mt-16 bg-blue-50 rounded-3xl p-8 border border-blue-100">
          <div className="flex items-start gap-4">
            <div className="bg-blue-600 p-2 rounded-xl text-white">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-blue-900 mb-2">Important Note</h3>
              <p className="text-blue-800/80 leading-relaxed">
                Prices are subject to change based on market availability. For bulk orders and wholesale enquiries, please contact our sales team directly through WhatsApp or Call.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriceList;
