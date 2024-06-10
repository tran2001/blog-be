import {
  signinController,
  signupController,
} from "../../controllers/auth/auth.controller.js";

export default async (router) => {
  router.use("/auth", router);
  router.post("/signup", signupController).post("/signin", signinController);
};
