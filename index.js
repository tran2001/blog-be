import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import connectDatabase from "./lib/database.js";
import cors from "cors";
import { routers } from "./src/routers/index.router.js";
import bodyParser from "body-parser";

const app = express();
const port = Number(process.env.PORT) || 8080;
const allowedOrigins = ["https://eggogia.space", "http://localhost:5173/"];

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(bodyParser.json());
app.use(helmet());
app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
routers(app);

connectDatabase();

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
