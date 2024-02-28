import { updateSession } from './util/supabase/middleware'
import { NextRequest } from 'next/server'
import { createClient } from './util/supabase/server'
import { NextResponse } from 'next/server'

export async function middleware(request: NextRequest) {
  const client = createClient()
  const {
    data: { user },
  } = await client.auth.getUser()

  // // If the user is not signed in and tries to access a protected route
  // if (!user && request.nextUrl.pathname !== '/login') {
  //   // const returnUrl = encodeURIComponent(request.nextUrl.pathname);
  //   return NextResponse.redirect(new URL(`/login`, request.url));
  // }

  // // // If user is signed in and attempts to access the login page, redirect to Home
  // if (user && request.nextUrl.pathname === '/login') {
  //   return NextResponse.redirect(new URL('/', request.url));
  // }

  return await updateSession(request)
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}

