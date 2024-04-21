import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  foodtitle: {
    type: String,
    required: true,
  },
  fooddescription: {
    type: String,
  },
  image: {
    public_id: String,
    url: String,
  },
  foodprice: {
    type: Number,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],

  createdAt: {
    type: Date,
    default: Date.now,
  },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  comments: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],
});

const Post = mongoose.model("Post", postSchema);
export default Post;
