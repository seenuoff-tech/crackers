import React, { createContext, useContext, useState, ReactNode } from 'react';
import { safeStorage } from '../services/storageService';

export interface Order {
  id: string;
  date: string;
  customer: string;
  email: string;
  phone: string;
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  amount: string;
}

interface OrderContextType {
  orders: Order[];
  addOrder: (order: Omit<Order, 'id' | 'date' | 'status'>) => void;
  updateOrderStatus: (id: string, newStatus: Order['status']) => void;
  deleteOrder: (id: string) => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = safeStorage.getItem('crackers_orders');
    if (saved) return JSON.parse(saved);
    return [
      { id: '#ORD-7241', date: '2024-03-08', customer: 'Rahul Sharma', email: 'rahul@example.com', phone: '+91 8428470009', status: 'Delivered', amount: '₹2,450' },
      { id: '#ORD-7242', date: '2024-03-08', customer: 'Priya Patel', email: 'priya@example.com', phone: '+91 98765 43211', status: 'Processing', amount: '₹1,200' },
      { id: '#ORD-7243', date: '2024-03-07', customer: 'Amit Kumar', email: 'amit@example.com', phone: '+91 98765 43212', status: 'Pending', amount: '₹850' },
      { id: '#ORD-7244', date: '2024-03-07', customer: 'Sneha Gupta', email: 'sneha@example.com', phone: '+91 98765 43213', status: 'Delivered', amount: '₹3,100' },
      { id: '#ORD-7245', date: '2024-03-06', customer: 'Vikram Singh', email: 'vikram@example.com', phone: '+91 98765 43214', status: 'Cancelled', amount: '₹550' },
      { id: '#ORD-7246', date: '2024-03-06', customer: 'Anjali Devi', email: 'anjali@example.com', phone: '+91 98765 43215', status: 'Delivered', amount: '₹1,800' },
    ];
  });

  React.useEffect(() => {
    safeStorage.setItem('crackers_orders', JSON.stringify(orders));
  }, [orders]);

  const addOrder = (newOrderData: Omit<Order, 'id' | 'date' | 'status'>) => {
    const newOrder: Order = {
      ...newOrderData,
      id: `#ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toISOString().split('T')[0],
      status: 'Pending'
    };
    setOrders(prev => [newOrder, ...prev]);
  };

  const updateOrderStatus = (id: string, newStatus: Order['status']) => {
    setOrders(prev => prev.map(order => 
      order.id === id ? { ...order, status: newStatus } : order
    ));
    
    // Simulate sending email
    const order = orders.find(o => o.id === id);
    if (order) {
      console.log(`SIMULATED EMAIL SENT TO: ${order.email}`);
      console.log(`SUBJECT: Order ${order.id} Status Updated`);
      console.log(`BODY: Dear ${order.customer}, your order status has been updated to ${newStatus}.`);
    }
  };

  const deleteOrder = (id: string) => {
    setOrders(prev => prev.filter(order => order.id !== id));
  };

  return (
    <OrderContext.Provider value={{ orders, addOrder, updateOrderStatus, deleteOrder }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
};
