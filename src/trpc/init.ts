import { initTRPC, TRPCError } from '@trpc/server';
import { getPayload } from 'payload';
import config from '@payload-config';
import superjson from 'superjson';
import { headers as getHeaders } from 'next/headers';

/**
 * Construit le contexte TRPC.
 * On lui passe la Request du handler (/api/trpc).
 */
export async function createTRPCContext(req: Request) {
  return { req };
}

/**
 * Initialise TRPC avec support superjson et typage du contexte.
 */
const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
});

/**
 * Helpers TRPC
 */
export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;

/**
 * Procédure de base
 * Injecte la db Payload (ctx.db)
 */
export const baseProcedure = t.procedure.use(async ({ ctx, next }) => {
  const payload = await getPayload({ config });

  return next({
    ctx: {
      ...ctx,
      db: payload,
    },
  });
});

/**
 * Procédure protégée
 * Vérifie qu'un utilisateur est connecté via payload.auth
 */
export const protectedProcedure = baseProcedure.use(async ({ ctx, next }) => {
  const headers = await getHeaders();
  const session = await ctx.db.auth({ headers });

  if (!session.user) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'Must be logged in!',
    });
  }

  return next({
    ctx: {
      ...ctx,
      session: {
        ...session,
        user: session.user,
      },
    },
  });
});
