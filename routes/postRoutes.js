const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
const authController =  require('../controllers/authController')

router
  .route("/")
  .get(postController.getAllPosts)
  .post(authController.protect, postController.createPost);

router
  .route("/:id?")
  .get(postController.getPost)
  .delete(authController.protect, postController.deletePost)
  .patch(authController.protect, postController.updatePost);

module.exports = router;
