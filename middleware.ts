import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  const tokenCookie = request.cookies.get('access_token');
  const token = tokenCookie ? tokenCookie.value : null;

  const isTrainDashboardPage = request.nextUrl.pathname === `/`;
  const isAuthPage = request.nextUrl.pathname === `/auth`;

  if (!token) {
    // Allow unauthenticated users to access the home page
    if (isAuthPage) {
      return NextResponse.next();
    }

    // Redirect unauthenticated users trying to access protected routes
    if (isTrainDashboardPage) {
      return NextResponse.redirect(new URL('/auth?error=Please log in to use the app.', request.url));
    }
  }

  try {
    const response = await fetch(new URL('/api/verify-token', request.url).toString(), {
      method: 'POST',
      headers: {
        Cookie: `access_token=${token}`,
        'Authorization': `Bearer ${token}`
      }
    });

    if (response.status !== 200) {
      return NextResponse.redirect(new URL('/?error=Failed to authenticate user.', request.url));
    }

    // Redirect authenticated users from "/" to "/chats"
    if (isAuthPage) {
      return NextResponse.redirect(new URL('/', request.url));
    }

    return NextResponse.next();
  } catch (error) {
    // Redirect unauthenticated users trying to access protected routes
    if (isTrainDashboardPage) {
      return NextResponse.redirect(new URL('/auth?error=Please log in to use the app.', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/auth'] // Apply middleware to "/" and "/auth"
};
