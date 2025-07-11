'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface DiscordStatus {
  status: 'online' | 'idle' | 'dnd' | 'offline'
  activity?: string
  username: string
}

export function DiscordStatus() {
  const [status, setStatus] = useState<DiscordStatus>({
    status: 'online',
    activity: 'Coding something cool',
    username: 'RestsImages'
  })

  const statusColors = {
    online: 'bg-discord-green',
    idle: 'bg-discord-yellow',
    dnd: 'bg-discord-red',
    offline: 'bg-discord-red'
  }

  const statusText = {
    online: 'Online',
    idle: 'Idle',
    dnd: 'Do Not Disturb',
    offline: 'Offline'
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="discord-card"
    >
      <div className="flex items-center space-x-3">
        <div className="relative">
          <div className="w-12 h-12 bg-discord-dark rounded-full flex items-center justify-center">
            <span className="text-lg font-bold text-white">R</span>
          </div>
          <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-discord-dark ${statusColors[status.status]}`} />
        </div>
        
        <div className="flex-1">
          <div className="flex items-center space-x-2">
            <span className="font-semibold text-white">{status.username}</span>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[status.status]}`}>
              {statusText[status.status]}
            </span>
          </div>
          
          {status.activity && (
            <p className="text-sm text-gray-300 mt-1">
              {status.activity}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  )
} 