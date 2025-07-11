# GIFs Directory

This directory contains all the GIF files that are served through the CDN.

## How to add GIFs:

1. Upload your GIF file to this directory
2. The file will be automatically available at `https://restsimages.pics/gifs/filename.gif`
3. Update the GIF data in `app/gifs/page.tsx` to include metadata like tags and categories

## File naming conventions:

- Use lowercase letters, numbers, and hyphens only
- Avoid spaces and special characters
- Keep filenames descriptive but concise
- Examples: `womandancing.gif`, `skull-reaction.gif`, `flex-muscle.gif`

## Supported formats:

- GIF (recommended for animations)
- PNG (for static images)
- JPG/JPEG (for photos)

## Metadata structure:

```typescript
{
  filename: 'womandancing.gif',
  category: 'reaction', // reaction, meme, flex, etc.
  tags: ['dance', 'celebration', 'fun']
}
```

## Categories:

- `reaction` - Emotional reactions and expressions
- `meme` - Internet memes and humor
- `flex` - Flexing, showing off, achievements
- `general` - Other miscellaneous GIFs 