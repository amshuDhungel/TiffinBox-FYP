"use client";
import Featured from "@/components/Featured";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Image from "next/image";

import { useAuth } from "./context/authContext";
export default function Home() {
  return (
    <main className="">
      <Hero />
      <Featured />
      <Footer />
    </main>
  );
}
