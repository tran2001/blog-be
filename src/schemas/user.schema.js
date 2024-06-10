import mongoose from "mongoose";
import bcrypt from "bcrypt";

const USER_MODEL = "users";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      maxlength: 32,
      minlength: 1,
      required: true,
    },
    email: {
      type: String,
      maxlength: 64,
      minlength: 1,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, collection: USER_MODEL }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    return next();
  } catch (error) {
    return next(error);
  }
});

export default mongoose.model(USER_MODEL, userSchema);
