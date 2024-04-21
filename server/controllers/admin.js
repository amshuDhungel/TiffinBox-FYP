import User from "../models/User.js";

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({}, { password: 0 });
    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No users Found" });
    }
    return res.status(200).json(users);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};
