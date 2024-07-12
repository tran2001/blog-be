import BlogModel from "../../schemas/blog.schema.js";
import CommentModel from "../../schemas/comment.schema.js";

const createBlogService = async (payload) => {
  const res = {
    statusCode: 200,
    message: "Create blog successfully",
    data: {},
  };
  try {
    const { title, content, background, theme, author } = payload;
    const requirements = { title, content, background, theme, author };
    const blog = await BlogModel.create(requirements);
    res.data = blog;
  } catch (error) {
    res.statusCode = 400;
    res.message = error.message;
  }
  return res;
};

const updateBlogService = async (payload) => {
  const res = {
    statusCode: 200,
    message: "Update blog successfully",
    data: {},
  };
  try {
    const { title, content, background, theme, author } = payload;
    const updateFields = { title, content, background, theme, author };
    const blog = await BlogModel.updateOne(
      { _id: payload.blogId },
      updateFields
    );
    res.data = blog;
  } catch (error) {
    res.statusCode = 400;
    res.message = error.message;
  }
  return res;
};

const commentBlogService = async (payload) => {
  const res = {
    statusCode: 200,
    message: "Comment blog successfully",
    data: {},
  };
  let time = new Date();
  console.log(time)
  try {
    const { content, user, blogId } = payload;
    const requirements = { content, user, time };
    const comment = await CommentModel.create(requirements);
    await BlogModel.updateOne(
      { _id: blogId },
      { $push: { commentIds: comment._id } }
    );
    res.data = comment;
  } catch (error) {
    res.statusCode = 400;
    res.message = error.message;
  }
  return res;
};

const getAllBlogService = async () => {
  const blog = await BlogModel.find().lean();
  return {
    statusCode: 200,
    message: "Get all blog successfully",
    data: blog,
  };
};

const getOneBlogService = async (payload) => {
  const res = {
    statusCode: 200,
    message: "Get one blog successfully",
    data: {},
  };
  try {
    const blogId = payload;
    const blog = await BlogModel.findById(blogId)
      .populate({
        path: "commentIds",
        populate: { path: "user" },
      })
      .lean();
    res.data = blog;
  } catch (error) {
    res.statusCode = 400;
    res.message = error.message; 
  }
  return res;
};

const deleteBlogService = async (payload) => {
  const res = {
    statusCode: 200,
    message: "Delete blog successfully",
    data: {},
  };
  try {
    const blogId = payload;
    const blog = await BlogModel.deleteOne({ _id: blogId });
    res.data = blog;
  } catch (error) {
    res.statusCode = 400;
    res.message = error.message;
  }
  return res;
};

export {
  createBlogService,
  updateBlogService,
  commentBlogService,
  getAllBlogService,
  getOneBlogService,
  deleteBlogService,
};
