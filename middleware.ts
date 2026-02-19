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
        // If it's the admin login page and we're already an admin, go to dashboard
        if (isAdminLoginPage && user?.role === 'admin') {
            return NextResponse.redirect(new URL('/admin', request.url));
        }

        // If it's NOT the login page and we're not an admin, go to admin login
        if (!isAdminLoginPage) {
            if (!user || user.role !== 'admin') {
                const loginUrl = new URL('/admin/login', request.url);
                if (pathname !== '/admin') loginUrl.searchParams.set('redirect', pathname);
                return NextResponse.redirect(loginUrl);
            }
        }

        // If we are logged in but not as admin, and trying to access admin pages
        if (user && user.role !== 'admin' && !isAdminLoginPage) {
            return NextResponse.redirect(new URL('/dashboard', request.url));
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
