import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "./auth";

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const isAuthPage =
        pathname.startsWith("/sign-in") || pathname.startsWith("/sign-up");
    const user = await auth();

    if (user && isAuthPage) {
        return NextResponse.redirect(new URL("/", request.url));
    }
    if (!user && !isAuthPage) {
        return NextResponse.redirect(new URL("/sign-in", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/sign-in",
        "/sign-up",
        "/",
        "/all-interviews",
        "/my-interviews",
        "/feedbacks",
    ],
};
