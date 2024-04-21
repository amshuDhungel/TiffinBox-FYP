"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Footer from "@/components/Footer";
import { baseUrl } from "../Urls";

const Register = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    username: "",
    email: "",
    phone: "",
    banckaccount: "",
    password: "",
    address: "",
    gender: "",
  });

  const handleChange = (e: any) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleGenderChange = (e: any) => {
    setUser({ ...user, gender: e.target.value });
  };

  const handleAddressChange = (e: any) => {
    setUser({ ...user, address: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await fetch(`${baseUrl}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setUser({
          username: "",
          email: "",
          phone: "",
          banckaccount: "",
          password: "",
          address: "",
          gender: "",
        });
        alert("Register successful");
        router.push("/login");
      } else {
        alert("Invalid credentials!");
      }
    } catch (error) {
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
                Register with email
              </a>
              <span className="border-b w-1/5 lg:w-1/4"></span>
            </div>
            {/* Username */}
            <div className="mt-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Username
              </label>
              <input
                className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                type="text"
                name="username"
                placeholder="Your full name"
                value={user.username}
                onChange={handleChange}
              />
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
                value={user.email}
                onChange={handleChange}
              />
            </div>
            {/* Phone */}
            <div className="mt-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Phone
              </label>
              <input
                className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                type="text"
                name="phone"
                minLength={10} // Minimum length requirement
                maxLength={10} // Maximum length requirement
                pattern="\d{10}" // Pattern for exactly 10 digits
                placeholder="Your phone- must be 10 digits"
                value={user.phone}
                onChange={handleChange}
              />
            </div>
            <div className="mt-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Account No.
              </label>
              <input
                className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                type="text"
                name="banckaccount"
                minLength={16} // Minimum length requirement
                maxLength={16} // Maximum length requirement
                pattern="\d{16}" // Pattern for exactly 10 digits
                placeholder="Any Bank account No- must be 16 digits"
                value={user.banckaccount}
                onChange={handleChange}
              />
            </div>
            {/* Address */}
            <div className="mt-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Address
              </label>
              <select
                className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                name="address"
                value={user.address}
                onChange={handleAddressChange}
              >
                <option value="">Select address</option>
                <option value="Dudh Faram">Dudh Faram</option>
                <option value="Rajbanshi Chowk">Rajbanshi Chowk</option>
                <option value="Bargachhi">Bargachhi</option>
              </select>
            </div>
            {/* Gender */}
            <div className="mt-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Gender
              </label>
              <select
                className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                name="gender"
                value={user.gender}
                onChange={handleGenderChange}
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            {/* Password */}
            <div className="mt-4">
              <div className="flex justify-between">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Password
                </label>
              </div>
              <input
                className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                type="password"
                name="password"
                placeholder="Your password- at least 6 characters"
                minLength={6} // Minimum length requirement
                maxLength={16} // Maximum length requirement
                pattern="\d{6}" // Pattern for exactly 10 digits
                value={user.password}
                onChange={handleChange}
              />
            </div>
            {/* Register Button */}
            <div className="mt-8">
              <button
                className="bg-gray-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-gray-600"
                type="submit"
              >
                Register
              </button>
            </div>
            {/* Sign up or Log in */}
            <div className="mt-4 flex items-center justify-between">
              <span className="border-b w-1/5 md:w-1/4"></span>
              <a href="/login" className="text-xs text-gray-500 uppercase">
                or Log in
              </a>
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

export default Register;
