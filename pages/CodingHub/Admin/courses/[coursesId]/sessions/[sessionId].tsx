"use client";
import React, { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { log } from "console";

interface Content {
  id: number;
  title: string;
  timespan: string;
  text: string;
}

interface Session {
  _id: string;
  title: string;
  content: Content[];
}

interface Course {
  _id: string;
  title: string;
  sessions: Session[];
}

const SessionContentPage: React.FC = () => {
  const router = useRouter();
  const params = useParams(); // /courses/[courseId]/sessions/[sessionId]
  console.log(params);
  
  const courseId = params?.coursesId as string;
  const sessionId = params?.sessionId as string;

  const [course, setCourse] = useState<Course | null>(null);
  const [sessionIndex, setSessionIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [openContentIds, setOpenContentIds] = useState<number[]>([]);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        console.log(courseId);
        console.log(sessionId);

        
        const response = await fetch(`/api/codinghub/materials/${courseId}`);
        if (!response.ok) throw new Error("Failed to fetch course");
        const data = await response.json();
        setCourse(data);

        // Find the index of the current session
        const index = data.sessions.findIndex((s: Session) => s._id === sessionId);
        setSessionIndex(index);
      } catch (error) {
        console.error("Error fetching course:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [courseId, sessionId]);

  if (loading) return <p className="text-[#00426b] text-lg px-4 py-8">Loading session...</p>;
  if (!course || sessionIndex === null) return <p className="text-[#0077a8] text-lg px-4 py-8">Session not found.</p>;

  const session = course.sessions[sessionIndex];

  const toggleContent = (id: number) => {
    setOpenContentIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const goToPreviousSession = () => {
    if (sessionIndex > 0)
      router.push(`/CodingHub/Admin/courses/${course._id}/sessions/${course.sessions[sessionIndex - 1]._id}`);
  };

  const goToNextSession = () => {
    if (sessionIndex < course.sessions.length - 1)
      router.push(`/CodingHub/Admin/courses/${course._id}/sessions/${course.sessions[sessionIndex + 1]._id}`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white" style={{ fontFamily: 'Lexend, "Noto Sans", sans-serif' }}>
      <Head>
        <title>{session.title}</title>
        <meta name="description" content={session.title} />
      </Head>

      {/* Header */}
      <header className="flex items-center justify-between border-b border-[#f5f0f2] px-10 py-3">
        <div className="flex items-center gap-3 sm:gap-4 text-[#171113] cursor-pointer" onClick={() => router.push("/")}>
          <img src="https://img.icons8.com/?size=100&id=cGcRDueIKQkF&format=png&color=000000" alt="icon" width="48" height="48" />
          <h2 className="text-base sm:text-lg font-bold tracking-[-0.015em]">Assessments Hub</h2>
        </div>
        <div className="flex gap-8">
          <button
            className="text-[#181015] text-sm font-medium hover:underline"
            onClick={() => router.push(`/CodingHub/Admin/courses/${course._id}/lesson-plan`)}
          >
            Back to Lesson Plan
          </button>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 px-4 md:px-16 py-8">
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={goToPreviousSession}
            disabled={sessionIndex === 0}
            className="bg-[#0077a8] hover:bg-[#00426b] disabled:opacity-50 text-white px-4 py-2 rounded-xl transition-all duration-200"
          >
            Previous Session
          </button>
          <h1 className="text-2xl font-bold text-[#00426b] text-center flex-1 mx-4">{session.title}</h1>
          <button
            onClick={goToNextSession}
            disabled={sessionIndex === course.sessions.length - 1}
            className="bg-[#0077a8] hover:bg-[#00426b] disabled:opacity-50 text-white px-4 py-2 rounded-xl transition-all duration-200"
          >
            Next Session
          </button>
        </div>

        <div className="space-y-4">
          {session.content.map((content) => (
            <div
              key={content.id}
              className="bg-[#f0f3f5] rounded-xl shadow-sm transition-shadow duration-200"
            >
              <button
                onClick={() => toggleContent(content.id)}
                className="w-full flex justify-between items-center px-5 py-4 text-left font-medium text-[#00426b] rounded-t-xl focus:outline-none"
              >
                <span>{content.title} - {content.timespan}</span>
                <span>{openContentIds.includes(content.id) ? "-" : "+"}</span>
              </button>
              {openContentIds.includes(content.id) && (
                <div className="px-5 py-4 border-t border-[#d3d3d3] text-[#181116]">
                  {content.text}
                </div>
              )}
            </div>
          ))}
        </div>
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

export default SessionContentPage;
