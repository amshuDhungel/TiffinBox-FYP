import React from "react";

const MenuHome = () => {
  return (
    <div className="flex flex-col md:flex-row gap-4 h-screen">
      <div className="order-2 md:order-1 flex-1 bg-gradient-to-r from-orange-200 to-orange-300 overflow-y-auto flex flex-col items-center p-8">
        {/* Content for homeleft */}
      </div>
      <div className="order-1 md:order-2 lg:w-[500px] md:w-[250px] p-8 overflow-y-auto h-96 md:h-auto"></div>
    </div>
  );
};

export default MenuHome;
