"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import jsPDF from "jspdf";
import { toJpeg } from "html-to-image";

const programCategories = [
  { title: "Courses", link: "" },
  { title: "Short Courses", link: "" },
  { title: "Camps", link: "Logiscool/Programs/Camps" },
  { title: "Workshops", link: "" },
  { title: "Long Workshops", link: "" },
];

const AssessmentPage: React.FC = () => {
  const router = useRouter();
  const [showDialog, setShowDialog] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { programID, assessmentType } = router.query;

  const [questions, setQuestions] = useState<any[]>([]);
  const [campName, setCampName] = useState("");
  const [answers, setAnswers] = useState<any>({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!programID || !assessmentType) return;

    fetch("/api/logiscool/programs?type=camps")
      .then((res) => res.json())
      .then((data) => {
        const camp = data.find((c: any) => c.id === programID);
        if (!camp) return;
        setCampName(camp.name);
        const assessment = camp.assesments.find((a: any) => a.type === assessmentType);
        if (assessment) setQuestions(assessment.questions);
      })
      .catch((err) => console.error(err));
  }, [programID, assessmentType]);

  const handleChange = (qIdx: string | number, value: string) => {
    setAnswers((prev: any) => ({ ...prev, [qIdx]: value }));
  };

  const generatePdf = async () => {
    const element = document.getElementById("assessment-main");
    if (!element) return;

    const prevMaxWidth = element.style.maxWidth;
    const prevMargin = element.style.margin;
    const submitButton = element.querySelector("button");
    const prevButtonDisplay = submitButton?.style.display;

    try {
      element.style.maxWidth = "none";
      element.style.margin = "0";
      if (submitButton) submitButton.style.display = "none";
      element.style.transformOrigin = "top left";
      element.querySelectorAll("input[type='radio']").forEach((el) => {
        const radio = el as HTMLInputElement;
        const name = radio.name;
        const idx = parseInt(name.split("-")[1], 10);
        const userAnswer = answers[idx];

        if (userAnswer === radio.value) {
          radio.style.boxShadow = "0 0 0 2px blue";
          radio.style.borderRadius = "50%";
          radio.style.backgroundColor = "blue";
        }
      });

      const dataUrl = await toJpeg(element, {
        quality: 0.8,
        pixelRatio: 2,
        cacheBust: true,
        backgroundColor: "#ffffff",
      });

      element.style.transform = "";
      if (submitButton) submitButton.style.display = prevButtonDisplay || "";
      element.style.maxWidth = prevMaxWidth;
      element.style.margin = prevMargin;

      const pdf = new jsPDF("p", "pt", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      const headerImg = new Image();
      headerImg.src = "/LogiscoolDocHeader.png";
      await new Promise((resolve, reject) => {
        headerImg.onload = resolve;
        headerImg.onerror = reject;
      });
      const headerHeight = (headerImg.height * pdfWidth) / headerImg.width;
      pdf.addImage(headerImg, "JPEG", 0, 0, pdfWidth, headerHeight);

      const img = new Image();
      img.src = dataUrl;
      await new Promise((resolve) => (img.onload = resolve));
      const ratio = pdfWidth / img.width;
      const scaledHeight = img.height * ratio;

      let position = headerHeight;
      pdf.addImage(dataUrl, "JPEG", 0, position, pdfWidth, scaledHeight);

      const studentNameInput = (document.getElementById("studentName") as HTMLInputElement)?.value || "student";
      const campName = document.querySelector("h1")?.textContent?.split("–")[0]?.trim() || "Assessment";
      const fileName = `${studentNameInput}-${campName}-Assessment.pdf`;

      const pdfBlob = pdf.output("blob");
      const formData = new FormData();
      formData.append("file", pdfBlob, fileName);

      const response = await fetch("/api/upload-assessment", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error(`Upload failed: ${response.statusText}`);

      const result = await response.json();
      alert("Assessment uploaded successfully!");
    } catch (error) {
      console.error("PDF generation/upload failed:", error);
      alert("Failed to generate or upload PDF. Please try again.");

      element.style.maxWidth = prevMaxWidth;
      element.style.margin = prevMargin;
      if (submitButton) submitButton.style.display = prevButtonDisplay || "";
    }
  };

  const handleSubmit = async () => {
    const studentNameInput = (document.getElementById("studentName") as HTMLInputElement).value.trim();
    if (!studentNameInput) {
      alert("Please enter the student's name.");
      return;
    }

    for (let idx = 0; idx < questions.length; idx++) {
      const q = questions[idx];
      switch (q.type) {
        case "mcq":
          if (!answers[idx]) {
            alert(`Please answer question ${idx + 1}.`);
            return;
          }
          break;
        case "fill-in":
          if (!q.blanks.every((b: any, i: number) => answers[`${idx}-${i}`])) {
            alert(`Please fill in all blanks for question ${idx + 1}.`);
            return;
          }
          break;
        case "match":
          if (!q.matches.every((m: any, i: number) => answers[`${idx}-${i}`])) {
            alert(`Please complete all matches for question ${idx + 1}.`);
            return;
          }
          break;
      }
    }

    setSubmitted(true);
    await new Promise((resolve) => setTimeout(resolve, 50));
    await generatePdf();
  };

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
      router.push("/Logiscool/Teacher/Home");
    } else {
      setError("Incorrect password. Please try again.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white text-[#064232]">
      <Head>
        <title>Assessment</title>
        <meta name="description" content="Logiscool Assessment Page" />
      </Head>
      <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#f5f0f2] px-10 py-3">
        <div className="flex items-center gap-3 sm:gap-4 text-[#171113] cursor-pointer" onClick={() => router.push("/")}>
          <div className="size-8 sm:size-10">
            <img src="https://img.icons8.com/?size=100&id=cGcRDueIKQkF&format=png&color=000000" alt="icon" width="48" height="48" />
          </div>
          <h2 className="text-base sm:text-lg font-bold leading-tight tracking-[-0.015em]">Assessments Hub</h2>
        </div>
        <div className="flex flex-1 justify-end gap-8">
          <div className="flex items-center gap-9">
            {programCategories.map((item) => (
              <Link key={item.title} className="text-[#181015] text-sm font-medium leading-normal hover:underline" href={`/${item.link}`}>
                {item.title}
              </Link>
            ))}
          </div>
          <button onClick={openDialog} className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#a80057] text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-[#900047] transition transform hover:scale-110 hover:shadow-2xl">
            <span className="truncate">Sign In to Teacher Portal</span>
          </button>
        </div>
      </header>
      <main id="assessment-main" className="flex-grow p-6 max-w-3xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold mb-6 text-center">
          {campName} – {assessmentType?.toString().toUpperCase()} Assessment
        </h1>
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-center gap-10">
          <div className="flex flex-col">
            <label htmlFor="studentName" className="font-medium text-sm mb-1">
              Student Name
            </label>
            <input id="studentName" type="text" placeholder="Enter your name" className="px-3 py-2 border border-[#568F87] rounded bg-[#FFF5F2] focus:outline-none focus:ring-2 focus:ring-[#568F87]" />
          </div>
          <div className="flex flex-col">
            <label htmlFor="assessmentDate" className="font-medium text-sm mb-1">
              Date
            </label>
            <input id="assessmentDate" type="date" defaultValue={new Date().toISOString().split("T")[0]} className="px-3 py-2 border border-[#568F87] rounded bg-[#FFF5F2] focus:outline-none focus:ring-2 focus:ring-[#568F87]" />
          </div>
        </div>
        {questions.map((q, idx) => {
          const userAnswer = answers[idx];
          switch (q.type) {
            case "mcq":
              return (
                <div key={idx} className="p-4 rounded-lg bg-[#f9f9f9] shadow-md">
                  <p className="font-semibold mb-2">
                    {idx + 1}. {q.question}
                  </p>
                  <div className="flex flex-col gap-2">
                    {q.options.map((opt: string, i: number) => {
                      const isCorrect = submitted && opt === q.answer;
                      const isWrong = submitted && opt === userAnswer && userAnswer !== q.answer;
                      return (
                        <label key={i} className={`flex items-center gap-2 p-1 rounded ${isCorrect ? "bg-green-100" : ""} ${isWrong ? "bg-red-100" : ""}`}>
                          <input type="radio" name={`q-${idx}`} value={opt} className="accent-[#568F87]" onChange={() => handleChange(idx, opt)} />
                          {opt} {isCorrect && "✅"} {isWrong && "❌"}
                        </label>
                      );
                    })}
                  </div>
                </div>
              );
            case "fill-in": {
              const allCorrectAnswers: string[] = q.blanks.map((b: any) => b.answer);
              return (
                <div key={idx} className="p-4 rounded-lg bg-[#f9f9f9] shadow-md">
                  <p className="font-semibold mb-1">
                    {idx + 1}. {q.question}
                  </p>
                  <p className="text-sm text-gray-600 italic mb-2">Each answer is used only once.</p>
                  <ul className="ml-6 list-disc space-y-2">
                    {q.blanks.map((b: any, i: number) => {
                      const userVal = answers[`${idx}-${i}`];
                      const correct = submitted && userVal === b.answer;
                      const wrong = submitted && userVal && userVal !== b.answer;
                      const parts = b.sentence.replace(b.answer, "___").split("___");
                      return (
                        <li key={i} className="text-base">
                          {parts[0]}
                          <select className={`mx-1 px-2 py-1 border rounded bg-[#FFF5F2] focus:outline-none focus:ring-2 focus:ring-[#568F87] ${correct ? "bg-green-100" : ""} ${wrong ? "bg-red-100" : ""}`} disabled={submitted} value={userVal || ""} onChange={(e) => handleChange(`${idx}-${i}`, e.target.value)}>
                            <option value="">--Select--</option>
                            {allCorrectAnswers.map((opt, j) => (
                              <option key={j} value={opt}>
                                {opt}
                              </option>
                            ))}
                          </select>
                          {correct && " ✅"} {wrong && " ❌"}
                          {parts[1] || ""}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            }
            case "match": {
              const allDescriptions: string[] = q.matches.map((m: any) => m.description);
              return (
                <div key={idx} className="p-4 rounded-lg bg-[#f9f9f9] shadow-md">
                  <p className="font-semibold mb-1">
                    {idx + 1}. {q.question}
                  </p>
                  <p className="text-sm text-gray-600 italic mb-2">Match each term to the correct meaning. Each meaning is used only once.</p>
                  <ul className="ml-6 list-disc space-y-2">
                    {q.matches.map((m: any, i: number) => {
                      const userVal = answers[`${idx}-${i}`];
                      const correct = submitted && userVal === m.description;
                      const wrong = submitted && userVal && userVal !== m.description;
                      return (
                        <li key={i}>
                          <div className="flex items-center gap-4">
                            <span className="font-medium">{m.term}</span>
                            <span className="text-gray-500">→</span>
                            <select className={`px-2 py-1 border rounded bg-[#FFF5F2] focus:outline-none focus:ring-2 focus:ring-[#568F87] ${correct ? "bg-green-100" : ""} ${wrong ? "bg-red-100" : ""}`} disabled={submitted} value={userVal || ""} onChange={(e) => handleChange(`${idx}-${i}`, e.target.value)}>
                              <option value="">--Select meaning--</option>
                              {allDescriptions.map((desc, j) => (
                                <option key={j} value={desc}>
                                  {desc}
                                </option>
                              ))}
                            </select>
                            {correct && " ✅"} {wrong && " ❌"}
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            }
            default:
              return null;
          }
        })}
        <div className="flex justify-center mt-6">
          <button onClick={handleSubmit} className="px-6 py-3 bg-[#568F87] text-white font-bold rounded-lg hover:bg-[#4a736b] transition-transform transform hover:scale-110 hover:shadow-xl duration-300 ease-in-out">
            Submit
          </button>
        </div>
      </main>
      {showDialog && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50">
          <div className="bg-white text-[#a80057] p-6 rounded-lg shadow-xl w-80 text-center animate-fadeIn">
            <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 font-bold text-lg" onClick={closeDialog}>
              ×
            </button>
            <h3 className="text-xl font-semibold mb-4">Enter Password</h3>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="w-full px-3 py-2 border rounded mb-4 focus:ring focus:ring-[#a80057] outline-none" />
            {error && <p className="text-red-600 text-sm mb-2">{error}</p>}
            <div className="flex justify-center gap-4 mt-2">
              <button onClick={handleAccess} className="bg-[#a80057] text-white px-4 py-2 rounded-lg hover:bg-[#910046] transition transform hover:scale-105">
                Submit
              </button>
              <button onClick={closeDialog} className="bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300 transition">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      <footer className="flex justify-center bg-[#fafafa]">
        <div className="flex flex-col gap-6 px-5 py-5 text-center">
          <p className="text-[#87646b] text-base">©2025 Salma. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default AssessmentPage;