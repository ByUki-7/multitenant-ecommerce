import {  NextRequest, NextResponse } from "next/server";

export const config = {
    matcher: [
        "/((?!api/|_next/|_static/|_vercel|media/|[\w-]+\.\w+).*)",
    ]
};

export default async function middleware(req: NextRequest) {
    const url = req.nextUrl;
    // Extract the hostname (e.g., "jude.zantora.com" or "really-cool-shop.localhost:3000")
    const hostname = req.headers.get("host") || "";

    const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN || "";

    if (hostname.endsWith(`.${rootDomain}`)) {
        const tenantSlug = hostname.replace(`.${rootDomain}`, "");
        return NextResponse.rewrite(new URL(`/tenants/${tenantSlug}${url.pathname}`, req.url));
    }

    return NextResponse.next();
};