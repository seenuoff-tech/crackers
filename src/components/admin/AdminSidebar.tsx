import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  Receipt,
  BarChart3,
  Settings,
  Trash2,
  Sparkles,
  ExternalLink
} from 'lucide-react';

const AdminSidebar: React.FC = () => {
  const navigate = useNavigate();

  const menuItems = [
    { name: 'Admin Dashboard', icon: <LayoutDashboard className="w-5 h-5" />, path: '/admin-dashboard/dashboard' },
    { name: 'Products', icon: <Package className="w-5 h-5" />, path: '/admin-dashboard/products' },
    { name: 'Orders', icon: <ShoppingBag className="w-5 h-5" />, path: '/admin-dashboard/orders' },
    { name: 'Billing', icon: <Receipt className="w-5 h-5" />, path: '/admin-dashboard/billing' },
    { name: 'Sales Report', icon: <BarChart3 className="w-5 h-5" />, path: '/admin-dashboard/sales-report' },
    { name: 'Home Slider', icon: <Sparkles className="w-5 h-5" />, path: '/admin-dashboard/slider' },
    { name: 'Settings', icon: <Settings className="w-5 h-5" />, path: '/admin-dashboard/settings' },
    { name: 'Trash', icon: <Trash2 className="w-5 h-5" />, path: '/admin-dashboard/trash' },
  ];

  return (
    <aside className="w-64 bg-gray-900 min-h-screen flex flex-col border-r border-gray-800">
      <div className="p-8">
        <div className="flex items-center gap-3 text-white font-bold text-xl mb-10">
          <div className="bg-red-600 p-2 rounded-lg">
            <Sparkles className="w-6 h-6" />
          </div>
          Crackers
        </div>

        <nav className="space-y-2">
          {menuItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-4 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-red-600 text-white shadow-lg shadow-red-600/20'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800'
                }`
              }
            >
              {item.icon}
              {item.name}
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="mt-auto p-8 border-t border-gray-800">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-4 px-4 py-3 rounded-xl text-sm font-bold text-white bg-red-600/20 border border-red-600/30 hover:bg-red-600/30 transition-all w-full"
        >
          <ExternalLink className="w-5 h-5 text-red-500" />
          Go to Website
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
