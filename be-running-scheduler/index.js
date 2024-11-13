import "./db/index.js";
import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import errorHandler from "./middleware/errorHandler.js";
import scheduleRouter from "./routes/scheduleRouter.js";
import runsRouter from "./routes/runsRouter.js";
import authRouter from "./routes/authRouter.js";
import userRouter from "./routes/userRouter.js";
import imageRouter from "./routes/imageRouter.js";

const app = express();
const PORT = process.env.PORT ?? 3000;
// Limit requests by IP to 1000 per 15min
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 1000,
});

// Not sure if this is needed for hosting on render
app.set("trust proxy", 1);

// Security headers
app.use(helmet());

// Limit requests from the same API
app.use(limiter);

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Limit body size (note that multiple .gpx files can be uploaded)
app.use(express.json({ limit: "50mb" }));

app.use("/schedules", scheduleRouter);
app.use("/runs", runsRouter);
app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/uploads", imageRouter);

app.use("*", (req, res) => {
  res.status(404).send("Not found");
});
app.use(errorHandler);

app.listen(PORT, () =>
  console.log(`Server is running on http://localhost:${PORT}`)
);
