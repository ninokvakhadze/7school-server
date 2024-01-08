const Post = require("../models/postModel");

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

exports.getPost = async (req, res) => {
  const post = await Post.findById(req.params.id);
  // if (!post) {
  // }
  res.status(200).json({
    status: "success",
    data: {
      post,
    },
  });
};

exports.createPost = async (req, res) => {
  const newPost = await Post.create(req.body);
  res.status(201).json({
    status: "success",
    data: {
      post: newPost,
    },
  });
};

exports.deletePost = async (req, res, next) => {
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
};

exports.updatePost = async (req, res) => {
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
};
