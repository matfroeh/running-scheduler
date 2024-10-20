import './db/index.js';
import express from "express";
import cors from "cors";
import errorHandler from "./middleware/errorHandler.js";
import scheduleRouter from "./routes/scheduleRouter.js";
import runsRouter from "./routes/runsRouter.js";

const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(cors()); // caution!
app.use(express.json());

app.use('/schedules', scheduleRouter);
app.use('/runs', runsRouter);

app.use('*', (req, res) => {
  res.status(404).send("Not found");
});
app.use(errorHandler);

app.listen(PORT, () =>
  console.log(`Server is running on http://localhost:${PORT}`)
);