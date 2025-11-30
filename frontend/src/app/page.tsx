"use client";

import { useState, useEffect } from "react";
import Header from "./components/Header";
import RecorderPanel from "./components/RecorderPanel";
import TranscriptPanel from "./components/TranscriptPANELprops";

export default function Home() {
  const [transcript, setTranscript] = useState("");
  const [history, setHistory] = useState<string[]>([]);

  useEffect(() => {
    if (!transcript) return;

    fetch("http://127.0.0.1:5000/history")
      .then((res) => res.json())
      .then((data) => setHistory(data));
  }, [transcript]);

  return (
<main className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] p-6">

      <Header />
      <div className="max-w-3xl mx-auto flex flex-col gap-4 mt-5">
        <RecorderPanel setTranscript={setTranscript} />
        <TranscriptPanel transcript={transcript} />

        <div className="backdrop-blur-lg bg-white/10 p-6 rounded-2xl border border-white/20 shadow-xl">

          <h3 className="font-bold mb-2">Recent History:</h3>
          <ul>
            {history.map((item, i) => (
              <li key={i} className="bg-white/10 p-3 rounded-xl mb-2">
                {item}
              </li> 
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}
