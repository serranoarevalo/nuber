import app from "./app";
import { createConnection, Connection } from "typeorm";

const PORT: number | string = process.env.PORT || 4000;

const handleAppError = (error: NodeJS.ErrnoException): void =>
  console.log(error);

const handleListening = (): void =>
  console.log(`Listening on http://localhost:${PORT}`);

createConnection()
  .then(connection => {
    app.listen(PORT, handleListening);
  })
  .catch(error => console.log(error));

app.on("error", handleAppError);
