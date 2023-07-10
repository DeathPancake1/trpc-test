import { createHTTPServer } from '@trpc/server/adapters/standalone';
import { publicProcedure, router } from './trpc';

const appRouter = router({
  ping: publicProcedure.query(async () => {
    return true
  }),
});

// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter;

const server = createHTTPServer({
  router: appRouter,
});

server.listen(3000);
