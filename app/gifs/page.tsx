import { NextResponse } from 'next/server';
import { useEffect, useState, useMemo } from 'react';

export async function GET() {
  const gifsDir = path.join(process.cwd(), 'public', 'gifs');
  const files = fs.readdirSync(gifsDir);
  const gifFiles = files.filter(file => /\.(gif|png|jpg|jpeg)$/i.test(file));
  return NextResponse.json(gifFiles);
}

export default function GifsPage() {
  const [gifFiles, setGifFiles] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

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

  // ... rest of the component remains unchanged ...
} 