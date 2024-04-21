"use client";
import { baseUrl } from "@/app/Urls";
import Link from "next/link";
import React, { useState } from "react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const setForgotPassword = async (e: any) => {
    e.preventDefault();
    try {
      const response = await fetch(`${baseUrl}/auth/forgot/password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email,
        }),
      });
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        alert(`Token is sent to your email: ${email}`);
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert("Something went wrong");
      console.log(error);
    }
  };
  return (
    <main
      id="content"
      role="main"
      className="w-full mt-12 max-w-md mx-auto p-6"
    >
      <div className="mt-7 bg-white  rounded-xl shadow-lg dark:bg-orange-800 dark:border-orange-700 border-2 border-orange-300">
        <div className="p-4 sm:p-7">
          <div className="mt-5">
            <form onSubmit={setForgotPassword}>
              <div className="grid gap-y-4">
                <div>
                  <label className="block text-sm font-bold ml-1 mb-2 dark:text-white">
                    Email
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-orange-500 focus:ring-orange-500 shadow-sm"
                      required
                      aria-describedby="email-error"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-orange-500 text-white hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
                >
                  Send Token
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ForgotPassword;
