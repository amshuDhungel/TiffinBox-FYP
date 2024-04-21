import Footer from "@/components/Footer";
import Image from "next/image";
import React from "react";

const ServicePage = () => {
  return (
    <>
      <div className="px-4 py-[10em] mx-auto sm:max-w-screen-xl md:max-w-full lg:max-w-screen-xl md:px-24 md:py-[10em] lg:px-8 lg:py-[10em]">
        <div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
          <div>
            <p className="inline-block px-3 py-px mb-4 text-xl font-semibold tracking-wider uppercase rounded-full bg-orange-500 text-white">
              Services
            </p>
          </div>
          <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-orange-500 sm:text-4xl md:mx-auto">
            <span className="relative inline-block">
              <svg
                viewBox="0 0 52 24"
                fill="currentColor"
                className="absolute top-0 left-0 z-0 hidden w-32 -mt-8 -ml-20 text-slate-100 lg:w-32 lg:-ml-28 lg:-mt-10 sm:block"
              >
                <defs>
                  <pattern
                    id="fdca20a0-aeb4-4caf-ba1b-4351eee42363"
                    x="0"
                    y="0"
                    width=".135"
                    height=".30"
                  >
                    <circle cx="1" cy="1" r=".7"></circle>
                  </pattern>
                </defs>
                <rect
                  fill="url(#fdca20a0-aeb4-4caf-ba1b-4351eee42363)"
                  width="52"
                  height="24"
                ></rect>
              </svg>

              <span className="relative">The</span>
            </span>
            &ensp;quick, brown fox jumps over a lazy dog
          </h2>
          <p className="text-base text-orange-700 md:text-lg">
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium doloremque rem aperiam, eaque ipsa quae.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          {/* Service 1 */}
          <div className="flex flex-col items-center justify-center p-8 bg-orange-300 rounded-lg shadow-md">
            <div className="flex items-center justify-center mb-4 rounded-full bg-green-50">
              <Image
                src="/svg2.png"
                alt="svg2`"
                width={510}
                height={510}
                className="rounded-full bg-orange-50"
              />
            </div>
            <h6 className="mb-2 font-semibold leading-5 text-2xl">
              Craving for moms cooking
            </h6>
            <p className="mb-3 text-sm text-gray-900">
              Our website development service offers end-to-end solutions for
              creating and launching professional and visually appealing
              websites.
            </p>
            <a
              href="/"
              className="inline-flex items-center font-semibold text-green-500 hover:text-green-800 transition-colors duration-200"
            >
              Learn more
            </a>
          </div>

          {/* Service 2 */}
          <div className="flex flex-col items-center justify-center p-8 bg-orange-200 rounded-lg shadow-md">
            <div className="flex items-center justify-center w-[10em] height-[10em] mb-4 rounded-full bg-orange-50">
              <Image
                src="/svg3.png"
                alt="svg2`"
                width={510}
                height={510}
                className="rounded-full bg-orange-50"
              />
            </div>
            <h6 className="mb-2 font-semibold leading-5 text-2xl">
              Delivery Service:
            </h6>
            <p className="mb-3 text-sm text-gray-900">
              Our social media marketing service helps businesses establish a
              strong online presence and engage with their target audience
              effectively.
            </p>
            <a
              href="/"
              className="inline-flex items-center font-semibold text-green-500 hover:text-green-800 transition-colors duration-200"
            >
              Learn more
            </a>
          </div>

          {/* Service 3 */}
          <div className="flex flex-col items-center justify-center p-8 bg-orange-400 rounded-lg shadow-md">
            <div className="flex items-center justify-center mb-4 rounded-full bg-green-50">
              <Image
                src="/svg1.png"
                alt="svg2`"
                width={510}
                height={510}
                className="rounded-full bg-orange-50"
              />
            </div>
            <h6 className="mb-2 font-semibold leading-5 text-2xl">
              Enjoy the meal:
            </h6>
            <p className="mb-3 text-sm text-gray-900">
              Our content writing and copywriting service offers high-quality
              and engaging content that captivates your audience and drives
              conversions.
            </p>
            <a
              href="/"
              className="inline-flex items-center font-semibold text-green-500 hover:text-green-800 transition-colors duration-200"
            >
              Learn more
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ServicePage;
