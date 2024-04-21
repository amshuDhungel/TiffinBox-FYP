"use client";
import React, { useEffect, useState } from "react";
import { Card, Avatar, Button, Modal } from "antd";
import moment from "moment";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import {
  HeartOutlined,
  HeartFilled,
  DeleteOutlined,
  EditOutlined,
  ShopFilled,
  CloseCircleFilled,
} from "@ant-design/icons";
import { useAuth } from "@/app/context/authContext";
import PostList from "../Card/PostList";
import Footer from "@/components/Footer";
import { baseUrl } from "@/app/Urls";

const Post = () => {
  const router = useRouter();
  const [posts, setPosts] = useState([]);
  const [comment, setComment] = useState("");
  console.log(posts);

  const [currentPost, setCurrentPost] = useState({});
  const [currentOrders, setCurrentOrders] = useState([]);
  const [visible, setVisible] = useState(false);

  const [ordervisible, setOrdervisible] = useState(false);
  const [customervisible, setCustomervisible] = useState(false);
  const [commentvisible, setCommentvisible] = useState(false);
  const [payvisible, setPayvisible] = useState(false);
  const [order, setOrder] = useState(false);
  const { userData, isLoggedIn } = useAuth();
  const { id } = useParams();
  // console.log(posts);

  useEffect(() => {
    if (isLoggedIn) {
      fetchUserPost();
    }
  }, [isLoggedIn]);

  const fetchUserPost = async () => {
    try {
      const response = await fetch(`${baseUrl}/post/user-posts`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        credentials: "include",
      });
      const data = await response.json();
      setPosts(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  // Function to handle like and dislike
  const handleLikeAndUnlike = async (post: any) => {
    try {
      const res = await fetch(`${baseUrl}/post/upload/${post._id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        credentials: "include",
      });
      const data = await res.json();
      fetchUserPost();
    } catch (error) {
      console.log(error);
    }
  };

  // Function to handle post deletion
  const handleDelete = async (post: any) => {
    try {
      const answer = window.confirm(
        "Are you sure you want to delete this post"
      );
      if (!answer) return;

      const res = await fetch(`${baseUrl}/post/upload/${post._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        credentials: "include",
      });
      const data = await res.json();
      console.log(data);
      fetchUserPost();
      alert("Post deleted successfully");
      router.push("/menu");
    } catch (error) {
      alert("Post deletion failed");
      console.log(error);
    }
  };

  //cashdelivery order
  const cashDeliveryOrder = async (post: any) => {
    try {
      const response = await fetch(`${baseUrl}/post/order/${post._id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        credentials: "include",
      });
      const data = await response.json();
      fetchUserPost();
      console.log(`Order placed for ${post.foodtitle}`);

      // You can also show a success message or perform any other actions as needed
      alert(`Order placed for ${post.foodtitle}`);
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to place order. Please try again later.");
    }
  };

  const handleComment = async (post: any) => {
    setCurrentPost(post);
    setCommentvisible(true);
  };

  const addComment = async (e: any, post: any) => {
    e.preventDefault();
    try {
    } catch (error) {
      console.log(error);
    }
  };

  //order detail
  const handleOrder = async (post: any) => {
    setCurrentPost(post);
    setOrdervisible(true);
  };

  const handleOnlinePayment = async (post: any) => {
    setCurrentPost(post);
    setPayvisible(true);
  };

  //like details
  const peopleLike = (post: any) => {
    setCurrentPost(post);
    setVisible(true);
  };

  const customerOrder = (post: any) => {
    setCurrentPost(post);
    // Set orders for the current post
    setCustomervisible(true);
  };

  return (
    <div className="flex max-h-screen flex-col items-center justify-between p-24">
      <PostList
        posts={posts}
        handleDelete={handleDelete}
        handleLikeAndUnlike={handleLikeAndUnlike}
        peopleLike={peopleLike}
        handleOrder={handleOrder}
        customerOrder={customerOrder}
        handleComment={handleComment}
      />

      {/* like modal */}
      <Modal
        title="Likes"
        open={visible}
        onCancel={() => setVisible(false)}
        footer={null}
      >
        {currentPost && currentPost.likes && currentPost.likes.length > 0 ? (
          <div>
            {currentPost.likes.map((like: any) => (
              <Card key={like._id}>
                <ul className="list-none">
                  <li className="flex flex-row py-3 m-2">
                    <span>
                      {like.avatar ? (
                        <Avatar size={30} src={like.avatar.url} />
                      ) : (
                        <Avatar size={30} src="/TiffinBox.png" />
                      )}
                    </span>
                    <p className="ml-3 mt-2">{like.username}</p>
                  </li>
                </ul>
              </Card>
            ))}
          </div>
        ) : null}
      </Modal>
      {/* order modal */}
      <Modal></Modal>
      {/* comment modal */}
      <Modal
        title="Feedback Detail"
        open={commentvisible}
        onCancel={() => setCommentvisible(false)}
        footer={null}
      >
        <form>
          <input
            type="text"
            className="py-3 px-4 block w-full border-2 border-orange-200 rounded-md text-sm focus:border-orange-500 focus:ring-orange-500 shadow-sm"
            placeholder="Write something..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          {currentPost && (
            <button
              onClick={(e) => addComment(e, currentPost)}
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded mt-4"
            >
              {" "}
              + Comment{" "}
            </button>
          )}
        </form>
      </Modal>
      <Modal
        title="Orders Detail"
        open={ordervisible}
        onCancel={() => setOrdervisible(false)}
        footer={null}
      >
        {currentPost && (
          <div className="p-4">
            <h3 className="text-xl font-semibold mb-2">
              Food Title: {currentPost.foodtitle}
            </h3>
            <p className="text-gray-700 mb-4">
              Description: {currentPost.fooddescription}
            </p>
            <p className="text-green-700 mb-4 text-xl">
              Price: Rs.{currentPost.foodprice}
            </p>
            {currentPost.image && (
              <img
                src={currentPost.image.url}
                alt="Post Image"
                className="mb-4 rounded-lg"
              />
            )}
            <div className="flex justify-between items-center">
              <button
                onClick={() => cashDeliveryOrder(currentPost)}
                className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded"
              >
                Order
              </button>

              <button
                onClick={() => cashDeliveryOrder(currentPost)}
                className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded"
              >
                <p className="text-[8px] text-gray-500 uppercase">
                  Or send money online and don't forget to click after sending
                  money.
                </p>
                {currentPost.owner?.banckaccount}
              </button>
            </div>
          </div>
        )}
      </Modal>
      {/* customer Modal */}
      <Modal
        title="Customer Order"
        open={customervisible}
        onCancel={() => setCustomervisible(false)}
        footer={null}
      >
        {currentPost && currentPost.orders && currentPost.orders.length > 0 ? (
          <div>
            {currentPost.orders.length} Total Orders
            {currentPost.orders.map((order: any) => (
              <Card key={order._id}>
                <ul className="list-none">
                  <li className="flex flex-row py-3 m-2">
                    <span>
                      {order.avatar ? (
                        <Avatar size={30} src={order.avatar.url} />
                      ) : (
                        <Avatar size={30} src="/TiffinBox.png" />
                      )}
                    </span>
                    <p className="ml-3 mt-2">{order.username}</p>
                    <p className="ml-3 mt-2">{order.phone}</p>
                    <p className="ml-3 mt-2">{order.address}</p>
                  </li>
                </ul>
              </Card>
            ))}
          </div>
        ) : null}
      </Modal>
    </div>
  );
};

export default Post;
