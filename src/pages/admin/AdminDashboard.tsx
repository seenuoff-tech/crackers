import React from 'react';
import { TrendingUp, Users, ShoppingBag, DollarSign, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useOrders } from '../../context/OrderContext';

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { orders } = useOrders();

  const totalSales = orders
    .filter(o => o.status !== 'Cancelled')
    .reduce((acc, curr) => {
      const val = parseInt(curr.amount.replace(/[^0-9]/g, ''));
      return acc + (isNaN(val) ? 0 : val);
    }, 0);

  const stats = [
    { label: 'Total Sales', value: `₹${totalSales.toLocaleString()}`, icon: <DollarSign className="w-6 h-6" />, change: '+12.5%', isUp: true },
    { label: 'Total Orders', value: orders.length.toString(), icon: <ShoppingBag className="w-6 h-6" />, change: '+8.2%', isUp: true },
    { label: 'New Customers', value: '84', icon: <Users className="w-6 h-6" />, change: '-2.4%', isUp: false },
    { label: 'Conversion Rate', value: '3.2%', icon: <TrendingUp className="w-6 h-6" />, change: '+1.1%', isUp: true },
  ];

  const recentOrders = [...orders].reverse().slice(0, 5);

  return (
    <div className="space-y-10">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Dashboard Overview</h1>
        <div className="text-sm text-gray-500 font-medium">Last updated: {new Date().toLocaleDateString()}</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 group hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-6">
              <div className="bg-red-100 p-3 rounded-2xl text-red-600 group-hover:bg-red-600 group-hover:text-white transition-colors">
                {stat.icon}
              </div>
              <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full ${
                stat.isUp ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
              }`}>
                {stat.isUp ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                {stat.change}
              </div>
            </div>
            <div className="text-gray-500 text-sm font-medium mb-1 uppercase tracking-wider">{stat.label}</div>
            <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Orders Table */}
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-bold text-gray-900">Recent Orders</h2>
            <button 
              onClick={() => navigate('/admin-dashboard/orders')}
              className="text-red-600 font-bold text-sm hover:underline"
            >
              View All
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-xs text-gray-400 uppercase tracking-widest border-b border-gray-50">
                  <th className="pb-4 font-semibold">Order ID</th>
                  <th className="pb-4 font-semibold">Customer</th>
                  <th className="pb-4 font-semibold">Status</th>
                  <th className="pb-4 font-semibold text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {recentOrders.map((order, i) => (
                  <tr key={i} className="border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors">
                    <td className="py-4 font-bold text-gray-900">{order.id}</td>
                    <td className="py-4 text-gray-600">{order.customer}</td>
                    <td className="py-4">
                      <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        order.status === 'Delivered' ? 'bg-green-100 text-green-600' :
                        order.status === 'Processing' ? 'bg-blue-100 text-blue-600' : 
                        order.status === 'Cancelled' ? 'bg-red-100 text-red-600' : 'bg-yellow-100 text-yellow-600'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="py-4 text-right font-bold text-gray-900">{order.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Sales Chart Placeholder */}
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center">
          <div className="bg-gray-50 w-full h-64 rounded-2xl flex items-center justify-center mb-6 border border-dashed border-gray-200">
            <TrendingUp className="w-12 h-12 text-gray-300" />
            <span className="ml-4 text-gray-400 font-medium">Sales Chart Visualization</span>
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">Monthly Sales Growth</h3>
          <p className="text-gray-500 text-sm max-w-xs">Your sales have increased by 12% compared to last month.</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
