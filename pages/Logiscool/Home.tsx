"use client";
import Head from "next/head";
import React, { useState } from "react";
import { useRouter } from "next/router";

const LogiscoolLandingPage: React.FC = () => {
  const router = useRouter();
  const [showDialog, setShowDialog] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const openDialog = () => {
    setPassword("");
    setError("");
    setShowDialog(true);
  };

  const closeDialog = () => {
    setPassword("");
    setError("");
    setShowDialog(false);
  };

  const handleAccess = () => {
    if (password === "admin123") {
      router.push("/Logiscool/Teacher/Home");
    } else {
      setError("Incorrect password. Please try again.");
    }
  };

  const programCategories = [
    {
      title: "Courses",
      img: "/Courses.png",
      link: "Programs/Courses",
    },
    {
      title: "Short Courses",
      img: "/ShortCourses.png",
      link: "",
    },
    {
      title: "Camps",
      img: "/Camps.png",
      link: "Programs/Camps",
    },
    {
      title: "Workshops",
      img: "/Workshops.png",
      link: "",
    },
    {
      title: "Long Workshops",
      img: "/LongWorkshops.png",
      link: "",
    },
  ];

  return (
    <div className="relative flex size-full min-h-screen flex-col bg-white group/design-root overflow-x-hidden" style={{ fontFamily: '"Work Sans", "Noto Sans", sans-serif' }}>
      <Head>
        <title>Logiscool</title>
        <meta name="description" content="Logiscool Assessments Portal" />
      </Head>
      <div className="layout-container flex h-full grow flex-col">
        <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#f5f0f2] px-10 py-3">
          <div className="flex items-center gap-3 sm:gap-4 text-[#171113] cursor-pointer" onClick={() => router.push("/")}>
            <div className="size-8 sm:size-10">
              <img src="https://img.icons8.com/?size=100&id=cGcRDueIKQkF&format=png&color=000000" alt="icon" width="48" height="48" />
            </div>
            <h2 className="text-base sm:text-lg font-bold leading-tight tracking-[-0.015em]">Assessments Hub</h2>
          </div>
          <div className="flex flex-1 justify-end gap-8">
            <div className="flex items-center gap-9">
              {programCategories.map((item) => (
                <a key={item.title} className="text-[#181015] text-sm font-medium leading-normal hover:underline" href={item.link}>
                  {item.title}
                </a>
              ))}
            </div>
            <button onClick={openDialog} className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#a80057] text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-[#900047] transition transform hover:scale-110 hover:shadow-2xl">
              <span className="truncate">Sign In to Teacher Portal</span>
            </button>
          </div>
        </header>
        <div className="px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            <div className="flex flex-col gap-4 items-center justify-center p-4 bg-[#f5f0f2] rounded-lg">
              <h1 className="text-[#a80057] text-4xl font-black leading-tight tracking-[-0.033em]">Explore Our Programs</h1>
              <h2 className="text-[#181015] text-sm font-normal leading-normal">Discover a variety of programs designed to inspire and educate young minds in the world of technology.</h2>
            </div>
            <h2 className="text-[#181015] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Program Categories</h2>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-6 p-4">
              {programCategories.map((item) => (
                <div key={item.title} className="flex flex-col gap-3 pb-3">
                  <div className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-lg" style={{ backgroundImage: `url(${item.img})` }} />
                  <p className="text-[#181015] text-base font-medium leading-normal">{item.title}</p>
                  <button onClick={() => router.push(item.link)} className="flex min-w-full cursor-pointer items-center justify-center rounded-lg h-10 px-4 bg-[#a80057] text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-[#900047] transition-colors">Explore</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {showDialog && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50">
          <div className="bg-white text-[#a80057] p-6 rounded-lg shadow-xl w-80 text-center animate-fadeIn">
            <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 font-bold text-lg" onClick={closeDialog}>
              ×
            </button>

            <h3 className="text-xl font-semibold mb-4">Enter Password</h3>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="w-full px-3 py-2 border rounded mb-4 focus:ring focus:ring-[#a80057] outline-none" />
            {error && <p className="text-red-600 text-sm mb-2">{error}</p>}
            <div className="flex justify-center gap-4 mt-2">
              <button onClick={handleAccess} className="bg-[#a80057] text-white px-4 py-2 rounded-lg hover:bg-[#910046] transition transform hover:scale-105">
                Submit
              </button>
              <button onClick={closeDialog} className="bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300 transition">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      <footer className="flex justify-center bg-[#fafafa]">
        <div className="flex flex-col gap-6 px-5 py-5 text-center">
          <p className="text-[#87646b] text-base">©2025 Salma. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LogiscoolLandingPage;