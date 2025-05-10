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
        })
}