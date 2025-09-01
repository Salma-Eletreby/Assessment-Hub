"use client";
import Head from "next/head";
import React from "react";
import { useRouter } from "next/router";

const TeacherPortal: React.FC = () => {
  const router = useRouter();
  return (
    <div className="relative flex min-h-screen flex-col bg-white overflow-x-hidden" style={{ fontFamily: 'Lexend, "Noto Sans", sans-serif' }}>
      <Head>
        <title>Logiscool Teacher</title>
        <meta name="description" content="Logiscool's Teacher Portal" />
      </Head>
      <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#f5f0f2] px-10 py-3">
        <div className="flex items-center gap-3 sm:gap-4 text-[#171113] cursor-pointer" onClick={() => router.push("/")}>
          <div className="size-8 sm:size-10">
            <img src="https://img.icons8.com/?size=100&id=cGcRDueIKQkF&format=png&color=000000" alt="icon" width="48" height="48" />
          </div>
          <h2 className="text-base sm:text-lg font-bold leading-tight tracking-[-0.015em]">Assessments Hub</h2>
        </div>
        <div className="flex flex-1 justify-end gap-8">
          <div className="flex items-center gap-9">
            <a className="text-[#181015] text-sm font-medium leading-normal hover:underline" href="/Logiscool/Home">
              Back to Logiscool
            </a>
            <a className="text-[#181015] text-sm font-medium leading-normal hover:underline" href="/Logiscool/Teacher/Home">
              Back to Teacher Portal
            </a>
          </div>
        </div>
      </header>
      <main className="flex flex-1 justify-center px-6 md:px-40 py-8 animate-fadeIn">
        <div className="flex flex-col max-w-[960px] flex-1">
          <div className="flex flex-wrap justify-between gap-3 p-4">
            <div className="flex min-w-72 flex-col gap-3">
              <p className="text-3xl font-bold text-[#111816]">Teacher Portal</p>
              <p className="text-sm text-[#568F87]">Manage your courses and workshops</p>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="flex flex-col gap-3 w-full max-w-[480px] px-4 py-3">
              {[
                { label: "Courses", path: "/Logiscool/Teacher/Courses" },
                { label: "Short Courses", path: "/Logiscool/Teacher/ShortCourses" },
                { label: "Camps", path: "/Logiscool/Teacher/Camps" },
                { label: "Workshops", path: "/Logiscool/Teacher/Workshops" },
                { label: "Long Workshop", path: "/Logiscool/Teacher/LongWorkshop" },
              ].map(({ label, path }) => (
                <button key={label} onClick={() => router.push(path)} className="h-12 w-full rounded-lg bg-[#568F87] text-white text-base font-bold tracking-wide shadow-md transition hover:bg-[#064232] hover:scale-105">
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </main>
      <footer className="flex justify-center bg-[#fafafa]">
        <div className="flex flex-col gap-6 px-5 py-5 text-center">
          <p className="text-[#87646b] text-base">©2025 Salma. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default TeacherPortal;
