const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
const authController = require("../controllers/authController");

router
  .route("/")
  .get(postController.getAllPosts)
  .post(
    // authController.protect,
    postController.uploadPostsImages,
    postController.resizeCoverImages,
    postController.resizePostPhotosAndVideos,
    postController.createPost
  );

router
  .route("/:id?")
  .get(postController.getPost)
  .delete(
    // authController.protect, 
    postController.deletePost)
  .patch(
    // authController.protect,
    postController.uploadPostsImages,
    postController.resizeCoverImages,
    postController.resizePostPhotosAndVideos,
    postController.updatePost
  );

module.exports = router;
