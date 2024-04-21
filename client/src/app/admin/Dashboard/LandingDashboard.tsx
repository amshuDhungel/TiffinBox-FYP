"use client";
import React from "react";

const LandingDashboard = () => {
  return (
    <div className="bg-orange-500 h-screen flex justify-center items-center">
      <div className="max-w-lg px-8 py-12 bg-white shadow-md rounded-md">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
          Welcome to TiffinBox Dashboard
        </h1>
        <p className="text-lg text-gray-700 mb-8 text-center">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <div className="flex justify-center">
          <button className="bg-orange-600 text-white font-semibold py-3 px-8 rounded-full shadow-md hover:bg-orange-700 transition duration-300 ease-in-out">
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingDashboard;
