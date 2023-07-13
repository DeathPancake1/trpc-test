import cors from 'cors';
import express from 'express';
import { renderTrpcPanel } from "trpc-panel";
import { router } from './trpc';
import authRouter from './entities/auth/auth.controller';
import { createHTTPHandler } from '@trpc/server/adapters/standalone';
import todoRouter from './entities/todo/todo.controller';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

const app = express();
app.use(express.json());
app.use(cors());
const appRouter = router({
    auth: authRouter,
    todo: todoRouter,
});

const trpcConfig = () =>{
    const trpcHandler = createHTTPHandler({
        router: appRouter,
        createContext: () => {
          return {
            prisma,
          };
        },
    });
    app.use('/trpc', trpcHandler);
}

const startTrpcPanel = ()=>{
    app.use("/panel", (_, res) => {
        return res.send(
          renderTrpcPanel(appRouter, { url: "http://localhost:8000" })
        );
    });
}

const startServer = ( port: number )=>{
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });    
}

export type AppRouter = typeof appRouter;
export {trpcConfig, startServer, startTrpcPanel};
export default prisma;