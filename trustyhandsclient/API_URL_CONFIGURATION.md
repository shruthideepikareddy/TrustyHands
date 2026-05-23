# API URL Configuration Update

## Overview

All hardcoded backend API URLs in the React (Vite) client have been replaced with environment variable references. This allows easy configuration across different environments (development, staging, production) without code changes.

## Changes Made

### 1. **New API Utility File** (`src/utils/api.js`)

Created a centralized API configuration file that exports:

- `API_URL`: The base URL for all backend API calls, pulled from `import.meta.env.VITE_API_URL`
- `apiClient`: An axios instance with the baseURL pre-configured (for future use)

```javascript
import axios from "axios";

export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
export const apiClient = axios.create({ baseURL: API_URL });
```

### 2. **Updated Files** (10 files total)

All the following files have been updated to import and use `API_URL`:

#### Components:

- `src/components/BookingModal.jsx`
- `src/components/FeedbackModal.jsx`

#### Pages - Authentication:

- `src/pages/auth/CustomerDetails.jsx`
- `src/pages/auth/Login.jsx`
- `src/pages/auth/ResetPassword.jsx`
- `src/pages/auth/WorkerDetails.jsx`

#### Pages - Admin:

- `src/pages/admin/AdminDashboard.jsx`

#### Pages - Common:

- `src/pages/common/ContactUs.jsx`

#### Pages - User:

- `src/pages/user/CustomerDashboard.jsx`

#### Pages - Worker:

- `src/pages/worker/WorkerDashboard.jsx`

### 3. **URL Pattern Changes**

All hardcoded URLs have been converted from:

```javascript
axios.post("http://localhost:5000/api/auth/login", ...)
```

To:

```javascript
import { API_URL } from '../../utils/api';
axios.post(`${API_URL}/api/auth/login`, ...)
```

## Environment Configuration Files

### `.env.example`

Template showing the required environment variable:

```
VITE_API_URL=http://localhost:5000
```

### `.env.development`

Development environment configuration (used when running `npm run dev`):

```
VITE_API_URL=http://localhost:5000
```

### `.env.production`

Production environment configuration (used when running `npm run build`):

```
VITE_API_URL=https://api.yourdomain.com
```

## Usage

### For Development

1. Copy `.env.development` to `.env.local` (or it will be used automatically)
2. Keep the default `http://localhost:5000` or update if your backend runs elsewhere
3. Run `npm run dev`

### For Production

1. Build the project: `npm run build`
2. Set the `VITE_API_URL` environment variable on your hosting platform to your production API URL
3. Or create a `.env.production.local` file with the production API URL before building

### Environment Variable Priority

Vite loads environment files in this order (later overrides earlier):

1. `.env` (loaded in all cases)
2. `.env.local` (loaded in all cases, ignored by git)
3. `.env.[mode]` (e.g., `.env.production`)
4. `.env.[mode].local` (e.g., `.env.production.local`)
5. System environment variables

## Benefits

✅ **Environment-specific configuration**: Different URLs for dev, staging, and production without code changes
✅ **Security**: Production API URL can be set via environment variables without committing to repository
✅ **Centralized**: All API calls use the same base URL through the utility function
✅ **Fallback**: Defaults to `http://localhost:5000` if not set (useful for quick local development)
✅ **Consistency**: All axios calls now follow the same pattern

## Testing the Changes

To verify the changes work correctly:

1. Check that `.env.development` has `VITE_API_URL=http://localhost:5000`
2. Run `npm run dev`
3. Check the browser console to ensure no CORS or 404 errors from API calls
4. Verify a login or API call works as expected

## API Endpoints Still Using Hardcoded URLs

LocationFetcher component uses an external API (OpenStreetMap nominatim) which is not part of the TrustyHands backend:

- `src/components/LocationFetcher.jsx` - Uses `https://nominatim.openstreetmap.org/`

This is intentionally kept as-is since it's a third-party service, not the TrustyHands backend.

## Future Improvements

- Consider using an axios instance from `api.js` in all components for consistent error handling
- Add interceptors for authentication token management
- Implement request/response logging for debugging
