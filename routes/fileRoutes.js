const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
const authController = require("../controllers/authController");
const filesController = require("../controllers/fileController");


router
  .route("/")
  .get(filesController.getAllFiles)
  .post(
    authController.protect,
    postController.uploadFiles,
    filesController.createFile
  );

  router
  .route("/:id?")
  .get(filesController.getFile)
  .delete(authController.protect, filesController.deleteFile)
  .patch(
    authController.protect,
    postController.uploadFiles,
    filesController.updateFile
  );

  module.exports = router;
