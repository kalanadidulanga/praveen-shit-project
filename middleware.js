import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

// Auth pages - redirect to dashboard if logged in
const authPages = ['/login', '/register', '/forgot-password'];

// Protected pages - redirect to login if not authenticated
const protectedPages = [
  '/dashboard',
  '/profile',
  '/rewards',
  '/marketplace/create',
  '/settings',
  '/marketplace',
  '/collection'
];

export async function middleware(request) {
  try {
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET
    });

    const { pathname } = request.nextUrl;
    const isAuthRoute = authPages.some(page => pathname.startsWith(page));
    const isProtectedRoute = protectedPages.some(page => pathname.startsWith(page));

    // If it's a protected route and user is not authenticated
    if (isProtectedRoute && !token) {
      console.log('Protected route access denied - redirecting to login');
      const url = new URL('/login', request.url);
      url.searchParams.set('callbackUrl', encodeURI(pathname));
      return NextResponse.redirect(url);
    }

    // If it's an auth route and the user is authenticated
    if (isAuthRoute && token) {
      console.log('Auth route with active session - redirecting to dashboard');
      // Redirect based on user role
      if (token.userType === 'COLLECTOR') {
        return NextResponse.redirect(new URL('/collection', request.url));
      }
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    // Handle role-based access for dashboard
    if (pathname === '/dashboard' && token?.userType === 'COLLECTOR') {
      return NextResponse.redirect(new URL('/collection', request.url));
    }
    
    // Restrict collection routes for individual users
    if (pathname.startsWith('/collection') && token?.userType === 'INDIVIDUAL') {
      console.log('Individual user tried to access collection route - redirecting to dashboard');
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    return NextResponse.next();
  } catch (error) {
    console.error('Middleware error:', error);
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * 1. /api/ routes
     * 2. /_next/ (Next.js internals)
     * 3. /_static (inside /public)
     * 4. /_vercel (Vercel internals)
     * 5. Static files (e.g. /favicon.ico, /sitemap.xml, /robots.txt)
     */
    '/((?!api|_next|_static|_vercel|[\\w-]+\\.\\w+).*)',
  ],
};