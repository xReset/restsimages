'use client'

import { useEffect, useState } from 'react';

function StarBackground() {
  // Animated stars using CSS keyframes
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      {[...Array(100)].map((_, i) => {
        const size = Math.random() * 2 + 1;
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        const duration = Math.random() * 2 + 2;
        return (
          <div
            key={i}
            className="bg-white rounded-full opacity-70 animate-twinkle"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              position: 'absolute',
              left: `${left}%`,
              top: `${top}%`,
              animationDuration: `${duration}s`,
            }}
          />
        );
      })}
    </div>
  );
}

export default function MediaPage() {
  const [mediaFiles, setMediaFiles] = useState<string[]>([]);
  const [password, setPassword] = useState('');
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    // Fetch the list of files from Vercel Blob (public listing)
    fetch('https://blob.vercel-storage.com/api/list?prefix=media/')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data.files)) {
          setMediaFiles(data.files.map((f: any) => f.name.replace('media/', '')));
        }
      });
  }, [deleting]);

  const handleCopy = (filename: string) => {
    const url = `https://restsimages.pics/media/${filename}`;
    navigator.clipboard.writeText(url);
  };

  const handleDelete = async (filename: string) => {
    if (!password) {
      alert('Enter password to delete');
      return;
    }
    setDeleting(filename);
    const res = await fetch('/api/blob-delete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password, filename }),
    });
    const data = await res.json();
    if (data.success) {
      setMediaFiles(files => files.filter(f => f !== filename));
    } else {
      alert(data.error || 'Delete failed');
    }
    setDeleting(null);
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-black relative overflow-hidden">
      <StarBackground />
      <div className="relative z-10 w-full max-w-4xl p-8 flex flex-wrap justify-center gap-8">
        <input
          type="password"
          placeholder="Password for delete"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="mb-6 p-2 rounded bg-black border border-gray-700 text-white"
        />
        {mediaFiles.map(filename => (
          <div key={filename} className="flex flex-col items-center">
            <img
              src={`https://blob.vercel-storage.com/media/${filename}`}
              alt={filename}
              className="max-w-xs max-h-80 rounded shadow-lg border border-gray-800 bg-black mb-2"
            />
            <div className="flex gap-2">
              <button
                onClick={() => handleCopy(filename)}
                className="px-3 py-1 bg-discord-blue text-white rounded hover:bg-blue-600 transition-colors text-xs shadow"
              >
                Copy Link
              </button>
              <button
                onClick={() => handleDelete(filename)}
                className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-800 transition-colors text-xs shadow"
                disabled={deleting === filename}
              >
                {deleting === filename ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        ))}
      </div>
      <style jsx global>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.7; }
          50% { opacity: 0.2; }
        }
        .animate-twinkle {
          animation-name: twinkle;
          animation-iteration-count: infinite;
        }
      `}</style>
    </div>
  );
} 