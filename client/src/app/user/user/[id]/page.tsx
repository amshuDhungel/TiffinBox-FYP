"use client";
import Header from "@/app/menu/menuComponent/Header";
import VisitUserPost from "@/app/menu/menuComponent/Post/VisitUserPost";
import VisitProfileUser from "@/app/menu/menuComponent/User/VisitProfileUser";
import Footer from "@/components/Footer";
import React from "react";

const VisitProfile = () => {
  return (
    <>
      {" "}
      <div className="py-16 mt-8">
        <Header />
        <div className="flex flex-col md:flex-row gap-4 h-screen">
          <div className="order-2 md:order-1 flex-1 bg-gradient-to-r from-orange-200 to-orange-300 overflow-y-auto flex flex-col items-center lg:w-[500px] md:w-[250px] p-8 h-96 md:h-auto">
            <VisitUserPost />
          </div>
          <div className="order-1 md:order-2 lg:w-[500px] md:w-[250px] p-8 overflow-y-auto h-96 md:h-auto">
            {/* {that person info} */}
            <VisitProfileUser />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default VisitProfile;
