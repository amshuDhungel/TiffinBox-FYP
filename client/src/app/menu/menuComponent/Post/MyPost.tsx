"use client";
import React from "react";
import { Card, Avatar } from "antd";
import moment from "moment";
import { useAuth } from "@/app/context/authContext";
import Link from "next/link";

const MyPost = () => {
  const { userData } = useAuth();

  return (
    <div className="post-container flex flex-col">
      {userData.posts.map((post: any) => (
        <Card
          key={post._id}
          className="post-card my-12"
          title={post.foodtitle}
          style={{ width: 300 }}
          cover={
            post.image && post.image.url ? (
              <img alt="food" src={post.image.url} />
            ) : (
              <img src="/TiffinBox.png" alt="foodname" />
            )
          }
        >
          <div className="post-details">
            <p className="post-description">{post.fooddescription}</p>
            <p className="post-price text-xl text-green-500">
              Price: Rs. {post.foodprice}
            </p>
            <p className="post-date text-[10px] text-zinc-500">
              Posted {moment(post.createdAt).fromNow()}
            </p>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default MyPost;
