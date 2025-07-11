'use client'

import { useEffect, useState, useRef } from 'react';
import { useSearchParams } from 'next/navigation';

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
  const [authenticated, setAuthenticated] = useState(false);
  const [error, setError] = useState('');
  const searchParams = useSearchParams();
  const targetFile = searchParams.get('file');
  const fileRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const [highlighted, setHighlighted] = useState<string | null>(null);

  useEffect(() => {
    if (authenticated) {
      fetch('https://blob.vercel-storage.com/api/list?prefix=media/')
        .then(res => res.json())
        .then(data => {
          if (Array.isArray(data.files)) {
            setMediaFiles(data.files.map((f: any) => f.name.replace('media/', '')));
          }
        });
    }
  }, [deleting, authenticated]);

  // Scroll to and highlight the file if specified in query param
  useEffect(() => {
    if (authenticated && targetFile && fileRefs.current[targetFile]) {
      fileRefs.current[targetFile]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setHighlighted(targetFile);
      const timeout = setTimeout(() => setHighlighted(null), 3000);
      return () => clearTimeout(timeout);
    }
  }, [authenticated, targetFile, mediaFiles]);

  const handleCopy = (filename: string) => {
    const url = `https://store-lp6BxZa7PXzR45H6.vercel-storage.com/media/${filename}`;
    navigator.clipboard.writeText(url);
  };

  const handleDelete = async (filename: string) => {
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

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'CreamyWeamy') {
      setAuthenticated(true);
      setError('');
    } else {
      setError('Incorrect password');
    }
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-black relative overflow-hidden">
        <StarBackground />
        <form onSubmit={handleAuth} className="flex flex-col gap-4 w-full max-w-xs z-10 items-center">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="p-2 rounded bg-black border border-gray-700 text-white text-center"
          />
          <button type="submit" className="bg-discord-blue hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors">
            View Media
          </button>
          {error && <div className="text-red-500 text-center">{error}</div>}
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-black relative overflow-hidden">
      <StarBackground />
      <div className="relative z-10 w-full max-w-4xl p-8 flex flex-wrap justify-center gap-8">
        {mediaFiles.length === 0 ? (
          <div className="text-white text-lg">No media found. Upload something at /upload!</div>
        ) : (
          mediaFiles.map(filename => (
            <div
              key={filename}
              ref={el => { fileRefs.current[filename] = el; }}
              className={`flex flex-col items-center transition-shadow duration-500 ${highlighted === filename ? 'ring-4 ring-discord-blue shadow-xl' : ''}`}
            >
              <img
                src={`https://store-lp6BxZa7PXzR45H6.vercel-storage.com/media/${filename}`}
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
          ))
        )}
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