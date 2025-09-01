"use client";
import Head from "next/head";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

interface Question {
  type: string;
  question: string;
  options?: string[];
  answer?: string;
  blanks?: { sentence: string; answer: string }[];
  matches?: { term: string; description: string }[];
}

interface Assessment {
  id: string;
  type: string;
  questions: Question[];
}

interface Camp {
  id: string;
  name: string;
  type: string;
  assesments: Assessment[];
}

const CampsPage: React.FC = () => {
  const router = useRouter();
  const [showDialog, setShowDialog] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [camps, setCamps] = useState<Camp[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("All");

  const programCategories = [
    { title: "Courses", link: "" },
    { title: "Short Courses", link: "" },
    { title: "Camps", link: "Programs/Camps" },
    { title: "Workshops", link: "" },
    { title: "Long Workshops", link: "" },
  ];

useEffect(() => {
  fetch("/api/logiscool/programs?type=camps")
    .then((res) => res.json())
    .then((data: Camp[]) => setCamps(data))
    .catch((err) => console.error("Error loading camps:", err));
}, []);


  const campTypes = ["All", ...Array.from(new Set(camps.map((c) => c.type)))];

  const filteredCamps = camps.filter((camp) => {
    const matchesSearch = camp.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === "All" || camp.type.trim().toLowerCase() === selectedType.trim().toLowerCase();
    return matchesSearch && matchesType;
  });

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

  return (
    <div className="relative flex min-h-screen flex-col bg-white overflow-x-hidden" style={{ fontFamily: 'Lexend, "Noto Sans", sans-serif' }}>
      <Head>
        <title>Camps</title>
        <meta name="description" content="Logiscool Camps Page" />
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
      <main className="flex-1">
        <div className="px-10 md:px-20 flex justify-center py-5">
          <div className="flex flex-col max-w-[960px] w-full">
            <div className="px-4 py-3">
              <label className="flex flex-col min-w-40 h-12 w-full">
                <div className="flex w-full flex-1 items-stretch rounded-lg h-full">
                  <div className="text-[#816178] flex border-none bg-[#f9f0f3] items-center justify-center pl-4 rounded-l-lg border-r-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                      <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path>
                    </svg>
                  </div>
                  <input type="text" placeholder="Search for camps" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#181116] focus:outline-0 focus:ring-0 border-none bg-[#f9f0f3] focus:border-none h-full placeholder:text-[#816178] px-4 rounded-l-none border-l-0 pl-2 text-base font-normal leading-normal" />
                </div>
              </label>
            </div>
            <div className="flex gap-3 p-3 flex-wrap pr-4">
              {campTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`flex h-8 items-center gap-x-2 rounded-lg px-4 font-medium 
                  ${selectedType === type ? "bg-[#568F87] text-white" : "bg-[#F5BABB] text-[#064232]"}
                  hover:scale-105 hover:shadow-md transition transform`}
                >
                  {type}
                </button>
              ))}
            </div>
            <h2 className="text-[#064232] text-[22px] font-bold px-4 pb-3 pt-5 text-center">Available Camps</h2>
            {filteredCamps.length === 0 ? (
              <div className="text-[#064232] flex flex-col items-center gap-6 px-4 py-6">
                <div
                  className="bg-center bg-no-repeat aspect-video bg-cover rounded-lg w-full max-w-[360px]"
                  style={{
                    backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAhSGOTnSSitXqSUGcl-VK8DH-TFoNcVakyBaHwNdkHlwr9avpp1kcFcwx11_uYAC0MHFWyt_EhcX9u5gpInecDytHyoaoA-BW7qMXeyGUVjCN2aG50Dqp3crvH71CLsSXcsT2VTOAeCXOpQ4hhFOZvowUyJgnxO52uAg7wjOGgz3aGRAj70KeVNCY_NzQM7N_AabCEHxUoF2A42Hn51n7y202iv1Yp6IZ7L3QIgJIvhNbCRV5FuabbIxkOreNNqRH0Hx0VlpfCInk')",
                  }}
                />
                <div className="flex max-w-[480px] flex-col items-center gap-2">
                  <p className="text-lg font-bold text-center">No Camps Available</p>
                  <p className="text-sm text-center">Currently, there are no camps available that fit your search</p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {filteredCamps.map((camp) => (
                  <div key={camp.id} className="rounded-lg bg-[#f9f0f3] p-3 shadow-md hover:shadow-lg transform hover:scale-[1.02] transition flex flex-col justify-between">
                    <div className="flex flex-col items-center gap-1 text-center">
                      <p className="text-[#064232] text-lg font-bold">{camp.name}</p>
                      <p className="text-[#568F87] text-sm font-medium">{camp.type}</p>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:justify-center gap-2 mt-3 flex-wrap">
                      {camp.assesments.map((a) => (
                        <button key={a.id} onClick={() => router.push(`/Logiscool/Tests/${camp.id}/${a.type}`)} className="flex min-w-[84px] items-center justify-center rounded-lg h-8 px-3 bg-[#F5BABB] text-[#064232] font-medium hover:bg-[#568F87] hover:text-white transition transform hover:scale-105">
                          {a.type === "pre" ? "Pre-Assessment" : "Post-Assessment"}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
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
      </main>
      <footer className="flex justify-center bg-[#fafafa]">
        <div className="flex flex-col gap-6 px-5 py-5 text-center">
          <p className="text-[#87646b] text-base">©2025 Salma. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default CampsPage;