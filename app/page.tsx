import { DiscordStatus } from '@/components/discord-status'
import { Github } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black">
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
                <Github className="w-5 h-5" />
              </a>
            </div>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Profile & Status */}
          <div className="lg:col-span-1 space-y-6">
            {/* Discord Status */}
            <DiscordStatus />
            {/* Bio */}
            <div className="discord-card">
              <h2 className="text-xl font-semibold text-white mb-4">About Me</h2>
              <p className="text-gray-300 leading-relaxed">
                Full-stack developer passionate about creating useful tools and applications. 
                I love building Discord bots, web applications, and sharing cool GIFs with the community.
              </p>
              <div className="mt-6 space-y-3">
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-gray-400">Discord:</span>
                  <span className="text-white font-medium">imsupertired</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-gray-400">GitHub:</span>
                  <a 
                    href="https://github.com/xReset" 
                    className="text-discord-blue hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    @xReset
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-discord-light mt-12">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <p className="text-gray-400 text-sm">
               a9 2024 RestsImages.pics - Built with Next.js & Tailwind CSS
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