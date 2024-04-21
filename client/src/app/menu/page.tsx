"use client";
import React, { useEffect } from "react";
import Header from "./menuComponent/Header";
import User from "./menuComponent/User/User";
import Post from "./menuComponent/Post/Post";
import Footer from "@/components/Footer";

const Menupage = () => {
  return (
    <>
      <div className="py-16 mt-8">
        <Header />
        <div className="flex flex-col md:flex-row gap-4 h-screen">
          <div className="flex justify-between order-2 md:order-1 flex-1 bg-gradient-to-r from-orange-200 to-orange-300 overflow-y-auto flex-col items-center lg:w-[500px] md:w-[250px] p-8 h-[26px] md:h-auto">
            {/* Content for homeleft */}
            <Post />
          </div>
          <div className="order-1 md:order-2 lg:w-[500px] md:w-[250px] p-8 overflow-y-auto h-96 md:h-auto">
            <User />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Menupage;
