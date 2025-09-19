# Image Requirements for Monastery360 Website

## Image Specifications
- **Format**: JPEG for photos, PNG for graphics with transparency
- **Resolution**: Minimum 1920x1080 for hero images, 1200x800 for section images
- **File Size**: Optimize for web (under 500KB per image)
- **Aspect Ratios**: 16:9 for hero, 4:3 for cards, 3:2 for galleries

## Required Images by Section

### 1. Hero Section (1 image)
**File**: `hero-monastery-panorama.jpg`
**Dimensions**: 1920x1080 or higher
**Search Terms**: 
- "Sikkim monastery sunrise panorama"
- "Rumtek monastery mountain view"
- "Himalayan monastery misty mountains"
- "Buddhist temple sunrise Sikkim"

### 2. Monasteries Section (4-6 images)
**Files**: 
- `monastery1.jpg` (already exists)
- `rumtek-monastery.jpg`
- `pemayangtse-monastery.jpg`
- `enchey-monastery.jpg`
- `tashiding-monastery.jpg`
- `monastery-interior.jpg`

**Search Terms**:
- "Rumtek monastery exterior architecture"
- "Pemayangtse monastery golden roof"
- "Buddhist monastery prayer wheels"
- "Monastery interior prayer hall"
- "Tibetan prayer flags monastery"
- "Buddhist monks meditation hall"

### 3. Destination Explorer (3-5 images)
**Files**:
- `tsomgo-lake.jpg`
- `yumthang-valley.jpg`
- `gangtok-market.jpg`
- `nathula-pass.jpg`
- `kanchenjunga-view.jpg`

**Search Terms**:
- "Tsomgo lake reflection mountains"
- "Yumthang valley flowers blooming"
- "Gangtok MG Marg street scene"
- "Nathula pass snow border"
- "Kanchenjunga peak sunrise"

### 4. Tour Package Images (4 images)

#### 1-Day Quick Tour
**File**: `1-day-tour.jpg`
**Search Terms**: 
- "Gangtok city tour bustling street"
- "Tourist exploring monastery quickly"
- "Tsomgo lake day trip visitors"

#### 3-Day Scenic Trip  
**File**: `3-day-scenic.jpg`
**Search Terms**:
- "Mountain road winding Sikkim"
- "Small group monastery visit"
- "Scenic mountain highway tourists"

#### 5-Day Explorer Trip
**File**: `5-day-explorer.jpg`
**Search Terms**:
- "Sikkimese cultural dance traditional"
- "Local handicraft weaving Sikkim"
- "Cultural experience monastery festival"

#### 7-Day Adventure Trip
**File**: `7-day-adventure.jpg`
**Search Terms**:
- "Himalayan peaks snow capped dramatic"
- "Trekking mountain trail Sikkim"
- "Adventure hiking high altitude"

## Free Stock Photo Sources

### Primary Sources
1. **Unsplash** (unsplash.com)
   - High-resolution, professional quality
   - Free for commercial use
   - Good selection of Himalayan/monastery photos

2. **Pexels** (pexels.com)
   - Curated free stock photos
   - Easy download process
   - Good travel photography section

3. **Pixabay** (pixabay.com)
   - Large collection of free images
   - Various resolutions available
   - Good for landscape and architecture

### Specialized Sources
4. **Wikimedia Commons**
   - Historical and cultural images
   - Many monastery and Sikkim photos
   - Free use with attribution

5. **Government Tourism Sites**
   - Sikkim Tourism official images
   - Authentic local photography
   - May require permission

## Download Commands (using curl)

```bash
# Create directories for organized storage
mkdir -p images/hero images/monasteries images/destinations images/packages

# Example download command (replace URL with actual image URL)
# curl -L "IMAGE_URL" -o "images/hero/hero-monastery-panorama.jpg"
```

## Image Optimization

### Using ImageMagick (install with brew install imagemagick)
```bash
# Resize and optimize for web
convert input.jpg -resize 1920x1080^ -gravity center -crop 1920x1080+0+0 -quality 85 output.jpg

# Batch optimize all images in a directory
for img in images/*.jpg; do
    convert "$img" -quality 85 -strip "${img%.*}_optimized.jpg"
done
```

### Using online tools
- TinyPNG.com - Compress images while maintaining quality
- Squoosh.app - Google's image optimization tool

## Current Image Status

### Existing Images (in /images directory):
- ✅ `lake1.jpg` - Can be renamed to `tsomgo-lake.jpg`
- ✅ `monastery1.jpg` - Good for monasteries section
- ✅ `mountain1.jpg` - Can be used for adventure tour

### Still Needed:
- Hero panoramic monastery image
- Additional monastery exterior/interior shots
- Gangtok street/market scene
- Yumthang valley landscape
- Cultural dance/handicraft images
- Specific tour package representative images

## Attribution Requirements

Remember to check licensing for each image:
- ✅ CC0 (Public Domain) - No attribution required
- ⚠️ CC BY - Attribution required
- ❌ Rights-managed - Permission required

## Quality Checklist

For each image, ensure:
- [ ] High resolution (minimum 1200px width)
- [ ] Good lighting and contrast
- [ ] Culturally appropriate and respectful
- [ ] Consistent color tone across the website
- [ ] Optimized file size for web performance
- [ ] Proper aspect ratio for intended use
- [ ] Free of watermarks or copyright issues