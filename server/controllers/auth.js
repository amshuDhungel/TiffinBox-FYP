import Post from "../models/Post.js";
import User from "../models/User.js";
import { sendEmail } from "../middleware/sendEmail.js";
import crypto from "crypto";
import { v2 as cloudinary } from "cloudinary";

export const register = async (req, res) => {
  try {
    const {
      username,
      email,
      password,
      phone,
      banckaccount,
      address,
      gender,
      IsAdmin,
    } = req.body;

    let user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    user = await User.create({
      username,
      password,
      avatar: { public_id: "sample_id", url: "sampleUrl" },
      email,
      phone,
      banckaccount,
      address,
      gender,
      IsAdmin: IsAdmin || false,
    });

    // Save the new user

    // Generate token for the new user
    const token = await user.generateAuthToken();

    const options = {
      expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };

    return res.status(201).cookie("token", token, options).json({
      success: true,
      user,
      token,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email })
      .select("+password")
      .populate("posts followers following");

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User does not exist",
      });
    }

    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Incorrect password",
      });
    }

    const token = await user.generateAuthToken();

    const options = {
      expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };

    return res.status(200).cookie("token", token, options).json({
      success: true,
      user,
      token,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const logout = async (req, res) => {
  try {
    return res
      .status(200)
      .cookie("token", null, { expires: new Date(Date.now()), httpOnly: true })
      .json({
        success: true,
        message: "Logged out",
      });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//update password
export const updatePassword = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("+password");

    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Please provide old and new password",
      });
    }

    const isMatch = await user.matchPassword(oldPassword);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Incorrect Old password",
      });
    }

    user.password = newPassword;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Password Updated",
    });
  } catch (error) {
    res.status(404).json({ msg: error.message });
  }
};

//profile update
export const updateProfile = async (req, res) => {
  try {
    const data = {};
    if (req.body.nickname) {
      data.nickname = req.body.nickname;
    }
    if (req.body.bio) {
      data.bio = req.body.bio;
    }

    let user = await User.findByIdAndUpdate(req.user._id, data, { new: true });

    // Check if avatar is provided in the request body
    if (req.body.avatar) {
      // Delete the previous avatar from cloudinary if it exists
      if (user.avatar && user.avatar.public_id) {
        await cloudinary.uploader.destroy(user.avatar.public_id);
      }

      // Upload the new avatar to cloudinary
      const myCloud = await cloudinary.uploader.upload(req.body.avatar, {
        folder: "avatars",
      });

      // Update user's avatar information
      user.avatar = {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      };

      // Save the updated user document
      await user.save();
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

//delete profile
export const deleteProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const posts = user.posts;
    const followers = user.followers;
    const following = user.following;
    const userId = user._id;

    // Removing Avatar from cloudinary
    await cloudinary.uploader.destroy(user.avatar.public_id);

    await user.deleteOne();

    // Logout user after deleting profile

    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });

    // Delete all posts of the user
    for (let i = 0; i < posts.length; i++) {
      const post = await Post.findById(posts[i]);
      await cloudinary.uploader.destroy(post.image.public_id);
      await post.deleteOne();
    }

    // Removing User from Followers Following
    for (let i = 0; i < followers.length; i++) {
      const follower = await User.findById(followers[i]);

      const index = follower.following.indexOf(userId);
      follower.following.splice(index, 1);
      await follower.save();
    }

    // Removing User from Following's Followers
    for (let i = 0; i < following.length; i++) {
      const follows = await User.findById(following[i]);

      const index = follows.followers.indexOf(userId);
      follows.followers.splice(index, 1);
      await follows.save();
    }

    res.status(200).json({ msg: "Profile deleted successfully" });
  } catch (error) {
    res.status(404).json({ msg: error.message });
  }
};

//my profile
export const myProfile = async (req, res) => {
  try {
    const userData = await User.findById(req.user._id).populate("posts");
    res.status(200).json(userData);
  } catch (error) {
    res.status(404).json({ msg: error.message });
  }
};

export const forgetPassword = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    const resetPasswordtoken = await user.generatePasswordResetToken();
    await user.save();
    const resetUrl = `${req.protocol}://${req.get(
      "host"
    )}/forgotpassword/${resetPasswordtoken}`;

    const message = `Reset Your Password by clicking on the link below: \n\n ${resetUrl}`;
    try {
      await sendEmail({
        email: user.email,
        subject: "Reset Password",
        message: message,
      });
      res.status(200).json({ msg: "Password reset link sent to your email" });
    } catch (error) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;
      await user.save();
      res.status(404).json({ msg: error.message });
    }
  } catch (error) {
    res.status(404).json({ msg: error.message });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpires: { $gt: Date.now() },
    });
    if (!user) {
      return res
        .status(404)
        .json({ msg: "Password reset token is invalid or has expired" });
    }
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();
    res.status(200).json({ msg: "Password reset successfully" });
  } catch (error) {
    res.status(404).json({ msg: error.message });
  }
};
