import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const Hero = () => {
  const router = useRouter();
  return (
    <div className="relative overflow-hidden">
      {/* Background Image */}
      <Image
        src="/default.jpg"
        layout="fill"
        objectFit="cover"
        objectPosition="center"
        alt="hero_bg"
      />

      {/* Content */}
      <div className="container mx-auto px-6 lg:px-16 py-20 h-screen flex items-center justify-center relative z-10">
        <div className="bg-white bg-opacity-80 px-10 py-8 max-w-md mx-auto text-center rounded-lg">
          <p className="text-accent uppercase font-semibold tracking-wide text-xs mb-2">
            Wide Options of Choice
          </p>
          <h2 className="text-4xl lg:text-6xl font-bold text-yellow-600 mb-4">
            Delicious <span className="text-accent">Food</span>
          </h2>
          <p className="text-gray-700 text-base lg:text-lg mb-6">
            Discover the perfect blend of color, aroma, and taste.
            <br /> What are you waiting for?
          </p>

          <button
            onClick={() => router.push("/menu")}
            className="bg-accent text-white px-8 py-3 rounded-full text-lg lg:text-xl hover:bg-red-600 transition duration-300"
          >
            View More
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
