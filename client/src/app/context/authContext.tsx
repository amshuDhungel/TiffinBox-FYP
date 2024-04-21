"use client";
// authContext.tsx
import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { baseUrl } from "../Urls";

export const AuthContext = createContext({});

export const useAuth = () => {
  return useContext(AuthContext);
};

interface UserData {
  username: string;
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [people, setPeople] = useState([]);
  const [userData, setUserData] = useState<UserData | null>();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  const getUserData = async () => {
    try {
      const response = await fetch(`${baseUrl}/auth/allusers`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setIsLoggedIn(true);
      setPeople(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const callAccountPage = async () => {
    try {
      const response = await fetch(`${baseUrl}/auth/me`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await response.json();
      if (response.ok) {
        setUserData(data);
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
        router.push("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
    callAccountPage();
  }, []);

  // Function to update posts

  return (
    <AuthContext.Provider
      value={{
        userData,
        setUserData,
        isLoggedIn,
        people,
        getUserData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
