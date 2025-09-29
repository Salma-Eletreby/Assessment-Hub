"use client";
import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";

// Define course type
type Course = {
  name: string;
  date: string;
  time: string;
  sessions: number;
  participants: number;
  status: "Finished" | "Not Finished" | "In Progress";
};

const coursesData: Course[] = [
  {
    name: "Introduction to Programming",
    date: "2024-03-15",
    time: "10:00 AM",
    sessions: 10,
    participants: 25,
    status: "Finished",
  },
  {
    name: "Advanced Data Analysis",
    date: "2024-04-01",
    time: "2:00 PM",
    sessions: 12,
    participants: 30,
    status: "Not Finished",
  },
  {
    name: "Digital Marketing Fundamentals",
    date: "2024-04-10",
    time: "9:00 AM",
    sessions: 8,
    participants: 20,
    status: "In Progress",
  },
  {
    name: "Project Management Essentials",
    date: "2024-05-05",
    time: "1:00 PM",
    sessions: 15,
    participants: 35,
    status: "Finished",
  },
];

const CoursesPage: React.FC = () => {
  const router = useRouter();

  return (
    <div
      className="relative flex min-h-screen flex-col bg-white overflow-x-hidden text-[#181116]"
      style={{ fontFamily: 'Lexend, "Noto Sans", sans-serif' }}
    >
      <Head>
        <title>Course Management Dashboard</title>
        <meta name="description" content="Course Management Dashboard" />
      </Head>

      {/* Header */}
      <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#f5f0f2] px-10 py-3">
        <div
          className="flex items-center gap-3 sm:gap-4 text-[#171113] cursor-pointer"
          onClick={() => router.push("/")}
        >
          <div className="size-8 sm:size-10">
            <img
              src="https://img.icons8.com/?size=100&id=cGcRDueIKQkF&format=png&color=000000"
              alt="icon"
              width="48"
              height="48"
            />
          </div>
          <h2 className="text-base sm:text-lg font-bold leading-tight tracking-[-0.015em]">
            Assessments Hub
          </h2>
        </div>
        <div className="flex flex-1 justify-end gap-8">
          <div className="flex items-center gap-9">
            <a
              className="text-[#181015] text-sm font-medium leading-normal hover:underline"
              href="/CodingHub/Home"
            >
              Back to Coding Hub
            </a>
            <a
              className="text-[#181015] text-sm font-medium leading-normal hover:underline"
              href="/CodingHub/Admin/Home"
            >
              Back to Admin Portal
            </a>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8">
        <div className="mx-auto max-w-7xl">
          {/* Page Header */}
          <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <h1 className="text-3xl text-[#00426B] font-bold">Courses</h1>
            <button className="bg-[#0077A8] hover:bg-[#004d6e] flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-white shadow-sm">
              <span className="material-symbols-outlined text-2xl">+</span>
              <span>Add New Course</span>
            </button>
          </div>

          {/* Search & Filter */}
          <div className="mb-4 flex flex-col gap-4 sm:flex-row">
            <div className="bg-[#F0F3F5] relative flex-1 rounded-xl">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#0077A8] text-2xl">
                🔍︎
              </span>
              <input
                className="h-10 w-full rounded-lg pl-10 pr-4 text-sm focus:ring focus:ring-[#0077A8]"
                placeholder="Search courses by name..."
              />
            </div>
            <button className="bg-[#F0F3F5] hover:border-1 text-[#00426B] flex h-10 items-center justify-center gap-2 rounded-lg border px-4 text-sm font-medium hover:bg-primary/10">
              <span>Filter</span>
              <span className="material-symbols-outlined text-base">☰</span>
            </button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto rounded-lg border border-[#F0F3F5] bg-white">
            <table className="min-w-full">
              <thead className="bg-[#F0F3F5]">
                <tr>
                  <th className="text-[#0077A8] font-semibold px-6 py-3 text-left text-xs uppercase tracking-wider">
                    Course Name
                  </th>
                  <th className="text-[#0077A8] font-semibold px-6 py-3 text-left text-xs uppercase tracking-wider">
                    Date Started
                  </th>
                  <th className="text-[#0077A8] font-semibold px-6 py-3 text-left text-xs uppercase tracking-wider">
                    Time
                  </th>
                  <th className="text-[#0077A8] font-semibold px-6 py-3 text-left text-xs uppercase tracking-wider">
                    Sessions
                  </th>
                  <th className="text-[#0077A8] font-semibold px-6 py-3 text-left text-xs uppercase tracking-wider">
                    Participants
                  </th>
                  <th className="text-[#0077A8] font-semibold px-6 py-3 text-left text-xs uppercase tracking-wider">
                    Status
                  </th>
                  <th className="relative px-6 py-3">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {coursesData.map((course, index) => (
                  <tr
                    key={index}
                    className={
                      index % 2 === 0 ? "bg-white" : "bg-[#F0F3F5]"
                    }
                  >
                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-[#181116]">
                      {course.name}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-[#00426B]">{course.date}</td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-[#00426B]">{course.time}</td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-[#00426B]">{course.sessions}</td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-[#00426B]">{course.participants}</td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <span
                        className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
      {
        Finished: "bg-[#0077A8]/10 text-[#0077A8]",
        "In Progress": "bg-yellow-200 text-yellow-800",
        "Not Finished": "bg-amber-500/10 text-amber-600",
      }[course.status] || "bg-gray-200 text-gray-700"
    }`}
                      >
                        {course.status}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                      <button className="text-[#0077A8] hover:text-[#015071] px-1">
                        <span className="material-symbols-outlined text-2xl">✎</span>
                      </button>
                      <button className="ml-2 text-red-500 hover:text-red-700 px-1">
                        <span className="material-symbols-outlined text-2xl">🗑</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="flex justify-center bg-[#fafafa]">
        <div className="flex flex-col gap-6 px-5 py-5 text-center">
          <p className="text-[#0077A8] text-base">©2025 Salma. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default CoursesPage;
