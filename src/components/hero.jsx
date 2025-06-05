"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";


const HeroSection = () => {
  const imageRef = useRef();

   useEffect(() => {
    const imageElement = imageRef.current;

    const handleScroll=()=>{
      const scrollPosition = window.scrollY;
      const scrollThreshold = 100;
      if (scrollPosition>scrollThreshold) {
          imageElement.classList.add("scrolled");
      }else{
        imageElement.classList.remove("scrolled");
      }
    };

    window.addEventListener("scroll",handleScroll);

    return()=> window.removeEventListener("scroll",handleScroll);
  },[]);

  return (
    <div className="pd-20 px-4">
      <div className="container mx-auto text-center">
        <h1 className="text-5xl md:text-8xl leg:text-[105px] pb-6 bg-gradient-title text-blue-600  ">
          Manage Your Finances <br /> With Intelligence
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          An AI-powered financial management platform that helps you track,
          analyze, and optimize your spending with real-time insights.
        </p>
        <div className="flex justify-center space-x-3.5">
          <Link href="/dashboard">
            <Button size="lg" className="px-8">
              Get Started
            </Button>
          </Link>
          <Link href="https://github.com/dhirajmistry98">
            <Button size="lg" variant="outline" className="px-8">
              Watch Demo
            </Button>
          </Link>
        </div>
        <div className="hero-image-wrapper">
          <div ref={imageRef} className="hero-image">
            <Image
              src="/banner.jpg"
              width={1280}
              height={720}
              alt="Dashboard Preview"
              className="rounded-lg shadow-2xl border mx-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
