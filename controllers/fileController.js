const File = require("../models/fileModel")
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.getAllFiles = catchAsync(async (req, res) => {
    const files = await File.find();
    res.status(200).json({
      status: "success",
      data: {
        files,
      },
    });
  });
  
  exports.getFile = catchAsync(async (req, res) => {
    const file = await File.findById(req.params.id);

    if (!file) {
      return next(new AppError("no post found with that id", 404));
    }
  
    res.status(200).json({
      status: "success",
      data: {
        file,
      },
    });
  });
  
  exports.createFile = catchAsync(async (req, res) => {
    const file = await File.create(req.body);
  
    res.status(201).json({
      status: "success",
      data: {
        file,
      },
    });
  });
  
  exports.deleteFile = catchAsync(async (req, res) => {
    const file = await File.findByIdAndDelete(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
  
    res.status(204).json({
      status: "success",
      data: {
        file,
      },
    });
  });
  
  exports.updateFile = catchAsync(async (req, res) => {
    const file = await File.findByIdAndDelete(req.prams.id, req.body, {
      new: true,
      runValidators: true,
    });
  
    res.status(200).json({
      status: "success",
      data: {
        file,
      },
    });
  });