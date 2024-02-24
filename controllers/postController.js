const Post = require("../models/postModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const multer = require("multer");
const sharp = require("sharp")


const multerStorage = multer.memoryStorage();

// const multerFilter = (req, file, cb) => {
//   if (file.mimetype.startsWith('image')) {
//     cb(null, true);
//   } else {
//     cb(new AppError('Not an image! Please upload only images.', 400), false);
//   }
// };

const upload = multer({
  storage: multerStorage,
});

exports.uploadPostsImages = upload.fields([
  { name: 'imageCover', maxCount: 1 },
  { name: 'images', maxCount: 3 },
  { name: 'videos', maxCount: 3}
]);

exports.resizeTourImages = catchAsync(async (req, res, next) => {
 
  console.log(req.body)
  if (!req.files.imageCover || !req.files.images) return next();
  

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

exports.resizeTourVideos = catchAsync(async (req, res, next) => {
 
  console.log(req.body)
  if (!req.files.videos) return next();
  

  // 1) Cover image
  // req.body.imageCover = `tour-${req.params.id}-${Date.now()}-cover.jpeg`;
  base64Video = Buffer.from(req.files.videos[0].buffer).toString('base64');
  req.body.videos = {
    data: base64Video,
    contentType: req.files.videos[0].mimetype
  };

  

console.log(req.body.videos)

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
  console.log(83)
  console.log(newPost)
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
