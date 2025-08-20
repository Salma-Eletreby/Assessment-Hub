import React, { useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

const CodingHubLandingPage: React.FC = () => {
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
          <div className="flex flex-col items-center gap-6 px-4 py-6">
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
          </div>
        </div>
      </main>
      <footer className="flex justify-center bg-[#fafafa]">
        <div className="flex flex-col gap-6 px-5 py-5 text-center">
          <p className="text-[#87646b] text-base">©2025 Salma. All rights reserved.</p>
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