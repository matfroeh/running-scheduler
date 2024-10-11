import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(cors()); // caution!
app.use(express.json());

app.use((req, res) => {
  res.status(404).send("Route not found");
});

app.listen(PORT, () =>
  console.log(`Server is running on http://localhost:${PORT}`)
);