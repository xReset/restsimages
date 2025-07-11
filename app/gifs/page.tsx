'use client'

import { useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Grid, List } from 'lucide-react';
import { GifCard } from '@/components/gif-card';

const categories = ['all', 'reaction', 'meme', 'flex'];

export default function GifsPage() {
  const [gifFiles, setGifFiles] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  useEffect(() => {
    fetch('/api/gifs')
      .then(res => res.json())
      .then(setGifFiles);
  }, []);

  const filteredGifs = useMemo(() => {
    return gifFiles.filter(filename => {
      return filename.toLowerCase().includes(searchTerm.toLowerCase());
    });
  }, [searchTerm, gifFiles]);

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      {/* ...rest of your component code, unchanged... */}
    </div>
  );
} 