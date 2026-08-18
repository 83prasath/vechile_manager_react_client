# Walkthrough: Add Vehicle Frontend Feature

## Overview
Implemented the frontend UI and integration for the "Add Vehicle" (Add Product) functionality in the React client dashboard.

## Components Built / Modified

### 1. `src/App.jsx`
- Added the `<Route path="/add-vehicle" element={<AddVehicle />} />` to the router configuration to map the new page.

### 2. `src/pages/Dashboard.jsx`
- Replaced static placeholder data with dynamic API calls to `GET http://localhost:5001/api/products`.
- Implemented `useEffect` hook to fetch products securely using the JWT token stored in `localStorage`.
- Updated the "Total Vehicles" card to show the total count returned by the API.
- Implemented client-side naive counting to display the number of vehicles expiring within the next 1 month for the "Expiring Soon" metric card.
- Wired up the "+ Add New Vehicle" button to navigate to `/add-vehicle` using `react-router-dom`.
- Added a dynamic list view beneath the metric cards to render all fetched vehicles, including their Name, Quantity, UPC Code, and Expiry Date.

### 3. `src/pages/AddVehicle.jsx`
- Created a brand new form component to add vehicles.
- Captures `title` (Name), `upcCode` (Barcode), `amount` (Quantity), and `expiryDate`.
- Integrated `fetch` to send a `POST` request to `http://localhost:5001/api/products` on submission.
- Handles UI state management: loading states, error displaying, and success redirection back to the Dashboard.

## Results
The user can now successfully click "Add New Vehicle" on the dashboard, fill out the details for a vehicle/product, and save it to the backend database. The dashboard will automatically reflect the newly added data upon redirect.
