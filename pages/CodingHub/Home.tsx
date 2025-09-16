"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

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

interface Program {
  id: string;
  name: string;
  type: string;
  assesments: Assessment[];
}

const CodingHubLandingPage: React.FC = () => {
  const router = useRouter();
  const [showDialog, setShowDialog] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [programs, setPrograms] = useState<Program[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("All");

  useEffect(() => {
    fetch("/api/codinghub/programs")
      .then((res) => res.json())
      .then((data: Program[]) => setPrograms(data))
      .catch((err) => console.error("Error loading programs:", err));
  }, []);

  const programTypes = ["All", ...Array.from(new Set(programs.map((p) => p.type)))];

    const filteredPrograms = programs.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === "All" || p.type.trim().toLowerCase() === selectedType.trim().toLowerCase();
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
      router.push("/educenter/assessments");
    } else {
      setError("Incorrect password. Please try again.");
    }
  };

  return (
    <div className="relative flex min-h-screen flex-col bg-white text-[#101518] font-['Work_Sans','Noto_Sans',sans-serif]">
      <Head>
        <title>Coding Hub</title>
        <meta name="description" content="Coding Hub Assessments Portal" />
      </Head>
      <header className="flex items-center justify-between border-b border-[#f0f3f5] px-6 py-3 sm:px-10">
        <div className="flex items-center gap-3 sm:gap-4 text-[#171113] cursor-pointer" onClick={() => router.push("/")}>
          <div className="size-8 sm:size-10">
            <img src="https://img.icons8.com/?size=100&id=cGcRDueIKQkF&format=png&color=000000" alt="icon" width="48" height="48" />
          </div>
          <h2 className="text-base sm:text-lg font-bold leading-tight tracking-[-0.015em]">Assessments Hub</h2>
        </div>
        <div className="flex flex-1 justify-end gap-4 sm:gap-8">
          <button onClick={openDialog} className="h-10 px-4 rounded-lg bg-[#00426b] text-white text-sm font-bold transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
            Sign In to Teacher Portal
          </button>
        </div>
      </header>
      <main className="px-6 sm:px-20 lg:px-40 flex flex-1 justify-center py-5">
        <div className="flex flex-col max-w-[960px] flex-1">
          <div className="flex flex-wrap justify-between gap-3 p-4">
            <p className="text-2xl sm:text-3xl font-bold">Coding Hub Assessments</p>
          </div>
          {
            programs.length == 0 ?           <div className="flex flex-col items-center gap-6 px-4 py-6">
            <div
              className="bg-center bg-no-repeat aspect-video bg-cover rounded-lg w-full max-w-[360px]"
              style={{
                backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAhSGOTnSSitXqSUGcl-VK8DH-TFoNcVakyBaHwNdkHlwr9avpp1kcFcwx11_uYAC0MHFWyt_EhcX9u5gpInecDytHyoaoA-BW7qMXeyGUVjCN2aG50Dqp3crvH71CLsSXcsT2VTOAeCXOpQ4hhFOZvowUyJgnxO52uAg7wjOGgz3aGRAj70KeVNCY_NzQM7N_AabCEHxUoF2A42Hn51n7y202iv1Yp6IZ7L3QIgJIvhNbCRV5FuabbIxkOreNNqRH0Hx0VlpfCInk')",
              }}
            />
            <div className="flex max-w-[480px] flex-col items-center gap-2">
              <p className="text-lg font-bold text-center">No Assessments Available</p>
              <p className="text-sm text-center">Currently, there are no assessments available for the Coding Hub. Please check back later for updates.</p>
            </div>
          </div>:          <div className="flex flex-col max-w-[960px] w-full">
            <div className="px-4 py-3">
              <label className="flex flex-col min-w-40 h-12 w-full">
                <div className="flex w-full flex-1 items-stretch rounded-lg h-full">
                  <div className="text-[#00426b] flex border-none bg-[#ecf4f9] items-center justify-center pl-4 rounded-l-lg border-r-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                      <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path>
                    </svg>
                  </div>
                  <input type="text" placeholder="Search for programs" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#181116] focus:outline-0 focus:ring-0 border-none bg-[#ecf4f9] focus:border-none h-full placeholder:text-[#00426b] px-4 rounded-l-none border-l-0 pl-2 text-base font-normal leading-normal" />
                </div>
              </label>
            </div>
            <div className="flex gap-3 p-3 flex-wrap pr-4">
              {programTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`flex h-8 items-center gap-x-2 rounded-lg px-4 font-medium 
                  ${selectedType === type ? "bg-[#40b5ad] text-#40b5ad" : "bg-[#0077a8] text-white"}
                  hover:scale-105 hover:shadow-md transition transform`}
                >
                  {type}
                </button>
              ))}
            </div>
            {filteredPrograms.length === 0 ? (
              <div className="text-[#064232] flex flex-col items-center gap-6 px-4 py-6">
                <div
                  className="bg-center bg-no-repeat aspect-video bg-cover rounded-lg w-full max-w-[360px]"
                  style={{
                    backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAhSGOTnSSitXqSUGcl-VK8DH-TFoNcVakyBaHwNdkHlwr9avpp1kcFcwx11_uYAC0MHFWyt_EhcX9u5gpInecDytHyoaoA-BW7qMXeyGUVjCN2aG50Dqp3crvH71CLsSXcsT2VTOAeCXOpQ4hhFOZvowUyJgnxO52uAg7wjOGgz3aGRAj70KeVNCY_NzQM7N_AabCEHxUoF2A42Hn51n7y202iv1Yp6IZ7L3QIgJIvhNbCRV5FuabbIxkOreNNqRH0Hx0VlpfCInk')",
                  }}
                />
                <div className="flex max-w-[480px] flex-col items-center gap-2">
                  <p className="text-lg font-bold text-center">No Programs Available</p>
                  <p className="text-sm text-center">Currently, there are no programs available that fit your search</p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {filteredPrograms.map((p) => (
                  <div key={p.id} className="rounded-lg bg-[#ecf4f9] p-3 shadow-md hover:shadow-lg transform hover:scale-[1.02] transition flex flex-col justify-between">
                    <div className="flex flex-col items-center gap-1 text-center">
                      <p className="text-[#064232] text-lg font-bold">{p.name}</p>
                      <p className="text-[#568F87] text-sm font-medium">{p.type}</p>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:justify-center gap-2 mt-3 flex-wrap">
                      {p.assesments.map((a) => (
                        <button key={a.id} onClick={() => router.push(`/CodingHub/Tests/camps/${p.id}/${a.type}`)} className="flex min-w-[84px] items-center justify-center rounded-lg h-8 px-3 bg-[#0077a8] text-white font-medium hover:bg-[#40b5ad] hover:text-#00426b transition transform hover:scale-105">
                          {a.type === "pre" ? "Pre-Assessment" : "Post-Assessment"}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          }
        </div>
      </main>
      <footer className="flex justify-center bg-[#ecf4f9]">
        <div className="flex flex-col gap-6 px-5 py-5 text-center">
          <p className="text-[#00426b] text-base">©2025 Salma. All rights reserved.</p>
        </div>
      </footer>
      {showDialog && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50">
          <div className="bg-white text-[#00426a] p-6 rounded-lg shadow-xl w-80 text-center relative animate-fadeIn">
            <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 font-bold text-lg" onClick={closeDialog}>
              ×
            </button>
            <h3 className="text-xl font-semibold mb-4">Enter Password</h3>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="w-full px-3 py-2 border rounded mb-4 focus:ring focus:ring-[#00426a] outline-none" />
            {error && <p className="text-red-600 text-sm mb-2">{error}</p>}
            <div className="flex justify-center gap-4 mt-2">
              <button onClick={handleAccess} className="bg-[#00426a] text-white px-4 py-2 rounded-lg hover:bg-[#036] transition transform hover:scale-105">
                Submit
              </button>
              <button onClick={closeDialog} className="bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300 transition">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CodingHubLandingPage;