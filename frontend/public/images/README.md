# Images Folder

## Profile Photo Setup

To display your actual profile photo in the portfolio:

1. **Add your photo** to this folder (`public/images/`) with the name `Vishal.jpg`
2. **Supported formats**: JPG, JPEG, PNG, WebP
3. **Recommended size**: 400x400 pixels or larger (square aspect ratio works best)
4. **File name**: Must be exactly `Vishal.jpg` (case-sensitive)

## Current Files

- `placeholder-profile.svg` - Temporary placeholder that displays when `Vishal.jpg` is not found
- This will automatically fallback to the placeholder if your photo isn't available

## How it works

The IntroSequence component will:
1. First try to load `/images/Vishal.jpg`
2. If that fails, fallback to `/images/placeholder-profile.svg`
3. If that also fails, show an inline SVG placeholder

Simply drop your profile photo here as `Vishal.jpg` and it will automatically appear in your portfolio!
