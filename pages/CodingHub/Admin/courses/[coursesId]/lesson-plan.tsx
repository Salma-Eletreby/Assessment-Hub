"use client";
import React, { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";

interface Session {
  _id: string;
  title: string;
  shortDescription: string;
}

interface Course {
  _id: string;
  title: string;
  sessions: Session[];
}

const LessonPlanPage: React.FC = () => {
  const router = useRouter();
  const params = useParams(); // assuming route: /courses/[id]/lesson-plan
  const courseId = params?.coursesId as string;

  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await fetch(`/api/codinghub/materials/${courseId}`);
        if (!response.ok) throw new Error("Failed to fetch course");
        const data = await response.json();
        setCourse(data);
      } catch (error) {
        console.error("Error fetching course:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [courseId]);

  return (
    <div className="flex flex-col min-h-screen bg-white" style={{ fontFamily: 'Lexend, "Noto Sans", sans-serif' }}>
      <Head>
        <title>Lesson Plan</title>
        <meta name="description" content="Lesson Plan" />
      </Head>

      {/* Header */}
      <header className="flex items-center justify-between border-b border-[#f5f0f2] px-10 py-3">
        <div className="flex items-center gap-3 sm:gap-4 text-[#171113] cursor-pointer" onClick={() => router.push("/")}>
          <img src="https://img.icons8.com/?size=100&id=cGcRDueIKQkF&format=png&color=000000" alt="icon" width="48" height="48" />
          <h2 className="text-base sm:text-lg font-bold leading-tight tracking-[-0.015em]">Assessments Hub</h2>
        </div>
        <div className="flex gap-8">
          <a className="text-[#181015] text-sm font-medium hover:underline" href="/CodingHub/Home">
            Back to Coding Hub
          </a>
          <a className="text-[#181015] text-sm font-medium hover:underline" href="/CodingHub/Admin/Home">
            Back to Admin Portal
          </a>
                    <a className="text-[#181015] text-sm font-medium hover:underline" href="/CodingHub/Admin/Material">Back to Teaching Materials</a>
        </div>
      </header>
      <main className="flex-1 px-4 md:px-16 py-8">
        {loading ? (
          <p className="text-[#00426b] text-lg">Loading lesson plan...</p>
        ) : course ? (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold text-[#00426b] mb-4">{course.title}</h1>
            <div className="grid gap-4">
              {course.sessions.map((session) => (
                <div key={session._id} className="bg-[#f0f3f5] rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow duration-200 flex justify-between items-center">
                  <div className="pr-4 flex-1">
                    <h2 className="text-xl font-semibold text-[#181116]">{session.title}</h2>
                    <p className="text-sm text-[#181116]/70 mt-1">{session.shortDescription}</p>
                  </div>
                  <button onClick={() => router.push(`/CodingHub/Admin/courses/${course._id}/sessions/${session._id}`)} className="bg-[#0077a8] hover:bg-[#00426b] text-white text-sm font-medium px-4 py-2 rounded-xl transition-all duration-200 whitespace-nowrap">
                    View Session Content
                  </button>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p className="text-[#0077a8] text-lg">Course not found.</p>
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

export default LessonPlanPage;
