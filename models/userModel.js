import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    validate: {
      validator: (v) => validator.isEmail(v),
      message: "Please provide a valid email",
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
    validate: {
      validator: function (val) {
        return val === this.password;
      },
      message: "Passwords are not the same",
    },
    required: [true, "Please confirm your password"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
});
const User = mongoose.model("users", userSchema);

export default User;
