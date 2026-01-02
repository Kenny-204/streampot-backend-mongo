import express from "express";
import cors from "cors";
import watchlistRouter from "./routes/watchlistRoute.js";
import userRouter from "./routes/userRoutes.js";
const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use("/api/v2/watchlists/", watchlistRouter);
app.use("/api/v2/users", userRouter);

export default app;
