import React, { useState } from 'react';
import { Plus } from 'lucide-react';

const SupplierCreditNote = () => {
  const [formData, setFormData] = useState({
    supplierInvoiceNo: '',
    jobNo: '',
    supplierName: '',
    pol: '',
    blNo: '',
    receiptAmount: '',
    vatAmount: '',
    amountWithVat: '',
    supplierCreditNoteNo: '1',
    date: '',
    subTotal: '',
    totalVatAmount: '',
    totalAmount: ''
  });

  const [lineItems, setLineItems] = useState([
    { purpose: '', item: '', quantity: '', amount: '' }
  ]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleLineItemChange = (index, field, value) => {
    const updatedItems = [...lineItems];
    updatedItems[index][field] = value;
    setLineItems(updatedItems);
  };

  const addLineItem = () => {
    setLineItems([...lineItems, { purpose: '', item: '', quantity: '', amount: '' }]);
  };

  const calculateTotals = () => {
    const subTotal = lineItems.reduce((sum, item) => sum + (parseFloat(item.amount) || 0), 0);
    const vatAmount = subTotal * 0.18; // Assuming 18% VAT
    const totalAmount = subTotal + vatAmount;
    
    setFormData(prev => ({
      ...prev,
      subTotal: subTotal.toFixed(2),
      totalVatAmount: vatAmount.toFixed(2),
      totalAmount: totalAmount.toFixed(2)
    }));
  };

  React.useEffect(() => {
    calculateTotals();
  }, [lineItems]);

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white">
      {/* Header */}
      <div className="bg-blue-600 text-white p-4 rounded-t-lg">
        <h1 className="text-xl font-semibold">Supplier Credit Note</h1>
      </div>

      {/* Form Content */}
      <div className="border border-gray-300 rounded-b-lg p-6">
        {/* Top Row */}
        <div className="grid grid-cols-5 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Supplier Invoice No
            </label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={formData.supplierInvoiceNo}
              onChange={(e) => handleInputChange('supplierInvoiceNo', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Job No
            </label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={formData.jobNo}
              onChange={(e) => handleInputChange('jobNo', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Supplier Name
            </label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={formData.supplierName}
              onChange={(e) => handleInputChange('supplierName', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              POL
            </label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={formData.pol}
              onChange={(e) => handleInputChange('pol', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              BL No
            </label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={formData.blNo}
              onChange={(e) => handleInputChange('blNo', e.target.value)}
            />
          </div>
        </div>

        {/* Second Row */}
        <div className="grid grid-cols-5 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Receipt Amount
            </label>
            <input
              type="number"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={formData.receiptAmount}
              onChange={(e) => handleInputChange('receiptAmount', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Vat Amount
            </label>
            <input
              type="number"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={formData.vatAmount}
              onChange={(e) => handleInputChange('vatAmount', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              AmountWithVat
            </label>
            <input
              type="number"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={formData.amountWithVat}
              onChange={(e) => handleInputChange('amountWithVat', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Supplier Credit Note No
            </label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={formData.supplierCreditNoteNo}
              onChange={(e) => handleInputChange('supplierCreditNoteNo', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date
            </label>
            <input
              type="date"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={formData.date}
              onChange={(e) => handleInputChange('date', e.target.value)}
            />
          </div>
        </div>

        {/* Line Items Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="grid grid-cols-4 gap-4 flex-1">
            <div className="font-medium text-gray-700">Purpose</div>
            <div className="font-medium text-gray-700">Item</div>
            <div className="font-medium text-gray-700">Quantity</div>
            <div className="font-medium text-gray-700">Amount</div>
          </div>
          <button
            onClick={addLineItem}
            className="ml-4 bg-green-500 hover:bg-green-600 text-white p-2 rounded-md transition-colors"
          >
            <Plus size={20} />
          </button>
        </div>

        {/* Line Items */}
        {lineItems.map((item, index) => (
          <div key={index} className="grid grid-cols-4 gap-4 mb-4">
            <input
              type="text"
              placeholder="Purpose"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={item.purpose}
              onChange={(e) => handleLineItemChange(index, 'purpose', e.target.value)}
            />
            <input
              type="text"
              placeholder="Item"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={item.item}
              onChange={(e) => handleLineItemChange(index, 'item', e.target.value)}
            />
            <input
              type="number"
              placeholder="Quantity"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={item.quantity}
              onChange={(e) => handleLineItemChange(index, 'quantity', e.target.value)}
            />
            <input
              type="number"
              placeholder="Amount"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={item.amount}
              onChange={(e) => handleLineItemChange(index, 'amount', e.target.value)}
            />
          </div>
        ))}

        {/* Table for Line Items Display */}
        <div className="bg-gray-50 p-4 rounded-md mb-6">
          <div className="grid grid-cols-4 gap-4 font-medium text-gray-700 mb-2">
            <div>Purpose</div>
            <div>Item</div>
            <div>Quantity</div>
            <div>Amount</div>
          </div>
          <div className="border-t border-gray-200 pt-2">
            {/* This would show the added line items */}
          </div>
        </div>

        {/* Totals Section */}
        <div className="flex justify-end">
          <div className="w-80">
            <div className="flex justify-between items-center py-2">
              <span className="font-medium text-gray-700">Sub Total</span>
              <input
                type="text"
                className="w-32 p-2 border border-gray-300 rounded-md text-right bg-gray-50"
                value={formData.subTotal}
                readOnly
              />
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="font-medium text-gray-700">Vat Amount</span>
              <input
                type="text"
                className="w-32 p-2 border border-gray-300 rounded-md text-right bg-gray-50"
                value={formData.totalVatAmount}
                readOnly
              />
            </div>
            <div className="flex justify-between items-center py-2 border-t border-gray-300">
              <span className="font-bold text-gray-800">Total Amount</span>
              <input
                type="text"
                className="w-32 p-2 border border-gray-300 rounded-md text-right bg-gray-100 font-bold"
                value={formData.totalAmount}
                readOnly
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end mt-6 space-x-4">
          <button className="px-6 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-md transition-colors">
            Cancel
          </button>
          <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default SupplierCreditNote;