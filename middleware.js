import { authMiddleware } from '@clerk/nextjs';
import createMiddleware from 'next-intl/middleware';
import { NextResponse } from 'next/server';

const publicRoutes = [
  '/landing',
  '/:locale/landing',
  '/:locale/pricing',
  '/:locale/contact',
  '/:locale/sso-callback',
  '/:locale/login',
  '/:locale/signup',
  '/sso-callback',
];

const intlMiddleware = createMiddleware({
  locales: ['en', 'he'],
  defaultLocale: 'en',
});

export default authMiddleware({
  beforeAuth: req => {
    // Execute next-intl middleware before Clerk's auth middleware
    return intlMiddleware(req);
  },
  afterAuth(auth, req) {
    const isHomePage =
      req.nextUrl.pathname === '/en' || req.nextUrl.pathname === '/he';
    if (!auth.userId && isHomePage) {
      const landingUrl = new URL('/landing', req.url);
      return NextResponse.redirect(landingUrl);
    }
    if (auth.userId && !auth.isPublicRoute) {
      return NextResponse.next();
    }
    return NextResponse.next();
  },
  apiRoutes: ['/api(.*)'],
  // Ensure that locale specific sign-in pages are public
  publicRoutes: publicRoutes,
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
