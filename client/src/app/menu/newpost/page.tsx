import React from "react";
import Header from "../menuComponent/Header";
import PostFoodForm from "../menuComponent/Form/PostForm";

const Menupage = () => {
  return (
    <>
      <div className="py-16 mt-8">
        <Header />
        <div className="flex flex-col md:flex-row gap-4 h-screen">
          <div className="order-2 md:order-1 flex-1 bg-gradient-to-r from-orange-200 to-orange-300 overflow-y-auto flex flex-col items-center p-8">
            {/* Content for homeleft */}
            <PostFoodForm />
          </div>
        </div>
      </div>
    </>
  );
};

export default Menupage;
