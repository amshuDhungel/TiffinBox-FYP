import Post from "../models/Post.js";
import User from "../models/User.js";

export const newOrder = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate("orders");

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }
    post.orders.push(req.user._id);

    await post.save();
    res.status(200).json({
      success: true,
      user: req.user,
      message: "Order is placed",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
