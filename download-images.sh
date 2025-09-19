#!/bin/bash

# Image Download and Organization Script for Monastery360 Website
# This script helps organize the image directory structure and provides
# templates for downloading images from various sources

echo "🏔️ Monastery360 Image Management Script"
echo "========================================="

# Create organized directory structure
create_directories() {
    echo "📁 Creating image directory structure..."
    
    mkdir -p images/hero
    mkdir -p images/monasteries  
    mkdir -p images/destinations
    mkdir -p images/packages
    mkdir -p images/gallery
    mkdir -p images/panoramas
    
    echo "✅ Directory structure created successfully!"
    echo ""
}

# Check current images
check_current_images() {
    echo "📋 Current image inventory:"
    echo "=========================="
    
    if [ -d "images" ]; then
        find images/ -name "*.jpg" -o -name "*.jpeg" -o -name "*.png" | while read img; do
            size=$(du -h "$img" | cut -f1)
            dimensions=$(file "$img" | grep -o '[0-9]*x[0-9]*' | head -1)
            echo "  📸 $img - Size: $size - Dimensions: $dimensions"
        done
    else
        echo "  ❌ No images directory found"
    fi
    echo ""
}

# Download function template (user needs to replace URLs)
download_images() {
    echo "🔄 Image download templates:"
    echo "============================"
    echo "Replace 'PASTE_URL_HERE' with actual image URLs from stock photo sites"
    echo ""
    
    # Hero section
    echo "# Hero Section (1920x1080 minimum)"
    echo "curl -L 'PASTE_URL_HERE' -o 'images/hero/hero-monastery-panorama.jpg'"
    echo ""
    
    # Monasteries
    echo "# Monastery Images"
    echo "curl -L 'PASTE_URL_HERE' -o 'images/monasteries/rumtek-monastery.jpg'"
    echo "curl -L 'PASTE_URL_HERE' -o 'images/monasteries/pemayangtse-monastery.jpg'"
    echo "curl -L 'PASTE_URL_HERE' -o 'images/monasteries/enchey-monastery.jpg'"
    echo "curl -L 'PASTE_URL_HERE' -o 'images/monasteries/monastery-interior.jpg'"
    echo ""
    
    # Destinations  
    echo "# Destination Images"
    echo "curl -L 'PASTE_URL_HERE' -o 'images/destinations/tsomgo-lake.jpg'"
    echo "curl -L 'PASTE_URL_HERE' -o 'images/destinations/yumthang-valley.jpg'"
    echo "curl -L 'PASTE_URL_HERE' -o 'images/destinations/gangtok-market.jpg'"
    echo ""
    
    # Tour packages
    echo "# Tour Package Images"
    echo "curl -L 'PASTE_URL_HERE' -o 'images/packages/1-day-tour.jpg'"
    echo "curl -L 'PASTE_URL_HERE' -o 'images/packages/3-day-scenic.jpg'"
    echo "curl -L 'PASTE_URL_HERE' -o 'images/packages/5-day-explorer.jpg'"
    echo "curl -L 'PASTE_URL_HERE' -o 'images/packages/7-day-adventure.jpg'"
    echo ""
}

# Optimize existing images
optimize_images() {
    echo "🔧 Optimizing images..."
    
    # Check if ImageMagick is installed
    if ! command -v convert &> /dev/null; then
        echo "⚠️  ImageMagick not found. Install with: brew install imagemagick"
        echo "   Skipping optimization step."
        return
    fi
    
    # Optimize all JPG images
    find images/ -name "*.jpg" -o -name "*.jpeg" | while read img; do
        echo "  🔄 Optimizing: $img"
        # Create backup
        cp "$img" "${img%.*}_backup.jpg"
        # Optimize (reduce quality to 85%, strip metadata)
        convert "$img" -quality 85 -strip "$img"
        echo "  ✅ Optimized: $img"
    done
    
    echo "✅ Image optimization complete!"
    echo ""
}

