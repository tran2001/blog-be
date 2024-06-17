import mongoose from "mongoose";

const BLOG_MODEL = "blogs";

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    background: {
      type: String,
      required: true,
    },
    theme: {
      type: String,
      required: true,
      default: "dark",
    },
    author: {
      type: String,
      required: true,
      default: "Eggie",
    },
    commentIds: [
      {
        type: mongoose.Types.ObjectId,
        ref: "comments",
      },
    ],
  },
  { timestamps: true, collection: BLOG_MODEL }
);

export default mongoose.model(BLOG_MODEL, blogSchema);
