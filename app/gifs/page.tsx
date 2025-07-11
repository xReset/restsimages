'use client'

import { useEffect, useState } from 'react';

export default function GifsPage() {
  const [gifFiles, setGifFiles] = useState<string[]>([]);

  useEffect(() => {
    fetch('/api/gifs')
      .then(res => res.json())
      .then(setGifFiles);
  }, []);

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-black relative overflow-hidden">
      <StarBackground />
      <div className="relative z-10 w-full max-w-4xl p-8 flex flex-wrap justify-center gap-8">
        {gifFiles.map(filename => (
          <img
            key={filename}
            src={`/gifs/${filename}`}
            alt={filename}
            className="max-w-xs max-h-80 rounded shadow-lg border border-gray-800 bg-black"
          />
        ))}
      </div>
    </div>
  );
}

function StarBackground() {
  return (
    <svg width="100%" height="100%" className="absolute inset-0 z-0" style={{ display: 'block' }}>
      {[...Array(150)].map((_, i) => (
        <circle
          key={i}
          cx={Math.random() * 1920}
          cy={Math.random() * 1080}
          r={Math.random() * 1.2 + 0.3}
          fill="white"
          opacity={Math.random() * 0.8 + 0.2}
        />
      ))}
    </svg>
  );
} 