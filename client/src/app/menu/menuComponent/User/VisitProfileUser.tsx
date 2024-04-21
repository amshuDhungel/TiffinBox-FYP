"use client";
import { baseUrl } from "@/app/Urls";
import { useAuth } from "@/app/context/authContext";
import { Card } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const VisitProfileUser = () => {
  const { userData, setUserData, getUserData } = useAuth();
  const [visit, setVisit] = useState();
  const [username, setUsername] = useState("");
  const [nickname, setNickname] = useState("");
  const [bio, setBio] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [isFollowing, setIsFollowing] = useState(false); // State for follow status
  const [isFollower, setIsFollower] = useState(false);
  const { id } = useParams();
  const [follow, setFollow] = useState(true);

  useEffect(() => {
    fetchPost();
  }, []);

  useEffect(() => {
    // Check if the user is following the visited user
    if (userData && userData.following) {
      setFollow(!userData.following.includes(id));
    }
  }, [userData, id]);

  const fetchPost = async () => {
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
      setVisit(data);
      setUsername(data.user.username);
      setNickname(data.user.nickname);
      setBio(data.user.bio);
      setEmail(data.user.email);
      setAvatar(data.user.avatar);
      setIsFollowing(data.user.isFollowing); // Set following status from response
      setIsFollower(data.user.isFollower); // Set followers status from response
    } catch (error) {
      alert("Something went wrong.");
      console.log(error);
    }
  };

  // Function to handle following user
  const followUser = async () => {
    try {
      const response = await fetch(`${baseUrl}/auth/follow/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        credentials: "include",
      });
      const data = await response.json();
      console.log(data);
      setIsFollowing(!isFollowing);
      setIsFollowing(data.isFollowing);
      alert("Successfully done!");
      getUserData();
      // Update follow state
    } catch (error) {
      alert("Something went wrong.");
      console.log(error);
    }
  };

  return (
    <div className="order-1 md:order-2 lg:w-[500px] md:w-[250px] p-8 overflow-y-auto h-96 md:h-auto flex flex-col items-center">
      <div>
        <Image
          src="/TiffinBox.png"
          alt="tiffinbox"
          height={200}
          width={200}
          className="rounded-[180px]"
        />
      </div>
      <div>{username}</div>
      <p className="text-gray-700 text-xl"> ﹙{nickname} ﹚ </p>
      <p className="text-gray-500 text-[10px]">{email}</p>

      {follow ? (
        <div>
          <Link
            href=""
            className="inline-block m-3 p-4 text-xl font-semibold tracking-wider text-teal-900 uppercase rounded-full bg-orange-500 text-white hover:scale-110 transition-all duration-500 "
          >
            <button
              onClick={followUser}
              className="text-[12px] bg-orange-500"
              // Disable button if already following
            >
              Bookmark
              {/* Change button text based on follow status */}
            </button>
          </Link>
        </div>
      ) : (
        <div>
          <Link
            href=""
            className="inline-block m-3 p-4 text-xl font-semibold tracking-wider text-teal-900 uppercase rounded-full bg-orange-500 hover:scale-110 transition-all duration-500 "
          >
            <button
              onClick={followUser}
              className="text-[12px] bg-orange-500"
              // Disable button if already following
            >
              No Bookmark
              {/* Change button text based on follow status */}
            </button>
          </Link>
        </div>
      )}
      <Card>{bio}</Card>

      <div className="flex gap-3">
        <p>{visit && visit.user.followers.length} Bookmarkers</p>
        <p>{visit && visit.user.following.length} Bookmarking</p>
      </div>
    </div>
  );
};

export default VisitProfileUser;
