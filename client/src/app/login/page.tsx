"use client";
import Footer from "@/components/Footer";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Cookies from "js-cookie";
import { useAuth } from "../context/authContext";
import Link from "next/link";
import { baseUrl } from "../Urls";

const Login = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: any) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await fetch(`${baseUrl}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      if (response.ok) {
        const data = await response.json();
        if (data.token) {
          Cookies.set("token", data.token);
        }
        setUser({
          email: "",
          password: "",
        });

        if (data.isAdmin) {
          console.log("User is Admin");
          router.push("/admin");
        } else {
          router.push("/menu");
        }
        console.log(data.user.isAdmin);

        alert("Login successful");
      } else {
        alert("Invalid Credentials");
      }
    } catch (error) {
      alert("Invalid Credentials");
      console.log(error);
    }
  };

  return (
    <>
      <div className="py-16 mt-12">
        <div className="flex flex-col-reverse lg:flex-row bg-white rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-4xl">
          <form className="w-full p-8 lg:w-1/2" onSubmit={handleSubmit}>
            <h2 className="text-2xl font-semibold text-gray-700 text-center">
              TiffinBOX
            </h2>
            <p className="text-xl text-gray-600 text-center">Welcome back!</p>
            {/* Sign in with Google */}
            <div className="mt-4 flex items-center justify-between">
              <span className="border-b w-1/5 lg:w-1/4"></span>
              <a
                href="#"
                className="text-xs text-center text-gray-500 uppercase"
              >
                Login with email
              </a>
              <span className="border-b w-1/5 lg:w-1/4"></span>
            </div>

            {/* Email Address */}
            <div className="mt-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Email Address
              </label>
              <input
                className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                type="email"
                name="email"
                placeholder="Your email address"
                onChange={handleChange}
              />
            </div>
            {/* Phone */}

            {/* Password */}
            <div className="mt-4">
              <div className="flex justify-between">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Password
                </label>
                {/* <Link href="/forgotpassword" className="text-xs text-gray-500">
                  Forgot Password?
                </Link> */}
              </div>
              <input
                className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                type="password"
                name="password"
                placeholder="Your password"
                onChange={handleChange}
              />
            </div>
            {/* Login Button */}
            <div className="mt-8">
              <button
                className="bg-gray-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-gray-600"
                type="submit"
              >
                Log In
              </button>
            </div>
            {/* Sign up or Log in */}
            <div className="mt-4 flex items-center justify-between">
              <span className="border-b w-1/5 md:w-1/4"></span>
              <Link
                href="/register"
                className="text-xs text-gray-500 uppercase"
              >
                or Sign up
              </Link>
              <span className="border-b w-1/5 md:w-1/4"></span>
            </div>
          </form>
          {/* Image Section */}
          <div className="lg:w-1/2 relative">
            <Image
              src="/coffee2.jpg"
              alt="Login Image"
              layout="fill"
              objectFit="cover"
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
