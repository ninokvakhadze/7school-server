const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A post must have a name"],
    trim: true,
  },
  text: {
    type: String,
    trim: true,
    required: [true, "A post must have a Text"],
  },
  imageCover: {
    type: {contentType: String, data: String},
    required: [true, 'A post must have a cover image']
  },
  images: {
    type: String,
  },
  videos: {
    type: {contentType: String, data: String}
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    // select: false
  }
});



const Post = mongoose.model('post', postSchema);

module.exports = Post;