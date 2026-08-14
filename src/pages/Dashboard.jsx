import React from 'react';

export default function Dashboard() {
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
      <p className="mt-4 text-lg text-gray-600">
        Welcome back, <span className="font-semibold text-[var(--color-primary)]">{user.name || 'User'}</span>!
      </p>
      
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Placeholder cards for future features */}
        <div className="bg-white overflow-hidden shadow rounded-lg border border-gray-100">
          <div className="px-4 py-5 sm:p-6">
            <dt className="text-sm font-medium text-gray-500 truncate">Total Vehicles</dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900">0</dd>
          </div>
        </div>
        <div className="bg-white overflow-hidden shadow rounded-lg border border-gray-100">
          <div className="px-4 py-5 sm:p-6">
            <dt className="text-sm font-medium text-gray-500 truncate">Expiring Soon</dt>
            <dd className="mt-1 text-3xl font-semibold text-red-600">0</dd>
          </div>
        </div>
        <div className="bg-[var(--color-primary)] overflow-hidden shadow rounded-lg text-white flex items-center justify-center cursor-pointer hover:bg-blue-600 transition-colors">
          <div className="px-4 py-5 sm:p-6 text-center font-medium">
            + Add New Vehicle
          </div>
        </div>
      </div>
    </div>
  );
}
