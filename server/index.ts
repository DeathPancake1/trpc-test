import {trpcConfig, startServer, startTrpcPanel} from './express';

trpcConfig();
startTrpcPanel();
startServer(8000);
