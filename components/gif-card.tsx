'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Copy, Check } from 'lucide-react'
import { copyToClipboard } from '@/lib/utils'

interface GifCardProps {
  filename: string
  category?: string
  tags?: string[]
}

export function GifCard({ filename, category = 'general', tags = [] }: GifCardProps) {
  const [copied, setCopied] = useState(false)
  const gifUrl = `https://restsimages.pics/gifs/${filename}`

  const handleCopy = async () => {
    await copyToClipboard(gifUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className="discord-card group"
    >
      <div className="aspect-square overflow-hidden rounded-lg bg-discord-darker mb-4">
        <img
          src={`/gifs/${filename}`}
          alt={filename}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
          loading="lazy"
        />
      </div>
      
      <div className="space-y-3">
        <div>
          <h3 className="font-semibold text-white truncate">{filename}</h3>
          <p className="text-sm text-gray-400">{category}</p>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-1">
            {tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-discord-light text-xs rounded-full text-gray-300"
              >
                {tag}
              </span>
            ))}
          </div>
          
          <button
            onClick={handleCopy}
            className="p-2 rounded-md bg-discord-light hover:bg-discord-lighter transition-colors"
            title="Copy link"
          >
            {copied ? (
              <Check className="w-4 h-4 text-discord-green" />
            ) : (
              <Copy className="w-4 h-4 text-gray-300" />
            )}
          </button>
        </div>
        
        <div className="text-xs text-gray-500 break-all">
          {gifUrl}
        </div>
      </div>
    </motion.div>
  )
} 