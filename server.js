import express from "express";
import "dotenv/config";
import { routers } from "./src/routers/index.router.js";
import helmet from "helmet";
import morgan from "morgan";
import connectDatabase from "./lib/database.js";
import cors from "cors";

const app = express();
const port = Number(process.env.PORT) || 8080;

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(express.json());
app.use(helmet());
app.use(cors(corsOptions));
app.use(morgan('dev'))
routers(app);

connectDatabase();

app.post("/123", (req, res) => {
  console.log(req.body);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
