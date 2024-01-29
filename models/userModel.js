const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const crypto = require('crypto')

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email'],
  },
  password: {
    type: String,
    required: [true, "please provide a password"],
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, "please confirm your password"],
    validate: {
      // this only works on SAVE!!!
      validator: function (el) {
        return el === this.password;
      },
      message: "passwords are not the same",
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date
  },
});

userSchema.pre("save",  async function (next) {
  //only run this code if password is modified
  if (!this.isModified("password")) return next();

  //hash password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);
  // delete passwordConfirm field
  this.passwordConfirm = undefined;
  next()
});

userSchema.pre("save", function (next){
  if(!this.isModified('password') || this.isNew) return next();

  this.passwordChangedAt = Date.now()
  next()
})

userSchema.methods.correctPassword = function(canndidatePassword, userPassword){
  return bcrypt.compare(canndidatePassword, userPassword)
}

userSchema.methods.changedPasswordAfter = function(JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );

    return JWTTimestamp < changedTimestamp;
  }

  // False means NOT changed
  return false;
};

userSchema.methods.createPasswordResetToken = function(){
  const resetToken = crypto.randomBytes(32).toString('hex')

  this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex')
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000
  console.log({resetToken}, this.passwordResetToken)

  return resetToken
}

const User = mongoose.model("user", userSchema);
module.exports = User;