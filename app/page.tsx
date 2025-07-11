'use client'

import { Github } from 'lucide-react'
import { useEffect, useState } from 'react';

function getDefaultAvatar(discriminator: string | number) {
  const index = Number(discriminator) % 5;
  return `https://cdn.discordapp.com/embed/avatars/${index}.png`;
}

function DiscordProfile() {
  const [profile, setProfile] = useState<any>(null);
  const [avatarError, setAvatarError] = useState(0); // 0: try webp, 1: try png, 2: try jpg, 3: fallback

  useEffect(() => {
    fetch('/api/discord-profile')
      .then(res => res.json())
      .then(data => {
        console.log('Discord profile from server:', data.data);
        setProfile(data.data);
      })
      .catch(err => {
        console.error('Failed to fetch Discord profile:', err);
      });
  }, []);

  if (!profile) return <div className="text-white">Loading Discord profile...</div>;

  const userId = profile.discord_user?.id;
  const avatarHash = profile.discord_user?.avatar;
  const discriminator = profile.discord_user?.discriminator ?? 0;

  let avatarUrl = getDefaultAvatar(discriminator);
  if (avatarHash && userId) {
    if (avatarError === 0) {
      avatarUrl = `https://cdn.discordapp.com/avatars/${userId}/${avatarHash}.webp?size=128`;
    } else if (avatarError === 1) {
      avatarUrl = `https://cdn.discordapp.com/avatars/${userId}/${avatarHash}.png?size=128`;
    } else if (avatarError === 2) {
      avatarUrl = `https://cdn.discordapp.com/avatars/${userId}/${avatarHash}.jpg?size=128`;
    } // else fallback to default
  }
  console.log('Attempting avatar URL:', avatarUrl);

  const bannerUrl = profile.banner
    ? `https://cdn.discordapp.com/banners/${userId}/${profile.banner}.png?size=512`
    : `https://cdn.discordapp.com/banners/${userId}/0.png?size=512`;

  const discordUser = profile.discord_user;
  console.log('Discord user object:', discordUser);

  const aboutMe =
    discordUser.bio ||
    discordUser.about_me ||
    discordUser.global_name ||
    discordUser.display_name ||
    "honor is not won by grand gestures but by small, steadfast acts of integrity";
  const username = 'imsupertired';

  return (
    <div className="discord-card bg-black text-white flex flex-col items-center p-6 rounded-lg">
      <img
        src={avatarUrl}
        alt="Avatar"
        className="w-24 h-24 rounded-full border-4 border-discord-blue mb-2"
        onError={() => {
          if (avatarError < 3) {
            console.warn('Avatar failed to load, trying next format:', avatarUrl);
            setAvatarError(avatarError + 1);
          } else {
            console.error('All avatar formats failed, using default avatar.');
          }
        }}
      />
      <h2 className="text-2xl font-bold">{username}</h2>
      <p className="text-gray-400 mb-2">{profile.activities[0]?.state || 'No activity'}</p>
      <span className={`px-3 py-1 rounded-full text-xs font-semibold mb-2 ${profile.discord_status === 'online' ? 'bg-green-600' : profile.discord_status === 'idle' ? 'bg-yellow-600' : profile.discord_status === 'dnd' ? 'bg-red-600' : 'bg-gray-600'}`}>{profile.discord_status}</span>
      <p className="text-gray-300 mt-2">{aboutMe}</p>
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
            Full-stack developer passionate about making tools and applications. I enjoy building discord bots, web applications, and other personal projects. Hit me up on discord for further info
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