import express from "express";
import "dotenv/config";
import { routers } from "./src/routers/index.router.js";
import helmet from "helmet";
import morgan from "morgan";
import connectDatabase from "./lib/database.js";
import cors from "cors";

const app = express();
const port = Number(process.env.PORT) || 8080;

const whitelist = process.env.CORS.split(",");
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.map((el) => el.trim()).indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

app.use(express.json());
app.use(helmet());
app.use(cors(corsOptions));
app.use(morgan("dev"));
routers(app);

connectDatabase();

app.get("/", (req, res) => {
  res.send("Express on Vercel");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
