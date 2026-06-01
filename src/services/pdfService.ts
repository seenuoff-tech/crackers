import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

export const priceListData = [
  { category: 'Ground Chakkars', items: [
    { name: 'Ground Chakkars Big', price: '₹150', unit: '10 Pcs' },
    { name: 'Ground Chakkars Special', price: '₹250', unit: '10 Pcs' },
    { name: 'Asoka Chakkars', price: '₹120', unit: '10 Pcs' },
  ]},
  { category: 'Flower Pots', items: [
    { name: 'Flower Pots Big', price: '₹250', unit: '10 Pcs' },
    { name: 'Flower Pots Special', price: '₹350', unit: '10 Pcs' },
    { name: 'Colour Flower Pots', price: '₹450', unit: '10 Pcs' },
  ]},
  { category: 'Sky Shots', items: [
    { name: '7 Shots', price: '₹450', unit: '1 Pce' },
    { name: '12 Shots Multi Colour', price: '₹850', unit: '1 Pce' },
    { name: '25 Shots Fancy', price: '₹1250', unit: '1 Pce' },
  ]},
  { category: 'Sparklers', items: [
    { name: '7cm Electric Sparklers', price: '₹80', unit: '10 Pcs' },
    { name: '10cm Colour Sparklers', price: '₹120', unit: '10 Pcs' },
    { name: '15cm Green Sparklers', price: '₹180', unit: '10 Pcs' },
  ]},
];

export const downloadPriceListPDF = () => {
  const doc = new jsPDF();
  
  doc.setFontSize(22);
  doc.setTextColor(220, 38, 38);
  doc.text('CRACKERS MART - PRICE LIST 2024', 105, 20, { align: 'center' });
  
  let currentY = 35;
  
  priceListData.forEach((section) => {
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text(section.category.toUpperCase(), 20, currentY);
    
    autoTable(doc, {
      startY: currentY + 5,
      head: [['Product Name', 'Unit', 'Price']],
      body: section.items.map(item => [item.name, item.unit, item.price]),
      theme: 'striped',
      headStyles: { fillColor: [220, 38, 38] },
      margin: { top: 10 }
    });
    
    currentY = (doc as any).lastAutoTable.finalY + 15;
    
    // Add new page if needed
    if (currentY > 250) {
      doc.addPage();
      currentY = 20;
    }
  });
  
  doc.save('Crackers-Mart-Price-List-2024.pdf');
};
