import {
  commentBlogService,
  createBlogService,
  deleteBlogService,
  getAllBlogService,
  updateBlogService,
  getOneBlogService
} from "../../services/blog/blog.service.js";

const createBlogController = async (req, res) => {
  const { title, content, background, theme, author } = await req.body;
  const blogServiceResponse = await createBlogService({
    title,
    content,
    background,
    theme,
    author,
  });
  return res.status(200).json(blogServiceResponse);
};

const updateBlogController = async (req, res) => {
  const { title, content, background, theme, author } = await req.body;
  const { blogId } = await req.params;
  const blogServiceResponse = await updateBlogService({
    blogId,
    title,
    content,
    background,
    theme,
    author,
  });
  return res.status(200).json(blogServiceResponse);
};

const commentBlogController = async (req, res) => {
  const { content, user, time } = await req.body;
  const { blogId } = await req.params;
  const blogServiceResponse = await commentBlogService({
    blogId,
    content,
    user,
    time,
  });
  return res.status(200).json(blogServiceResponse);
};

const getAllBlogController = async (req, res) => {
  const blogServiceResponse = await getAllBlogService();
  return res.status(200).json(blogServiceResponse);
};

const getOneBlogController = async (req, res) => {
  const { blogId } = await req.params;
  const blogServiceResponse = await getOneBlogService(blogId);
  return res.status(200).json(blogServiceResponse);
};

const deleteBlogController = async (req, res) => {
  const { blogId } = await req.params;
  const blogServiceResponse = await deleteBlogService(blogId);
  return res.status(200).json(blogServiceResponse);
};

export {
  createBlogController,
  updateBlogController,
  commentBlogController,
  getAllBlogController,
  getOneBlogController,
  deleteBlogController,
};
