# AI Image Optimization Platform - Architecture

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         CLIENT LAYER                             │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │   Landing    │  │     Auth     │  │  Dashboard   │          │
│  │    Pages     │  │    Pages     │  │    Pages     │          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
│         │                  │                  │                  │
│         └──────────────────┴──────────────────┘                  │
│                            │                                     │
│                  ┌─────────▼─────────┐                          │
│                  │   Redux Store     │                          │
│                  │  (State Mgmt)     │                          │
│                  └─────────┬─────────┘                          │
│                            │                                     │
└────────────────────────────┼─────────────────────────────────────┘
                             │
                    ┌────────▼────────┐
                    │   API Layer     │
                    │  (Next.js API)  │
                    └────────┬────────┘
                             │
        ┌────────────────────┼────────────────────┐
        │                    │                    │
┌───────▼────────┐  ┌────────▼────────┐  ┌───────▼────────┐
│  Authentication │  │ Image Processing│  │    Payment     │
│   Middleware    │  │   Middleware    │  │   Middleware   │
└───────┬────────┘  └────────┬────────┘  └───────┬────────┘
        │                    │                    │
        │         ┌──────────▼──────────┐         │
        │         │   Sharp Library     │         │
        │         │ (Image Processing)  │         │
        │         └─────────────────────┘         │
        │                                         │
        └────────────────┬────────────────────────┘
                         │
        ┌────────────────┼────────────────┐
        │                │                │
┌───────▼────────┐  ┌────▼─────┐  ┌──────▼──────┐
│    MongoDB     │  │  Redis   │  │  Razorpay   │
│   (Database)   │  │ (Cache)  │  │  (Payment)  │
└────────────────┘  └──────────┘  └─────────────┘
```

## Data Flow

### 1. Image Upload & Optimization Flow
```
User Upload
    │
    ▼
┌─────────────────┐
│ ImageUploader   │ (React Component)
│ (Drag & Drop)   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Redux Store     │ (State Management)
│ - uploadedFiles │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ POST /api/      │
│ optimize        │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Auth Middleware │ (JWT Verification)
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Check Credits   │ (User Model)
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Sharp Processing│
│ - AI Optimize   │
│ - Format Select │
│ - Compress      │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Save History    │ (MongoDB)
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Deduct Credits  │ (User Model)
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Return Image    │ (Buffer)
└─────────────────┘
```

### 2. Authentication Flow
```
User Login
    │
    ▼
┌─────────────────┐
│ POST /api/auth/ │
│ login           │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Find User       │ (MongoDB)
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Verify Password │ (bcrypt)
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Generate JWT    │ (jsonwebtoken)
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Return Token    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Redux Store     │
│ - setUser       │
│ - setToken      │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Redirect to     │
│ Dashboard       │
└─────────────────┘
```

### 3. Payment Flow
```
User Selects Plan
    │
    ▼
┌─────────────────┐
│ POST /api/      │
│ payment/create  │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Create Razorpay │
│ Order           │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Return Order ID │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Razorpay        │
│ Checkout Modal  │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ POST /api/      │
│ payment/verify  │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Verify Signature│ (crypto)
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Update User     │
│ - Add Credits   │
│ - Update Plan   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Success         │
│ Confirmation    │
└─────────────────┘
```

## Database Schema

### User Collection
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String (hashed),
  plan: Enum ['free', 'pro', 'enterprise'],
  creditsRemaining: Number,
  apiKey: String (unique),
  subscriptionStatus: Enum ['active', 'inactive', 'cancelled'],
  subscriptionId: String,
  googleId: String (optional),
  image: String (optional),
  createdAt: Date,
  updatedAt: Date
}
```

### CompressionHistory Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: User),
  originalSize: Number,
  compressedSize: Number,
  featureUsed: Enum ['compress', 'resize', 'remove-bg', 'ai-optimize'],
  originalFormat: String,
  outputFormat: String,
  creditsUsed: Number,
  compressionRatio: Number,
  createdAt: Date
}
```

## API Routes Structure

```
/api
├── /auth
│   ├── /signup          POST   - Register new user
│   ├── /login           POST   - Login user
│   └── /me              GET    - Get current user
│
├── /optimize            POST   - AI image optimization
├── /resize              POST   - Resize with presets
├── /remove-bg           POST   - Background removal
├── /bulk-optimize       POST   - Bulk processing
│
├── /dashboard
│   ├── /history         GET    - Get compression history
│   └── /regenerate-key  POST   - Regenerate API key
│
├── /payment
│   ├── /create-order    POST   - Create Razorpay order
│   └── /verify          POST   - Verify payment
│
└── /v1 (Public API)
    ├── /compress        POST   - Compress image
    ├── /resize          POST   - Resize image
    ├── /remove-bg       POST   - Remove background
    └── /ai-optimize     POST   - AI optimization
```

## Component Hierarchy

```
App
├── ReduxProvider
│   └── Layout
│       ├── Navbar
│       └── Page Content
│           ├── Landing Page
│           │   ├── Hero
│           │   ├── Features
│           │   ├── HowItWorks
│           │   ├── Pricing
│           │   ├── FAQ
│           │   └── CTA
│           │
│           ├── Auth Pages
│           │   ├── Login
│           │   └── Signup
│           │
│           └── Dashboard
│               ├── Sidebar
│               ├── Stats Cards
│               ├── ImageUploader
│               ├── History Table
│               └── API Key Manager
│       └── Footer
```

## Security Layers

```
Request
    │
    ▼
┌─────────────────┐
│ Rate Limiting   │ (10 req/min)
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ CORS Policy     │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ JWT Verification│
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ File Validation │
│ - Size Check    │
│ - MIME Type     │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Credit Check    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Process Request │
└─────────────────┘
```

## Deployment Architecture

```
┌─────────────────────────────────────────┐
│            Vercel Edge Network           │
│  (CDN + Serverless Functions)           │
└────────────┬────────────────────────────┘
             │
    ┌────────┴────────┐
    │                 │
┌───▼────┐    ┌───────▼──────┐
│ Static │    │ API Routes   │
│ Assets │    │ (Serverless) │
└────────┘    └───────┬──────┘
                      │
         ┌────────────┼────────────┐
         │            │            │
    ┌────▼─────┐ ┌───▼────┐ ┌─────▼─────┐
    │ MongoDB  │ │ Redis  │ │ Razorpay  │
    │  Atlas   │ │ Cloud  │ │    API    │
    └──────────┘ └────────┘ └───────────┘
```

## Technology Stack

```
Frontend
├── Next.js 14+ (App Router)
├── TypeScript
├── Tailwind CSS
├── Framer Motion
├── Redux Toolkit
└── React Dropzone

Backend
├── Next.js API Routes
├── Node.js Runtime
├── Sharp (Image Processing)
├── Archiver (ZIP)
└── JWT (Authentication)

Database
├── MongoDB (Primary)
├── Mongoose (ODM)
└── Redis (Cache - Optional)

Payments
└── Razorpay

Deployment
├── Vercel (Hosting)
├── MongoDB Atlas (Database)
└── Cloudflare (CDN - Optional)
```

## Performance Optimization

```
┌─────────────────┐
│ Client Request  │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Edge Caching    │ (Vercel Edge)
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Redis Cache     │ (API Responses)
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ MongoDB Query   │ (Indexed)
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Image Processing│ (Sharp - Fast)
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Response        │
└─────────────────┘
```

---

This architecture ensures:
- ✅ Scalability
- ✅ Security
- ✅ Performance
- ✅ Maintainability
- ✅ Production-ready
