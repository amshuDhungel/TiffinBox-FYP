"use client";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Card } from "antd";
import moment from "moment";
import { baseUrl } from "@/app/Urls";

const { Meta } = Card;

const VisitProfileUser = () => {
  const [userPosts, setUserPosts] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    fetchUserPosts();
  }, []);

  const fetchUserPosts = async () => {
    try {
      const response = await fetch(`${baseUrl}/auth/user/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        credentials: "include",
      });
      const data = await response.json();
      setUserPosts(data.user.posts);
    } catch (error) {
      alert("Something went wrong.");
      console.log(error);
    }
  };

  return (
    <div className="flex gap-4">
      {userPosts.map((post) => (
        <Card
          key={post._id}
          hoverable
          className="my-12"
          style={{ width: 240 }}
          cover={
            post.image && post.image.url ? (
              <img alt="food" src={post.image.url} />
            ) : (
              <img src="/TiffinBox.png" alt="foodname" />
            )
          }
        >
          <Meta
            title={post.foodtitle}
            description={
              <>
                <p>{post.fooddescription}</p>
                <p>Price: Rs. {post.foodprice}</p>
                <p>Posted {moment(post.createdAt).fromNow()}</p>
              </>
            }
          />
        </Card>
      ))}
    </div>
  );
};

export default VisitProfileUser;
