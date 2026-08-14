import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, CalendarClock, Camera } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      {/* Hero Section */}
      <div className="flex-grow flex flex-col justify-center items-center text-center px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-blue-50/50 to-white pt-20 pb-16">
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight max-w-4xl leading-tight">
          Manage your vehicle's <span className="text-[var(--color-primary)]">lifespan</span> with ease
        </h1>
        <p className="mt-6 text-xl text-gray-600 max-w-2xl mx-auto">
          Keep track of expiry dates for vehicle products, scan UPC codes, and ensure your vehicle is always in top condition.
        </p>
        
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/register"
            className="px-8 py-4 text-lg font-semibold rounded-xl text-white bg-[var(--color-primary)] hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          >
            Get Started Free
          </Link>
          <Link
            to="/login"
            className="px-8 py-4 text-lg font-semibold rounded-xl text-gray-700 bg-white border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all"
          >
            Sign In to Account
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-[var(--color-secondary)]">Manage Everything</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Everything you need to maintain your vehicle
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-3 lg:gap-y-16">
              <div className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--color-primary)]">
                    <CalendarClock className="h-6 w-6 text-white" />
                  </div>
                  Expiry Tracking
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">
                  Never miss an expiration date again. Get timely reminders for product renewals.
                </dd>
              </div>
              <div className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--color-primary)]">
                    <Camera className="h-6 w-6 text-white" />
                  </div>
                  UPC Scanning
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">
                  Quickly add products by scanning their UPC barcodes using your device's camera.
                </dd>
              </div>
              <div className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--color-primary)]">
                    <ShieldCheck className="h-6 w-6 text-white" />
                  </div>
                  Secure & Reliable
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">
                  Your data is safely stored and easily accessible whenever you need it most.
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
