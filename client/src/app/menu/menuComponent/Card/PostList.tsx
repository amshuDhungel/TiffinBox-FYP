import { useAuth } from "@/app/context/authContext";
import {
  CommentOutlined,
  DeleteOutlined,
  EditOutlined,
  HeartFilled,
  HeartOutlined,
  ShopFilled,
  ShoppingFilled,
} from "@ant-design/icons";
import { Avatar, Button, Card } from "antd";
import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const PostList = ({
  posts,
  handleDelete,
  handleLikeAndUnlike,
  peopleLike,
  handleOrder,
  customerOrder,
  handleComment,
}) => {
  const router = useRouter();
  const { userData, isLoggedIn } = useAuth();

  return (
    <>
      {posts.length > 0 ? (
        <div className="">
          {posts.map((post: any) => (
            <Card
              key={post._id}
              className="w-full bg-white sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 px-2 mb-4 "
              style={{ width: "35em" }}
            >
              {/* Content */}
              <div className="mb-4" style={{ width: "30em" }}>
                {/* Avatar and username */}
                {post.owner && (
                  <Link href={""} className="flex gap-3">
                    {post.owner.avatar ? (
                      <Avatar size={40} src={post.owner.avatar.url} />
                    ) : (
                      <Avatar size={40} src="Tiffinbox.png" />
                    )}
                    <h2 className="font-bold text-xl">{post.owner.username}</h2>
                  </Link>
                )}
                {/* Timestamp */}
                <p>{moment(post.createdAt).fromNow()}</p>
              </div>
              {/* Image */}
              <div>
                {post.image ? (
                  <img src={post.image.url} alt="foodname" />
                ) : (
                  <img src="/TiffinBox.png" alt="foodname" />
                )}
              </div>
              {/* Food title */}
              <h1 className="text-xl font-bold">{post.foodtitle}</h1>
              {/* Food description */}
              <div>{post.fooddescription}</div>
              {/* Food price */}
              <h1 className="text-green-600 text-xl"> Rs. {post.foodprice}</h1>
              {/* Like button */}
              {isLoggedIn && (
                <div className="py-4 flex gap-4">
                  <button onClick={() => handleLikeAndUnlike(post)}>
                    {userData && post.likes.includes(userData._id) ? (
                      <HeartFilled />
                    ) : (
                      <HeartOutlined />
                    )}
                  </button>
                  <span
                    className="ml-1 text-sm cursor-pointer"
                    onClick={() => peopleLike(post)}
                  >
                    {post.likes.length} likes
                  </span>
                  <button
                    onClick={() => handleComment(post)}
                    className="flex gap-4"
                  >
                    <CommentOutlined />
                    <span>{post.comments.length} Feedback</span>
                  </button>
                </div>
              )}
              {/* Edit and Delete buttons */}
              {isLoggedIn &&
              userData &&
              post.owner &&
              userData._id === post.owner._id ? (
                <>
                  <Button onClick={() => router.push(`/user/post/${post._id}`)}>
                    <EditOutlined /> Edit
                  </Button>
                  <Button className="ml-4" onClick={() => handleDelete(post)}>
                    <DeleteOutlined /> Delete
                  </Button>
                  <Button className="ml-4" onClick={() => customerOrder(post)}>
                    <ShoppingFilled /> Your Customer
                  </Button>
                </>
              ) : (
                <div className="flex gap-4 m-4">
                  <Button onClick={() => handleOrder(post)}>
                    <ShopFilled /> Order
                  </Button>
                  <span>{post.orders.length} orders </span>
                </div>
              )}
            </Card>
          ))}
        </div>
      ) : (
        <p className="text-lg font-medium text-gray-900">
          No one has posted yet
        </p>
      )}
    </>
  );
};

export default PostList;
