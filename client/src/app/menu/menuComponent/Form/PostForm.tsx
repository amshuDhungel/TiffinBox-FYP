"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { baseUrl } from "@/app/Urls";

const PostFoodForm = () => {
  const router = useRouter();
  const [foodtitle, setFoodtitle] = useState("");
  const [fooddescription, setFooddescription] = useState("");
  const [foodprice, setFoodprice] = useState("");
  const [image, setImage] = useState("");

  //handle and convert it in base 64
  const handleImage = (e: any) => {
    const file = e.target.files[0];
    setFileToBase(file);
    console.log(file);
  };

  const setFileToBase = (file: any) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImage(reader.result);
    };
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await fetch(`${baseUrl}/post/upload`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          foodtitle: foodtitle,
          fooddescription: fooddescription,
          foodprice: foodprice,
          image: image,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        setFoodtitle("");
        setFooddescription("");
        setFoodprice("");
        setImage("");
        alert("Post successfully created");
        router.push("/menu");
      }
      console.log(data);
    } catch (error) {
      console.error("Error:", error);
      alert("Invalid post created");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="bg-white rounded-2xl flex flex-col max-w-3xl p-5 items-center">
        <h2 className="font-bold text-3xl text-blue-900">Post Food</h2>
        <p className="text-sm mt-4 text-blue-900">
          Share your delicious food with others.
        </p>
        <div className="w-full mt-4 p-4">
          {image && (
            <img
              className="rounded-2xl max-h-[400px]"
              src={image}
              alt="post food"
            />
          )}
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
          <input
            className="p-2 rounded-xl border text-black"
            type="text"
            name="foodtitle"
            value={foodtitle}
            onChange={(e: any) => setFoodtitle(e.target.value)}
            placeholder="Food Name"
          />
          <textarea
            className="p-2 rounded-xl border text-black"
            name="fooddescription"
            value={fooddescription}
            onChange={(e: any) => setFooddescription(e.target.value)}
            placeholder="Content-specify veg, non-veg etc..."
          />
          <input
            className="p-2 rounded-xl border text-black"
            type="text"
            name="foodprice"
            value={foodprice}
            onChange={(e: any) => setFoodprice(e.target.value)}
            placeholder="Price-write in only number"
          />
          <label htmlFor="fileInput" className="relative cursor-pointer">
            <input
              type="file"
              onChange={handleImage}
              className="p-2 rounded-xl border"
              accept="image/*"
              id="fileInput"
            />
          </label>
          <button
            className="bg-blue-900 text-white py-2 rounded-xl hover:scale-105 duration-300 hover:bg-blue-800 font-medium"
            type="submit"
          >
            Post Food
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostFoodForm;
