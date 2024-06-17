import UserModel from "../../schemas/user.schema.js";
import nodemailer from "nodemailer";
import Email from "email-templates";
import hbs from "nodemailer-express-handlebars";
import { fileURLToPath } from "url";
import path from "path";
import { generateAccessToken } from "../../middlewares/jwt.middleware.js";
import bcrypt from "bcrypt";

const signinService = async (payload) => {
  const res = {
    statusCode: 200,
    message: "Login successfully!",
  };
  try {
    const { email, password } = payload;
    const existedUser = await UserModel.findOne({ email });
    if (!existedUser) {
      res.statusCode = 401;
      res.message = "Account doesn't exist!";
      return res;
    }
    if (existedUser) {
      if (!bcrypt.compareSync(password, existedUser.password)) {
        res.statusCode = 401;
        res.message = "Wrong password!";
        return res;
      } else {
        res.accessToken = generateAccessToken(existedUser);
        return res;
      }
    }
  } catch (error) {
    console.log(error.message);
    res.statusCode = 500;
    res.message = "Signup failed!";
  }
  return res;
};

const signupService = async (payload) => {
  const res = {
    statusCode: 200,
    message: "Signup successfully!",
    data: {},
  };
  try {
    const { email, password, fullName } = payload;
    const requirements = {
      email,
      password,
      fullName,
    };
    const existedUser = await UserModel.findOne({ email });
    if (existedUser) {
      res.statusCode = 400;
      res.message = "Email existed!";
      return res;
    }
    var options = {
      viewEngine: {
        extname: ".hbs", // handlebars extension
        layoutsDir: "emails/layouts", // location of handlebars templates
        // defaultLayout: "newbooking", // name of main template
      },
      viewPath: "emails",
      extName: ".hbs",
    };

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // Use `true` for port 465, `false` for all other ports
      auth: {
        user: process.env.MAIL,
        pass: process.env.MAIL_PASSWORD,
      },
    });

    transporter.use("compile", hbs(options));
    //send mail with options
    const mail = {
      from: process.env.MAIL,
      to: "tran2001123@gmail.com",
      subject: "Ciao",
      template: "email",
      context: {
        name: "Name",
      },
    };
    transporter.sendMail(mail);

    const user = await UserModel.create(requirements);
    res.data = user;
  } catch (error) {
    console.log(error.message);
    res.statusCode = 500;
    res.message = "Signup failed!";
  }
  return res;
};

export { signinService, signupService };
