const express = require("express");
const router = express.Router();
const employeecontroller = require("../controllers/employeecontroller");

router
  .route("/")
  .get(employeecontroller.getAllEmployees)
  .post(employeecontroller.createEmployee);


  router
  .route("/:id?")
  .get(employeecontroller.getEmployee)
  .delete(employeecontroller.deleteEmployee)
  .patch(employeecontroller.updateEmployee)

  module.exports = router
