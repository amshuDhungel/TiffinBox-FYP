import Post from "../models/Post.js";
import User from "../models/User.js";

export const followUser = async (req, res) => {
  try {
    const userToFollow = await User.findById(req.params.id);
    const loggedInUser = await User.findById(req.user._id);

    if (!userToFollow) {
      return res.status(404).json({ msg: "User not found" });
    }

    if (loggedInUser.following.includes(userToFollow._id)) {
      const indexfollowing = loggedInUser.following.indexOf(userToFollow._id);
      const indexfollower = userToFollow.followers.indexOf(loggedInUser._id);

      loggedInUser.following.splice(indexfollowing, 1);
      userToFollow.followers.splice(indexfollower, 1);

      await loggedInUser.save();
      await userToFollow.save();

      res.status(200).json({
        msg: "unfollowed user",
        userB: loggedInUser.id,
        userA: userToFollow.id,
      });
    } else {
      loggedInUser.following.push(userToFollow._id);
      userToFollow.followers.push(loggedInUser._id);

      await loggedInUser.save();
      await userToFollow.save();

      res.status(200).json({
        msg: "followed user",
        userB: loggedInUser.id,
        userA: userToFollow.id,
      });
    }
  } catch (error) {
    res.status(404).json({ msg: error.message });
  }
};

export const getAllUserPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate(
        "likes",
        "_id username avatar" // select the fields you want to populate
      )
      .populate("orders", "_id username avatar phone address")
      .populate("owner", "_id username avatar banckaccount")
      .sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (error) {}
};

export const getPostofFollowings = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    const posts = await Post.find({
      owner: {
        $in: user.following,
      },
    })
      .populate("orders", "_id username avatar phone address")
      .populate(
        "likes",
        "_id username avatar " // select the fields you want to populate
      )
      .populate("owner", "_id username avatar")
      .sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (error) {
    res.status(404).json({ msg: error.message });
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate("posts");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//user can't follow himself
export const getUsers = async (req, res, next) => {
  try {
    const currentUser = req.user._id;
    const users = await User.find(
      { _id: { $ne: currentUser } },
      { password: 0 }
    );
    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No users Found" });
    }
    res.status(200).json(users);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
