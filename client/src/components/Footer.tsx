import React from "react";
import {
  FacebookOutlined,
  LinkedinOutlined,
  PinterestOutlined,
  TwitterOutlined,
} from "@ant-design/icons";

const Footer = () => {
  return (
    <div className="container mx-auto p-24">
      <div className="grid md:grid-cols-3 gap-16">
        <div className="space-y-4">
          <h2 className="text-xl font-bold">About Us</h2>
          <p className="leading-[1.8]">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Omnis
            atque repudiandae consectetur quibusdam eius dignissimos recusandae,
            tenetur maiores quos veniam deleniti esse.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-bold">The Restaurant</h2>

          <ul className="space-y-2">
            <li>About Us</li>
            <li>Chefs</li>
            <li>Events</li>
            <li>Contact</li>
          </ul>
        </div>

        <div>
          <div className="flex gap-8 text-accent text-2xl pt-16">
            <FacebookOutlined />
            <TwitterOutlined />
            <PinterestOutlined />
            <LinkedinOutlined />
          </div>
        </div>
      </div>

      <div className="w-fit mx-auto pt-16 pb-8 text-[14px] sm:text-[16px]">
        &copy; Copyright 2023 All rights reserved
      </div>
    </div>
  );
};

export default Footer;
