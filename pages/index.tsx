"use client";
import React from "react";
import { useRouter } from "next/router";
import Head from "next/head";

const AssesmentCenterLandingPage: React.FC = () => {
  const router = useRouter();

  return (
    <div className="relative flex size-full min-h-screen flex-col bg-white group/design-root overflow-x-hidden" style={{ fontFamily: '"Work Sans", "Noto Sans", sans-serif' }}>
      <Head>
        <title>Assesment Hub</title>
        <meta name="description" content="Assessments Portal" />
      </Head>
      <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#f4f0f1] px-10 py-3">
        <div className="flex items-center gap-4 text-[#171113]">
          <div className="size-8">
            <img src="https://img.icons8.com/?size=100&id=cGcRDueIKQkF&format=png&color=000000" alt="icon" width="48" height="48" />
          </div>
          <h2 className="text-[#171113] text-lg font-bold leading-tight tracking-[-0.015em]">Assessments Hub</h2>
        </div>
      </header>
      <div className="px-40 flex flex-1 justify-center py-5">
        <div className="flex flex-col max-w-[960px] flex-1">
          <div
            className="p-4 flex min-h-[480px] flex-col items-center justify-center gap-6 rounded-lg bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: "linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.4)), url('https://lh3.googleusercontent.com/aida-public/AB6AXuCpT4oXrrHMksZeFcG1mLsx99UJVp20owWrrz3xbg38uSk_mCI6FBJFmBeBKju7FHDTmjixOFD5wx_ORv3PBDNG3Rfx1jaoYbP0u0B8NX3wPeHFEwJ3gZGvtYp8FZnE7Q8UI73sL5HoiaUlOlfqT7zDWMXokxFiqPanvZbavWFx4vn30xI71r7go2VwnHK21RtKVBa7UUos0OpFo0l-y5i56FsMtGLskA-ORVkPGTGIF4lMY-9Hgkl9zUj10CJ9ChX8dX3W5tyzDI8')",
            }}
          >
            <div className="flex flex-col gap-2 text-center">
              <h1 className="text-white text-4xl font-black">Welcome to Assessments Hub</h1>
              <h2 className="text-white text-base">Select your preferred center to take your assessments and begin your journey.</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 w-full max-w-3xl">
              <div className="flex flex-col gap-3 rounded-2xl border border-[#e5dcde] bg-white p-6 shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300">
                <div className="text-[#00426a]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 256 256">
                    <path d="M69.12,94.15,28.5,128l40.62,33.85a8,8,0,1,1-10.24,12.29l-48-40a8,8,0,0,1,0-12.29l48-40a8,8,0,0,1,10.24,12.3Zm176,27.7-48-40a8,8,0,1,0-10.24,12.3L227.5,128l-40.62,33.85a8,8,0,1,0,10.24,12.29l48-40a8,8,0,0,0,0-12.29ZM162.73,32.48a8,8,0,0,0-10.25,4.79l-64,176a8,8,0,0,0,4.79,10.26A8.14,8.14,0,0,0,96,224a8,8,0,0,0,7.52-5.27l64-176A8,8,0,0,0,162.73,32.48Z"></path>
                  </svg>
                </div>
                <div className="flex flex-col gap-1 flex-1">
                  <h2 className="text-[#171113] text-xl font-bold">Coding Hub</h2>
                  <p className="text-[#87646b] text-sm flex-1">Dive into the world of programming with interactive courses and projects.</p>
                </div>
                <button onClick={() => router.push("/CodingHub/Home")} className="rounded-lg h-12 px-5 bg-[#00426a] text-white text-base font-bold hover:bg-[#003353] transition-colors">
                  Go to Coding Hub
                </button>
              </div>
              <div className="flex flex-col gap-3 rounded-2xl border border-[#e5dcde] bg-white p-6 shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300">
                <div className="text-[#c4d600]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 256 256">
                    <path d="M248,124a56.11,56.11,0,0,0-32-50.61V72a48,48,0,0,0-88-26.49A48,48,0,0,0,40,72v1.39a56,56,0,0,0,0,101.2V176a48,48,0,0,0,88,26.49A48,48,0,0,0,216,176v-1.41A56.09,56.09,0,0,0,248,124Z"></path>
                  </svg>
                </div>
                <div className="flex flex-col gap-1 flex-1">
                  <h2 className="text-[#171113] text-xl font-bold">Logiscool</h2>
                  <p className="text-[#87646b] text-sm flex-1">Enhance your logical thinking and problem-solving skills with engaging challenges.</p>
                </div>
                <button onClick={() => router.push("/Logiscool/Home")} className="rounded-lg h-12 px-5 bg-[#c4d600] text-[#171113] text-base font-bold hover:bg-[#a3b300] transition-colors">
                  Go to Logiscool
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer className="flex justify-center bg-[#fafafa]">
        <div className="flex flex-col gap-6 px-5 py-5 text-center">
          <p className="text-[#87646b] text-base">©2025 Salma. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default AssesmentCenterLandingPage;