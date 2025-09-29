"use client";
import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Link from "next/link";

const AcmeCRM: React.FC = () => {
    const router = useRouter();

  return (
    <div className="relative flex min-h-screen flex-col bg-white overflow-x-hidden" style={{ fontFamily: 'Lexend, "Noto Sans", sans-serif' }}>
            <Head>
        <title>Coding Hub CRM</title>
        <meta name="description" content="Coding Hub CRM" />
      </Head>
      {/* Header */}
      <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#f5f0f2] px-10 py-3">
        <div className="flex items-center gap-3 sm:gap-4 text-[#171113] cursor-pointer" onClick={() => router.push("/")}>
          <div className="size-8 sm:size-10">
            <img src="https://img.icons8.com/?size=100&id=cGcRDueIKQkF&format=png&color=000000" alt="icon" width="48" height="48" />
          </div>
          <h2 className="text-base sm:text-lg font-bold leading-tight tracking-[-0.015em]">Assessments Hub</h2>
        </div>
        <div className="flex flex-1 justify-end gap-8">
          <div className="flex items-center gap-9">
            <a className="text-[#181015] text-sm font-medium leading-normal hover:underline" href="/CodingHub/Home">
              Back to Coding Hub
            </a>
            <a className="text-[#181015] text-sm font-medium leading-normal hover:underline" href="/CodingHub/Admin/Home">
              Back to Admin Portal
            </a>
          </div>
        </div>
      </header>
      {/* Main */}
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-[#00426B] my-7">
            Welcome to Coding Hub
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Card 1 */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
              <div
                className="relative h-48 bg-cover bg-center"
                style={{
                  backgroundImage:
                    'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBDfkOyvjOWVoKYah4G4BdkkJ80WU1rpNngFKGpBvXmzaNlh0dihDVbslE3JoaYkABvEvpe28_t_NiBdJVLU95Hgbdds7RlZGWRqp2_YLPxvKefmWB-yhXOGMa87-S86n3Euzej98iqEf2sY_iBk-G54c9g_t5SWQcxL-7DGsdupp46vSVdOYkXS5dzi1ArvA3Jtmmg6e7ba9GgOMvqQc72tahA3Rqx_mHPt9PWTRegj4LfsfO-vNN5un17se9vE3SnsZxqP05xbC4")',
                }}
              >
                <div className="absolute inset-0 bg-black/20" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900">
                  Courses
                </h3>
                <p className="text-gray-600">
                  Manage new sessions and register students.
                </p>
<Link
  className="inline-flex bg-[#00426B] items-center justify-center w-full sm:w-auto px-6 py-3 my-4 text-white font-medium rounded-lg shadow-md hover:bg-[#0077A8] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00426B] transition-all"
  href="/CodingHub/Admin/CRM/Courses" // put the path you want to navigate to
>
                  Go to Courses
                  <span className="material-symbols-outlined ml-2">
                    →
                  </span>
                </Link>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
              <div
                className="relative h-48 bg-cover bg-center"
                style={{
                  backgroundImage:
                    'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBDDN9gsV2U2arQVy357ARNCUuSB6OEwf3r-tfTEg2jQ9-c-Rlo9CWU1yQu-BR8nVigJBd8xTEhc20BwXUrvrOtYF6SituhTXtN_jhO6aogVpW9HW2uRY6GqlCVLGzT_8NUmFGD7joF0UaMNowc93--krd1Lq4xv3Si4PeNBJ3zB9W-b4IN_NcJcr_BsrkWLic0fPWK7nj672hAY48CA5LAsiBY5Mx_OINaO4j9mUgkx8Cz78j9PB-6gEICzU9LpxNBzjIrnGCD2xI")',
                }}
              >
                <div className="absolute inset-0 bg-black/20" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900">
                  Students
                </h3>
                <p className="text-gray-600">
                  View details of all enrolled students.
                </p>
<a
  className="inline-flex bg-[#00426B] items-center justify-center w-full sm:w-auto px-6 py-3 my-4 text-white font-medium rounded-lg shadow-md hover:bg-[#0077A8] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00426B] transition-all"
  href="#"
>
                  Go to Students
                  <span className="material-symbols-outlined ml-2">
                    →
                  </span>
                </a>
              </div>
            </div>
          </div>
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

export default AcmeCRM;