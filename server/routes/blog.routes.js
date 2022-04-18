const BlogController = require("../controllers/blog.controller");
const {authenticate} = require("../config/jwt.config")

module.exports = app =>{
    app.get("/check/index", BlogController.index);
    app.get("/api/blogs/getAll", BlogController.getAllBlogs);
    app.get("/api/blogs/getFoodBlogs", BlogController.getFoodBlogs);
    app.get("/api/blogs/getMusicBlogs", BlogController.getMusicBlogs);
    app.get("/api/blogs/getSportBlogs", BlogController.getSportBlogs);
    app.get("/api/blogs/:id", BlogController.getOneBlog);
    app.post("/api/blogs/new", authenticate, BlogController.createBlog);
    app.get("/api/blogsbyuser/:username", authenticate, BlogController.getAllBlogsByUser);
    app.patch("/api/blogs/:id/update", BlogController.updateBlog);
    app.delete("/api/blogs/:id/delete", BlogController.deleteBlog);
}