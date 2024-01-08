const Employee = require("../models/employeeModel");

exports.getAllEmployees = async (req, res) => {
  const employees = await Employee.find();

  try {
    res.json(employees);
  } catch (error) {
    console.error(employees);
    res.status(500).send("Internal Server Error");
  }
};

exports.getEmployee = async (req, res) => {
  const employee = await Employee.findById(req.params.id);

  res.status(200).json({
    status: "success",
    data: {
      employee,
    },
  });
};

exports.createEmployee = async (req, res) => {
  const employee = await Employee.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      employee,
    },
  });
};

exports.deleteEmployee = async (req, res) => {
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
};

exports.updateEmployee = async (req, res) => {
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
};
