"use client";
import React, { useEffect, useState } from "react";
import Header from "../menuComponent/Header";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { useAuth } from "../../context/authContext";
import Image from "next/image";
import MyPost from "../menuComponent/Post/MyPost";
import { EditFilled, EditTwoTone } from "@ant-design/icons";
import { Avatar, Card, Modal } from "antd";
import UpdateProfileForm from "./UpdateProfileForm/UpdateProfileForm";
import UpdatePasswordForm from "./UpdateProfileForm/UpdatePasswordForm";
import { baseUrl } from "@/app/Urls";

const AccountPage = () => {
  const router = useRouter();
  const { userData } = useAuth();
  const [visible, setVisible] = useState(false);
  const [passvisible, setPassvisible] = useState(false);
  // Check if userData is defined and has a username property
  if (!userData || !userData.username) {
    return null; // or return a loading indicator
  }
  console.log(userData);

  const updateProfileModal = (e: any) => {
    setVisible(true);
  };

  const updatePasswordModal = (e: any) => {
    setPassvisible(true);
  };

  const deleteProfileHandler = async (e: any) => {
    e.preventDefault();
    try {
      const response = await fetch(`${baseUrl}/auth/delete/me`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        credentials: "include",
      });
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        alert("Profile deleted successfully");
        router.push("/logout");
      } else {
        alert("Failed to delete profile");
      }
    } catch (error) {
      alert("Something went wrong");
      console.log(error);
    }
  };
  return (
    <>
      <div className="py-16 mt-8">
        {" "}
        <Header />
        {/* Pass isLoggedIn state */}
        <div className="flex flex-col md:flex-row gap-4 h-screen">
          <div className="order-2 md:order-1 flex-1 bg-gradient-to-r from-orange-400 to-orange-500 overflow-y-auto flex flex-col items-center p-8">
            {/* Content for homeleft */}
            <MyPost />
          </div>
          <div className="order-1 md:order-2 lg:w-[500px] md:w-[250px] p-8 overflow-y-auto h-96 md:h-auto flex flex-col items-center relative">
            <div className="relative">
              {userData.avatar ? (
                <Avatar
                  src={userData.avatar.url}
                  alt="tiffinbox"
                  size={200}
                  className="rounded-[180px]"
                />
              ) : (
                <Avatar
                  src="/TiffinBox.png"
                  alt="tiffinbox"
                  size={200}
                  className="rounded-[180px]"
                />
              )}

              <button
                className="absolute top-[11em] left-[12em] rounded-full bg-orange-800 hover:bg-orange-700 border border-orange-600"
                title="Update Profile"
                onClick={updateProfileModal}
              >
                <EditFilled />
              </button>
            </div>
            <div>{userData.username}</div>
            <h1> ﹙{userData.nickname}﹚ </h1>
            <p className="text-gray-500 text-[10px]">{userData.email}</p>
            <Card>{userData.bio}</Card>
            <p>{userData && userData.posts.length} posts</p>
            <div className="flex gap-3">
              <p>{userData && userData.followers.length} Bookmarkers</p>
              <p>{userData && userData.following.length} Bookmarking</p>
            </div>

            <div className="mt-3">
              <button
                onClick={updatePasswordModal}
                className="inline-block p-1 text-sm font-semibold tracking-wider uppercase rounded-full  text-orange-800 hover:scale-110 transition-all duration-500 "
              >
                {" "}
                Update Password
              </button>
            </div>
            <div className="mt-3">
              <button
                onClick={deleteProfileHandler}
                className="inline-block p-1 text-sm font-semibold tracking-wider rounded-full uppercase bg-red-500 text-white hover:scale-110 transition-all duration-500 "
              >
                {" "}
                Delete Profile
              </button>
            </div>

            <div>
              <Link
                href="/logout"
                className="inline-block m-3 p-4 text-xl font-semibold tracking-wider uppercase rounded-full bg-orange-500 text-white hover:scale-110 transition-all duration-500 "
              >
                Logout
              </Link>
            </div>
          </div>
        </div>
        <Modal
          title="Update your profile"
          open={visible}
          onCancel={() => setVisible(false)}
          footer={null}
        >
          {" "}
          <UpdateProfileForm />{" "}
        </Modal>
        {/* update password */}
        <Modal
          title="Update your password"
          open={passvisible}
          onCancel={() => setPassvisible(false)}
          footer={null}
          style={{ backgroundColor: "orange" }}
        >
          <UpdatePasswordForm />
        </Modal>
      </div>
    </>
  );
};

export default AccountPage;
