import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { getMyAccount } from "@/actions/profileAction";
import { NextResponse } from 'next/server';

const isProtectedRoute = createRouteMatcher(['/profile(.*)', '/profile/(.*)', '/problems(.*)', '/problems/(.*)', '/challenges(.*)', '/challenges/(.*)'
  , '/admin(.*)', '/admin/(.*)']);

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    const user = await getMyAccount();
    if (!user) {
      return NextResponse.redirect(new URL('/sign-in', req.url));
    }

    if (user.account.status !== 'active') {
      return NextResponse.redirect(new URL('/sign-in', req.url));
    }

    if (req.nextUrl.pathname.startsWith('/admin')) {

      if (user.account.role !== 'admin') {
        return NextResponse.redirect(new URL('/', req.url));
      }
    }
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};