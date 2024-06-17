import jwt from "jsonwebtoken";
const generateAccessToken = (user) => {
  return jwt.sign(user.toJSON(), process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

export { generateAccessToken };
