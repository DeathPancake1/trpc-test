import { createHTTPHandler } from '@trpc/server/adapters/standalone';
import { publicProcedure, router } from './trpc';
import cors from 'cors';
import express from 'express';
import { z } from 'zod';
import { PrismaClient } from '@prisma/client'
import { renderTrpcPanel } from "trpc-panel";
import { title } from 'process';


const prisma = new PrismaClient()
const app = express();
app.use(express.json());
app.use(cors());
const loginRouter = router({
  login: publicProcedure.input(z.object({ email: z.string(), password: z.string()})).query(async (opts) => {
    const { input } = opts;
    const checked = prisma.user.findFirst({
      where: {
        'AND': [
          {email: input.email},
          {password: input.password}
        ]
      }
    })
    return checked;
  }),
  register: publicProcedure
    .input(z.object({ username: z.string(), email: z.string().nonempty('Email is required'), password: z.string().nonempty('Password is required'), }))
    .mutation(({ input }) => {
      const user = input;
      const created = prisma.user.create({data: user});
      return created;
    }),
  
});

const todoRouter = router({
  getTodos: publicProcedure
    .input(z.number())
    .query( async (opts) => {
      const {input} = opts;
      const todos = await prisma.todo.findMany({
        where: {
          authorId: input
        }
      });
      return todos;
    }),
  addTodo: publicProcedure
    .input(z.object({ authorId: z.number(), title: z.string().nonempty('Title should not be empty') }))
    .mutation( async (opts) => {
      const {input} = opts;
      await prisma.todo.create({
        data: {
          title: input.title,
          author: { connect: { id: input.authorId } },
          finished: false
        }
      });
    }),
});

const appRouter = router({
  log: loginRouter,
  todo: todoRouter,
});

const trpcHandler = createHTTPHandler({
  router: appRouter,
  createContext: () => {
    return {
      prisma,
    };
  },
});
app.use("/panel", (_, res) => {
  return res.send(
    renderTrpcPanel(appRouter, { url: "http://localhost:8000" })
  );
});

// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter;

app.use('/trpc', trpcHandler);

app.listen(8000, () => {
  console.log('Server running on port 8000');
});
