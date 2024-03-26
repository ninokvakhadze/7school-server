const Employee = require("../models/employeeModel");
const catchAsync = require("../utils/catchAsync");

exports.getAllEmployees = catchAsync(async (req, res) => {
  const employees = await Employee.find();
  res.status(200).json({
    status: "success",
    data: {
      employees
    },
  });
});

exports.getEmployee = catchAsync(async (req, res) => {
  const employee = await Employee.findById(req.params.id);

   if (!employee) {
    return next(new AppError("no employee found with that id", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      employee,
    },
  });
});

exports.createEmployee = catchAsync(async (req, res) => {
  const employee = await Employee.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      employee,
    },
  });
});

exports.deleteEmployee = catchAsync(async (req, res) => {
  const employee = await Employee.findByIdAndDelete(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(204).json({
    status: "success",
    data: {
      employee,
    },
  });
});

exports.updateEmployee = catchAsync(async (req, res) => {
  const employee = await Employee.findByIdAndDelete(req.prams.id, re.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: "success",
    data: {
      employee,
    },
  });
});
