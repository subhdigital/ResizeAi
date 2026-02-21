import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const secret = new TextEncoder().encode(JWT_SECRET);

// Routes that should redirect to dashboard if already authenticated
const authRoutes = ['/login', '/register'];

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Get token from cookie
    const token = request.cookies.get('token')?.value;

    let user: any = null;
    if (token) {
        try {
            const { payload } = await jwtVerify(token, secret);
            user = payload;
        } catch (error) {
            console.error('JWT Verification Error in Middleware:', error);
            // If token is invalid, we'll treat user as null
        }
    }

    // Check paths
    const isAdminRoute = pathname.startsWith('/admin');
    const isAdminLoginPage = pathname === '/admin/login';
    const isUserAuthPage = authRoutes.some(route => pathname.startsWith(route));
    const isDashboardRoute = pathname.startsWith('/dashboard');

    // 1. Admin Routes Protection
    if (isAdminRoute) {
        // A. If already an admin
        if (user?.role === 'admin') {
            // Already admin, but trying to hit the login page again -> send to admin dashboard
            if (isAdminLoginPage) {
                return NextResponse.redirect(new URL('/admin', request.url));
            }
            // Otherwise, they are an admin hitting a normal admin route, let them pass
        } else {
            // B. If NOT an admin (either logged out, or a regular user)
            if (!isAdminLoginPage) {
                // Hitting a protected admin route -> force to admin login
                const loginUrl = new URL('/admin/login', request.url);
                return NextResponse.redirect(loginUrl);
            }
            // If they ARE hitting the login page, let them pass so they can actually log in
        }
    }

    // 2. User Dashboard Protection
    if (isDashboardRoute && !user) {
        const loginUrl = new URL('/login', request.url);
        loginUrl.searchParams.set('redirect', pathname);
        return NextResponse.redirect(loginUrl);
    }

    // 3. Prevent logged-in users from accessing user login/register pages
    if (isUserAuthPage && user) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    return NextResponse.next();
}

// Configure which routes use this middleware
export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes handled by their own HOCs)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - public folder
         */
        '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*|public).*)',
    ],
};
