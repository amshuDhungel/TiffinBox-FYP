"use client";
import { useAuth } from "@/app/context/authContext";
import { Avatar } from "antd";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import ReactCrop, {
  centerCrop,
  convertToPixelCrop,
  makeAspectCrop,
} from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import setCanvasPreview from "./setCanvasPreview";
import { baseUrl } from "@/app/Urls";

const UpdateProfileForm = () => {
  const router = useRouter();
  const { userData, setUserData } = useAuth();
  const [nickname, setNickname] = useState("");
  const [bio, setBio] = useState("");
  const [remainingChars, setRemainingChars] = useState(280);
  const imgRef = useRef(null);
  const previewCanvasRef = useRef(null);
  const [avatar, setAvatar] = useState("");
  const [crop, setCrop] = useState();
  const [error, setError] = useState("");
  const ASPECT_RATIO = 1;
  const MIN_DIMENSION = 200;

  useEffect(() => {
    if (userData) {
      setNickname(userData.nickname);
      setBio(userData.bio);
      setAvatar(userData.avatar);
    }
  }, [userData]);

  const handleBioChange = (event: any) => {
    const inputValue = event.target.value;
    if (inputValue.length <= 280) {
      setBio(inputValue);
      setRemainingChars(280 - inputValue.length);
    }
  };

  const AvatarPreview = (e: any) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.addEventListener("load", () => {
      const imageElement = new Image();
      const imageUrl = reader.result?.toString() || "";
      imageElement.src = imageUrl;

      imageElement.addEventListener("load", (e) => {
        if (error) setError("");
        const { naturalWidth, naturalHeight } = e.currentTarget;
        if (naturalWidth < MIN_DIMENSION || naturalHeight < MIN_DIMENSION) {
          setError("Image must be at least 200 x 200 pixels.");
          return setAvatar("");
        }
      });
      setAvatar(imageUrl);
    });
    reader.readAsDataURL(file);
  };

  const saveChanges = async (e: any) => {
    e.preventDefault();
    try {
      const response = await fetch(`${baseUrl}/auth/update/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          nickname: nickname,
          bio: bio,
          avatar: avatar,
        }),
      });
      const data = await response.json();
      console.log(data);
      if (!response.ok) {
        alert(data.message);
      } else {
        alert("Profile updated successfully");
        router.push("/menu/account");
        setUserData({
          ...userData,
          nickname: nickname,
          bio: bio,
          avatar: avatar,
        });
      }
    } catch (error) {
      alert("Something is wrong");
      console.log(error);
    }
  };

  const onImageLoad = (e: any) => {
    const { width, height } = e.currentTarget;
    const cropWidthInPercent = (MIN_DIMENSION / width) * 100;

    const crop = makeAspectCrop(
      {
        unit: "%",
        width: cropWidthInPercent,
      },
      ASPECT_RATIO,
      width,
      height
    );
    const centeredCrop = centerCrop(crop, width, height);
    setCrop(centeredCrop);
  };

  return (
    <>
      <div className="flex justify-center mt-20 px-8">
        <div className="w-full mt-4 p-4">
          {/* {avatar ? (
          <Avatar
            src={avatar}
            alt="tiffinbox"
            size={200}
            className="rounded-full"
          />
        ) : (
          <Avatar
            src="/TiffinBox.png"
            alt="tiffinbox"
            size={200}
            className="rounded-full"
          />
        )} */}
          {error && <p className="text-red-400 text-xs">{error}</p>}
          {avatar ? (
            <>
              <ReactCrop
                crop={crop}
                circularCrop
                keepSelection
                onChange={(pixelCrop, percentCrop) => setCrop(percentCrop)}
                aspect={ASPECT_RATIO}
                minWidth={MIN_DIMENSION}
              >
                <img
                  ref={imgRef}
                  src={avatar}
                  alt="tiffinbox"
                  style={{ maxHeight: "70vh" }}
                  className=""
                  onLoad={onImageLoad}
                />
              </ReactCrop>
              <button
                className="text-white font-mono text-xs py-2 px-4 rounded-2xl mt-4 bg-orange-500
             hover:bg-orange-600"
                onClick={() => {
                  setCanvasPreview(
                    imgRef.current,
                    previewCanvasRef.current,
                    convertToPixelCrop(
                      crop,
                      imgRef.current.width,
                      imgRef.current.height
                    )
                  );
                }}
              >
                Crop Image
              </button>
            </>
          ) : null}
        </div>
        {crop && (
          <canvas
            ref={previewCanvasRef}
            className="mt-4"
            style={{
              display: "none",
              border: "1px solid black",
              objectFit: "contain",
              width: 200,
              height: 200,
            }}
          />
        )}
        <form className="max-w-2xl" onSubmit={saveChanges}>
          <div className="flex flex-wrap border shadow rounded-lg p-3 dark:bg-gray-600">
            <div className="flex flex-col gap-2 w-full border-gray-400">
              <div className="w-full border-gray-400">
                <div>
                  <label className="text-gray-600 dark:text-gray-400">
                    Choose Image
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={AvatarPreview}
                    className="block w-full text-sm text-slate-500 file:mr-4 file:py-1 file:px-2 file:rounded-full file:border-0 file:text-xs file:bg-orange-700 file:text-white hover:file:bg-orange-600"
                  />
                </div>
              </div>
              <div>
                <label className="text-gray-600 dark:text-gray-400">
                  nickname
                </label>
                <input
                  className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow dark:bg-gray-600 dark:text-gray-100"
                  type="text"
                  placeholder="nickname"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                />
              </div>
              <div>
                <label className="text-gray-600 dark:text-gray-400">Bio</label>
                <textarea
                  className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow dark:bg-gray-600 dark:text-gray-100"
                  name="bio"
                  placeholder="write your bio -max word 280"
                  value={bio}
                  onChange={handleBioChange}
                  maxLength={280} // Add maxLength attribute
                />
              </div>
              <div className="flex justify-end">
                <button
                  className="py-1.5 px-3 m-1 text-center bg-orange-700 border rounded-md text-white  hover:bg-violet-500 hover:text-gray-100 dark:text-gray-200 dark:bg-violet-700"
                  type="submit"
                >
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default UpdateProfileForm;
