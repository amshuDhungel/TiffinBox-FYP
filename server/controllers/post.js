import Post from "../models/Post.js";
import User from "../models/User.js";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "rodesidecoder",
  api_key: 538653516642283,
  api_secret: "hjEHeSFKZyCkdR8xB5kUX69y4KU",
});

export const createPost = async (req, res) => {
  try {
    const myCloud = await cloudinary.uploader.upload(req.body.image, {
      folder: "TiffinBox-Nextjs",
    });
    const newPostData = {
      foodtitle: req.body.foodtitle,
      fooddescription: req.body.fooddescription,
      foodprice: req.body.foodprice,
      image: {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      },
      owner: req.user._id,
    };

    const post = await Post.create(newPostData);
    const user = await User.findById(req.user._id);
    user.posts.push(post._id);
    await user.save();

    res.status(201).json(post);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    if (post.owner.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    await cloudinary.uploader.destroy(post.image.public_id);

    await post.deleteOne();
    const user = await User.findById(req.user._id);
    const index = user.posts.indexOf(req.params.id);
    user.posts.splice(index, 1);
    await user.save();
    res.status(200).json({ message: "Post deleted" });
  } catch (error) {
    res.status(400).json({ message: error.message });
    console.log(error);
  }
};

//get my posts
export const myPost = async (req, res) => {
  try {
    const postId = req.params.id;
    console.log(postId);
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    return res.status(200).json(post);
  } catch (error) {
    console.error("Error fetching post:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
//like post
export const likeAndUnlikePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Check if post is liked by user
    const userLiked = post.likes.includes(req.user._id);

    if (userLiked) {
      // If the post is already liked by the user, unlike it
      const index = post.likes.indexOf(req.user._id);
      post.likes.splice(index, 1);
      await post.save();
      res.status(200).json({ message: "Post unliked", user: req.user });
    } else {
      // If the post is not liked by the user, like it
      post.likes.push(req.user._id);
      await post.save();
      res.status(200).json({ message: "Post liked", user: req.user });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
    console.log(error);
  }
};

export const updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    if (post.owner.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const { foodtitle, fooddescription, foodprice } = req.body;
    post.foodtitle = foodtitle;
    post.fooddescription = fooddescription;
    post.foodprice = foodprice;
    await post.save();
    res.status(200).json({ message: "Post updated" });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error updating post", error: error.message });
  }
};

export const CommentonPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    //checking if the comment exists
    let commentIndex = -1;
    post.comments.forEach((comment, index) => {
      if (comment.user.toString() === req.user._id.toString()) {
        commentIndex = index;
      }
    });
    if (commentIndex !== -1) {
      post.comments[commentIndex].comment = req.body.comment;
      await post.save();
      res.status(200).json({ message: "Comment updated" });
    } else {
      post.comments.push({
        user: req.user._id,
        comment: req.body.comment,
        username: req.user.username,
        avatar: req.user.avatar,
      });
    }
    await post.save();
    res.status(200).json({ message: "Comment added" });
  } catch (error) {
    res.status(400).json({ message: "Error", error: error.message });
  }
};

//delete comment if user want to
export const deleteComment = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    //checking if owner wants to delete
    if (post.owner.toString() === req.user._id.toString()) {
      if (req.user.commentId === undefined) {
        return res.status(401).json({ message: "Comment ID is required" });
      }
      post.comments.forEach((item, index) => {
        if (item._id.toString() === req.body.commentId.toString()) {
          return post.comments.splice(index, 1);
        }
      });

      await post.save();

      return res.status(200).json({
        success: true,
        message: "Selected Comment has deleted",
      });
    } else {
      post.comments.forEach((item, index) => {
        if (item.user.toString() === req.user._id.toString()) {
          return post.comments.splice(index, 1);
        }
      });

      await post.save();

      return res.status(200).json({
        success: true,
        message: "Your Comment has deleted",
      });
    }
  } catch (error) {
    res.status(400).json({ message: "Error", error: error.message });
  }
};
