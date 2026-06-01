import React, { useState } from 'react';
import { Search, Eye, Edit2, Download, ChevronDown, Filter, FileText, Calendar, Trash2, MessageCircle, X, User, DollarSign, CheckCircle2 } from 'lucide-react';
import { useBilling, Bill } from '../../context/BillingContext';
import { motion, AnimatePresence } from 'motion/react';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

const AdminBilling: React.FC = () => {
  const { bills, deleteBill, updateBillStatus, updateBill } = useBilling();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDate, setFilterDate] = useState('');
  const [selectedBill, setSelectedBill] = useState<Bill | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editFormData, setEditFormData] = useState<Partial<Bill>>({});

  const filteredBills = bills.filter(bill => {
    const matchesSearch = bill.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         bill.customer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDate = filterDate === '' || bill.date === filterDate;
    return matchesSearch && matchesDate;
  });

  const handleDelete = (id: string) => {
    if (window.confirm(`Are you sure you want to move invoice ${id} to trash?`)) {
      deleteBill(id);
    }
  };

  const handleWhatsAppShare = (bill: any) => {
    const message = `*Crackers - Invoice Details*%0A%0A` +
                    `*Invoice ID:* ${bill.id}%0A` +
                    `*Date:* ${bill.date}%0A` +
                    `*Customer:* ${bill.customer}%0A` +
                    `*Amount:* ${bill.amount}%0A` +
                    `*Status:* ${bill.status}%0A%0A` +
                    `Thank you for shopping with us! ✨`;
    
    window.open(`https://wa.me/?text=${message}`, '_blank');
  };

  const handleDownloadInvoice = (bill: Bill) => {
    console.log('Downloading invoice for bill:', bill.id);
    const doc = new jsPDF();
    
    // Add header
    doc.setFontSize(22);
    doc.setTextColor(220, 38, 38); // Red-600
    doc.text('CRACKERS MART', 105, 20, { align: 'center' });
    
    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0);
    doc.text('INVOICE', 105, 30, { align: 'center' });
    
    // Add info
    doc.setFontSize(10);
    doc.text(`Invoice ID: ${bill.id}`, 20, 50);
    doc.text(`Date: ${bill.date}`, 20, 55);
    doc.text(`Status: ${bill.status}`, 20, 60);
    
    doc.text('BILL TO:', 20, 75);
    doc.setFontSize(12);
    doc.text(bill.customer, 20, 82);
    
    // Add table
    autoTable(doc, {
      startY: 100,
      head: [['Description', 'Amount']],
      body: [
        ['Purchase of Crackers', bill.amount]
      ],
      theme: 'striped',
      headStyles: { fillColor: [220, 38, 38] }
    });
    
    const finalY = (doc as any).lastAutoTable?.finalY || 120;
    
    doc.setFontSize(14);
    doc.text(`Total Amount: ${bill.amount}`, 190, finalY + 20, { align: 'right' });
    
    doc.setFontSize(10);
    doc.text('Thank you for your business!', 105, finalY + 40, { align: 'center' });
    
    doc.save(`Invoice-${bill.id}.pdf`);
  };

  const handleViewInvoice = (bill: Bill) => {
    setSelectedBill(bill);
    setIsViewModalOpen(true);
  };

  const handleEditInvoice = (bill: Bill) => {
    setSelectedBill(bill);
    setEditFormData({ ...bill });
    setIsEditModalOpen(true);
  };

  const handleUpdateInvoice = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedBill) {
      updateBill(selectedBill.id, editFormData);
      setIsEditModalOpen(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Billing & Invoices</h1>
        <div className="flex flex-wrap items-center gap-4 w-full md:w-auto">
          <div className="relative flex-grow md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search invoices..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-white border border-gray-200 focus:ring-2 focus:ring-red-500 outline-none transition-all text-sm"
            />
          </div>
          <div className="relative flex-grow md:w-48">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="date"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-white border border-gray-200 focus:ring-2 focus:ring-red-500 outline-none transition-all text-sm"
            />
          </div>
          {filterDate && (
            <button 
              onClick={() => setFilterDate('')}
              className="text-xs font-bold text-red-600 hover:text-red-700 underline"
            >
              Clear Date
            </button>
          )}
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 text-xs text-gray-400 uppercase tracking-widest border-b border-gray-100">
                <th className="px-8 py-5 font-semibold">Invoice ID</th>
                <th className="px-8 py-5 font-semibold">Date</th>
                <th className="px-8 py-5 font-semibold">Customer</th>
                <th className="px-8 py-5 font-semibold">Amount</th>
                <th className="px-8 py-5 font-semibold">Status</th>
                <th className="px-8 py-5 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-gray-50">
              {filteredBills.length > 0 ? (
                filteredBills.map((bill, i) => (
                  <tr key={i} className="hover:bg-gray-50 transition-colors group">
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-3">
                        <div className="bg-red-100 p-2 rounded-lg text-red-600">
                          <FileText className="w-4 h-4" />
                        </div>
                        <span className="font-bold text-gray-900">{bill.id}</span>
                      </div>
                    </td>
                    <td className="px-8 py-5 text-gray-500">{bill.date}</td>
                    <td className="px-8 py-5 font-semibold text-gray-900">{bill.customer}</td>
                    <td className="px-8 py-5 font-bold text-gray-900">{bill.amount}</td>
                    <td className="px-8 py-5">
                      <div className="relative inline-block group/status">
                        <button className={`flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all ${
                          bill.status === 'Paid' ? 'bg-green-100 text-green-600' :
                          bill.status === 'Pending' ? 'bg-yellow-100 text-yellow-600' : 'bg-red-100 text-red-600'
                        }`}>
                          {bill.status}
                          <ChevronDown className="w-3 h-3" />
                        </button>
                        <div className="absolute top-full left-0 mt-2 w-32 bg-white rounded-xl shadow-xl border border-gray-100 py-2 hidden group-hover/status:block z-20">
                          {['Paid', 'Pending', 'Overdue'].map((status) => (
                            <button 
                              key={status} 
                              onClick={() => updateBillStatus(bill.id, status)}
                              className="w-full text-left px-4 py-2 text-xs font-bold text-gray-600 hover:bg-gray-50 hover:text-red-600 transition-colors"
                            >
                              {status}
                            </button>
                          ))}
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-5 text-right">
                      <div className="flex justify-end gap-2">
                        <button 
                          onClick={() => handleWhatsAppShare(bill)}
                          className="p-2 hover:bg-green-50 text-green-600 rounded-lg transition-colors" 
                          title="Share on WhatsApp"
                        >
                          <MessageCircle className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleViewInvoice(bill)}
                          className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-colors" 
                          title="View Invoice"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleEditInvoice(bill)}
                          className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg transition-colors" 
                          title="Edit Invoice"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDownloadInvoice(bill)}
                          className="p-2 hover:bg-green-50 text-green-600 rounded-lg transition-colors" 
                          title="Download PDF"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDelete(bill.id)}
                          className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-colors" 
                          title="Move to Trash"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-8 py-10 text-center text-gray-500 font-medium">
                    No invoices found for the selected criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* View Invoice Modal */}
      <AnimatePresence>
        {isViewModalOpen && selectedBill && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white w-full max-w-lg rounded-[2.5rem] overflow-hidden shadow-2xl"
            >
              <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                <div className="flex items-center gap-3">
                  <div className="bg-red-100 p-2 rounded-xl text-red-600">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Invoice Details</h2>
                    <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">{selectedBill.id}</p>
                  </div>
                </div>
                <button onClick={() => setIsViewModalOpen(false)} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
                  <X className="w-6 h-6 text-gray-500" />
                </button>
              </div>
              
              <div className="p-8 space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Customer</label>
                    <div className="flex items-center gap-2 text-gray-900 font-bold">
                      <User className="w-4 h-4 text-gray-400" />
                      {selectedBill.customer}
                    </div>
                  </div>
                  <div className="space-y-1 text-right">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Date</label>
                    <div className="flex items-center justify-end gap-2 text-gray-900 font-bold">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      {selectedBill.date}
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-2xl space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-500">Status</span>
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      selectedBill.status === 'Paid' ? 'bg-green-100 text-green-600' :
                      selectedBill.status === 'Pending' ? 'bg-yellow-100 text-yellow-600' : 'bg-red-100 text-red-600'
                    }`}>
                      {selectedBill.status}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                    <span className="text-lg font-bold text-gray-900">Total Amount</span>
                    <span className="text-2xl font-black text-red-600">{selectedBill.amount}</span>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button 
                    onClick={() => handleDownloadInvoice(selectedBill)}
                    className="flex-1 bg-red-600 text-white py-4 rounded-2xl font-bold hover:bg-red-700 transition-all flex items-center justify-center gap-2"
                  >
                    <Download className="w-5 h-5" /> Download
                  </button>
                  <button 
                    onClick={() => handleWhatsAppShare(selectedBill)}
                    className="flex-1 bg-green-600 text-white py-4 rounded-2xl font-bold hover:bg-green-700 transition-all flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-5 h-5" /> Share
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Edit Invoice Modal */}
      <AnimatePresence>
        {isEditModalOpen && selectedBill && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white w-full max-w-lg rounded-[2.5rem] overflow-hidden shadow-2xl"
            >
              <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                <h2 className="text-xl font-bold text-gray-900">Edit Invoice</h2>
                <button onClick={() => setIsEditModalOpen(false)} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
                  <X className="w-6 h-6 text-gray-500" />
                </button>
              </div>
              
              <form onSubmit={handleUpdateInvoice} className="p-8 space-y-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Customer Name</label>
                    <input 
                      type="text"
                      value={editFormData.customer || ''}
                      onChange={(e) => setEditFormData({ ...editFormData, customer: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:ring-2 focus:ring-red-500 outline-none transition-all font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Amount</label>
                    <input 
                      type="text"
                      value={editFormData.amount || ''}
                      onChange={(e) => setEditFormData({ ...editFormData, amount: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:ring-2 focus:ring-red-500 outline-none transition-all font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Status</label>
                    <select 
                      value={editFormData.status || ''}
                      onChange={(e) => setEditFormData({ ...editFormData, status: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:ring-2 focus:ring-red-500 outline-none transition-all font-bold"
                    >
                      <option value="Paid">Paid</option>
                      <option value="Pending">Pending</option>
                      <option value="Overdue">Overdue</option>
                    </select>
                  </div>
                </div>

                <button 
                  type="submit"
                  className="w-full bg-red-600 text-white py-4 rounded-2xl font-bold hover:bg-red-700 transition-all shadow-lg shadow-red-600/20"
                >
                  Save Changes
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminBilling;
