# Walkthrough: Expired Filter & Barcode Scanner

## Overview
Added an "Expired" filter to the Dashboard and integrated a live HTML5 camera barcode scanner on the "Add Vehicle" page.

## Components Built / Modified

### 1. Backend Filter Logic
- Updated `src/services/productService.js` to correctly handle the `expired` query param. When `expiryFilter=expired` is passed, the database queries for products where the `expiryDate` is strictly less than the current date.

### 2. Dashboard Filter UI
- Updated the `Dashboard.jsx` dropdown selector to include an **"Expired"** option. Selecting this instantly updates the query and fetches only past-due vehicles.

### 3. Barcode Scanner (`AddVehicle.jsx`)
- Installed the `html5-qrcode` npm package.
- Added a **"Scan Barcode"** button right next to the UPC Code input.
- Clicking the button pops up a live camera viewfinder overlay.
- Once the camera successfully reads a barcode, it automatically sets the UPC Code input to the decoded text and closes the scanner.

## Results
The Dashboard now allows you to easily isolate vehicles that are currently expired. Furthermore, adding new vehicles is incredibly efficient; you can now use your device's camera to scan barcodes rather than manually typing long UPC strings.
