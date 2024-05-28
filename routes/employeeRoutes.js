const express = require("express");
const router = express.Router();
const employeecontroller = require("../controllers/employeecontroller");
const authController = require("../controllers/authController");
const postController = require("../controllers/postController")

router
  .route("/")
  .get(employeecontroller.getAllEmployees)
  .post(
    // authController.protect,
    postController.uploadPostsImages,
    postController.resizeCoverImages,
    postController.resizePostPhotosAndVideos,
    employeecontroller.createEmployee
  );

router
  .route("/:id?")
  .get(employeecontroller.getEmployee)
  .delete(
    // authController.protect,
     employeecontroller.deleteEmployee)
  .patch(
    // authController.protect,
    postController.uploadPostsImages,
    postController.resizeCoverImages,
    postController.resizePostPhotosAndVideos,
    employeecontroller.updateEmployee
  );

module.exports = router;
