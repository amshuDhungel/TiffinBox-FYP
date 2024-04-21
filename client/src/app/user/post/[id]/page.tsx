"use client";
import Footer from "@/components/Footer";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { baseUrl } from "@/app/Urls";

const UpdateMyPost = () => {
  const router = useRouter();
  const [post, setPost] = useState();
  const [foodtitle, setFoodtitle] = useState("");
  const [fooddescription, setFooddescription] = useState("");
  const [foodprice, setFoodprice] = useState("");
  const [image, setImage] = useState([]);
  const { id } = useParams();
  console.log(id);

  //   const handleImage = (e: any) => {
  //     const file = e.target.files[0];
  //     setFileToBase(file);
  //     console.log(file);
  //   };

  //   const setFileToBase = (file: any) => {
  //     const reader = new FileReader();
  //     reader.readAsDataURL(file);
  //     reader.onload = () => {
  //       setImage(reader.result);
  //     };
  //   };

  useEffect(() => {
    fetchPost();
  }, []);

  const fetchPost = async () => {
    try {
      const response = await fetch(`${baseUrl}/post/myposts/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        credentials: "include",
      });
      const data = await response.json();
      console.log(data);
      setPost(data);
      setFoodtitle(data.foodtitle);
      setFooddescription(data.fooddescription);
      setFoodprice(data.foodprice);
      setImage(data.image);
    } catch (error) {
      alert("Something went wrong.");
      console.log(error);
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await fetch(`${baseUrl}/post/upload/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
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
      console.log(data);
      if (response.ok) {
        // Post updated successfully
        alert("Post updated successfully");
        // Optionally, you can redirect the user to another page
        router.push("/menu");
      } else {
        // Error updating post
        alert("Error updating post");
      }
    } catch (error) {
      alert("Error updating post");
      console.log("ERROR while postSumbit [_id].js => ", error);
    }
  };

  return (
    <>
      <div className="min-h-screen flex justify-center items-center mt-[15em]">
        <div className="bg-white rounded-2xl flex flex-col max-w-3xl p-5 items-center">
          <h2 className="font-bold text-3xl text-blue-900">Update Food</h2>
          <p className="text-sm mt-4 text-blue-900">
            Share your delicious food with others.
          </p>
          <div className="w-full mt-4 p-4">
            {image && image.url ? (
              <img
                className="rounded-2xl max-h-[400px]"
                src={image.url}
                alt="post food"
              />
            ) : (
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
            <button
              className="bg-blue-900 text-white py-2 rounded-xl hover:scale-105 duration-300 hover:bg-blue-800 font-medium"
              type="submit"
            >
              Update Food
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default UpdateMyPost;
