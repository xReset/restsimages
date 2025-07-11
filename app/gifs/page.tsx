'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Search, Filter, Grid, List } from 'lucide-react'
import { GifCard } from '@/components/gif-card'
import fs from 'fs';
import path from 'path';

const gifsDir = path.join(process.cwd(), 'public', 'gifs');

function getGifFiles() {
  const files = fs.readdirSync(gifsDir);
  return files.filter(file => /\.(gif|png|jpg|jpeg)$/i.test(file));
}

const categories = ['all', 'reaction', 'meme', 'flex']

export default function GifsPage() {
  const gifFiles = getGifFiles();
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  const filteredGifs = useMemo(() => {
    return gifFiles.filter(filename => {
      return filename.toLowerCase().includes(searchTerm.toLowerCase());
    });
  }, [searchTerm]);

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="border-b border-discord-light">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <nav className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <a href="/" className="text-2xl font-bold text-white">RestsImages.pics</a>
            </div>
            <div className="flex items-center space-x-4">
              <a href="/" className="text-gray-300 hover:text-white transition-colors">
                Home
              </a>
            </div>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-12">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">GIF Collection</h1>
          <p className="text-gray-300">Browse and share custom GIFs</p>
        </div>

        {/* Search and Filters */}
        <div className="discord-card mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search GIFs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-discord-darker border border-discord-light rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-discord-blue"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-400" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 bg-discord-darker border border-discord-light rounded-md text-white focus:outline-none focus:ring-2 focus:ring-discord-blue"
                title="Select category filter"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center space-x-1 bg-discord-darker rounded-md p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded ${viewMode === 'grid' ? 'bg-discord-blue text-white' : 'text-gray-400 hover:text-white'}`}
                title="Grid view"
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded ${viewMode === 'list' ? 'bg-discord-blue text-white' : 'text-gray-400 hover:text-white'}`}
                title="List view"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-400">
            {filteredGifs.length} GIF{filteredGifs.length !== 1 ? 's' : ''} found
          </p>
        </div>

        {/* GIF Grid */}
        {filteredGifs.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={viewMode === 'grid' 
              ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'
              : 'space-y-4'
            }
          >
            {filteredGifs.map((filename, index) => (
              <motion.div
                key={filename}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <GifCard
                  filename={filename}
                  category={''}
                  tags={[]}
                />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No GIFs found matching your criteria</p>
            <p className="text-gray-500 text-sm mt-2">Try adjusting your search or filters</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-discord-light mt-12">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <p className="text-gray-400 text-sm">
              © 2024 RestsImages.pics - GIF CDN
            </p>
            <div className="flex items-center space-x-4">
              <a href="/" className="text-sm text-gray-400 hover:text-white transition-colors">
                Home
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
} 