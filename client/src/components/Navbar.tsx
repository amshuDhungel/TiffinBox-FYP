"use client";
import { useAuth } from "@/app/context/authContext";
import {
  DashboardOutlined,
  NotificationOutlined,
  OrderedListOutlined,
  SettingOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import Image from "next/image";
import Link from "next/link";
import { useContext, useState } from "react";

const Navbar = () => {
  const [navOpen, setNavOpen] = useState(false);
  const { isLoggedIn } = useAuth();

  const links = [
    { id: 1, label: "Home", path: "/" },
    { id: 2, label: "About", path: "/about" },
    { id: 3, label: "Service", path: "/service" },
  ];

  return (
    <nav className="bg-orange-700 p-4 fixed top-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-white font-bold text-xl">
              <Link href="/">
                <Image
                  src="/TiffinBox.png"
                  alt="tiffinbox"
                  height={70}
                  width={70}
                  className="rounded-[180px]"
                />
              </Link>
            </h1>
          </div>
          {isLoggedIn && (
            <div className="flex gap-4">
              <Link href="">
                <NotificationOutlined className="text-white cursor-pointer" />
              </Link>
              <Link href="">
                {" "}
                <ShoppingCartOutlined className="text-white cursor-pointer" />
              </Link>
              <Link href="/menu">
                <OrderedListOutlined className="text-white cursor-pointer" />
              </Link>
              <Link href="/admin">
                <DashboardOutlined className="text-white cursor-pointer" />
              </Link>
            </div>
          )}

          <div className="hidden md:flex gap-4">
            <div>
              <ul className="flex space-x-4">
                {links.map(({ id, label, path }) => (
                  <li key={id}>
                    <Link
                      href={path}
                      className="text-white hover:text-orange-300"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            {!isLoggedIn && (
              <>
                <div className="flex items-center">
                  <Link
                    href="/login"
                    className="block px-4 py-2 text-white hover:bg-orange-500"
                  >
                    Login
                  </Link>
                </div>
              </>
            )}
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setNavOpen(!navOpen)}
              className="text-white hover:text-orange-300"
            >
              Menu
            </button>
          </div>
        </div>
      </div>
      {navOpen && (
        <div className="md:hidden">
          <ul className="bg-orange-600">
            {links.map(({ id, label, path }) => (
              <li key={id}>
                <Link
                  href={path}
                  className="block px-4 py-2 text-white hover:bg-orange-500"
                >
                  {label}
                </Link>
              </li>
            ))}
            {!isLoggedIn && (
              <>
                <li>
                  <Link
                    href="/login"
                    className="block px-4 py-2 text-white hover:bg-orange-500"
                  >
                    Login
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
