"use client";

type TranscriptPanelProps = {
  transcript?: string;
};

export default function TranscriptPanel({ transcript = "" }: TranscriptPanelProps) {
  return (
    <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl shadow-xl p-6">


      <h2 className="font-bold mb-2">Transcript:</h2>
      <p className="text-lg leading-relaxed text-gray-200">
{transcript || "Your transcript will appear here..."}</p>
    </div>
  );
}
