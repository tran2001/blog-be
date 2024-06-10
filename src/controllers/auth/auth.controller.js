import {
  signinService,
  signupService,
} from "../../services/auth/auth.service.js";

const signupController = async (req, res) => {
  const { email, password, fullName } = await req.body;
  const userServiceResponse = await signupService({
    email,
    password,
    fullName,
  });
  return res.status(200).json(userServiceResponse);
};

const signinController = async (req, res) => {
  const { email, password } = await req.body;
  const userServiceResponse = await signinService({
    email,
    password,
  });
  return res.status(200).json(userServiceResponse);
};

export { signupController, signinController };
