import app from "./app";

const PORT: number | string = process.env.PORT || 4000;

const handleAppError = (error: NodeJS.ErrnoException): void =>
  console.log(error);

const handleListening = (): void =>
  console.log(`Listening on http://localhost:${PORT}`);

app.listen(PORT, handleListening);

app.on("error", handleAppError);
