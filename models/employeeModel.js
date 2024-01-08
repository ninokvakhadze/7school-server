const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A employee must have a name"],
    trim: true,
  },
  text: {
    type: String,
    trim: true,
    required: [true, "A employee must have a Text"],
  },
  imageCover: {
    type: String,
    required: [true, "A employee must have a cover image"],
  },
  position: {
    type: String,
  },
});

const Employee = mongoose.model("employee", employeeSchema);
module.exports = Employee;
