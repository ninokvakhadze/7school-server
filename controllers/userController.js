const User = require('../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require("../utils/appError");

exports.getAllUsers = catchAsync(async (req, res) => {

    // const users = await User.find();
    // res.status(200).json({
    //   status: "success",
    //   data: {
    //     users,
    //   },
    // });

    res.status(500).json(
      {
      status: 'error',
      message: 'this route is not yeat defined'
  
      })
});

exports.getUser = catchAsync(async (req, res, next) => {
  // const user = await User.findById(req.params.id);
   
  // if(!user){
  //  return next(new AppError('no user found with that id', 404))
  // }
  // res.status(200).json({
  //   status: "success",
  //   data: {
  //     user,
  //   },
  // });
  res.status(500).json(
    {
    status: 'error',
    message: 'this route is not yeat defined'

    })
});

exports.createUser = catchAsync(async (req, res) => {
  // const newUser = await User.create(req.body);
  // res.status(201).json({
  //   status: "success",
  //   data: {
  //     user: newUser,
  //   },
  // });
  res.status(500).json(
    {
    status: 'error',
    message: 'this route is not yeat defined'

    })
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  // const user = await User.findByIdAndDelete(req.params.id, req.body, {
  //   new: true,
  //   runValidators: true,
  // });

  // res.status(204).json({
  //   status: "success",
  //   data: {
  //     user,
  //   },
  // });
  res.status(500).json(
    {
    status: 'error',
    message: 'this route is not yeat defined'

    })
});

exports.updateUser = catchAsync(async (req, res) => {
  // const user = await User.findByIdAndUpdate(req.params.id, req.body, {
  //   new: true,
  //   runValidators: true,
  // });
  // res.status(200).json({
  //   status: "success",
  //   data: {
  //     user,
  //   },
  // });
  res.status(500).json(
    {
    status: 'error',
    message: 'this route is not yeat defined'

    })
});
