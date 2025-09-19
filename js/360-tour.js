// 360° Virtual Tour Implementation for Monastery360

class Virtual360Tour {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.controls = null;
        this.panorama = null;
        this.isAutoRotating = false;
        this.autoRotateSpeed = 0.2;
        this.currentNarration = null;
        this.narrationAudio = null;
        this.hotspots = [];
        this.currentLanguage = 'en';
        
        // Narration text for different languages
        this.narrations = {
            en: "Welcome to this sacred monastery in Sikkim. This ancient structure has been a center of Buddhist learning and meditation for centuries. The intricate artwork and peaceful atmosphere invite visitors to experience the spiritual heritage of the region.",
            hi: "सिक्किम के इस पवित्र मठ में आपका स्वागत है। यह प्राचीन संरचना सदियों से बौद्ध शिक्षा और ध्यान का केंद्र रही है। जटिल कलाकृति और शांतिपूर्ण वातावरण आगंतुकों को इस क्षेत्र की आध्यात्मिक विरासत का अनुभव करने के लिए आमंत्रित करता है।",
            ne: "सिक्किमको यो पवित्र गुम्बामा तपाईंलाई स्वागत छ। यो प्राचीन संरचना शताब्दीयौंदेखि बौद्ध शिक्षा र ध्यानको केन्द्र भएको छ। जटिल कलाकृति र शान्तिपूर्ण वातावरणले आगन्तुकहरूलाई यस क्षेत्रको आध्यात्मिक सम्पदाको अनुभव गर्न आमन्त्रित गर्छ।",
            bo: "སི་ཀིམ་གྱི་དགོན་པ་དམ་པ་འདིར་ཁྱེད་རང་ལ་དགའ་བསུ་ཞུ། འདི་ནི་རབ་ཏུ་རྙིང་པའི་གཞི་རིམ་དེ་ལོ་བརྒྱ་ཕྲག་མང་པོའི་རིང་ལ་ནང་པའི་སློབ་གསོ་དང་སྒོམ་གྱི་ལྟེ་གནས་ཤིག་ཡིན། སྤྲོ་བའི་བཟོ་རིག་དང་ཞི་བའི་ཁོར་ཡུག་གིས་འདྲེན་རིས་རྣམས་ལ་ས་ཁུལ་འདིའི་སྤྱོད་ཚུགས་རིག་གཞུང་གི་ཉམས་མྱོང་ཐོབ་པར་མགྲོན་གདན་འདེབས་བྱེད།"
        };
        
