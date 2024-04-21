import express from "express";
import formidable from "express-formidable";
import {
  CommentonPost,
  createPost,
  deleteComment,
  deletePost,
  updatePost,
  myPost,
  likeAndUnlikePost,
} from "../controllers/post.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { getAllUserPosts, getPostofFollowings } from "../controllers/user.js";
import { newOrder } from "../controllers/order.js";
const router = express.Router();

router.route("/upload").post(verifyToken, createPost);
router.route("/upload/:id").get(verifyToken, likeAndUnlikePost);
router
  .route("/upload/:id")
  .delete(verifyToken, deletePost)
  .put(verifyToken, updatePost);
router.route("/uploads").get(verifyToken, getPostofFollowings);
router.route("/myposts/:id").get(verifyToken, myPost);
router.route("/user-posts").get(verifyToken, getAllUserPosts);
router
  .route("/comment/:id")
  .post(verifyToken, CommentonPost) //use id of post to comment on post. don't confuse with user
  .delete(verifyToken, deleteComment); //take the id of comment to delete

router.route("/order/:id").get(verifyToken, newOrder);

export default router;
