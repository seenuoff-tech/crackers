import React from 'react';
import { Calendar, Download, Filter, TrendingUp, ArrowUpRight, BarChart } from 'lucide-react';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

const AdminSalesReport: React.FC = () => {
  const handleExport = () => {
    console.log('Exporting sales report...');
    const doc = new jsPDF();
    
    // Add header
    doc.setFontSize(22);
    doc.setTextColor(220, 38, 38);
    doc.text('CRACKERS MART - SALES REPORT', 105, 20, { align: 'center' });
    
    doc.setFontSize(12);
    doc.setTextColor(100, 100, 100);
    doc.text('Period: Mar 01, 2024 - Mar 08, 2024', 105, 30, { align: 'center' });
    
    // Summary table
    autoTable(doc, {
      startY: 45,
      head: [['Metric', 'Value']],
      body: [
        ['Total Revenue', '₹4,85,200'],
        ['Average Order Value', '₹1,850'],
        ['Total Orders', '262']
      ],
      theme: 'grid',
      headStyles: { fillColor: [220, 38, 38] }
    });
    
    // Category breakdown table
    autoTable(doc, {
      startY: ((doc as any).lastAutoTable?.finalY || 60) + 15,
      head: [['Category', 'Percentage']],
      body: [
        ['Sparklers', '35%'],
        ['Sky Shots', '25%'],
        ['Flower Pots', '20%'],
        ['Others', '20%']
      ],
      theme: 'striped',
      headStyles: { fillColor: [50, 50, 50] }
    });
    
    doc.setFontSize(10);
    const finalY = (doc as any).lastAutoTable?.finalY || 150;
    doc.text(`Generated on: ${new Date().toLocaleString()}`, 20, finalY + 20);
    
    doc.save(`Sales-Report-${new Date().toISOString().split('T')[0]}.pdf`);
  };

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Sales Report</h1>
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-gray-200 text-sm font-medium text-gray-600">
            <Calendar className="w-4 h-4 text-red-600" />
            <span>Mar 01, 2024 - Mar 08, 2024</span>
          </div>
          <button 
            onClick={handleExport}
            className="bg-red-600 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-red-700 transition-all flex items-center gap-2 shadow-lg shadow-red-600/20"
          >
            <Download className="w-4 h-4" /> Export
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
          <div className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-2">Total Revenue</div>
          <div className="text-3xl font-bold text-gray-900 mb-4">₹4,85,200</div>
          <div className="flex items-center gap-2 text-green-600 text-xs font-bold">
            <ArrowUpRight className="w-4 h-4" /> +15.2% from last week
          </div>
        </div>
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
          <div className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-2">Average Order Value</div>
          <div className="text-3xl font-bold text-gray-900 mb-4">₹1,850</div>
          <div className="flex items-center gap-2 text-green-600 text-xs font-bold">
            <ArrowUpRight className="w-4 h-4" /> +5.4% from last week
          </div>
        </div>
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
          <div className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-2">Total Orders</div>
          <div className="text-3xl font-bold text-gray-900 mb-4">262</div>
          <div className="flex items-center gap-2 text-red-600 text-xs font-bold">
            <TrendingUp className="w-4 h-4" /> On track for target
          </div>
        </div>
      </div>

      {/* Report Visualization Placeholder */}
      <div className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100 min-h-[400px] flex flex-col items-center justify-center text-center">
        <div className="bg-gray-50 w-full flex-grow rounded-2xl flex items-center justify-center mb-8 border border-dashed border-gray-200">
          <BarChart className="w-16 h-16 text-gray-200" />
          <span className="ml-4 text-gray-400 font-bold text-xl uppercase tracking-widest">Sales Trend Analysis</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 w-full max-w-2xl">
          {[
            { label: 'Sparklers', value: '35%' },
            { label: 'Sky Shots', value: '25%' },
            { label: 'Flower Pots', value: '20%' },
            { label: 'Others', value: '20%' },
          ].map((cat, i) => (
            <div key={i}>
              <div className="text-2xl font-bold text-gray-900">{cat.value}</div>
              <div className="text-xs text-gray-400 font-bold uppercase tracking-wider">{cat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminSalesReport;
