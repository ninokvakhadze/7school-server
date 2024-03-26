const mongoose = require('mongoose')


const fileSchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, "A file must have a name"],
      trim: true,
    },
    file: {
      type: [{contentType: String, data: String}],
      required: [true, "A file is needed"],
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      // select: false
    }
  });
  
  
  
  const File = mongoose.model('file', fileSchema);
  
  module.exports = File;