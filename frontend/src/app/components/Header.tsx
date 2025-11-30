"use client";

export default function Header() {
  return (
    <div className="flex items-center justify-center gap-4 mt-6">

      {/* Mic Icon */}
      <svg
        width="40"
        height="40"
        viewBox="0 0 24 24"
        fill="#FF00FF"
        className="drop-shadow-[0_0_8px_rgba(255,0,255,0.6)] animate-pulse"
      >
        <path d="M12 14a3 3 0 003-3V5a3 3 0 10-6 0v6a3 3 0 003 3zm5-3a5 5 0 01-10 0H5a7 7 0 0014 0h-2z"/>
        <path d="M11 18h2v3h-2z"/>
      </svg>

      {/* Wave line */}
      <div className="wave w-[140px] h-[40px]"></div>

      <h1 className="text-5xl font-extrabold
        bg-clip-text text-transparent bg-gradient-to-r
        from-gray-100 via-gray-300 to-gray-500
        drop-shadow-[0_0_10px_rgba(255,0,255,0.5)]">
        Speech to Text AI
      </h1>
    </div>
  );
}
