import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

// Middleware verify the request has a valid token, then login | redirect to login page

export async function middleware(req) {
    // Token will exist if user is logged in
    const token = await getToken({ req, secret: process.env.JWT_SECRET })
    console.log(token);

    const { pathname } = req.nextUrl;

    // Allow the requests if these conditions are TRUE:
    // 1- Its a request for next-auth session & provider fetching
    // 2- The the token exists
    if (pathname.includes('/api/auth') || token) {
        return NextResponse.next();
    }

    // Redirect to login if you don't have a token and request for a protectd route
    if (!token && pathname !== "/login") {
        return NextResponse.redirect('/login');
    }

    return NextResponse.next();
}