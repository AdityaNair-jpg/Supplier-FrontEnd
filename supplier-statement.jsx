import React, { useState } from 'react';
import { Search, Printer } from 'lucide-react';

const SupplierStatement = () => {
  const [searchParams, setSearchParams] = useState({
    fromDate: '2024-11-06',
    toDate: '2025-05-29',
    supplierName: 'ABC LOGISTIC'
  });

  const [statementData] = useState([
    { refNo: '', date: '2024-11-06', description: 'Opening Balance', debit: '', credit: '', balance: 0 },
    { refNo: '3440', date: '2025-01-25', description: 'Credit Purchase', debit: '', credit: '7797', balance: 7797 },
    { refNo: '3441', date: '2025-01-28', description: 'Credit Purchase', debit: '', credit: '10994', balance: 10994 },
    { refNo: '3489.1', date: '2025-02-01', description: 'Credit Purchase', debit: '', credit: '5497', balance: 5497 },
    { refNo: 'JV of 355', date: '2025-02-06', description: 'cash Transferred', debit: '10994', credit: '', balance: 0 },
    { refNo: '3560', date: '2025-02-15', description: 'Credit Purchase', debit: '', credit: '3829.5', balance: 3829.5 },
    { refNo: '3585', date: '2025-02-17', description: 'Credit Purchase', debit: '', credit: '7647.5', balance: 7647.5 },
    { refNo: 'JV of 474', date: '2025-02-18', description: 'cash Transferred', debit: '7797', credit: '', balance: 0 },
    { refNo: '3747', date: '2025-03-12', description: 'Credit Purchase', debit: '', credit: '3714.5', balance: 3714.5 },
    { refNo: '3748', date: '2025-03-14', description: 'Credit Purchase', debit: '', credit: '3714.5', balance: 3714.5 },
    { refNo: 'JV of784', date: '2025-03-22', description: 'cash Transferred', debit: '16974', credit: '', balance: 0 },
    { refNo: '3848', date: '2025-04-01', description: 'Credit Purchase', debit: '', credit: '3944.5', balance: 3944.5 }
  ]);

  const handleInputChange = (field, value) => {
    setSearchParams(prev => ({ ...prev, [field]: value }));
  };

  const handleSearch = () => {
    // Implement search functionality
    console.log('Searching with params:', searchParams);
  };

  const handlePrint = () => {
    window.print();
  };

  const formatNumber = (num) => {
    if (!num) return '';
    return parseFloat(num).toLocaleString();
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Supplier Statement</h1>
        
        {/* Search Section */}
        <div className="bg-gray-700 text-white p-4 rounded-t-lg">
          <h2 className="text-lg font-semibold">Search by Date</h2>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-b-lg border border-gray-300">
          <div className="flex items-end gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                From:
              </label>
              <input
                type="date"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={searchParams.fromDate}
                onChange={(e) => handleInputChange('fromDate', e.target.value)}
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                To:
              </label>
              <input
                type="date"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={searchParams.toDate}
                onChange={(e) => handleInputChange('toDate', e.target.value)}
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Supplier Name
              </label>
              <input
                type="text"
                placeholder="Enter client name"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={searchParams.supplierName}
                onChange={(e) => handleInputChange('supplierName', e.target.value)}
              />
            </div>
            <button
              onClick={handleSearch}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md flex items-center gap-2 transition-colors"
            >
              <Search size={18} />
            </button>
            <button
              onClick={handlePrint}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md flex items-center gap-2 transition-colors"
            >
              <Printer size={18} />
              Print
            </button>
          </div>
        </div>
      </div>

      {/* Statement Details */}
      <div className="bg-gray-700 text-white p-3 rounded-t-lg">
        <div className="flex items-center gap-6">
          <span>From Date: <strong>{searchParams.fromDate}</strong></span>
          <span>To Date: <strong>{searchParams.toDate}</strong></span>
          <span>Supplier Name: <strong>{searchParams.supplierName}</strong></span>
        </div>
      </div>

      {/* Statement Table */}
      <div className="border border-gray-300 rounded-b-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 border-r border-gray-300">
                Ref. No.
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 border-r border-gray-300">
                Date
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 border-r border-gray-300">
                Account Names, Description
              </th>
              <th className="px-4 py-3 text-right text-sm font-medium text-gray-700 border-r border-gray-300">
                Debit
              </th>
              <th className="px-4 py-3 text-right text-sm font-medium text-gray-700 border-r border-gray-300">
                Credit
              </th>
              <th className="px-4 py-3 text-right text-sm font-medium text-gray-700">
                Balance
              </th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {statementData.map((row, index) => (
              <tr key={index} className="border-t border-gray-200 hover:bg-gray-50">
                <td className="px-4 py-3 text-sm text-gray-900 border-r border-gray-300">
                  {row.refNo}
                </td>
                <td className="px-4 py-3 text-sm text-gray-900 border-r border-gray-300">
                  {row.date}
                </td>
                <td className="px-4 py-3 text-sm text-gray-900 border-r border-gray-300">
                  {row.description}
                </td>
                <td className="px-4 py-3 text-sm text-gray-900 text-right border-r border-gray-300">
                  {formatNumber(row.debit)}
                </td>
                <td className="px-4 py-3 text-sm text-gray-900 text-right border-r border-gray-300">
                  {formatNumber(row.credit)}
                </td>
                <td className="px-4 py-3 text-sm text-gray-900 text-right font-medium">
                  {formatNumber(row.balance)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Summary Section */}
      <div className="mt-6 bg-gray-50 p-4 rounded-lg">
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-600">
            Statement Period: {searchParams.fromDate} to {searchParams.toDate}
          </div>
          <div className="text-lg font-bold text-gray-800">
            Current Balance: {formatNumber(statementData[statementData.length - 1]?.balance || 0)}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end mt-6 space-x-4">
        <button className="px-6 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-md transition-colors">
          Export
        </button>
        <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors">
          Email Statement
        </button>
      </div>
    </div>
  );
};

export default SupplierStatement;