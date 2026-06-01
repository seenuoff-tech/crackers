import React, { useState } from 'react';
import { Trash2, RotateCcw, Search, FileText, CheckCircle2 } from 'lucide-react';
import { useBilling } from '../../context/BillingContext';

const AdminTrash: React.FC = () => {
  const { trash, restoreBill, permanentlyDeleteBill, emptyTrash } = useBilling();
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const showNotification = (message: string, type: 'success' | 'error' = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleRestore = (id: string) => {
    restoreBill(id);
    showNotification(`Invoice ${id} has been restored successfully!`);
  };

  const handleDeletePermanently = (id: string) => {
    if (window.confirm(`Are you sure you want to permanently delete invoice ${id}? This action cannot be undone.`)) {
      permanentlyDeleteBill(id);
      showNotification(`Invoice ${id} deleted permanently.`, 'success');
    }
  };

  const handleEmptyTrash = () => {
    if (trash.length === 0) return;
    if (window.confirm('Are you sure you want to empty the trash? All items will be permanently deleted.')) {
      emptyTrash();
      showNotification('Trash emptied successfully.');
    }
  };

  const filteredBills = trash.filter(bill => 
    bill.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
    bill.customer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Trash Bin</h1>
          <p className="text-gray-500 text-sm mt-1">Items in trash will be permanently deleted after 30 days.</p>
        </div>
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative flex-grow md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search trash..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-white border border-gray-200 focus:ring-2 focus:ring-red-500 outline-none transition-all text-sm"
            />
          </div>
          <button 
            onClick={handleEmptyTrash}
            disabled={trash.length === 0}
            className="bg-red-600 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-red-700 transition-all flex items-center gap-2 shadow-lg shadow-red-600/20 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Trash2 className="w-4 h-4" /> Empty Trash
          </button>
        </div>
      </div>

      {notification && (
        <div className={`p-4 rounded-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4 ${
          notification.type === 'success' ? 'bg-green-50 border border-green-200 text-green-600' : 'bg-red-50 border border-red-200 text-red-600'
        }`}>
          <CheckCircle2 className="w-5 h-5" />
          {notification.message}
        </div>
      )}

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 text-xs text-gray-400 uppercase tracking-widest border-b border-gray-100">
                <th className="px-8 py-5 font-semibold">Invoice ID</th>
                <th className="px-8 py-5 font-semibold">Customer</th>
                <th className="px-8 py-5 font-semibold text-right">Amount</th>
                <th className="px-8 py-5 font-semibold">Deleted At</th>
                <th className="px-8 py-5 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-gray-50">
              {filteredBills.map((bill, i) => (
                <tr key={i} className="hover:bg-gray-50 transition-colors group">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-3">
                      <div className="bg-gray-100 p-2 rounded-lg text-gray-400">
                        <FileText className="w-4 h-4" />
                      </div>
                      <span className="font-bold text-gray-400">{bill.id}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5 font-semibold text-gray-900">{bill.customer}</td>
                  <td className="px-8 py-5 font-bold text-gray-900 text-right">{bill.amount}</td>
                  <td className="px-8 py-5 text-gray-500">{bill.deletedAt}</td>
                  <td className="px-8 py-5 text-right">
                    <div className="flex justify-end gap-2">
                      <button 
                        onClick={() => handleRestore(bill.id)}
                        className="p-2 hover:bg-green-50 text-green-600 rounded-lg transition-colors flex items-center gap-2 font-bold text-xs" 
                        title="Restore Item"
                      >
                        <RotateCcw className="w-4 h-4" /> Restore
                      </button>
                      <button 
                        onClick={() => handleDeletePermanently(bill.id)}
                        className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-colors" 
                        title="Delete Permanently"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredBills.length === 0 && (
          <div className="py-20 text-center">
            <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trash2 className="w-8 h-8 text-gray-300" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">Trash is empty</h3>
            <p className="text-gray-500 text-sm">No deleted items found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminTrash;
