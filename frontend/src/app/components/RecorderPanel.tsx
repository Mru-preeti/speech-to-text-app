"use client";

import { useState } from "react";

interface RecorderPanelProps {
  setTranscript: (text: string) => void;
}

export default function RecorderPanel({ setTranscript }: RecorderPanelProps) {
  const [recording, setRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [chunks, setChunks] = useState<Blob[]>([]);
  const [loading, setLoading] = useState(false);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const recorder = new MediaRecorder(stream);
    const tempChunks: Blob[] = [];

    recorder.ondataavailable = (e) => tempChunks.push(e.data);
    recorder.onstop = async () => {
      setLoading(true);
      const blob = new Blob(tempChunks, { type: "audio/webm" });

      const formData = new FormData();
      formData.append("file", blob, "recording.webm");

      try {
        const res = await fetch("http://127.0.0.1:5000/transcribe", {
          method: "POST",
          body: formData,
        });
        const data = await res.json();
        console.log("DATA FROM BACKEND:", data);

        setTranscript(data.transcript || "No transcript received");
      } catch (err) {
        console.error(err);
        setTranscript("Error transcribing audio");
      } finally {
        setLoading(false);
      }
    };

    recorder.start();
    setMediaRecorder(recorder);
    setChunks(tempChunks);
    setRecording(true);
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setRecording(false);
    }
  };

  return (
    <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl shadow-xl p-6">


      <button
  onClick={recording ? stopRecording : startRecording}
  className={`px-6 py-3 rounded-xl text-lg font-semibold transition-all shadow-lg
  ${recording ? "bg-red-600" : "bg-indigo-600"} text-white
  hover:scale-105 active:scale-95`}
>
        {recording ? "Stop Recording" : "Start Recording"}
      </button>
      {loading && <p className="text-gray-500">Transcribing...</p>}
    </div>
  );
}
