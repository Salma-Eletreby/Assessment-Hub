"use client";
import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

// Navbar programs
const programs = [
  { title: "Camps", colors: ["#009cde", "#00b4f0"], link: "/Logiscool/Programs/Camps" },
  { title: "Courses", colors: ["#a50050", "#d60070"], link: "/logiscool/courses" },
  { title: "Short Courses", colors: ["#c4d600", "#e4f000"], link: "/logiscool/short-courses" },
  { title: "One Day Workshops", colors: ["#009cde", "#00b4f0"], link: "/logiscool/one-day-workshops" },
  { title: "Long Workshops", colors: ["#a50050", "#d60070"], link: "/logiscool/long-workshops" },
];

const AssessmentPage: React.FC = () => {
  const router = useRouter();
  const { programID, assessmentType } = router.query;

  // Dropdown + teacher modal
  const [showDropdown, setShowDropdown] = useState(false);
  const [showTeacherDialog, setShowTeacherDialog] = useState(false);
  const [teacherPassword, setTeacherPassword] = useState("");
  const [teacherError, setTeacherError] = useState("");
  const dropdownTimeout = useRef<NodeJS.Timeout | null>(null);

  // Assessment data
  const [questions, setQuestions] = useState<any[]>([]);
  const [campName, setCampName] = useState("");

  useEffect(() => {
    if (!programID || !assessmentType) return;

    fetch("/data/logiscool/camps.json")
      .then((res) => res.json())
      .then((data) => {
        const camp = data.find((c: any) => c.id === programID);
        if (!camp) return;

        setCampName(camp.name);

        const assessment = camp.assesments.find((a: any) => a.type === assessmentType);
        if (assessment) {
          setQuestions(assessment.questions);
        }
      })
      .catch((err) => console.error(err));
  }, [programID, assessmentType]);

  const handleTeacherAccess = () => {
    if (teacherPassword === "teacher123") {
      setTeacherPassword("");
      setTeacherError("");
      setShowTeacherDialog(false);
      router.push("/teacher/dashboard");
    } else {
      setTeacherError("Incorrect password. Please try again.");
    }
  };

  const closeTeacherDialog = () => {
    setShowTeacherDialog(false);
    setTeacherPassword("");
    setTeacherError("");
  };

  return (
    <div className="flex flex-col min-h-screen bg-white text-[#00426a]">
      {/* Navbar */}
      <nav className="bg-[#00426a]/90 backdrop-blur-sm px-6 py-4 flex items-center justify-between shadow-md relative z-50">
        <div className="flex items-center gap-3">
          <Image
            src="/whiteLogo.png"
            alt="Logo"
            width={100}
            height={40}
            className="cursor-pointer"
            onClick={() => router.push("/Logiscool/Home")}
          />
          <h1
            className="text-xl font-bold cursor-pointer hover:underline text-white"
            onClick={() => router.push("/")}
          >
            Salma
          </h1>
        </div>

        <div className="flex items-center gap-6">
          {/* Programs dropdown */}
          <div
            className="relative"
            onMouseEnter={() => {
              if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
              setShowDropdown(true);
            }}
            onMouseLeave={() => {
              dropdownTimeout.current = setTimeout(() => {
                setShowDropdown(false);
              }, 200);
            }}
          >
            <button className="hover:underline font-medium flex items-center gap-1 text-white">
              Programs
              <span className="text-xs">▼</span>
            </button>

            {showDropdown && (
              <div className="absolute right-0 top-full mt-2 bg-white text-[#00426a] rounded shadow-lg z-[9999] max-h-60 overflow-y-auto min-w-[180px]">
                {programs.map((p) => (
                  <a
                    key={p.title}
                    href={p.link}
                    className="block px-4 py-2 hover:bg-[#009cde]/30"
                  >
                    {p.title}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Teacher button */}
          <button
            onClick={() => {
              setShowTeacherDialog(true);
              setTeacherPassword("");
              setTeacherError("");
            }}
            className="hover:underline font-medium text-white"
          >
            Teacher
          </button>
        </div>
      </nav>

      {/* Main content */}
      <main className="flex-grow p-6 max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">
          {campName} – {assessmentType?.toString().toUpperCase()} Assessment
        </h1>

        {questions.map((q, idx) => {
          switch (q.type) {
            case "mcq":
              return (
                <div key={idx} className="mb-6">
                  <p className="font-medium mb-2">{idx + 1}. {q.question}</p>
                  <div className="flex flex-col gap-2 ml-4">
                    {q.options.map((opt: string, i: number) => (
                      <label key={i} className="flex items-center gap-2">
                        <input type="radio" name={`q-${idx}`} value={opt} className="accent-[#009cde]" />
                        {opt}
                      </label>
                    ))}
                  </div>
                </div>
              );
            case "fill-in":
              return (
                <div key={idx} className="mb-6">
                  <p className="font-medium mb-2">{idx + 1}. Fill in the blanks:</p>
                  {q.blanks.map((b: any, i: number) => (
                    <input
                      key={i}
                      type="text"
                      placeholder={b.sentence}
                      className="mt-1 px-3 py-2 border rounded w-full mb-1"
                    />
                  ))}
                </div>
              );
            case "match":
              return (
                <div key={idx} className="mb-6">
                  <p className="font-medium mb-2">{idx + 1}. Match the terms:</p>
                  {q.matches.map((m: any, i: number) => (
                    <p key={i} className="ml-4 flex items-center gap-2 mb-1">
                      <span>{m.term} →</span>
                      <input type="text" placeholder={m.description} className="px-2 py-1 border rounded w-2/3" />
                    </p>
                  ))}
                </div>
              );
            case "open":
              return (
                <div key={idx} className="mb-6">
                  <p className="font-medium mb-2">{idx + 1}. {q.question}</p>
                  <textarea className="ml-4 mt-1 p-2 border rounded w-full" placeholder="Your answer here" />
                </div>
              );
            default:
              return null;
          }
        })}
      </main>

      {/* Teacher modal */}
      {showTeacherDialog && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-[9999]">
          <div className="bg-white text-[#00426a] p-6 rounded-lg shadow-xl w-80 text-center relative">
            <button
              onClick={closeTeacherDialog}
              className="absolute top-2 right-2 text-gray-500 hover:text-black"
            >
              ✕
            </button>

            <h2 className="text-xl font-bold mb-4">Teacher Access</h2>
            <input
              type="password"
              placeholder="Enter password"
              value={teacherPassword}
              onChange={(e) => setTeacherPassword(e.target.value)}
              className="border p-2 rounded w-full mb-3 focus:outline-none focus:ring-2 focus:ring-[#009cde]"
            />
            {teacherError && <p className="text-red-600 text-sm mb-3">{teacherError}</p>}
            <button
              onClick={handleTeacherAccess}
              className="w-full bg-[#009cde] text-white py-2 rounded-lg font-medium hover:bg-[#007fb3] transition"
            >
              Enter
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-[#00426a]/90 text-center py-4 mt-auto">
        <p className="text-sm text-white">&copy; {new Date().getFullYear()} © Copyright of Salma 2025</p>
      </footer>
    </div>
  );
};

export default AssessmentPage;
