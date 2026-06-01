import React, { useState } from 'react';
import { Search, Filter, MoreVertical, Eye, Download, Trash2, Calendar, ChevronDown, Mail, CheckCircle2, MessageCircle, X, Package, User, Phone, MapPin } from 'lucide-react';
import { useOrders, Order } from '../../context/OrderContext';
import { motion, AnimatePresence } from 'motion/react';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { sendOrderStatusEmail, getEmailLogs, EmailLog } from '../../services/EmailService';

const AdminOrders: React.FC = () => {
  const { orders, updateOrderStatus, deleteOrder } = useOrders();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDate, setFilterDate] = useState('');
  const [notification, setNotification] = useState<{ message: string; customer: string } | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEmailLogsOpen, setIsEmailLogsOpen] = useState(false);
  const [emailLogs, setEmailLogs] = useState<EmailLog[]>([]);
  const [activeStatusDropdown, setActiveStatusDropdown] = useState<string | null>(null);

  const handleOpenEmailLogs = () => {
    setEmailLogs(getEmailLogs());
    setIsEmailLogsOpen(true);
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         order.customer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDate = filterDate === '' || order.date === filterDate;
    return matchesSearch && matchesDate;
  });

  const handleStatusChange = async (id: string, newStatus: Order['status'], customerName: string, customerEmail: string) => {
    updateOrderStatus(id, newStatus);
    setActiveStatusDropdown(null);
    setNotification({
      message: `Order ${id} status updated to ${newStatus}.`,
      customer: `${customerName} (${customerEmail})`
    });
    
    // Send email notification
    try {
      await sendOrderStatusEmail(customerEmail, id, newStatus);
    } catch (error) {
      console.error('Failed to send status update email:', error);
    }

    setTimeout(() => setNotification(null), 5000);
  };

  const handleWhatsAppShare = (order: Order) => {
    const message = `*Crackers - Order Details*%0A%0A` +
                    `*Order ID:* ${order.id}%0A` +
                    `*Date:* ${order.date}%0A` +
                    `*Customer:* ${order.customer}%0A` +
                    `*Phone:* ${order.phone}%0A` +
                    `*Amount:* ${order.amount}%0A` +
                    `*Status:* ${order.status}%0A%0A` +
                    `We are processing your order! ✨`;
    
    window.open(`https://wa.me/${order.phone.replace(/\D/g, '')}?text=${message}`, '_blank');
  };

  const handleDeleteOrder = (id: string) => {
    if (window.confirm(`Are you sure you want to delete order ${id}?`)) {
      deleteOrder(id);
    }
  };

  const handleDownloadInvoice = (order: Order) => {
    console.log('Downloading invoice for order:', order.id);
    const doc = new jsPDF();
    
    // Add header
    doc.setFontSize(22);
    doc.setTextColor(220, 38, 38); // Red-600
    doc.text('CRACKERS MART', 105, 20, { align: 'center' });
    
    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0);
    doc.text('INVOICE', 105, 30, { align: 'center' });
    
    // Add order info
    doc.setFontSize(10);
    doc.text(`Order ID: ${order.id}`, 20, 50);
    doc.text(`Date: ${order.date}`, 20, 55);
    doc.text(`Status: ${order.status}`, 20, 60);
    
    // Add customer info
    doc.text('BILL TO:', 20, 75);
    doc.setFontSize(12);
    doc.text(order.customer, 20, 82);
    doc.setFontSize(10);
    doc.text(`Email: ${order.email}`, 20, 88);
    doc.text(`Phone: ${order.phone}`, 20, 94);
    
    // Add items table (placeholder since we don't have individual items in the order object yet)
    autoTable(doc, {
      startY: 110,
      head: [['Description', 'Quantity', 'Price', 'Total']],
      body: [
        ['Firecrackers Assorted Pack', '1', order.amount, order.amount]
      ],
      theme: 'striped',
      headStyles: { fillColor: [220, 38, 38] }
    });
    
    const finalY = (doc as any).lastAutoTable?.finalY || 130;
    
    doc.setFontSize(14);
    doc.text(`Total Amount: ${order.amount}`, 190, finalY + 20, { align: 'right' });
    
    doc.setFontSize(10);
    doc.text('Thank you for shopping with Crackers Mart!', 105, finalY + 40, { align: 'center' });
    
    doc.save(`Invoice-${order.id}.pdf`);
  };

  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order);
    setIsViewModalOpen(true);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Manage Orders</h1>
        <div className="flex flex-wrap items-center gap-4 w-full md:w-auto">
          <button 
            onClick={handleOpenEmailLogs}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 text-white font-bold text-sm hover:bg-blue-700 transition-all shadow-lg"
          >
            <Mail className="w-4 h-4" /> Email Logs
          </button>
          <div className="relative flex-grow md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search orders..."
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

      {notification && (
        <div className="bg-blue-50 border border-blue-200 p-4 rounded-2xl flex items-start gap-4 animate-in fade-in slide-in-from-top-4">
          <div className="bg-blue-100 p-2 rounded-xl text-blue-600">
            <Mail className="w-5 h-5" />
          </div>
          <div>
            <p className="text-blue-800 font-bold text-sm">{notification.message}</p>
            <p className="text-blue-600 text-xs mt-1 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> Confirmation email sent to {notification.customer}
            </p>
          </div>
        </div>
      )}

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 text-xs text-gray-400 uppercase tracking-widest border-b border-gray-100">
                <th className="px-8 py-5 font-semibold">Order ID</th>
                <th className="px-8 py-5 font-semibold">Date</th>
                <th className="px-8 py-5 font-semibold">Customer</th>
                <th className="px-8 py-5 font-semibold">Status</th>
                <th className="px-8 py-5 font-semibold">Amount</th>
                <th className="px-8 py-5 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-gray-50">
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order, i) => (
                  <tr key={i} className="hover:bg-gray-50 transition-colors group">
                    <td className="px-8 py-5 font-bold text-gray-900">{order.id}</td>
                    <td className="px-8 py-5 text-gray-500">{order.date}</td>
                    <td className="px-8 py-5">
                      <div className="font-semibold text-gray-900">{order.customer}</div>
                      <div className="text-xs text-gray-400">{order.phone}</div>
                    </td>
                    <td className="px-8 py-5">
                      <div className="relative inline-block">
                        <button 
                          onClick={() => setActiveStatusDropdown(activeStatusDropdown === order.id ? null : order.id)}
                          className={`flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all ${
                            order.status === 'Delivered' ? 'bg-green-100 text-green-600' :
                            order.status === 'Processing' ? 'bg-blue-100 text-blue-600' :
                            order.status === 'Cancelled' ? 'bg-red-100 text-red-600' : 
                            order.status === 'Shipped' ? 'bg-purple-100 text-purple-600' : 'bg-yellow-100 text-yellow-600'
                          }`}
                        >
                          {order.status}
                          <ChevronDown className={`w-3 h-3 transition-transform ${activeStatusDropdown === order.id ? 'rotate-180' : ''}`} />
                        </button>
                        
                        <AnimatePresence>
                          {activeStatusDropdown === order.id && (
                            <>
                              <div 
                                className="fixed inset-0 z-10" 
                                onClick={() => setActiveStatusDropdown(null)}
                              />
                              <motion.div 
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                className="absolute top-full left-0 mt-2 w-32 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-20"
                              >
                                {['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'].map((status) => (
                                  <button 
                                    key={status} 
                                    onClick={() => handleStatusChange(order.id, status as Order['status'], order.customer, order.email)}
                                    className={`w-full text-left px-4 py-2 text-xs font-bold transition-colors ${
                                      order.status === status ? 'text-red-600 bg-red-50' : 'text-gray-600 hover:bg-gray-50 hover:text-red-600'
                                    }`}
                                  >
                                    {status}
                                  </button>
                                ))}
                              </motion.div>
                            </>
                          )}
                        </AnimatePresence>
                      </div>
                    </td>
                    <td className="px-8 py-5 font-bold text-gray-900">{order.amount}</td>
                    <td className="px-8 py-5 text-right">
                      <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={() => handleWhatsAppShare(order)}
                          className="p-2 hover:bg-green-50 text-green-600 rounded-lg transition-colors" 
                          title="Share on WhatsApp"
                        >
                          <MessageCircle className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleViewOrder(order)}
                          className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-colors" 
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDownloadInvoice(order)}
                          className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg transition-colors" 
                          title="Download Invoice"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDeleteOrder(order.id)}
                          className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-colors" 
                          title="Delete Order"
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
                    No orders found for the selected criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="px-8 py-5 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
          <div className="text-xs text-gray-500 font-medium">Showing {filteredOrders.length} of {orders.length} orders</div>
          <div className="flex gap-2">
            <button className="px-4 py-2 rounded-lg bg-white border border-gray-200 text-xs font-bold text-gray-600 hover:bg-gray-100 transition-colors disabled:opacity-50" disabled>Previous</button>
            <button className="px-4 py-2 rounded-lg bg-white border border-gray-200 text-xs font-bold text-gray-600 hover:bg-gray-100 transition-colors">Next</button>
          </div>
        </div>
      </div>

      {/* Order View Modal */}
      <AnimatePresence>
        {isViewModalOpen && selectedOrder && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white w-full max-w-2xl rounded-[2.5rem] overflow-hidden shadow-2xl"
            >
              <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Order Details</h2>
                  <p className="text-gray-500 text-sm font-medium mt-1">ID: {selectedOrder.id}</p>
                </div>
                <button onClick={() => setIsViewModalOpen(false)} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
                  <X className="w-6 h-6 text-gray-500" />
                </button>
              </div>
              
              <div className="p-8 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-gray-400">
                      <User className="w-4 h-4" />
                      <span className="text-xs font-bold uppercase tracking-widest">Customer Information</span>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-2xl space-y-2">
                      <p className="font-bold text-gray-900">{selectedOrder.customer}</p>
                      <p className="text-sm text-gray-600 flex items-center gap-2">
                        <Mail className="w-3 h-3" /> {selectedOrder.email}
                      </p>
                      <p className="text-sm text-gray-600 flex items-center gap-2">
                        <Phone className="w-3 h-3" /> {selectedOrder.phone}
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-gray-400">
                      <Package className="w-4 h-4" />
                      <span className="text-xs font-bold uppercase tracking-widest">Order Summary</span>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-2xl space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Date:</span>
                        <span className="font-bold text-gray-900">{selectedOrder.date}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Status:</span>
                        <span className={`font-bold uppercase tracking-wider text-[10px] px-2 py-0.5 rounded-full ${
                          selectedOrder.status === 'Delivered' ? 'bg-green-100 text-green-600' :
                          selectedOrder.status === 'Processing' ? 'bg-blue-100 text-blue-600' :
                          selectedOrder.status === 'Cancelled' ? 'bg-red-100 text-red-600' : 'bg-yellow-100 text-yellow-600'
                        }`}>
                          {selectedOrder.status}
                        </span>
                      </div>
                      <div className="flex justify-between text-lg pt-2 border-t border-gray-200">
                        <span className="font-bold text-gray-900">Total:</span>
                        <span className="font-black text-red-600">{selectedOrder.amount}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-gray-400">
                    <MapPin className="w-4 h-4" />
                    <span className="text-xs font-bold uppercase tracking-widest">Shipping Address</span>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-2xl">
                    <p className="text-sm text-gray-600 leading-relaxed">
                      123, Main Street, Sivakasi,<br />
                      Tamil Nadu, India - 626123
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <button 
                    onClick={() => handleDownloadInvoice(selectedOrder)}
                    className="flex-1 bg-blue-600 text-white py-4 rounded-2xl font-bold hover:bg-blue-700 transition-all flex items-center justify-center gap-2"
                  >
                    <Download className="w-5 h-5" /> Download Invoice
                  </button>
                  <button 
                    onClick={() => handleWhatsAppShare(selectedOrder)}
                    className="flex-1 bg-green-600 text-white py-4 rounded-2xl font-bold hover:bg-green-700 transition-all flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-5 h-5" /> Share on WhatsApp
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Email Logs Modal */}
      <AnimatePresence>
        {isEmailLogsOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white w-full max-w-4xl h-[80vh] rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col"
            >
              <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Email Notification Logs</h2>
                  <p className="text-gray-500 text-sm font-medium mt-1">History of automated emails sent to customers</p>
                </div>
                <button onClick={() => setIsEmailLogsOpen(false)} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
                  <X className="w-6 h-6 text-gray-500" />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-8">
                {emailLogs.length > 0 ? (
                  <div className="space-y-6">
                    {emailLogs.map((log) => (
                      <div key={log.id} className="bg-gray-50 rounded-2xl p-6 border border-gray-100 space-y-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-1">Sent To</p>
                            <p className="font-bold text-gray-900">{log.to}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Timestamp</p>
                            <p className="text-sm text-gray-600">{log.timestamp}</p>
                          </div>
                        </div>
                        <div>
                          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Subject</p>
                          <p className="font-semibold text-gray-900">{log.subject}</p>
                        </div>
                        <div className="bg-white p-4 rounded-xl border border-gray-200">
                          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Message Body</p>
                          <div className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
                            {log.body}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                    <div className="bg-gray-100 p-6 rounded-full">
                      <Mail className="w-12 h-12 text-gray-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">No emails sent yet</h3>
                      <p className="text-gray-500 max-w-xs">When you update an order status, the notification history will appear here.</p>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminOrders;
