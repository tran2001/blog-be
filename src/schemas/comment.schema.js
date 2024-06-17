import mongoose from "mongoose";

const COMMENT_MODEL = "comments";

const commentSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "users",
    },
    time: {
      type: Date,
      required: true,
      default: new Date(),
    },
  },
  { timestamps: true, collection: COMMENT_MODEL }
);

export default mongoose.model(COMMENT_MODEL, commentSchema);
