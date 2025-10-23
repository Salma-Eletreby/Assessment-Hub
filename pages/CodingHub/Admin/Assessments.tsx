"use client";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

const TeacherCourses: React.FC = () => {
  const router = useRouter();
  const [jsonContent, setJsonContent] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  const loadJson = async () => {
    try {
      const res = await fetch("/api/codinghub/file?name=CodingHubMaterials");
      if (!res.ok) throw new Error("Failed to load JSON");
      const data = await res.json();
      setJsonContent(JSON.stringify(data, null, 2));
      setLoading(false);
    } catch (err) {
      console.error(err);
      alert("Error loading JSON file");
    }
  };

  useEffect(() => {
    loadJson();
  }, []);

  const handleSave = async () => {
    try {
      const res = await fetch("/api/codinghub/file?name=CodingHubMaterials", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: jsonContent,
      });
      if (res.ok) alert("JSON saved successfully!");
      else alert("Failed to save JSON");
    } catch (err) {
      console.error(err);
      alert("Error saving JSON");
    }
  };

  const handleDiscard = () => {
    const confirmDiscard = window.confirm("Are you sure you want to discard your edits?\nThis will return you to the Teacher Portal.");
    if (confirmDiscard) router.push("/Logiscool/Teacher/Home");
  };

  return (
    <div className="relative flex min-h-screen flex-col bg-white overflow-x-hidden" style={{ fontFamily: 'Lexend, "Noto Sans", sans-serif' }}>
      <Head>
        <title>Edit Courses</title>
        <meta name="description" content="Edit Courses" />
      </Head>
      <header className="flex items-center justify-between border-b border-solid border-b-[#f5f0f2] px-10 py-3">
        <div className="flex items-center gap-3 sm:gap-4 text-[#171113] cursor-pointer" onClick={() => router.push("/")}>
          <img src="https://img.icons8.com/?size=100&id=cGcRDueIKQkF&format=png&color=000000" alt="icon" width={48} height={48} />
          <h2 className="text-base sm:text-lg font-bold leading-tight tracking-[-0.015em]">Assessments Hub</h2>
        </div>
        <div className="flex flex-1 justify-end gap-8">
          <a className="text-[#181015] text-sm font-medium leading-normal hover:underline" href="/Logiscool/Home">
            Back to Logiscool
          </a>
          <a className="text-[#181015] text-sm font-medium leading-normal hover:underline" href="/Logiscool/Teacher/Home">
            Back to Teacher Portal
          </a>
        </div>
      </header>
      <main className="flex flex-1 justify-center py-8 px-8 md:px-20">
        <div className="flex flex-col w-full max-w-[960px] gap-6">
          <h1 className="text-3xl font-bold text-[#111816]">Edit Courses File</h1>
          {loading ? (
            <p>Loading JSON...</p>
          ) : (
            <>
              <textarea value={jsonContent} onChange={(e) => setJsonContent(e.target.value)} className="w-full min-h-[500px] p-5 text-sm font-mono text-[#111816] bg-[#f9f9f9] border border-[#dbe6e3] rounded-lg resize-y focus:outline-none focus:border-[#034939] focus:ring-1 focus:ring-[#034939] transition" spellCheck={false} />
              <div className="flex gap-4 justify-end">
                <button onClick={handleDiscard} className="px-5 py-2 bg-[#f0f5f3] text-[#111816] font-bold rounded-lg hover:bg-[#dbe6e3] transition">
                  Discard
                </button>
                <button onClick={handleSave} className="px-5 py-2 bg-[#034939] text-white font-bold rounded-lg hover:bg-[#046b54] transition">
                  Save
                </button>
              </div>
            </>
          )}
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

export default TeacherCourses;