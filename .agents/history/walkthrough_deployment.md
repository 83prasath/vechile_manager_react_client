# Walkthrough: Deployment Readiness Configuration

## Overview
I have prepared the React frontend and Express backend for deployment to Netlify and Render respectively. All hardcoded variables have been extracted to environment variables, and the security configuration has been updated to support cross-domain hosting.

## Components Built / Modified

### 1. Environment Variable Templates
- **Backend**: Created `.env.example` detailing `PORT`, `MONGODB_URI`, `JWT_SECRET`, `FRONTEND_URL`, and `NODE_ENV`.
- **Frontend**: Created `.env.example` detailing the `VITE_API_URL` variable needed by Vite.

### 2. Backend Security & CORS (`vechile_manager_express_server`)
- **`server.js`**: Updated the `cors` middleware to dynamically load the allowed origin from `process.env.FRONTEND_URL` and explicitly allowed `credentials: true`.
- **`authController.js`**: Reconfigured the JWT cookie to set `sameSite: 'none'` and `secure: true` when running in production. This allows your Render backend to set authentication cookies in the browser even when requested from your Netlify domain.

### 3. Frontend API Endpoints (`vechile_manager_react_client`)
- Removed all hardcoded `http://localhost:5001` strings across `api.js`, `Dashboard.jsx`, and `AddVehicle.jsx`.
- The application now pulls the API base URL from `import.meta.env.VITE_API_URL`. If this environment variable is missing (like during local development), it safely falls back to `http://localhost:5001`.

## Deployment Instructions

### MongoDB Atlas
1. Create a free cluster and grab your connection string. 
2. Ensure you whitelist `0.0.0.0/0` (Allow access from anywhere) so Render can connect to it.

### Render (Backend)
1. Create a new Web Service connected to your backend repository.
2. Under Environment Variables, copy the contents of your `vechile_manager_express_server/.env.example` and paste the real values:
   - `MONGODB_URI`: Your Atlas string
   - `JWT_SECRET`: Any long secure string
   - `FRONTEND_URL`: Put your Netlify URL here once it's created.
   - `NODE_ENV`: production

### Netlify (Frontend)
1. Create a new Site connected to your frontend repository.
2. Under Environment Variables, copy the contents of `vechile_manager_react_client/.env.example` and paste the real value:
   - `VITE_API_URL`: Your deployed Render URL (e.g., `https://vehicle-backend.onrender.com`).
3. Note: Vite builds environment variables at build-time. If you change `VITE_API_URL` later, you must trigger a rebuild on Netlify.
