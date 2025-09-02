import {NextResponse} from 'next/server';

export const config = {
    matcher: "/",
};

export function middleware(req) {
    return NextResponse.redirect(new URL("/sobre", req.url));
}
