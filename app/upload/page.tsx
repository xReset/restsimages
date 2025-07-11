'use client'

import { useState } from 'react';

export default function UploadPage() {
  const [password, setPassword] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [url, setUrl] = useState('');
  const [message, setMessage] = useState('');
  const [uploadedUrl, setUploadedUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    setUploadedUrl('');
    setLoading(true);

    if (!password) {
      setMessage('Password required.');
      setLoading(false);
      return;
    }

    if (file) {
      const formData = new FormData();
      formData.append('password', password);
      formData.append('file', file);
      const res = await fetch('/api/blob-upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        setUploadedUrl(data.url);
        setMessage('Upload successful!');
      } else {
        setMessage(data.error || 'Upload failed.');
      }
      setLoading(false);
      return;
    }

    if (url) {
      const res = await fetch('/api/blob-upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password, url }),
      });
      const data = await res.json();
      if (data.success) {
        setUploadedUrl(data.url);
        setMessage('Upload successful!');
      } else {
        setMessage(data.error || 'Upload failed.');
      }
      setLoading(false);
      return;
    }

    setMessage('Please select a file or enter a URL.');
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white p-4">
      <h1 className="text-2xl font-bold mb-6">Upload GIF or Image</h1>
      <form onSubmit={handleUpload} className="bg-discord-dark p-6 rounded-lg shadow-lg flex flex-col gap-4 w-full max-w-md">
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="p-2 rounded bg-black border border-gray-700 text-white"
        />
        <div className="flex flex-col gap-2">
          <label>Upload File</label>
          <input type="file" accept="image/*,gif/*" onChange={handleFileChange} className="text-white" placeholder="Choose a file" title="Choose a file to upload" />
        </div>
        <div className="flex flex-col gap-2">
          <label>Or Paste Image/GIF URL</label>
          <input
            type="text"
            placeholder="https://example.com/image.gif"
            value={url}
            onChange={e => setUrl(e.target.value)}
            className="p-2 rounded bg-black border border-gray-700 text-white"
          />
        </div>
        <button
          type="submit"
          className="bg-discord-blue hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors"
          disabled={loading}
        >
          {loading ? 'Uploading...' : 'Upload'}
        </button>
        {message && <div className="text-center text-sm mt-2 text-gray-300">{message}</div>}
        {uploadedUrl && (
          <div className="text-center mt-2">
            <a href={uploadedUrl} target="_blank" rel="noopener noreferrer" className="text-discord-blue underline">View Uploaded File</a>
          </div>
        )}
      </form>
    </div>
  );
} 