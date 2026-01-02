import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    validator: {
      validate: [validator.isEmail, "Please provide a valid email"],
    },
    required: [true, "Please provide your email"],
  },
  name: {
    type: String,
    required: [true, "Please provide your name"],
  },
  password: { type: String, required: [true, "Please provide your password"] },
  passwordConfirm: {
    type: String,
    validator: {
      validate: {
        function(val) {
          return val === this.password;
        },
      },
    },
    required: [true, "Please confirm your password"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const User = mongoose.model("users", userSchema);
export default User;
