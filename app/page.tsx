'use client'

import { Github } from 'lucide-react'
import { useEffect, useState } from 'react';

function getDefaultAvatar(discriminator: string | number) {
  const index = Number(discriminator) % 5;
  return `https://cdn.discordapp.com/embed/avatars/${index}.png`;
}

async function logToServer(message: string) {
  await fetch('/api/log', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message }),
  });
}

function DiscordProfile() {
  const [profile, setProfile] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('https://api.lanyard.rest/v1/users/716965617231724571')
      .then(res => res.json())
      .then(data => {
        console.log('Lanyard profile:', data.data);
        logToServer('Lanyard profile: ' + JSON.stringify(data.data));
        setProfile(data.data);
      })
      .catch(err => {
        setError('Failed to fetch Discord profile');
        logToServer('Fetch error: ' + err.message);
      });
  }, []);

  if (error) return <div className="text-red-500">{error}</div>;
  if (!profile) return <div className="text-white">Loading Discord profile...</div>;

  const discriminator = profile.discord_user?.discriminator ?? 0;
  const avatarUrl = profile.avatar
    ? `https://cdn.discordapp.com/avatars/716965617231724571/${profile.avatar}.png?size=128`
    : getDefaultAvatar(discriminator);
  logToServer('Avatar URL: ' + avatarUrl);

  const bannerUrl = profile.banner
    ? `https://cdn.discordapp.com/banners/716965617231724571/${profile.banner}.png?size=512`
    : 'https://cdn.discordapp.com/banners/716965617231724571/0.png?size=512';

  const aboutMe = profile.discord_user?.bio || 'No bio available.';
  const username = 'imsupertired';

  return (
    <div className="discord-card bg-black text-white flex flex-col items-center p-6 rounded-lg">
      <img src={bannerUrl} alt="Banner" className="w-full h-32 object-cover rounded-lg mb-4" />
      <img src={avatarUrl} alt="Avatar" className="w-24 h-24 rounded-full border-4 border-discord-blue mb-2" onError={() => setError('Failed to load avatar: ' + avatarUrl)} />
      <h2 className="text-2xl font-bold">{username}</h2>
      <p className="text-gray-400 mb-2">{profile.activities[0]?.state || 'No activity'}</p>
      <span className={`px-3 py-1 rounded-full text-xs font-semibold mb-2 ${profile.discord_status === 'online' ? 'bg-green-600' : profile.discord_status === 'idle' ? 'bg-yellow-600' : profile.discord_status === 'dnd' ? 'bg-red-600' : 'bg-gray-600'}`}>{profile.discord_status}</span>
      <p className="text-gray-300 mt-2">{aboutMe}</p>
      {error && <div className="text-red-500 mt-2">{error}</div>}
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-discord-light">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <nav className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-white">RestsImages.pics</h1>
            </div>
            <div className="flex items-center space-x-4">
              <a href="/gifs" className="text-gray-300 hover:text-white transition-colors">
                GIFs
              </a>
              <a href="https://github.com/xReset" className="text-gray-300 hover:text-white transition-colors">
                GitHub
              </a>
            </div>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-12">
        <DiscordProfile />
        <div className="discord-card bg-black text-white mt-8">
          <h2 className="text-xl font-semibold mb-4">About Me</h2>
          <p className="text-gray-300 leading-relaxed">
            Full-stack developer passionate about creating useful tools and applications. I love building Discord bots, web applications, and sharing cool GIFs with the community.
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-discord-light mt-12">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <p className="text-gray-400 text-sm">
              © 2025 RestsImages.pics - Built with Next.js & Tailwind CSS
            </p>
            <div className="flex items-center space-x-4">
              <a href="/gifs" className="text-sm text-gray-400 hover:text-white transition-colors">
                GIF CDN
              </a>
              <a href="https://github.com/xReset" className="text-sm text-gray-400 hover:text-white transition-colors">
                GitHub
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
} 