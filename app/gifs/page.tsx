'use client'

import { useEffect, useState, useMemo } from 'react';

export default function GifsPage() {
  const [gifFiles, setGifFiles] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('/api/gifs')
      .then(res => res.json())
      .then(setGifFiles);
  }, []);

  const filteredGifs = useMemo(() => {
    return gifFiles.filter(filename =>
      filename.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, gifFiles]);

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-start bg-black relative overflow-hidden">
      {/* Star background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <StarBackground />
      </div>
      <div className="relative z-10 w-full max-w-4xl p-8">
        <h1 className="text-3xl font-bold text-white mb-6">GIF Gallery</h1>
        <input
          type="text"
          placeholder="Search GIFs..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="mb-6 w-full p-2 rounded bg-gray-900 text-white border border-gray-700"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredGifs.map(filename => (
            <div key={filename} className="bg-gray-900 rounded p-4 flex flex-col items-center">
              <img
                src={`/gifs/${filename}`}
                alt={filename}
                className="max-w-full max-h-48 rounded"
              />
              <span className="mt-2 text-white text-sm">{filename}</span>
            </div>
          ))}
        </div>
        {filteredGifs.length === 0 && (
          <div className="text-white text-center mt-8">No GIFs found.</div>
        )}
      </div>
    </div>
  );
}

// Simple star background using canvas
function StarBackground() {
  // This is a simple React component that draws stars on a canvas
  // You can use a more advanced effect if you want!
  // For now, this is a placeholder for a starry background
  return (
    <svg width="100%" height="100%" className="absolute inset-0" style={{ display: 'block' }}>
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