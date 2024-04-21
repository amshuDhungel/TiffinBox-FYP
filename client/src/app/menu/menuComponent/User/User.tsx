"use client";
import React from "react";
import { useAuth } from "@/app/context/authContext";
import { Card, Button } from "antd";
import Image from "next/image";
import Link from "next/link";

const User = () => {
  const { people } = useAuth();

  return (
    <div>
      {people.length > 0 ? (
        <div className="">
          {people.map((user: any) => (
            <div
              key={user._id}
              className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 px-2 mb-4"
            >
              <Card className="mb-4" style={{ width: "15em" }}>
                <Link href={`/user/user/${user._id}`} className="flex gap-3">
                  <Image
                    src="/TiffinBox.png"
                    alt="tiffinbox"
                    height={40}
                    width={40}
                    className="rounded-[180px]"
                  />
                  <p className="text-lg font-medium">{user.username}</p>
                </Link>
              </Card>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-lg font-medium text-gray-900">
          No users are logged in.
        </p>
      )}
    </div>
  );
};

export default User;