        this.init();
    }
    
    async init() {
        // Check if WebGL is available
        if (!this.isWebGLAvailable()) {
            this.showFallback();
            return;
        }
        
        try {
            await this.loadThreeJS();
            this.setupScene();
            this.loadPanorama();
            this.setupControls();
            this.setupHotspots();
            this.setupEventListeners();
            this.animate();
            
            console.log('360° Virtual Tour initialized successfully');
        } catch (error) {
            console.error('Failed to initialize 360° tour:', error);
            this.showFallback();
        }
    }
    
    async loadThreeJS() {
        // In a real implementation, you would load Three.js library
        // For this demo, we'll simulate the 360° tour functionality
        return new Promise((resolve) => {
            setTimeout(() => {
                // Simulate Three.js being loaded
                window.THREE = {
                    Scene: class Scene {},
                    PerspectiveCamera: class PerspectiveCamera {},
                    WebGLRenderer: class WebGLRenderer {},
                    SphereGeometry: class SphereGeometry {},
                    MeshBasicMaterial: class MeshBasicMaterial {},
                    Mesh: class Mesh {},
                    TextureLoader: class TextureLoader {}
                };
                resolve();
            }, 500);
        });
    }
    
    isWebGLAvailable() {
        try {
            const canvas = document.createElement('canvas');
            return !!(window.WebGLRenderingContext && 
                     (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
        } catch (e) {
            return false;
        }
    }
    
    setupScene() {
        // Create the container for our simulated 360° view
        this.container.innerHTML = `
            <div class="virtual-tour-container">
                <div class="panorama-viewer">
                    <div class="panorama-image">
                        <img src="images/panoramas/monastery-360-1.jpg" alt="360° Monastery View" class="pano-img">
                        <div class="hotspot hotspot-1" data-info="main-hall">
                            <div class="hotspot-pulse"></div>
                            <div class="hotspot-icon">
                                <i class="fas fa-info-circle"></i>
                            </div>
                        </div>
                        <div class="hotspot hotspot-2" data-info="prayer-wheels">
                            <div class="hotspot-pulse"></div>
                            <div class="hotspot-icon">
                                <i class="fas fa-dharmachakra"></i>
                            </div>
                        </div>
                        <div class="hotspot hotspot-3" data-info="altar">
                            <div class="hotspot-pulse"></div>
                            <div class="hotspot-icon">
                                <i class="fas fa-Om"></i>
                            </div>
                        </div>
                    </div>
                    <div class="tour-overlay">
                        <div class="narration-panel">
                            <div class="narration-text"></div>
                            <div class="narration-controls">
                                <button class="narration-btn play-narration">
                                    <i class="fas fa-play"></i>
                                </button>
                                <button class="narration-btn pause-narration">
                                    <i class="fas fa-pause"></i>
                                </button>
                                <button class="narration-btn stop-narration">
                                    <i class="fas fa-stop"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="tour-info-panel">
                    <div class="info-content">
                        <h3>Welcome to the Virtual Tour</h3>
                        <p>Click and drag to look around. Click on the hotspots to learn more about different areas.</p>
                    </div>
                </div>
            </div>
        `;
        
        // Add CSS for the virtual tour
        this.addTourStyles();
    }
    
    addTourStyles() {
        const styles = `
            <style id="virtual-tour-styles">
                .virtual-tour-container {
                    position: relative;
                    width: 100%;
                    height: 100%;
                    background: #000;
                    border-radius: var(--radius-lg);
                    overflow: hidden;
                }
                
                .panorama-viewer {
                    position: relative;
                    width: 100%;
                    height: 100%;
                }
                
                .panorama-image {
                    position: relative;
                    width: 100%;
                    height: 100%;
                    overflow: hidden;
                    cursor: grab;
                }
                
                .panorama-image:active {
                    cursor: grabbing;
                }
                
                .pano-img {
                    width: 150%;
                    height: 100%;
                    object-fit: cover;
                    transition: transform 0.1s ease;
                    transform: translateX(-25%);
                }
                
                .hotspot {
                    position: absolute;
                    width: 40px;
                    height: 40px;
                    cursor: pointer;
                    z-index: 10;
                }
                
                .hotspot-1 {
                    top: 30%;
                    left: 20%;
                }
                
                .hotspot-2 {
                    top: 45%;
                    right: 25%;
                }
                
                .hotspot-3 {
                    top: 60%;
                    left: 60%;
                }
                
                .hotspot-pulse {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    width: 20px;
                    height: 20px;
                    background: rgba(212, 165, 116, 0.3);
                    border-radius: 50%;
                    transform: translate(-50%, -50%);
                    animation: pulse 2s infinite;
                }
                
                .hotspot-icon {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    width: 30px;
                    height: 30px;
                    background: var(--primary-color);
                    color: white;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transform: translate(-50%, -50%);
                    box-shadow: 0 2px 10px rgba(0,0,0,0.3);
                    transition: all 0.3s ease;
                    z-index: 2;
                }
                
                .hotspot:hover .hotspot-icon {
                    transform: translate(-50%, -50%) scale(1.2);
                    background: var(--primary-dark);
                }
                
                .tour-overlay {
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    background: linear-gradient(transparent, rgba(0,0,0,0.8));
                    padding: var(--spacing-xl);
                    color: white;
                    transform: translateY(100%);
                    transition: transform 0.3s ease;
                }
                
                .tour-overlay.active {
                    transform: translateY(0);
                }
                
                .narration-panel {
                    display: flex;
                    align-items: center;
                    gap: var(--spacing-lg);
                }
                
                .narration-text {
                    flex: 1;
                    font-size: var(--font-size-sm);
                    line-height: 1.6;
                }
                
                .narration-controls {
                    display: flex;
                    gap: var(--spacing-sm);
                }
                
                .narration-btn {
                    background: rgba(255,255,255,0.2);
                    border: none;
                    color: white;
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: background 0.3s ease;
                }
                
                .narration-btn:hover {
                    background: rgba(255,255,255,0.3);
                }
                
                .tour-info-panel {
                    position: absolute;
                    top: var(--spacing-md);
                    right: var(--spacing-md);
                    background: rgba(0,0,0,0.8);
                    color: white;
                    padding: var(--spacing-lg);
                    border-radius: var(--radius-md);
                    max-width: 300px;
                    backdrop-filter: blur(10px);
                }
                
                .info-content h3 {
                    margin-bottom: var(--spacing-sm);
                    font-size: var(--font-size-base);
                }
                
                .info-content p {
                    font-size: var(--font-size-sm);
                    opacity: 0.9;
                    margin: 0;
                }
                
                @keyframes pulse {
                    0% {
                        transform: translate(-50%, -50%) scale(1);
                        opacity: 1;
                    }
                    100% {
                        transform: translate(-50%, -50%) scale(2);
                        opacity: 0;
                    }
                }
                
                .auto-rotating .pano-img {
                    animation: rotate360 20s linear infinite;
                }
                
                @keyframes rotate360 {
                    from {
                        transform: translateX(-25%);
                    }
                    to {
                        transform: translateX(-75%);
                    }
                }
                
                .hotspot-tooltip {
                    position: absolute;
                    bottom: 50px;
                    left: 50%;
                    transform: translateX(-50%);
                    background: rgba(0,0,0,0.9);
                    color: white;
                    padding: var(--spacing-sm) var(--spacing-md);
                    border-radius: var(--radius-sm);
                    font-size: var(--font-size-sm);
                    white-space: nowrap;
                    pointer-events: none;
                    opacity: 0;
                    transition: opacity 0.3s ease;
                    z-index: 100;
                }
                
                .hotspot:hover .hotspot-tooltip {
                    opacity: 1;
                }
                
                @media (max-width: 768px) {
                    .tour-info-panel {
                        position: static;
                        max-width: none;
                        margin: var(--spacing-md);
                    }
                    
                    .narration-panel {
                        flex-direction: column;
                        gap: var(--spacing-md);
                    }
                    
                    .narration-controls {
                        justify-content: center;
                    }
                }
            </style>
        `;
        
        document.head.insertAdjacentHTML('beforeend', styles);
    }
    
    loadPanorama() {
        // Simulate loading a 360° panorama
        const panoImg = this.container.querySelector('.pano-img');
        
        // Add hotspot tooltips
        this.addHotspotTooltips();
        
        console.log('Panorama loaded');
    }
    
    addHotspotTooltips() {
        const hotspots = this.container.querySelectorAll('.hotspot');
        const tooltips = {
            'main-hall': 'Main Prayer Hall',
            'prayer-wheels': 'Prayer Wheels',
            'altar': 'Sacred Altar'
        };
        
        hotspots.forEach(hotspot => {
            const info = hotspot.getAttribute('data-info');
            const tooltip = document.createElement('div');
            tooltip.className = 'hotspot-tooltip';
            tooltip.textContent = tooltips[info] || 'Point of Interest';
            hotspot.appendChild(tooltip);
        });
    }
    
    setupControls() {
        const panoImage = this.container.querySelector('.panorama-image');
        const panoImg = this.container.querySelector('.pano-img');
        let isDragging = false;
        let startX = 0;
        let currentX = 0;
        let translateX = -25; // Start at center
        
        // Mouse events
        panoImage.addEventListener('mousedown', (e) => {
            isDragging = true;
            startX = e.clientX;
            panoImage.style.cursor = 'grabbing';
            this.stopAutoRotate();
        });
        
        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            
            const deltaX = (e.clientX - startX) * 0.1;
            currentX = deltaX;
            const newTranslateX = Math.max(-75, Math.min(-25, translateX + deltaX));
            panoImg.style.transform = `translateX(${newTranslateX}%)`;
        });
        
        document.addEventListener('mouseup', () => {
            if (!isDragging) return;
            isDragging = false;
            translateX += currentX;
            translateX = Math.max(-75, Math.min(-25, translateX));
            startX = 0;
            currentX = 0;
            panoImage.style.cursor = 'grab';
        });
        
        // Touch events for mobile
        panoImage.addEventListener('touchstart', (e) => {
            isDragging = true;
            startX = e.touches[0].clientX;
            this.stopAutoRotate();
        });
        
        document.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            e.preventDefault();
            
            const deltaX = (e.touches[0].clientX - startX) * 0.1;
            currentX = deltaX;
            const newTranslateX = Math.max(-75, Math.min(-25, translateX + deltaX));
            panoImg.style.transform = `translateX(${newTranslateX}%)`;
        });
        
        document.addEventListener('touchend', () => {
            if (!isDragging) return;
            isDragging = false;
            translateX += currentX;
            translateX = Math.max(-75, Math.min(-25, translateX));
            startX = 0;
            currentX = 0;
        });
    }
    
    setupHotspots() {
        const hotspots = this.container.querySelectorAll('.hotspot');
        const tourOverlay = this.container.querySelector('.tour-overlay');
        const narrationText = this.container.querySelector('.narration-text');
        
        const hotspotInfo = {
            'main-hall': 'This is the main prayer hall where monks gather for daily prayers and meditation. The intricate woodwork and paintings depict Buddhist teachings.',
            'prayer-wheels': 'These prayer wheels contain sacred mantras. Spinning them is believed to have the same effect as reciting the prayers.',
            'altar': 'The sacred altar houses precious Buddhist artifacts and serves as the focal point for worship and offerings.'
        };
        
        hotspots.forEach(hotspot => {
            hotspot.addEventListener('click', () => {
                const info = hotspot.getAttribute('data-info');
                narrationText.textContent = hotspotInfo[info] || 'Point of interest';
                tourOverlay.classList.add('active');
                
                // Hide overlay after 5 seconds
                setTimeout(() => {
                    tourOverlay.classList.remove('active');
                }, 5000);
            });
        });
    }
    
    setupEventListeners() {
        // Auto-rotate button
        const autoRotateBtn = document.querySelector('#auto-rotate');
        if (autoRotateBtn) {
            autoRotateBtn.addEventListener('click', () => {
                this.toggleAutoRotate();
            });
        }
        
        // Zoom buttons
        const zoomInBtn = document.querySelector('#zoom-in');
        const zoomOutBtn = document.querySelector('#zoom-out');
        
        if (zoomInBtn) {
            zoomInBtn.addEventListener('click', () => this.zoomIn());
        }
        
        if (zoomOutBtn) {
            zoomOutBtn.addEventListener('click', () => this.zoomOut());
        }
        
        // Fullscreen button
        const fullscreenBtn = document.querySelector('#fullscreen');
        if (fullscreenBtn) {
            fullscreenBtn.addEventListener('click', () => this.toggleFullscreen());
        }
        
        // Language selector
        const languageSelect = document.querySelector('#narration-language');
        if (languageSelect) {
            languageSelect.addEventListener('change', (e) => {
                this.currentLanguage = e.target.value;
                this.updateNarration();
            });
        }
        
        // Narration controls
        const playBtn = this.container.querySelector('.play-narration');
        const pauseBtn = this.container.querySelector('.pause-narration');
        const stopBtn = this.container.querySelector('.stop-narration');
        
        playBtn?.addEventListener('click', () => this.playNarration());
        pauseBtn?.addEventListener('click', () => this.pauseNarration());
        stopBtn?.addEventListener('click', () => this.stopNarration());
    }
    
    toggleAutoRotate() {
        const panoImage = this.container.querySelector('.panorama-image');
        const autoRotateBtn = document.querySelector('#auto-rotate');
        
        if (this.isAutoRotating) {
            this.stopAutoRotate();
        } else {
            this.startAutoRotate();
        }
        
        // Update button state
        if (autoRotateBtn) {
            autoRotateBtn.classList.toggle('active', this.isAutoRotating);
        }
    }
    
    startAutoRotate() {
        const panoImage = this.container.querySelector('.panorama-image');
        panoImage.classList.add('auto-rotating');
        this.isAutoRotating = true;
    }
    
    stopAutoRotate() {
        const panoImage = this.container.querySelector('.panorama-image');
        panoImage.classList.remove('auto-rotating');
        this.isAutoRotating = false;
    }
    
    zoomIn() {
        const panoImg = this.container.querySelector('.pano-img');
        const currentScale = parseFloat(panoImg.style.transform.match(/scale\(([^)]+)\)/)?.[1] || 1);
        const newScale = Math.min(currentScale * 1.2, 3);
        panoImg.style.transform = panoImg.style.transform.replace(/scale\([^)]+\)/, '') + ` scale(${newScale})`;
    }
    
    zoomOut() {
        const panoImg = this.container.querySelector('.pano-img');
        const currentScale = parseFloat(panoImg.style.transform.match(/scale\(([^)]+)\)/)?.[1] || 1);
        const newScale = Math.max(currentScale / 1.2, 0.8);
        panoImg.style.transform = panoImg.style.transform.replace(/scale\([^)]+\)/, '') + ` scale(${newScale})`;
    }
    
    toggleFullscreen() {
        if (!document.fullscreenElement) {
            this.container.requestFullscreen().catch(err => {
                console.warn('Fullscreen not supported:', err);
            });
        } else {
            document.exitFullscreen();
        }
    }
    
    updateNarration() {
        const narrationText = this.container.querySelector('.narration-text');
        if (narrationText) {
            narrationText.textContent = this.narrations[this.currentLanguage] || this.narrations.en;
        }
    }
    
    playNarration() {
        // In a real implementation, this would use the Web Speech API or audio files
        this.speakText(this.narrations[this.currentLanguage] || this.narrations.en);
        
        // Show visual feedback
        const tourOverlay = this.container.querySelector('.tour-overlay');
        const narrationText = this.container.querySelector('.narration-text');
        narrationText.textContent = this.narrations[this.currentLanguage] || this.narrations.en;
        tourOverlay.classList.add('active');
    }
    
    pauseNarration() {
        if (this.currentNarration) {
            speechSynthesis.pause();
        }
    }
    
    stopNarration() {
        if (this.currentNarration) {
            speechSynthesis.cancel();
        }
        const tourOverlay = this.container.querySelector('.tour-overlay');
        tourOverlay.classList.remove('active');
    }
    
    speakText(text) {
        // Check if speech synthesis is available
        if ('speechSynthesis' in window) {
            speechSynthesis.cancel(); // Stop any ongoing speech
            
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.rate = 0.8;
            utterance.pitch = 1;
            utterance.volume = 0.8;
            
            // Try to find a voice for the selected language
            const voices = speechSynthesis.getVoices();
            const languageVoice = voices.find(voice => voice.lang.startsWith(this.currentLanguage));
            if (languageVoice) {
                utterance.voice = languageVoice;
            }
            
            utterance.onend = () => {
                const tourOverlay = this.container.querySelector('.tour-overlay');
                setTimeout(() => {
                    tourOverlay.classList.remove('active');
                }, 2000);
            };
            
            this.currentNarration = utterance;
            speechSynthesis.speak(utterance);
        } else {
            console.warn('Speech synthesis not supported');
            // Show text for longer duration if speech is not available
            setTimeout(() => {
                const tourOverlay = this.container.querySelector('.tour-overlay');
                tourOverlay.classList.remove('active');
            }, 8000);
        }
    }
    
    showFallback() {
        // Show a fallback experience for devices that don't support WebGL
        this.container.innerHTML = `
            <div class="tour-fallback">
                <div class="fallback-image">
                    <img src="https://cdn.pixabay.com/photo/2020/03/26/22/08/360-4972242_1280.jpg" alt="Monastery Interior" class="fallback-img">
                    <div class="fallback-overlay">
                        <div class="fallback-content">
                            <h3>Virtual Tour</h3>
                            <p>Experience the serene atmosphere of Sikkim's ancient monasteries. This sacred space has been a center of Buddhist learning and meditation for centuries.</p>
                            <div class="fallback-features">
                                <div class="feature">
                                    <i class="fas fa-eye"></i>
                                    <span>Immersive Experience</span>
                                </div>
                                <div class="feature">
                                    <i class="fas fa-volume-up"></i>
                                    <span>Audio Narration</span>
                                </div>
                                <div class="feature">
                                    <i class="fas fa-expand"></i>
                                    <span>High Resolution</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="fallback-info">
                    <p>For the full 360° interactive experience, please use a modern browser with WebGL support.</p>
                </div>
            </div>
        `;
        
        // Add fallback styles
        const fallbackStyles = `
            <style id="tour-fallback-styles">
                .tour-fallback {
                    position: relative;
                    width: 100%;
                    height: 100%;
                    border-radius: var(--radius-lg);
                    overflow: hidden;
                    background: var(--bg-secondary);
                }
                
                .fallback-image {
                    position: relative;
                    width: 100%;
                    height: 80%;
                }
                
                .fallback-img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
                
                .fallback-overlay {
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: linear-gradient(135deg, rgba(0,0,0,0.7), rgba(0,0,0,0.3));
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    text-align: center;
                    padding: var(--spacing-xl);
                }
                
                .fallback-content h3 {
                    font-size: var(--font-size-2xl);
                    margin-bottom: var(--spacing-md);
                }
                
                .fallback-content p {
                    font-size: var(--font-size-base);
                    margin-bottom: var(--spacing-lg);
                    opacity: 0.9;
                }
                
                .fallback-features {
                    display: flex;
                    gap: var(--spacing-lg);
                    justify-content: center;
                }
                
                .feature {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: var(--spacing-sm);
                }
                
                .feature i {
                    font-size: var(--font-size-xl);
                    color: var(--primary-color);
                }
                
                .feature span {
                    font-size: var(--font-size-sm);
                }
                
                .fallback-info {
                    padding: var(--spacing-lg);
                    text-align: center;
                    color: var(--text-secondary);
                    font-size: var(--font-size-sm);
                }
                
                @media (max-width: 768px) {
                    .fallback-features {
                        flex-direction: column;
                        gap: var(--spacing-md);
                    }
                    
                    .fallback-content {
                        padding: var(--spacing-md);
                    }
                    
                    .fallback-content h3 {
                        font-size: var(--font-size-xl);
                    }
                }
            </style>
        `;
        
        document.head.insertAdjacentHTML('beforeend', fallbackStyles);
    }
    
    animate() {
        // Animation loop would go here for Three.js
        // For the demo, we'll use CSS animations instead
    }
    
    destroy() {
        // Clean up resources
        if (this.currentNarration) {
            speechSynthesis.cancel();
        }
        
        // Remove added styles
        const tourStyles = document.getElementById('virtual-tour-styles');
        const fallbackStyles = document.getElementById('tour-fallback-styles');
        
        if (tourStyles) tourStyles.remove();
        if (fallbackStyles) fallbackStyles.remove();
        
        // Clear container
        this.container.innerHTML = '';
    }
}

// Initialize the virtual tour when the page loads
document.addEventListener('DOMContentLoaded', function() {
    const panoramaContainer = document.getElementById('panorama-viewer');
    
    if (panoramaContainer) {
        // Initialize the virtual tour
        window.virtualTour = new Virtual360Tour('panorama-viewer');
        
        console.log('360° Virtual Tour system ready');
    }
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Virtual360Tour;
}