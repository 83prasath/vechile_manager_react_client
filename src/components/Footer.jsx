import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="md:flex md:items-center md:justify-between">
          <div className="flex justify-center md:justify-start">
            <span className="text-gray-500 text-sm">
              &copy; {new Date().getFullYear()} VehicleCare Manager. All rights reserved.
            </span>
          </div>
          <div className="mt-4 flex justify-center md:mt-0 gap-6 text-sm text-gray-500">
            <a href="#" className="hover:text-[var(--color-primary)]">Privacy Policy</a>
            <a href="#" className="hover:text-[var(--color-primary)]">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
