import User from "../models/userModel.js";
import catchAsync from "../utils/catchAsync.js";

export const getUser = catchAsync(async (req, res, next) => {
  const userId = req.user._id;
  const user = await User.findById(userId).select('-password');

  res.status(200).json({ status: "success", data: user });
});
