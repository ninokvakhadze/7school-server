const Post = require("../models/postModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const multer = require("multer");
const sharp = require("sharp")


const multerStorage = multer.memoryStorage();


const upload = multer({
  storage: multerStorage,
});

exports.uploadPostsImages = upload.fields([
  { name: 'imageCover', maxCount: 1 },
  { name: 'images', maxCount: 30 },
  { name: 'file', maxCount: 1 }
]);

exports.uploadFiles = catchAsync(async (req, res, next) => {
 
  console.log(req.body)
  if (!req.files.file) return next();
  

  // 1) Cover image
  // req.body.imageCover = `tour-${req.params.id}-${Date.now()}-cover.jpeg`;
  base64File = Buffer.from(req.files.file[0].buffer).toString('base64');
  req.body.file = {
    data: base64File,
    contentType: req.files.file[0].mimetype
  };

  

console.log(req.body.file)

  next();
});

exports.resizeCoverImages = catchAsync(async (req, res, next) => {
 
  console.log(req.body)
  if (!req.files.imageCover) return next();
  

  // 1) Cover image
  // req.body.imageCover = `tour-${req.params.id}-${Date.now()}-cover.jpeg`;
  base64Image = Buffer.from(req.files.imageCover[0].buffer).toString('base64');
  req.body.imageCover = {
    data: base64Image,
    contentType: req.files.imageCover[0].mimetype
  };

  

console.log(req.body.imageCover)

  next();
});

exports.resizePostPhotosAndVideos= catchAsync(async (req, res, next) => {
 
  console.log(req.body)
  if (!req.files.images) return next();
  

  // 1) Cover image
  // req.body.imageCover = `tour-${req.params.id}-${Date.now()}-cover.jpeg`;
  req.body.images = req.files.images.map((file) => {
    const base64Image = Buffer.from(file.buffer).toString('base64');
    return {
      data: base64Image,
      contentType: file.mimetype
    };
  });
  

  


  next();
});




exports.getAllPosts = catchAsync(async (req, res) => {
  const posts = await Post.find();
  res.status(200).json({
    status: "success",
    data: {
      posts,
    },
  });
});

exports.getPost = catchAsync(async (req, res, next) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    return next(new AppError("no post found with that id", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      post,
    },
  });
});

exports.createPost = catchAsync(async (req, res) => {
  const newPost = await Post.create(req.body);
  
  res.status(201).json({
    status: "success",
    data: {
      post: newPost,
    },
  });

});

exports.deletePost = catchAsync(async (req, res, next) => {
  const post = await Post.findByIdAndDelete(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(204).json({
    status: "success",
    data: {
      post,
    },
  });
});

exports.updatePost = catchAsync(async (req, res) => {
  const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    status: "success",
    data: {
      post,
    },
  });
});
