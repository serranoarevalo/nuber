import app from "./app";
import { Options } from "graphql-yoga";
import { createConnection } from "typeorm";

const PORT: number | string = process.env.PORT || 4000;
const GRAPHQL_ENDPOINT: string = "/graphql";
const SUBSCRIPTIONS_ENDPOINT: string = "/subscriptions";
const PLAYGROUND_ENDPOINT: string = "/playground";

const handleAppError = (error: NodeJS.ErrnoException): void =>
  console.log(error);

const handleListening = (): void =>
  console.log(`Listening on http://localhost:${PORT}`);

const appOptions: Options = {
  port: PORT,
  subscriptions: SUBSCRIPTIONS_ENDPOINT,
  playground: PLAYGROUND_ENDPOINT,
  endpoint: GRAPHQL_ENDPOINT
};

createConnection().then(() => {
  app.start(appOptions, handleListening);
});

app.express.on("error", handleAppError);
