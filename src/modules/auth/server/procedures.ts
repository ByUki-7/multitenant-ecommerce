import { headers as getHeaders } from "next/headers";

import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import { registerSchema, loginSchema } from "../schemas";
import { generateAuthCookie } from "../utils";

export const authRouter = createTRPCRouter({
    session: baseProcedure.query(async ({ ctx }) => {
        const headers = await getHeaders()

        const session = await ctx.db.auth({ headers });

        console.log(session)

        return session;
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

            await generateAuthCookie({
                prefix: ctx.db.config.cookiePrefix,
                value: data.token,
            });
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

            await generateAuthCookie({
                prefix: ctx.db.config.cookiePrefix,
                value: data.token,
            });

            return data;
        }),
});