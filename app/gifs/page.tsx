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

function getDefaultAvatar(discriminator) {
  const index = Number(discriminator) % 5;
  return `https://cdn.discordapp.com/embed/avatars/${index}.png`;
}

function DiscordProfile() {
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    fetch('https://api.lanyard.rest/v1/users/716965617231724571')
      .then(res => res.json())
      .then(data => setProfile(data.data));
  }, []);

  if (!profile) return <div className="text-white">Loading Discord profile...</div>;

  // Avatar logic
  const avatarUrl = profile.avatar
    ? `https://cdn.discordapp.com/avatars/716965617231724571/${profile.avatar}.png?size=128`
    : getDefaultAvatar(profile.discord_user.discriminator);

  // Banner fallback (Discord default banner)
  const bannerUrl = profile.banner
    ? `https://cdn.discordapp.com/banners/716965617231724571/${profile.banner}.png?size=512`
    : 'https://cdn.discordapp.com/banners/716965617231724571/0.png?size=512';

  // About Me (bio) fallback
  const aboutMe = profile.discord_user?.bio || 'No bio available.';

  // Username (no #0)
  const username = 'imsupertired';

  return (
    <div className="discord-card bg-black text-white flex flex-col items-center p-6 rounded-lg">
      <img src={bannerUrl} alt="Banner" className="w-full h-32 object-cover rounded-lg mb-4" />
      <img src={avatarUrl} alt="Avatar" className="w-24 h-24 rounded-full border-4 border-discord-blue mb-2" />
      <h2 className="text-2xl font-bold">{username}</h2>
      <p className="text-gray-400 mb-2">{profile.activities[0]?.state || 'No activity'}</p>
      <span className={`px-3 py-1 rounded-full text-xs font-semibold mb-2 ${profile.discord_status === 'online' ? 'bg-green-600' : profile.discord_status === 'idle' ? 'bg-yellow-600' : profile.discord_status === 'dnd' ? 'bg-red-600' : 'bg-gray-600'}`}>{profile.discord_status}</span>
      <p className="text-gray-300 mt-2">{aboutMe}</p>
    </div>
  );
}