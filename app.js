import express from "express";
import cors from "cors";
import watchlistRouter from "./routes/watchlistRoute.js";
import userRouter from "./routes/userRoutes.js";
import globalErrorHandler from "./controllers/errorController.js";
import AppError from "./utils/AppError.js";
const app = express();

app.use(
  cors({
    origin: "https://streampot-frontend.onrender.com",
    credentials: true,
  })
);

app.use(express.json());


app.use("/api/v2/watchlists/", watchlistRouter);
app.use("/api/v2/users", userRouter);

app.use("/{*any}", function (req, res, next) {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});
app.use(globalErrorHandler);

export default app;
