"use client";
import { baseUrl } from "@/app/Urls";
import React, { useState } from "react";

const UpdatePasswordForm = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const updatePassword = async (e: any) => {
    e.preventDefault();
    try {
      const response = await fetch(`${baseUrl}/auth/update/password`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          oldPassword,
          newPassword,
        }),
      });
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        alert("password updated");
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert("Something went wrong");
      console.log(error);
    }
  };
  return (
    <main id="content" role="main" className="w-full  max-w-md mx-auto p-6">
      <div className="mt-7 bg-white  rounded-xl shadow-lg dark:bg-orange-800 dark:border-orange-700 border-2 border-orange-300">
        <div className="p-4 sm:p-7">
          <div className="mt-5">
            <form onSubmit={updatePassword}>
              <div className="grid gap-y-4">
                <div>
                  <label className="block text-sm font-bold ml-1 mb-2 dark:text-white">
                    Old password
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      id="password"
                      name="password"
                      placeholder="Old password"
                      value={oldPassword}
                      onChange={(e) => setOldPassword(e.target.value)}
                      className="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-orange-500 focus:ring-orange-500 shadow-sm"
                      required
                      aria-describedby="email-error"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold ml-1 mb-2 dark:text-white">
                    New password
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      id="password"
                      name="password"
                      placeholder="Old password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
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
                  Reset password
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default UpdatePasswordForm;