# Rename existing images to match new structure
organize_existing() {
    echo "📋 Organizing existing images..."
    
    if [ -f "images/lake1.jpg" ]; then
        mv "images/lake1.jpg" "images/destinations/tsomgo-lake.jpg"
        echo "  ✅ Renamed lake1.jpg → tsomgo-lake.jpg"
    fi
    
    if [ -f "images/mountain1.jpg" ]; then
        mv "images/mountain1.jpg" "images/packages/7-day-adventure.jpg" 
        echo "  ✅ Renamed mountain1.jpg → 7-day-adventure.jpg"
    fi
    
    if [ -f "images/monastery1.jpg" ]; then
        cp "images/monastery1.jpg" "images/monasteries/monastery1.jpg"
        echo "  ✅ Copied monastery1.jpg to monasteries folder"
    fi
    
    echo "✅ Existing images organized!"
    echo ""
}

# Generate image list for HTML updates
generate_html_updates() {
    echo "🔧 HTML Update Guide:"
    echo "==================="
    echo "Update these image references in index.html:"
    echo ""
    echo "Hero Section:"
    echo '  <img src="images/hero/hero-monastery-panorama.jpg" alt="Sikkim Monastery Panorama">'
    echo ""
    echo "Monasteries:"
    echo '  <img src="images/monasteries/rumtek-monastery.jpg" alt="Rumtek Monastery">'
    echo '  <img src="images/monasteries/pemayangtse-monastery.jpg" alt="Pemayangtse Monastery">'
    echo ""
    echo "Destinations:"
    echo '  <img src="images/destinations/tsomgo-lake.jpg" alt="Tsomgo Lake">'
    echo '  <img src="images/destinations/gangtok-market.jpg" alt="Gangtok Market">'
    echo ""
    echo "Packages:"
    echo '  <img src="images/packages/1-day-tour.jpg" alt="1-Day Quick Tour">'
    echo '  <img src="images/packages/3-day-scenic.jpg" alt="3-Day Scenic Trip">'
    echo '  <img src="images/packages/5-day-explorer.jpg" alt="5-Day Explorer Trip">'
    echo '  <img src="images/packages/7-day-adventure.jpg" alt="7-Day Adventure Trip">'
    echo ""
}

# Show recommended sources
show_sources() {
    echo "🌐 Recommended Image Sources:"
    echo "============================="
    echo ""
    echo "1. 🆓 Unsplash.com - High-quality free photos"
    echo "   Search: 'Sikkim monastery', 'Himalayan landscape', 'Buddhist temple'"
    echo ""
    echo "2. 🆓 Pexels.com - Curated stock photos"  
    echo "   Search: 'mountain monastery', 'Buddhist culture', 'India travel'"
    echo ""
    echo "3. 🆓 Pixabay.com - Large free image collection"
    echo "   Search: 'Tibet monastery', 'mountain temple', 'Buddhist prayer'"
    echo ""
    echo "4. 🏛️ Wikimedia Commons - Cultural/historical images"
    echo "   Search: 'Sikkim', 'Rumtek monastery', 'Himalayan architecture'"
    echo ""
    echo "💡 Pro tip: Look for images with CC0 license (no attribution required)"
    echo ""
}

# Main menu
main_menu() {
    echo "Choose an action:"
    echo "1. Create directory structure"
    echo "2. Check current images"  
    echo "3. Show download templates"
    echo "4. Organize existing images"
    echo "5. Optimize images (requires ImageMagick)"
    echo "6. Generate HTML update guide"
    echo "7. Show recommended sources"
    echo "8. Do all setup tasks (1,2,4,6,7)"
    echo "0. Exit"
    echo ""
    read -p "Enter your choice (0-8): " choice
    
    case $choice in
        1) create_directories ;;
        2) check_current_images ;;
        3) download_images ;;
        4) organize_existing ;;
        5) optimize_images ;;
        6) generate_html_updates ;;
        7) show_sources ;;
        8) 
            create_directories
            check_current_images  
            organize_existing
            generate_html_updates
            show_sources
            ;;
        0) echo "👋 Goodbye!"; exit 0 ;;
        *) echo "❌ Invalid choice. Please try again."; echo "" ;;
    esac
}

# Run main menu in loop
while true; do
    main_menu
    echo ""
    read -p "Press Enter to continue..."
    echo ""
done