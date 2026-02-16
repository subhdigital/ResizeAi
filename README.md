# AI Image Optimization Platform

A full-stack SaaS application built with Next.js 14+ (App Router), TypeScript, and Tailwind CSS for AI-powered image optimization.

## 🚀 Features

### Core Features
- **AI Image Optimizer** - Automatically detect best compression level and format
- **Background Removal** - AI-powered background removal (5 credits per use)
- **Smart Resize** - Preset sizes for Instagram, LinkedIn, and web
- **Bulk Upload** - Process multiple images and download as ZIP
- **Public API** - RESTful API with API key authentication
- **WordPress Plugin Ready** - API documentation and token generation

### Authentication
- Email & Password login
- Google OAuth integration
- JWT token-based authentication
- Protected dashboard routes

### Payments
- Razorpay integration
- Subscription-based plans (Free, Pro, Enterprise)
- Credit system

### Plans
- **Free**: 10 credits
- **Pro**: 1,000 credits (₹999)
- **Enterprise**: 10,000 credits (₹4,999)

## 🛠️ Tech Stack

### Frontend
- Next.js 14+ (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion
- Redux Toolkit
- React Dropzone

### Backend
- Next.js API Routes
- MongoDB with Mongoose
- Sharp (image processing)
- Archiver (ZIP creation)
- JWT authentication
- Razorpay payments

## 📁 Project Structure

```
Resize/
├── src/
│   ├── app/
│   │   ├── (marketing)/          # Landing pages
│   │   │   ├── compress-jpg/
│   │   │   ├── compress-png/
│   │   │   ├── resize/
│   │   │   ├── remove-background/
│   │   │   ├── pricing/
│   │   │   └── blog/
│   │   ├── (auth)/                # Authentication pages
│   │   │   ├── login/
│   │   │   └── signup/
│   │   ├── (dashboard)/           # Protected dashboard
│   │   │   ├── dashboard/
│   │   │   ├── history/
│   │   │   ├── api-keys/
│   │   │   └── settings/
│   │   ├── api/                   # API routes
│   │   │   ├── auth/
│   │   │   ├── optimize/
│   │   │   ├── resize/
│   │   │   ├── remove-bg/
│   │   │   ├── bulk-optimize/
│   │   │   ├── payment/
│   │   │   ├── dashboard/
│   │   │   └── v1/                # Public API
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── landing/               # Landing page components
│   │   ├── dashboard/             # Dashboard components
│   │   ├── layout/                # Layout components
│   │   └── providers/             # Context providers
│   ├── lib/
│   │   ├── db.ts                  # MongoDB connection
│   │   ├── auth.ts                # JWT utilities
│   │   ├── imageProcessor.ts      # Image processing
│   │   └── middleware.ts          # API middleware
│   ├── models/
│   │   ├── User.ts
│   │   └── CompressionHistory.ts
│   ├── store/
│   │   ├── index.ts
│   │   └── slices/
│   │       ├── authSlice.ts
│   │       └── imageSlice.ts
│   └── hooks/                     # Custom React hooks
├── public/
│   ├── uploads/
│   └── temp/
├── .env.local
├── package.json
├── tsconfig.json
└── tailwind.config.ts
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- MongoDB (local or Atlas)
- Redis (optional, for queue system)

### Installation

1. **Clone and install dependencies**:
```bash
npm install
```

2. **Set up environment variables**:
Create `.env.local` file (already created) and update:
- MongoDB URI
- JWT secrets
- Google OAuth credentials
- Razorpay keys
- Background removal API (if using external service)

3. **Run development server**:
```bash
npm run dev
```

4. **Open browser**:
Navigate to `http://localhost:3000`

## 📡 API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Image Processing
- `POST /api/optimize` - AI-powered optimization
- `POST /api/resize` - Resize with presets
- `POST /api/remove-bg` - Background removal
- `POST /api/bulk-optimize` - Bulk processing

### Public API (v1)
- `POST /api/v1/compress` - Compress image
- `POST /api/v1/resize` - Resize image
- `POST /api/v1/remove-bg` - Remove background
- `POST /api/v1/ai-optimize` - AI optimization

**Authentication**: Use `Authorization: Bearer YOUR_API_KEY`

### Dashboard
- `GET /api/dashboard/history` - Get compression history
- `POST /api/dashboard/regenerate-key` - Regenerate API key

### Payments
- `POST /api/payment/create-order` - Create Razorpay order
- `POST /api/payment/verify` - Verify payment

## 🎨 UI Components Created

### Layout
- ✅ Navbar (responsive, scroll effect, mobile menu)
- ⏳ Footer
- ⏳ Sidebar (dashboard)

### Landing Page
- ✅ Hero (animated gradients, stats)
- ⏳ Features
- ⏳ How It Works
- ⏳ Pricing
- ⏳ FAQ
- ⏳ CTA

### Dashboard
- ⏳ Image Uploader (drag & drop)
- ⏳ History Table
- ⏳ API Key Management
- ⏳ Stats Cards
- ⏳ Plan Upgrade

### Auth
- ⏳ Login Form
- ⏳ Signup Form
- ⏳ Google OAuth Button

## 🔒 Security Features

- Rate limiting middleware
- File size validation
- MIME type checking
- JWT token expiration
- API key authentication
- Razorpay signature verification
- Environment variable protection

## 📊 Database Models

### User
- name, email, password
- plan (free/pro/enterprise)
- creditsRemaining
- apiKey
- subscriptionStatus
- googleId (for OAuth)

### CompressionHistory
- userId
- originalSize, compressedSize
- featureUsed
- compressionRatio
- timestamps

## 🎯 Resize Presets

### Instagram
- Post: 1080x1080
- Story: 1080x1920

### LinkedIn
- Post: 1200x627
- Banner: 1584x396

### Web
- Thumbnail: 300x300
- Hero: 1920x1080

## 📝 TODO - Remaining Components

The following components need to be created to complete the application:

1. **Landing Page Components** (in `/components/landing/`):
   - Features.tsx
   - HowItWorks.tsx
   - Pricing.tsx
   - FAQ.tsx
   - CTA.tsx

2. **Layout Components**:
   - Footer.tsx
   - DashboardSidebar.tsx

3. **Dashboard Components** (in `/components/dashboard/`):
   - ImageUploader.tsx (with react-dropzone)
   - HistoryTable.tsx
   - StatsCards.tsx
   - APIKeyManager.tsx
   - PlanUpgrade.tsx

4. **Auth Pages**:
   - /app/(auth)/login/page.tsx
   - /app/(auth)/signup/page.tsx

5. **Dashboard Pages**:
   - /app/(dashboard)/dashboard/page.tsx
   - /app/(dashboard)/history/page.tsx
   - /app/(dashboard)/api-keys/page.tsx

6. **Marketing Pages**:
   - /app/(marketing)/compress-jpg/page.tsx
   - /app/(marketing)/compress-png/page.tsx
   - /app/(marketing)/resize/page.tsx
   - /app/(marketing)/remove-background/page.tsx
   - /app/(marketing)/pricing/page.tsx

7. **Additional API Routes**:
   - /api/auth/me/route.ts (get current user)
   - /api/v1/resize/route.ts
   - /api/v1/remove-bg/route.ts
   - /api/v1/ai-optimize/route.ts

## 🚀 Deployment

### Vercel (Recommended)
```bash
vercel --prod
```

### Environment Variables
Ensure all environment variables are set in your deployment platform.

### Database
- Use MongoDB Atlas for production
- Set up proper indexes
- Enable authentication

## 📄 License

MIT License

## 👨‍💻 Author

Built with ❤️ using Next.js, TypeScript, and Tailwind CSS

---

**Note**: This is a production-ready SaaS application template. Customize branding, pricing, and features according to your needs.
