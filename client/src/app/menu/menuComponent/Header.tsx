"use client";
import React, { useState } from "react";
import Link from "next/link";
import {
  DashboardOutlined,
  EyeOutlined,
  PlusCircleOutlined,
  SearchOutlined,
  ShoppingFilled,
  UserOutlined,
} from "@ant-design/icons";
import { useAuth } from "@/app/context/authContext";

const Header = () => {
  const { userData } = useAuth();
  const [tab, setTab] = useState(window.location.pathname);

  const isActive = (tabName: string) => {
    return tab === tabName ? "text-orange-500" : "";
  };

  return (
    <div className="flex justify-center items-center bg-orange-900 p-4">
      <Link
        href="/menu"
        className={`w-12 h-12 mx-4 hover:text-black hover:scale-110 transition-all duration-500 ${isActive(
          "/menu"
        )}`}
        onClick={() => setTab("/menu")}
      >
        <DashboardOutlined style={{ fontSize: "24px" }} />
      </Link>
      <Link
        href="/menu/newpost"
        className={`w-12 h-12 mx-4 hover:text-black hover:scale-110 transition-all duration-500 ${isActive(
          "/menu/newpost"
        )}`}
        onClick={() => setTab("/menu/newpost")}
      >
        <PlusCircleOutlined style={{ fontSize: "24px" }} />
      </Link>
      <Link
        href="/menu/account"
        className={`w-12 h-12 mx-4 hover:text-black hover:scale-110 transition-all duration-500 ${isActive(
          "/menu/account"
        )}`}
        onClick={() => setTab("/menu/account")}
      >
        <UserOutlined style={{ fontSize: "24px" }} />
      </Link>
      {userData && userData.username}
    </div>
  );
};

export default Header;
