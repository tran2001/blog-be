import {
  commentBlogController,
  createBlogController,
  deleteBlogController,
  getAllBlogController,
  getOneBlogController,
  updateBlogController,
} from "../../controllers/blog/blog.controller.js";

export default async (router) => {
  router.use("/blogs", router);
  router
    .post("/create", createBlogController)
    .post("/update/:blogId", updateBlogController)
    .post("/comment/:blogId", commentBlogController)
    .get("/", getAllBlogController)
    .get("/:blogId", getOneBlogController)
    .delete("/:blogId", deleteBlogController );
    
};
