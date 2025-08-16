import { cookies as getCookies } from "next/headers";

interface Props {
    prefix: string;
    value: string;
}

export const generateAuthCookie = async ({
    prefix,
    value,
}: Props) => {
    const cookies = await getCookies();

        cookies.set({
            name: `${prefix}-token`, // payload-token by default (if change to zantora-token, then change here to `${ctx.db.config.cookiePrefix}-token`)
            value: value,
            httpOnly: true,
            path: "/",
            // This enabled the cookie auth on localhost
            // But won't work it subdomains
            ...(process.env.NODE_ENV !== "development" && {
                sameSite: "none",
                domain: process.env.NEXT_PUBLIC_ROOT_DOMAIN,
                secure: true,
            }),
        });
}