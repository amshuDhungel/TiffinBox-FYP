"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { baseUrl } from "../Urls";

const LogoutPage = () => {
  const router = useRouter();
  //promises
  useEffect(() => {
    fetch(`${baseUrl}/auth/logout`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((response) => {
        router.push("/login");
      })
      .catch((error) => {
        console.log(error);
      });
  });
  return <>LogoutPage</>;
};

export default LogoutPage;
