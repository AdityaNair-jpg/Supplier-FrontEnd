import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Save, Loader2, ArrowLeft } from 'lucide-react';

const EditCreditNote = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    supplier_invoice_no: '',
    job_number: '',
    supplier_name: '',
    pol: '',
    bl_no: '',
    receipt_amount: '',
    vat_amount: '',
    amount_with_vat: '',
    supplier_credit_note_no: '',
    date: '',
    line_items: []
  });

  useEffect(() => {
    const fetchCreditNote = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/credit-notes/${id}`);
        if (!response.ok) throw new Error('Failed to fetch credit note');
        const data = await response.json();
        setFormData({
          ...data,
          date: new Date(data.date).toISOString().split('T')[0]
        });
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCreditNote();
  }, [id]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleLineItemChange = (index, field, value) => {
    const updatedItems = [...formData.line_items];
    updatedItems[index][field] = value;
    setFormData(prev => ({ ...prev, line_items: updatedItems }));
  };

  const addLineItem = () => {
    setFormData(prev => ({
      ...prev,
      line_items: [...prev.line_items, { purpose: '', item: '', quantity: '', amount: '' }]
    }));
  };

  const calculateTotals = () => {
    const subTotal = formData.line_items.reduce((sum, item) => sum + (parseFloat(item.amount) || 0), 0);
    const vatAmount = subTotal * 0.18; // Assuming 18% VAT
    const totalAmount = subTotal + vatAmount;
    
    setFormData(prev => ({
      ...prev,
      receipt_amount: subTotal.toFixed(2),
      vat_amount: vatAmount.toFixed(2),
      amount_with_vat: totalAmount.toFixed(2)
    }));
  };

  useEffect(() => {
    calculateTotals();
  }, [formData.line_items]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      const response = await fetch(`http://localhost:3000/api/credit-notes/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Failed to update credit note');
      navigate('/credit-notes');
    } catch (error) {
      setError(error.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => navigate('/credit-notes')}
          className="text-gray-600 hover:text-gray-800"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-2xl font-bold">Edit Credit Note</h1>
      </div>

      {/* Form Content */}
      <div className="border border-gray-300 rounded-lg p-6">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Top Row */}
          <div className="grid grid-cols-5 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Supplier Invoice No
              </label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={formData.supplier_invoice_no}
                onChange={(e) => handleInputChange('supplier_invoice_no', e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Job No
              </label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={formData.job_number}
                onChange={(e) => handleInputChange('job_number', e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Supplier Name
              </label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={formData.supplier_name}
                onChange={(e) => handleInputChange('supplier_name', e.target.value)}
                required
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
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                BL No
              </label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={formData.bl_no}
                onChange={(e) => handleInputChange('bl_no', e.target.value)}
                required
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
                value={formData.receipt_amount}
                onChange={(e) => handleInputChange('receipt_amount', e.target.value)}
                readOnly
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                VAT Amount
              </label>
              <input
                type="number"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={formData.vat_amount}
                onChange={(e) => handleInputChange('vat_amount', e.target.value)}
                readOnly
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Amount with VAT
              </label>
              <input
                type="number"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={formData.amount_with_vat}
                onChange={(e) => handleInputChange('amount_with_vat', e.target.value)}
                readOnly
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Supplier Credit Note No
              </label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={formData.supplier_credit_note_no}
                onChange={(e) => handleInputChange('supplier_credit_note_no', e.target.value)}
                required
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
                required
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
              type="button"
              onClick={addLineItem}
              className="ml-4 bg-green-500 hover:bg-green-600 text-white p-2 rounded-md transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Line Items */}
          {formData.line_items.map((item, index) => (
            <div key={index} className="grid grid-cols-4 gap-4 mb-4">
              <input
                type="text"
                placeholder="Purpose"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={item.purpose}
                onChange={(e) => handleLineItemChange(index, 'purpose', e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Item"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={item.item}
                onChange={(e) => handleLineItemChange(index, 'item', e.target.value)}
                required
              />
              <input
                type="number"
                placeholder="Quantity"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={item.quantity}
                onChange={(e) => handleLineItemChange(index, 'quantity', e.target.value)}
                required
              />
              <input
                type="number"
                step="0.01"
                placeholder="Amount"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={item.amount}
                onChange={(e) => handleLineItemChange(index, 'amount', e.target.value)}
                required
              />
            </div>
          ))}

          {/* Submit Button */}
          <div className="flex justify-end mt-6">
            <button
              type="submit"
              disabled={saving}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center"
            >
              {saving ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCreditNote; 