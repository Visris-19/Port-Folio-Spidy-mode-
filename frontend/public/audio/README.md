# Audio Files for Portfolio

## How to Add Background Music

### 1. Add your music file to this folder:
Place your music file here with one of these names:
- `hero-background.mp3` (for HeroSection background music)
- `portfolio-theme.mp3` (for general portfolio theme)
- `spiderman-theme.mp3` (for intro sequence - already referenced)

### 2. Supported formats:
- MP3 (recommended)
- WAV
- OGG
- M4A

### 3. File size recommendations:
- Keep files under 5MB for better loading performance
- Use compressed audio (MP3 128-320kbps is ideal)
- Consider looping tracks for background music

### 4. Current audio implementations:
- IntroSequence.jsx: Uses `/audio/spiderman-theme.mp3`
- HeroSection.jsx: Will use `/audio/hero-background.mp3`

### 5. Audio controls:
- Users can mute/unmute via the audio control button in the top-left
- Music will respect user preferences and browser autoplay policies

## Example file structure:
```
public/
  audio/
    spiderman-theme.mp3      (Intro music)
    hero-background.mp3      (Hero section music)
    portfolio-theme.mp3      (General background music)
```

Simply drop your music files here and they'll be automatically available to the components!
