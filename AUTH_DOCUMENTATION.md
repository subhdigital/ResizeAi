# Authentication System Documentation

## Overview

This is a complete, production-ready authentication system for the Resize AI SaaS application built with:

- **Next.js 14+** (App Router)
- **TypeScript**
- **Tailwind CSS v4**
- **MongoDB with Mongoose**
- **JWT Authentication**
- **bcrypt** for password hashing
- **HTTP-only cookies** for secure token storage
- **Redux Toolkit** for state management
- **Framer Motion** for animations

---

## Features Implemented

### ✅ Authentication Pages

1. **Login Page** (`/login`)
   - Email and password inputs
   - Show/hide password toggle
   - Remember me checkbox
   - Forgot password link
   - Google OAuth placeholder
   - Form validation
   - Error handling
   - Loading states
   - Responsive design

2. **Register Page** (`/register`)
   - Name, email, password, confirm password inputs
   - Password strength indicator (5 levels)
   - Show/hide password toggles
   - Terms & Conditions checkbox
   - Form validation
   - Success/error messages
   - Loading states
   - Responsive design

3. **Dashboard Page** (`/dashboard`)
   - Protected route (requires authentication)
   - User profile display
   - Plan information
   - Credits remaining
   - API key with copy functionality
   - Subscription status
   - Logout functionality
   - Responsive design

---

## API Endpoints

### POST `/api/auth/register`
Creates a new user account.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123!"
}
```

**Response:**
```json
{
  "message": "User created successfully",
  "user": {
    "id": "...",
    "name": "John Doe",
    "email": "john@example.com",
    "plan": "free",
    "creditsRemaining": 10,
    "apiKey": "aio_..."
  }
}
```

**Cookie Set:** `token` (HTTP-only, 7 days expiry)

---

### POST `/api/auth/login`
Authenticates a user.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "SecurePass123!"
}
```

**Response:**
```json
{
  "message": "Login successful",
  "user": {
    "id": "...",
    "name": "John Doe",
    "email": "john@example.com",
    "plan": "free",
    "creditsRemaining": 10,
    "apiKey": "aio_..."
  }
}
```

**Cookie Set:** `token` (HTTP-only, 7 days expiry)

---

### GET `/api/auth/me`
Gets the current authenticated user's information.

**Headers:** Cookie with `token` (automatically sent)

**Response:**
```json
{
  "user": {
    "id": "...",
    "name": "John Doe",
    "email": "john@example.com",
    "plan": "free",
    "creditsRemaining": 10,
    "apiKey": "aio_...",
    "subscriptionStatus": "active"
  }
}
```

---

### POST `/api/auth/logout`
Logs out the current user by clearing the auth cookie.

**Response:**
```json
{
  "message": "Logout successful"
}
```

**Cookie Cleared:** `token`

---

## Database Schema

### User Model (`/src/models/User.ts`)

```typescript
{
  name: string;              // Required
  email: string;             // Required, unique, lowercase
  password: string;          // Hashed with bcrypt (12 rounds)
  plan: 'free' | 'pro' | 'enterprise';  // Default: 'free'
  creditsRemaining: number;  // Default: 10 (from env)
  apiKey: string;            // Auto-generated, unique
  subscriptionStatus: 'active' | 'inactive' | 'cancelled';
  subscriptionId?: string;   // Optional
  googleId?: string;         // For OAuth
  image?: string;            // Profile picture
  createdAt: Date;           // Auto-generated
  updatedAt: Date;           // Auto-generated
}
```

---

## Security Features

### 🔒 HTTP-Only Cookies
- JWT tokens stored in HTTP-only cookies
- Prevents XSS attacks
- `sameSite: 'strict'` to prevent CSRF
- Secure flag in production
- 7-day expiration

### 🔐 Password Security
- Passwords hashed with bcrypt (12 rounds)
- Never stored in plain text
- Password field excluded from queries by default

### 🛡️ Middleware Protection
- Protected routes redirect to `/login` if not authenticated
- Auth routes redirect to `/dashboard` if already authenticated
- Token verification on every protected request

### ✅ Input Validation
- Email format validation
- Password strength requirements (min 8 characters)
- Password confirmation matching
- Terms acceptance required

---

## Route Protection

### Protected Routes
Routes that require authentication:
- `/dashboard`

### Auth Routes
Routes that redirect to dashboard if authenticated:
- `/login`
- `/register`

### Public Routes
All other routes are public.

---

## State Management

### Redux Store Structure

```typescript
{
  auth: {
    user: User | null;
    isAuthenticated: boolean;
    loading: boolean;
  },
  image: {
    // Image processing state
  }
}
```

### Auth Actions

