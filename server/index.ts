import { createHTTPHandler } from '@trpc/server/adapters/standalone';
import { publicProcedure, router } from './trpc';
import cors from 'cors';
import express from 'express';

const app = express();
app.use(cors());
const appRouter = router({
  ping: publicProcedure.query(async () => {
    return true;
  }),
});

const trpcHandler = createHTTPHandler({
  router: appRouter,
});


// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter;

app.use('/trpc', trpcHandler);

app.listen(8000, () => {
  console.log('Server running on port 8000');
});
