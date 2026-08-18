import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

export default function Dashboard() {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const navigate = useNavigate();
  const [data, setData] = useState({ total: 0, products: [] });
  const [loading, setLoading] = useState(true);
  
  // Search & Filter State
  const [search, setSearch] = useState('');
  const [expiryFilter, setExpiryFilter] = useState('');
  
  // Calculate expiring soon count from products returned
  const [expiringSoonCount, setExpiringSoonCount] = useState(0);

  // Edit Modal State
  const [editingVehicle, setEditingVehicle] = useState(null);
  const [editFormData, setEditFormData] = useState({
    title: '', amount: 1, upcCode: '', expiryDate: ''
  });
  const [editLoading, setEditLoading] = useState(false);
  const [editError, setEditError] = useState('');

  const fetchProducts = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      let url = `${API_BASE_URL}/api/products`;
      const params = new URLSearchParams();
      if (search) params.append('search', search);
      if (expiryFilter) params.append('expiryFilter', expiryFilter);
      
      if (params.toString()) {
        url += `?${params.toString()}`;
      }

      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const result = await response.json();
        setData(result);
        
        // Naive calculation for expiring within 1 month for the dashboard
        const now = new Date();
        const oneMonthFromNow = new Date();
        oneMonthFromNow.setMonth(now.getMonth() + 1);
        
        let count = 0;
        result.products.forEach(p => {
           const expDate = new Date(p.expiryDate);
           if (expDate <= oneMonthFromNow && expDate >= now) {
              count++;
           }
        });
        setExpiringSoonCount(count);
      } else {
        console.error("Failed to fetch products");
        if(response.status === 401) navigate('/login');
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  }, [navigate, search, expiryFilter]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this vehicle?")) return;
    
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/api/products/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        fetchProducts(); // Refresh the list
      } else {
        alert("Failed to delete the vehicle.");
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert("An error occurred while deleting.");
    }
  };

  const openEditModal = (vehicle) => {
    setEditingVehicle(vehicle);
    setEditError('');
    setEditFormData({
      title: vehicle.title,
      amount: vehicle.amount,
      upcCode: vehicle.upcCode || '',
      // Format date for the input[type=date] YYYY-MM-DD
      expiryDate: new Date(vehicle.expiryDate).toISOString().split('T')[0]
    });
  };

  const closeEditModal = () => {
    setEditingVehicle(null);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setEditLoading(true);
    setEditError('');

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/api/products/${editingVehicle._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(editFormData)
      });

      if (response.ok) {
        closeEditModal();
        fetchProducts();
      } else {
        const errData = await response.json();
        setEditError(errData.message || 'Failed to update vehicle.');
      }
    } catch (error) {
      console.error("Edit error:", error);
      setEditError("An error occurred while updating.");
    } finally {
      setEditLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative">
      <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
      <p className="mt-4 text-lg text-gray-600">
        Welcome back, <span className="font-semibold text-[var(--color-primary)]">{user.name || 'User'}</span>!
      </p>
      
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white overflow-hidden shadow rounded-lg border border-gray-100">
          <div className="px-4 py-5 sm:p-6">
            <dt className="text-sm font-medium text-gray-500 truncate">Total Vehicles</dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900">{loading ? '...' : data.total}</dd>
          </div>
        </div>
        <div className="bg-white overflow-hidden shadow rounded-lg border border-gray-100">
          <div className="px-4 py-5 sm:p-6">
            <dt className="text-sm font-medium text-gray-500 truncate">Expiring Soon (1 Month)</dt>
            <dd className="mt-1 text-3xl font-semibold text-red-600">{loading ? '...' : expiringSoonCount}</dd>
          </div>
        </div>
        <div 
          onClick={() => navigate('/add-vehicle')}
          className="bg-[var(--color-primary)] overflow-hidden shadow rounded-lg text-white flex items-center justify-center cursor-pointer hover:bg-blue-600 transition-colors"
        >
          <div className="px-4 py-5 sm:p-6 text-center font-medium">
            + Add New Vehicle
          </div>
        </div>
      </div>

      <div className="mt-12">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
          <h2 className="text-2xl font-bold text-gray-900">Your Vehicles</h2>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <input 
              type="text" 
              placeholder="Search by Title or UPC..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            />
            <select 
              value={expiryFilter} 
              onChange={(e) => setExpiryFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] bg-white"
            >
              <option value="">All Expiries</option>
              <option value="1_month">Expires in 1 Month</option>
              <option value="3_months">Expires in 3 Months</option>
              <option value="expired">Expired</option>
            </select>
          </div>
        </div>

        {loading ? (
           <p>Loading...</p>
        ) : data.products.length === 0 ? (
           <p className="text-gray-500">No vehicles found. {search || expiryFilter ? 'Try clearing your filters.' : 'Add your first vehicle!'}</p>
        ) : (
           <div className="bg-white shadow overflow-hidden sm:rounded-md border border-gray-200">
             <ul className="divide-y divide-gray-200">
               {data.products.map((product) => (
                 <li key={product._id}>
                   <div className="px-4 py-4 sm:px-6 hover:bg-gray-50 flex flex-col sm:flex-row sm:items-center justify-between">
                     <div className="flex-grow">
                       <div className="flex items-center">
                         <p className="text-lg font-medium text-[var(--color-primary)] truncate">
                           {product.title}
                         </p>
                         <p className="ml-4 px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                           Qty: {product.amount}
                         </p>
                       </div>
                       <div className="mt-2 sm:flex sm:justify-between">
                         <div className="sm:flex">
                           <p className="flex items-center text-sm text-gray-500">
                             UPC: {product.upcCode || 'N/A'}
                           </p>
                         </div>
                         <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-4">
                           <p>
                             Expires on: <span className="font-medium text-red-600"><time dateTime={product.expiryDate}>{new Date(product.expiryDate).toLocaleDateString()}</time></span>
                           </p>
                         </div>
                       </div>
                     </div>
                     
                     {/* Action Buttons */}
                     <div className="mt-4 sm:mt-0 flex gap-2">
                       <button 
                         onClick={() => openEditModal(product)}
                         className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium rounded transition-colors border border-gray-300"
                       >
                         Edit
                       </button>
                       <button 
                         onClick={() => handleDelete(product._id)}
                         className="px-3 py-1 bg-red-50 hover:bg-red-100 text-red-600 text-sm font-medium rounded transition-colors border border-red-200"
                       >
                         Delete
                       </button>
                     </div>
                   </div>
                 </li>
               ))}
             </ul>
           </div>
        )}
      </div>

      {/* Edit Modal Overlay */}
      {editingVehicle && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 relative">
            <h3 className="text-xl font-bold mb-4">Edit Vehicle</h3>
            {editError && <div className="mb-4 text-red-600 text-sm">{editError}</div>}
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <input required type="text" name="title" value={editFormData.title} onChange={handleEditChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">UPC Code</label>
                <input type="text" name="upcCode" value={editFormData.upcCode} onChange={handleEditChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Quantity</label>
                  <input required type="number" min="1" name="amount" value={editFormData.amount} onChange={handleEditChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Expiry Date</label>
                  <input required type="date" name="expiryDate" value={editFormData.expiryDate} onChange={handleEditChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" />
                </div>
              </div>
              <div className="mt-6 flex justify-end gap-3">
                <button type="button" onClick={closeEditModal} className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200">Cancel</button>
                <button type="submit" disabled={editLoading} className="px-4 py-2 text-white bg-[var(--color-primary)] rounded-md hover:bg-blue-600 disabled:opacity-50">
                  {editLoading ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
