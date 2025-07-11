import { DiscordStatus } from '@/components/discord-status'
import { Button } from '@/components/ui/button'
import { Github, ExternalLink, Code, Bot, Globe } from 'lucide-react'

const projects = [
  {
    title: 'Discord Bot',
    description: 'A feature-rich Discord bot with moderation, music, and utility commands',
    icon: Bot,
    link: '#',
    tags: ['Node.js', 'Discord.js', 'MongoDB']
  },
  {
    title: 'Web Tools',
    description: 'Collection of useful web development tools and utilities',
    icon: Code,
    link: '#',
    tags: ['React', 'TypeScript', 'Tailwind']
  },
  {
    title: 'Personal Website',
    description: 'This website - built with Next.js and modern web technologies',
    icon: Globe,
    link: '#',
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS']
  }
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-discord-darkest">
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
              <a href="https://github.com/yourusername" className="text-gray-300 hover:text-white transition-colors">
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
                  <span className="text-white font-medium">RestsImages#0000</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-gray-400">GitHub:</span>
                  <a 
                    href="https://github.com/yourusername" 
                    className="text-discord-blue hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    @yourusername
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Projects */}
          <div className="lg:col-span-2">
            <div className="discord-card">
              <h2 className="text-xl font-semibold text-white mb-6">Recent Projects</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {projects.map((project, index) => (
                  <div key={index} className="bg-discord-darker rounded-lg p-4 border border-discord-light">
                    <div className="flex items-start space-x-3">
                      <div className="p-2 bg-discord-blue rounded-lg">
                        <project.icon className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-white mb-1">{project.title}</h3>
                        <p className="text-sm text-gray-300 mb-3">{project.description}</p>
                        <div className="flex flex-wrap gap-1 mb-3">
                          {project.tags.map((tag, tagIndex) => (
                            <span
                              key={tagIndex}
                              className="px-2 py-1 bg-discord-light text-xs rounded-full text-gray-300"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        <Button size="sm" variant="secondary">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          View Project
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
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
              © 2024 RestsImages.pics - Built with Next.js & Tailwind CSS
            </p>
            <div className="flex items-center space-x-4">
              <a href="/gifs" className="text-sm text-gray-400 hover:text-white transition-colors">
                GIF CDN
              </a>
              <a href="https://github.com/yourusername" className="text-sm text-gray-400 hover:text-white transition-colors">
                GitHub
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
} 