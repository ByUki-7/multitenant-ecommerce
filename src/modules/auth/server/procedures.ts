import { headers as getHeaders, cookies as getCookies } from "next/headers";

import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import { AUTH_COOKIE } from "../constants";
import { registerSchema, loginSchema } from "../schemas";

export const authRouter = createTRPCRouter({
    session: baseProcedure.query(async ({ ctx }) => {
        const headers = await getHeaders()

        const session = await ctx.db.auth({ headers });

        console.log(session)

        return session;
    }),
    logout: baseProcedure.mutation(async () => {
        const cookies = await getCookies();
        cookies.delete(AUTH_COOKIE);
    }), 
    register: baseProcedure
        .input(registerSchema)
        .mutation(async ({ input, ctx }) => {
            const existingData = await ctx.db.find({
                collection: "users",
                limit: 1,
                where: {
                    username: {
                        equals: input.username,
                    },
                },
            });

            const existingUser = existingData.docs[0];

            if (existingUser) {
                throw new TRPCError({
                    code: "BAD_REQUEST",
                    message: "Username already exists",
                });
            }

            await ctx.db.create({
                collection: "users",
                data: {
                    email: input.email,
                    password: input.password, // This is hashed in the database
                    username: input.username,
                },
            });
            const data = await ctx.db.login({
                collection: "users",
                data: {
                    email: input.email,
                    password: input.password,
                },
            });

            if (!data.token) {
                throw new TRPCError ({
                    code: "UNAUTHORIZED",
                    message: "Failed to login",
                });
            }

            const cookies = await getCookies();
            cookies.set({
                name: AUTH_COOKIE,
                value: data.token,
                httpOnly: true,
                path: "/",
                // TODO: Ensure cross-domain cookie sharing
                // sameSite: "none",
                // domain: ""
            })
        }),


    login: baseProcedure
        .input(loginSchema)
        .mutation(async ({ input, ctx }) => {
            const data = await ctx.db.login({
                collection: "users",
                data: {
                    email: input.email,
                    password: input.password,
                },
            });

            if (!data.token) {
                throw new TRPCError ({
                    code: "UNAUTHORIZED",
                    message: "Failed to login",
                });
            }

            const cookies = await getCookies();
            cookies.set({
                name: AUTH_COOKIE,
                value: data.token,
                httpOnly: true,
                path: "/",
                // TODO: Ensure cross-domain cookie sharing
                // sameSite: "none",
                // domain: ""
            })

            return data;
        }),
});