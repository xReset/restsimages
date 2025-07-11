<<<<<<< HEAD
# RestsImages.pics

A modern, responsive static website that serves as both a personal online hub and a GIF CDN. Built with Next.js, TypeScript, and Tailwind CSS.

## Features

### Homepage (/)
- **Discord Status Display**: Shows live Discord status with animations
- **Personal Bio**: Short bio with links to GitHub and Discord
- **Project Showcase**: Display recent/favorite personal projects
- **Discord-inspired Design**: Dark theme with Discord colors and styling

### GIF CDN (/gifs)
- **GIF Gallery**: Grid view of all uploaded GIFs
- **Search & Filter**: Search by filename or tags, filter by category
- **Copy Links**: One-click copy of direct GIF URLs
- **Responsive Design**: Works on desktop and mobile
- **Direct Access**: Individual GIFs accessible via direct URLs

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Deployment**: GitHub Pages

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/restsimages.pics.git
cd restsimages.pics
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
npm run build
npm run export
```

The static files will be generated in the `out` directory.

## Project Structure

```
restsimages.pics/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Homepage
│   └── gifs/              # GIFs page
│       └── page.tsx
├── components/             # React components
│   ├── ui/                # UI components
│   │   └── button.tsx
│   ├── discord-status.tsx # Discord status component
│   └── gif-card.tsx       # GIF card component
├── lib/                   # Utility functions
│   └── utils.ts
├── public/                # Static assets
│   └── gifs/              # GIF files
└── .github/workflows/     # GitHub Actions
    └── deploy.yml
```

## Adding GIFs

1. Upload your GIF files to the `public/gifs/` directory
2. Update the GIF metadata in `app/gifs/page.tsx`:

```typescript
const sampleGifs = [
  {
    filename: 'your-gif.gif',
    category: 'reaction', // reaction, meme, flex, general
    tags: ['tag1', 'tag2', 'tag3']
  }
]
```

3. The GIF will be available at `https://restsimages.pics/gifs/your-gif.gif`

## Deployment

### GitHub Pages

1. Push your code to GitHub
2. Enable GitHub Pages in your repository settings
3. Set the source to "GitHub Actions"
4. The site will automatically deploy on every push to main

### Custom Domain Setup

1. Add your domain to the `CNAME` file
2. Configure your DNS provider (Porkbun):
   - Add a CNAME record pointing to `yourusername.github.io`
3. Wait for DNS propagation (can take up to 24 hours)

## Customization

### Colors
Edit `tailwind.config.js` to modify the Discord-inspired color scheme:

```javascript
colors: {
  discord: {
    dark: '#36393f',
    darker: '#2f3136',
    darkest: '#202225',
    // ... more colors
  }
}
```

### Discord Status
Update the Discord status in `components/discord-status.tsx`:

```typescript
const [status, setStatus] = useState<DiscordStatus>({
  status: 'online', // online, idle, dnd, offline
  activity: 'Your custom status',
  username: 'Your Discord username'
})
```

### Projects
Modify the projects array in `app/page.tsx`:

```typescript
const projects = [
  {
    title: 'Your Project',
    description: 'Project description',
    icon: YourIcon,
    link: 'https://your-project.com',
    tags: ['React', 'TypeScript']
  }
]
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - see LICENSE file for details.

## Support

If you have any questions or need help, feel free to:
- Open an issue on GitHub
- Contact me on Discord: RestsImages#0000
- Email: your-email@example.com 
=======
# restsimages
Website hosting images
>>>>>>> 260a1f591760b57270f86199844e44e972af347c
