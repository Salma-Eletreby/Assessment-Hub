"use client";
import React, { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/navigation";

interface Content {
  id: number;
  title: string;
  timespan: string;
  text: string;
}

interface Session {
  _id: string;
  title: string;
  shortDescription: string;
  content: Content[];
}

interface Course {
  _id: string;
  title: string;
  shortDescription: string;
  type: "Course" | "One-Day Workshop";
  sessions: Session[];
}

const CoursesPage: React.FC = () => {
  const router = useRouter();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("/api/codinghub/materials");
        if (!response.ok) throw new Error("Failed to fetch courses");
        const data = await response.json();
        setCourses(data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const handleViewLesson = (id: string) => {
    router.push(`/CodingHub/Admin/courses/${id}/lesson-plan`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white" style={{ fontFamily: 'Lexend, "Noto Sans", sans-serif' }}>
      <Head>
        <title>Coding Hub Courses</title>
        <meta name="description" content="Coding Hub Courses" />
      </Head>

      {/* Header */}
      <header className="flex items-center justify-between border-b border-[#f5f0f2] px-10 py-3">
        <div className="flex items-center gap-3 sm:gap-4 text-[#171113] cursor-pointer" onClick={() => router.push("/")}>
          <img src="https://img.icons8.com/?size=100&id=cGcRDueIKQkF&format=png&color=000000" alt="icon" width="48" height="48" />
          <h2 className="text-base sm:text-lg font-bold leading-tight tracking-[-0.015em]">Assessments Hub</h2>
        </div>
        <div className="flex gap-8">
          <a className="text-[#181015] text-sm font-medium hover:underline" href="/CodingHub/Home">Back to Coding Hub</a>
          <a className="text-[#181015] text-sm font-medium hover:underline" href="/CodingHub/Admin/Home">Back to Admin Portal</a>
          <a className="text-[#181015] text-sm font-medium hover:underline" href="/CodingHub/Admin/Material">Back to Teaching Materials</a>
        </div>
      </header>

      {/* Main content */}
      <main className="px-4 md:px-16 py-8 flex justify-center">
        {loading ? (
          <p className="text-[#00426b] text-lg">Loading courses...</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 auto-rows-auto">
            {courses.map((course) => (
              <div key={course._id} className="bg-[#f0f3f5] shadow-sm hover:shadow-md transition-all duration-300 rounded-2xl p-6 flex flex-col">
                <div>
                  <h2 className="text-xl font-medium text-[#181116] mb-2">{course.title}</h2>
                  <p className="text-sm text-[#181116]/70 mb-4">{course.shortDescription}</p>
                </div>
                <div className="flex justify-between items-center mt-auto">
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full ${course.type === "Course" ? "bg-[#0077a8]/10 text-[#0077a8]" : "bg-[#00426b]/10 text-[#00426b]"}`}>
                    {course.type}
                  </span>
                  <button onClick={() => handleViewLesson(course._id)} className="bg-[#0077a8] hover:bg-[#00426b] text-white text-sm font-medium px-4 py-2 rounded-xl transition-all duration-200">
                    View Lesson Plan
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-auto bg-[#fafafa]">
        <div className="flex flex-col gap-6 px-5 py-5 text-center">
          <p className="text-[#00426b] text-base">©2025 Salma. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default CoursesPage;
