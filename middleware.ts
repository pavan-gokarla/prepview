import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "./auth";

export async function middleware(request: NextRequest) {
    const user = await auth();
    console.log("middleware", user);
    if (
        !user &&
        request.nextUrl.pathname !== "/sign-in" &&
        request.nextUrl.pathname !== "/sign-up"
    ) {
        return NextResponse.redirect(new URL("/sign-in", request.url));
    }
    return NextResponse.next();
}

export const config = {
    matcher: ["/sign-in", "/sign-up", "/"],
};
