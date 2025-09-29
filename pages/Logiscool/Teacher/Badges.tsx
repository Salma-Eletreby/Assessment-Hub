"use client";
import Head from "next/head";
import React, { useState } from "react";
import { useRouter } from "next/router";
import jsPDF from "jspdf";

const Badges: React.FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [inputText, setInputText] = useState("");

  const handleGenerate = async () => {
    if (!inputText.trim()) return; // prevent empty input
    setLoading(true);

    const lines = inputText
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);

    const badgeImg = new Image();
    badgeImg.src = "/badge.png";

    await new Promise<void>((resolve) => {
      badgeImg.onload = () => resolve();
    });

    const pdf = new jsPDF("p", "mm", "a4");
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    const badgeWidth = 80; // mm
    const badgeHeight = 50; // mm
    const marginX = 10;
    const marginY = 10;

    let x = marginX;
    let y = marginY;

    for (let i = 0; i < lines.length; i++) {
      const [name, username, password] = lines[i].split("\t");

      const canvas = document.createElement("canvas");
      canvas.width = badgeImg.width;
      canvas.height = badgeImg.height;
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(badgeImg, 0, 0);

      // Draw text on badge
      const marginLeft = 40
      ctx.fillStyle = "#000";
      ctx.font = "18px Arial";
      ctx.textAlign = "center";
      ctx.fillText(name, canvas.width / 2 + marginLeft, 190);
      ctx.font = "bold 24px Arial";
      ctx.fillText(username, canvas.width / 2 + marginLeft, 230);
      ctx.fillText(password, canvas.width / 2 + marginLeft, 270);

      const dataUrl = canvas.toDataURL("image/png");

      // Add badge to PDF
      pdf.addImage(dataUrl, "PNG", x, y, badgeWidth, badgeHeight);

      x += badgeWidth + marginX;
      if (x + badgeWidth + marginX > pageWidth) {
        x = marginX;
        y += badgeHeight + marginY;
        if (y + badgeHeight + marginY > pageHeight) {
          pdf.addPage();
          y = marginY;
        }
      }
    }

    pdf.save("badges.pdf");
    setLoading(false);
  };

  return (
    <div
      className="relative flex min-h-screen flex-col bg-white overflow-x-hidden"
      style={{ fontFamily: 'Lexend, "Noto Sans", sans-serif' }}
    >
      <Head>
        <title>Logiscool Badges</title>
        <meta
          name="description"
          content="Generates badges for logiscool students"
        />
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
              href="/Logiscool/Home"
            >
              Back to Logiscool
            </a>
            <a
              className="text-[#181015] text-sm font-medium leading-normal hover:underline"
              href="/Logiscool/Teacher/Home"
            >
              Back to Teacher Portal
            </a>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="flex flex-1 justify-center px-6 md:px-40 py-8 animate-fadeIn">
        <div className="flex flex-col max-w-[960px] flex-1">
          <div className="flex flex-wrap justify-between gap-3 p-4">
            <div className="flex min-w-72 flex-col gap-3">
              <p className="text-3xl font-bold text-[#111816]">Badge Creation</p>
              <p className="text-sm text-[#568F87]">
                Input students names, usernames, and passwords (tab-separated) and create the badges automatically
              </p>
            </div>
          </div>

          {/* Input + Button */}
          <div className="flex justify-center">
            <div className="flex flex-col gap-3 w-full max-w-[480px] px-4 py-3">
              <textarea
                className="w-full h-40 p-3 border border-gray-300 rounded-md resize-none focus:outline-none text-[#568F87] focus:ring-2 focus:ring-[#568F87]"
                placeholder="Name [tab] Username [tab] Password (one per line)"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
              />

              <button
                onClick={handleGenerate}
                disabled={loading}
                className="bg-[#568F87] hover:bg-[#45736c] text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                      />
                    </svg>
                    Generating...
                  </>
                ) : (
                  "Generate and Download"
                )}
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="flex justify-center bg-[#fafafa]">
        <div className="flex flex-col gap-6 px-5 py-5 text-center">
          <p className="text-[#87646b] text-base">©2025 Salma. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Badges;
