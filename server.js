import express from "express";
import "dotenv/config";
import { routers } from "./src/routers/index.router.js";
import helmet from "helmet";
import morgan from "morgan";
import connectDatabase from "./lib/database.js";

const app = express();
const port = Number(process.env.PORT) || 8080;

app.use(express.json())
app.use(helmet());
// app.use(morgan('dev'))
routers(app);

connectDatabase();

app.post("/123", (req, res) => {
  console.log(req.body);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