- `setUser(user)` - Set authenticated user
- `updateCredits(credits)` - Update user credits
- `updateUser(partial)` - Update user data
- `logout()` - Clear user state
- `setLoading(loading)` - Set loading state

---

## Environment Variables

Required in `.env.local`:

```env
# MongoDB
MONGODB_URI=mongodb+srv://...

# JWT Secret (generate with: openssl rand -hex 32)
JWT_SECRET=your-secret-key-here

# NextAuth (optional for OAuth)
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here

# Google OAuth (optional)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Credits System
FREE_PLAN_CREDITS=10
PRO_PLAN_CREDITS=1000
ENTERPRISE_PLAN_CREDITS=10000
```

---

## Usage Examples

### Client-Side Authentication Check

```typescript
'use client';

import { useSelector } from 'react-redux';
import { RootState } from '@/store';

export default function MyComponent() {
  const { user, isAuthenticated, loading } = useSelector(
    (state: RootState) => state.auth
  );

  if (loading) return <div>Loading...</div>;
  if (!isAuthenticated) return <div>Please login</div>;

  return <div>Welcome, {user?.name}!</div>;
}
```

### Logout Function

```typescript
const handleLogout = async () => {
  await fetch('/api/auth/logout', { method: 'POST' });
  dispatch(logout());
  router.push('/login');
};
```

---

## File Structure

```
src/
├── app/
│   ├── login/
│   │   └── page.tsx           # Login page
│   ├── register/
│   │   └── page.tsx           # Register page
│   ├── dashboard/
│   │   └── page.tsx           # Protected dashboard
│   └── api/
│       └── auth/
│           ├── login/
│           │   └── route.ts   # Login endpoint
│           ├── register/
│           │   └── route.ts   # Register endpoint
│           ├── me/
│           │   └── route.ts   # Get user endpoint
│           └── logout/
│               └── route.ts   # Logout endpoint
├── components/
│   └── providers/
│       └── ReduxProvider.tsx  # Redux + Auth provider
├── lib/
│   ├── auth.ts                # JWT utilities
│   ├── db.ts                  # MongoDB connection
│   └── middleware.ts          # Auth middleware helper
├── models/
│   └── User.ts                # User schema
├── store/
│   ├── index.ts               # Redux store
│   └── slices/
│       └── authSlice.ts       # Auth state management
└── middleware.ts              # Next.js middleware (route protection)
```

---

## Testing the Authentication

### 1. Register a New User
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "SecurePass123!"
  }'
```

### 2. Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "SecurePass123!"
  }' \
  -c cookies.txt
```

### 3. Access Protected Route
```bash
curl http://localhost:3000/api/auth/me \
  -b cookies.txt
```

### 4. Logout
```bash
curl -X POST http://localhost:3000/api/auth/logout \
  -b cookies.txt
```

---

## Next Steps / Enhancements

### Recommended Additions:

1. **Email Verification**
   - Send verification email on registration
   - Verify email before allowing login

2. **Password Reset**
   - Forgot password flow
   - Email with reset token
   - Reset password page

3. **Google OAuth**
   - Implement NextAuth.js
   - Add Google provider
   - Merge OAuth accounts

4. **Rate Limiting**
   - Limit login attempts
   - Prevent brute force attacks
   - Use Redis for rate limiting

5. **Session Management**
   - Refresh tokens
   - Multiple device sessions
   - Force logout from all devices

6. **Two-Factor Authentication**
   - TOTP (Time-based One-Time Password)
   - SMS verification
   - Backup codes

7. **Audit Logging**
   - Track login attempts
   - Log security events
   - IP address tracking

---

## Troubleshooting

### Issue: "Unauthorized" on /api/auth/me
**Solution:** Ensure cookies are being sent with `credentials: 'include'`

### Issue: Middleware redirecting incorrectly
**Solution:** Check token verification in middleware.ts

### Issue: User not persisting after refresh
**Solution:** Check ReduxProvider is wrapping the app in layout.tsx

### Issue: CORS errors
**Solution:** Ensure same-origin requests or configure CORS properly

---

## Production Checklist

- [ ] Set `NODE_ENV=production`
- [ ] Use strong JWT_SECRET (32+ characters)
- [ ] Enable HTTPS
- [ ] Set secure cookie flag
- [ ] Add rate limiting
- [ ] Implement email verification
- [ ] Add password reset flow
- [ ] Set up monitoring/logging
- [ ] Add CAPTCHA to prevent bots
- [ ] Configure CSP headers
- [ ] Enable database backups
- [ ] Set up error tracking (Sentry)

---

## Support

For issues or questions, please refer to:
- Next.js Documentation: https://nextjs.org/docs
- MongoDB Documentation: https://docs.mongodb.com
- JWT Documentation: https://jwt.io

---

**Built with ❤️ for Resize AI**
