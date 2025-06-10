import { useState, useEffect } from 'react';
import './index.css'; // Make sure your Tailwind CSS is imported here or in your main index.css

function AddSupplier() {
  const [SupplierName, setSupplierName] = useState('');
  const [SupplierAddress, setSupplierAddress] = useState('');
  const [SupplierPhone, setSupplierPhone] = useState('');
  const [SupplierEmail, setSupplierEmail] = useState('');
  const [SupplierVAT, setSupplierVAT] = useState('');
  const [SupplierNumber, setSupplierNumber] = useState('');
  const [RegisterDate, setRegisterDate] = useState('');
  const [Suppliers, setSuppliers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

const API_BASE_URL = 'http://localhost:3000/api'; // Updated to match server port

  // Test server connection
  const testServerConnection = async () => {
    try {
      console.log('Testing server connection...');
      const response = await fetch(`${API_BASE_URL}/test`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include'
      });
      
      console.log('Test response status:', response.status);
      const data = await response.json();
      console.log('Test response data:', data);
      return true;
    } catch (error) {
      console.error('Server connection test failed:', {
        message: error.message,
        stack: error.stack
      });
      return false;
    }
  };

  // Load suppliers when component mounts
  useEffect(() => {
    const init = async () => {
      const isServerConnected = await testServerConnection();
      if (isServerConnected) {
        fetchSuppliers();
      } else {
        setMessage('Cannot connect to server. Please check if the server is running.');
      }
    };
    
    init();
  }, []);

  const fetchSuppliers = async () => {
    try {
      console.log('Attempting to fetch suppliers from:', `${API_BASE_URL}/suppliers`);
      const response = await fetch(`${API_BASE_URL}/suppliers`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include'
      });
      
      console.log('Response status:', response.status);
      
      if (response.ok) {
        const suppliers = await response.json();
        console.log('Received suppliers:', suppliers);
        setSuppliers(suppliers);
      } else {
        const errorData = await response.json();
        console.error('Failed to fetch suppliers:', errorData);
        setMessage(`Error: ${errorData.error || 'Failed to fetch suppliers'}`);
      }
    } catch (error) {
      console.error('Error fetching suppliers:', {
        message: error.message,
        stack: error.stack
      });
      setMessage('Error loading suppliers. Make sure your server is running.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    const newSupplier = {
      name: SupplierName,
      address: SupplierAddress,
      phone: SupplierPhone,
      email: SupplierEmail,
      vat_number: SupplierVAT,
      registration_number: SupplierNumber,
      registration_date: RegisterDate,
    };

    try {
      console.log('Attempting to add supplier:', newSupplier);
      const response = await fetch(`${API_BASE_URL}/suppliers`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(newSupplier),
      });

      console.log('Response status:', response.status);
      
      if (response.ok) {
        const result = await response.json();
        console.log('Successfully added supplier:', result);
        setMessage('Supplier added successfully!');
        
        // Clear form fields
        setSupplierName('');
        setSupplierAddress('');
        setSupplierPhone('');
        setSupplierEmail('');
        setSupplierVAT('');
        setSupplierNumber('');
        setRegisterDate('');

        // Refresh the suppliers list
        fetchSuppliers();
      } else {
        const errorData = await response.json();
        console.error('Failed to add supplier:', errorData);
        setMessage(`Error: ${errorData.error || 'Failed to add supplier'}`);
      }
    } catch (error) {
      console.error('Error adding supplier:', {
        message: error.message,
        stack: error.stack
      });
      setMessage(`Error adding supplier: ${error.message}. Make sure your server is running on ${API_BASE_URL.replace('/api', '')}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'SupplierName':
        setSupplierName(value);
        break;
      case 'SupplierAddress':
        setSupplierAddress(value);
        break;
      case 'SupplierPhone':
        setSupplierPhone(value);
        break;
      case 'SupplierEmail':
        setSupplierEmail(value);
        break;
      case 'SupplierVAT':
        setSupplierVAT(value);
        break;
      case 'SupplierNumber':
        setSupplierNumber(value);
        break;
      case 'RegisterDate':
        setRegisterDate(value);
        break;
      default:
        break;
    }
  };

  return (
  
  <div className="h-dvh w-dvw flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4 font-sans antialiased ">
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-2xl transform transition-all duration-500 ease-in-out hover:shadow-3xl">
      <h2 className="text-4xl font-extrabold text-gray-900 mb-8 text-center tracking-tight">
        Add New Supplier
      </h2>

      {/* Success/Error message */}
      {message && (
        <div className={`mb-6 p-4 rounded-xl text-center font-semibold ${
          message.includes('Error') 
            ? 'bg-red-100 text-red-800 border border-red-300' 
            : 'bg-green-100 text-green-800 border border-green-300'
        }`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <input
          type="text"
          name="SupplierName"
          value={SupplierName}
          onChange={handleChange}
          placeholder="Supplier Name"
          className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-200 transition duration-300 ease-in-out text-gray-800 placeholder-gray-500 text-lg"
          required
          disabled={isLoading}
        />
        <input
          type="text"
          name="SupplierAddress"
          value={SupplierAddress}
          onChange={handleChange}
          placeholder="Supplier Address"
          className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-200 transition duration-300 ease-in-out text-gray-800 placeholder-gray-500 text-lg"
          required
          disabled={isLoading}
        />
        <input
          type="tel"
          name="SupplierPhone"
          value={SupplierPhone}
          onChange={handleChange}
          placeholder="Supplier Phone"
          className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-200 transition duration-300 ease-in-out text-gray-800 placeholder-gray-500 text-lg"
          required
          disabled={isLoading}
        />
        <input
          type="email"
          name="SupplierEmail"
          value={SupplierEmail}
          onChange={handleChange}
          placeholder="Supplier Email"
          className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-200 transition duration-300 ease-in-out text-gray-800 placeholder-gray-500 text-lg"
          required
          disabled={isLoading}
        />
        <input
          type="text"
          name="SupplierVAT"
          value={SupplierVAT}
          onChange={handleChange}
          placeholder="Supplier VAT Number (Optional)"
          className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-200 transition duration-300 ease-in-out text-gray-800 placeholder-gray-500 text-lg"
          disabled={isLoading}
        />
        <input
          type="text"
          name="SupplierNumber"
          value={SupplierNumber}
          onChange={handleChange}
          placeholder="Supplier Registration Number (Optional)"
          className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-200 transition duration-300 ease-in-out text-gray-800 placeholder-gray-500 text-lg"
          disabled={isLoading}
        />
        <input
          type="date"
          name="RegisterDate"
          value={RegisterDate}
          onChange={handleChange}
          className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-200 transition duration-300 ease-in-out text-gray-800 text-lg"
          required
          disabled={isLoading}
        />

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full font-bold py-4 rounded-xl shadow-lg text-xl transition duration-300 ease-in-out transform focus:outline-none focus:ring-4 focus:ring-blue-300 ${
            isLoading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-blue-500 to-blue-700 text-white hover:from-blue-600 hover:to-blue-800 hover:scale-105 active:scale-95'
          }`}
        >
          {isLoading ? 'Adding Supplier...' : 'Add Supplier'}
        </button>
      </form>

      {/* Section to display the list of added suppliers */}
      {Suppliers.length > 0 && (
        <div className="mt-12 pt-8 border-t border-gray-200">
          <h3 className="text-3xl font-bold text-gray-900 mb-6 text-center tracking-tight">
            Current Suppliers
          </h3>
          <div className="overflow-x-auto rounded-xl shadow-lg">
            <table className="min-w-full bg-white border-collapse">
              <thead>
                <tr className="bg-blue-600 text-white text-left text-sm uppercase font-semibold tracking-wider">
                  <th className="py-3 px-4 rounded-tl-xl">Name</th>
                  <th className="py-3 px-4">Address</th>
                  <th className="py-3 px-4">Phone</th>
                  <th className="py-3 px-4">Email</th>
                  <th className="py-3 px-4">VAT No.</th>
                  <th className="py-3 px-4">Reg. No.</th>
                  <th className="py-3 px-4 rounded-tr-xl">Reg. Date</th>
                </tr>
              </thead>
              <tbody>
                {Suppliers.map((supplier, index) => (
                  <tr
                    key={supplier.id || index}
                    className="border-b border-gray-200 hover:bg-blue-50 transition duration-200 ease-in-out"
                  >
                    <td className="py-3 px-4 text-gray-800">{supplier.name}</td>
                    <td className="py-3 px-4 text-gray-700">{supplier.address}</td>
                    <td className="py-3 px-4 text-gray-700">{supplier.phone}</td>
                    <td className="py-3 px-4 text-gray-700">{supplier.email}</td>
                    <td className="py-3 px-4 text-gray-700">{supplier.vat_number || 'N/A'}</td>
                    <td className="py-3 px-4 text-gray-700">{supplier.registration_number || 'N/A'}</td>
                    <td className="py-3 px-4 text-gray-700">
                      {supplier.registration_date ? new Date(supplier.registration_date).toLocaleDateString() : 'N/A'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {Suppliers.length === 0 && !message.includes('Error') && (
        <p className="text-center text-gray-500 mt-8 text-xl italic">
          No suppliers added yet. Fill the form above to get started!
        </p>
      )}
    </div>
  </div>
);
}

export default AddSupplier;