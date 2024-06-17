import express from "express";
import authRouter from "./auth/auth.router.js";
import blogRouter from "./blog/blog.router.js";

const router = express.Router();

export const routers = (app) => {
  app.get("/", (req, res) => {
    res.send("Hello Express, I'm");
  });

  //localhost:8181/api/hello
  app.use("/api/", router);

  //User Router
  authRouter(router);

  blogRouter(router)
};
