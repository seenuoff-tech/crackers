import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Bill {
  id: string;
  date: string;
  customer: string;
  amount: string;
  status: string;
  deletedAt?: string;
}

interface BillingContextType {
  bills: Bill[];
  trash: Bill[];
  deleteBill: (id: string) => void;
  restoreBill: (id: string) => void;
  permanentlyDeleteBill: (id: string) => void;
  emptyTrash: () => void;
  updateBillStatus: (id: string, newStatus: string) => void;
  updateBill: (id: string, updatedBill: Partial<Bill>) => void;
}

const BillingContext = createContext<BillingContextType | undefined>(undefined);

export const BillingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [bills, setBills] = useState<Bill[]>([
    { id: 'INV-2024-001', date: '2024-03-08', customer: 'Rahul Sharma', amount: '₹2,450', status: 'Paid' },
    { id: 'INV-2024-002', date: '2024-03-08', customer: 'Priya Patel', amount: '₹1,200', status: 'Pending' },
    { id: 'INV-2024-003', date: '2024-03-07', customer: 'Amit Kumar', amount: '₹850', status: 'Paid' },
    { id: 'INV-2024-004', date: '2024-03-07', customer: 'Sneha Gupta', amount: '₹3,100', status: 'Overdue' },
    { id: 'INV-2024-005', date: '2024-03-06', customer: 'Vikram Singh', amount: '₹550', status: 'Paid' },
  ]);

  const [trash, setTrash] = useState<Bill[]>([
    { id: 'INV-2024-009', date: '2024-03-01', customer: 'Karan Mehra', amount: '₹1,450', deletedAt: '2024-03-05', status: 'Paid' },
    { id: 'INV-2024-012', date: '2024-02-28', customer: 'Sonia Verma', amount: '₹3,200', deletedAt: '2024-03-04', status: 'Paid' },
    { id: 'INV-2024-015', date: '2024-02-25', customer: 'Arjun Reddy', amount: '₹950', deletedAt: '2024-03-02', status: 'Paid' },
  ]);

  const deleteBill = (id: string) => {
    const billToDelete = bills.find(b => b.id === id);
    if (billToDelete) {
      setBills(prev => prev.filter(b => b.id !== id));
      setTrash(prev => [...prev, { ...billToDelete, deletedAt: new Date().toISOString().split('T')[0] }]);
    }
  };

  const restoreBill = (id: string) => {
    const billToRestore = trash.find(b => b.id === id);
    if (billToRestore) {
      setTrash(prev => prev.filter(b => b.id !== id));
      const { deletedAt, ...rest } = billToRestore;
      setBills(prev => [rest, ...prev]);
    }
  };

  const permanentlyDeleteBill = (id: string) => {
    setTrash(prev => prev.filter(b => b.id !== id));
  };

  const emptyTrash = () => {
    setTrash([]);
  };

  const updateBillStatus = (id: string, newStatus: string) => {
    setBills(prev => prev.map(bill => 
      bill.id === id ? { ...bill, status: newStatus } : bill
    ));
  };

  const updateBill = (id: string, updatedBill: Partial<Bill>) => {
    setBills(prev => prev.map(bill => 
      bill.id === id ? { ...bill, ...updatedBill } : bill
    ));
  };

  return (
    <BillingContext.Provider value={{ bills, trash, deleteBill, restoreBill, permanentlyDeleteBill, emptyTrash, updateBillStatus, updateBill }}>
      {children}
    </BillingContext.Provider>
  );
};

export const useBilling = () => {
  const context = useContext(BillingContext);
  if (context === undefined) {
    throw new Error('useBilling must be used within a BillingProvider');
  }
  return context;
};
