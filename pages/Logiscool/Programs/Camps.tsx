"use client";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Image from "next/image"; // ✅ Import for logo

// Navbar programs
const programs = [
  { title: "Camps", colors: ["#009cde", "#00b4f0"], link: "/Logiscool/Programs/Camps" },
  { title: "Courses", colors: ["#a50050", "#d60070"], link: "/logiscool/courses" },
  { title: "Short Courses", colors: ["#c4d600", "#e4f000"], link: "/logiscool/short-courses" },
  { title: "One Day Workshops", colors: ["#009cde", "#00b4f0"], link: "/logiscool/one-day-workshops" },
  { title: "Long Workshops", colors: ["#a50050", "#d60070"], link: "/logiscool/long-workshops" },
];

const Camps: React.FC = () => {
  const router = useRouter();
  const [camps, setCamps] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  // Dropdown + teacher modal
  const [showDropdown, setShowDropdown] = useState(false);
  const [showTeacherDialog, setShowTeacherDialog] = useState(false);
  const [teacherPassword, setTeacherPassword] = useState("");
  const [teacherError, setTeacherError] = useState("");

  const dropdownTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    fetch("/data/logiscool/camps.json")
      .then((res) => res.json())
      .then((data) => setCamps(data))
      .catch((err) => console.error("Error loading camps:", err));
  }, []);

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

  const filteredCamps = camps.filter((camp) => {
    const matchesSearch = camp.name.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "All" || camp.type === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#009cde] via-[#00426a] to-[#c4d600] text-white">
      {/* Navbar */}
      <nav className="bg-[#00426a]/90 backdrop-blur-sm px-6 py-4 flex items-center justify-between shadow-md relative z-50">
        {/* Left side: Salma + Logo */}
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
            className="text-xl font-bold cursor-pointer hover:underline"
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
              }, 200); // small delay so user can move mouse
            }}
          >
            <button className="hover:underline font-medium flex items-center gap-1">
              Programs
              <span className="text-xs">▼</span>
            </button>

            {showDropdown && (
              <div
                className="absolute right-0 top-full mt-2 bg-white text-[#00426a] rounded shadow-lg z-[9999] max-h-60 overflow-y-auto min-w-[180px]"
              >
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

          {/* Teacher */}
          <button
            onClick={() => {
              setTeacherPassword("");
              setTeacherError("");
              setShowTeacherDialog(true);
            }}
            className="hover:underline font-medium"
          >
            Teacher
          </button>
        </div>
      </nav>
      {/* --- rest of your code unchanged --- */}

      {/* Main */}
      <main className="flex-grow px-6 py-12 max-w-7xl mx-auto w-full">
        {/* Header + Search + Filter */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
          <h2 className="text-4xl font-bold">Our Camps</h2>

          <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
            <input
              type="text"
              placeholder="Search camps..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="px-4 py-2 rounded-lg border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-[#009cde] bg-white"
            />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-4 py-2 rounded-lg border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-[#009cde] bg-white"
            >
              <option value="All">All</option>
              {[...new Set(camps.map((c) => c.type))].map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Camp cards */}
{/* Camp cards */}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 place-items-center m-10">
  {filteredCamps.map((camp) => (
    <div
      key={camp.id}
      className="relative w-100 h-45 rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 bg-white text-[#00426a]
                 hover:scale-105 hover:border-2 hover:border-gray-400"
    >
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        <h3 className="text-2xl font-semibold mb-4">{camp.name}</h3>
        <div className="flex gap-3">
          <a
            href={`/Logiscool/Tests/${camp.id}/pre`}
            className="bg-[#00426a] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#002d4a] hover:shadow-lg transition whitespace-nowrap"
          >
            Pre-assessment
          </a>
          <a
            href={`/Logiscool/Tests/${camp.id}/post`}
            className="bg-[#a50050] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#7a003c] hover:shadow-lg transition whitespace-nowrap"
          >
            Post-assessment
          </a>
        </div>
      </div>
    </div>
  ))}
</div>


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
        <p className="text-sm">&copy; {new Date().getFullYear()} © Copyright of Salma 2025</p>
      </footer>
    </div>
  );
};

export default Camps;