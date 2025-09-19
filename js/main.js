// Main JavaScript for Monastery360 Tourism Website

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all modules
    initializeHeader();
    initializeHero();
    initializeTheme();
    initializeReservationForm();
    initializeFeedbackForm();
    initializeDestinationModals();
    initializeEventCalendar();
    initializeStarRating();
    initializeAnimations();
    initializeSearch();
    initializeMobileMenu();
    initializePackageReservation();
    initializeSmoothScrolling();
    initializeEmergencyContacts();
    
    // Initialize gallery after DOM is loaded
    setTimeout(initializeGallery, 100);
});

// Header Functionality
function initializeHeader() {
    const header = document.querySelector('.header');
    
    // Header scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// Mobile Menu
function initializeMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', function() {
            mobileToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!mobileToggle.contains(e.target) && !navMenu.contains(e.target)) {
                mobileToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }
}

// Hero Slider
function initializeHero() {
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.slider-btn.prev');
    const nextBtn = document.querySelector('.slider-btn.next');
    let currentSlide = 0;
    let slideInterval;
    
    if (slides.length === 0) return;
    
    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }
    
    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }
    
    function startSlideshow() {
        slideInterval = setInterval(nextSlide, 5000);
    }
    
    function stopSlideshow() {
        clearInterval(slideInterval);
    }
    
    // Event listeners
    if (nextBtn) nextBtn.addEventListener('click', () => {
        stopSlideshow();
        nextSlide();
        startSlideshow();
    });
    
    if (prevBtn) prevBtn.addEventListener('click', () => {
        stopSlideshow();
        prevSlide();
        startSlideshow();
    });
    
    // Touch/swipe support
    let touchStartX = 0;
    const heroSlider = document.querySelector('.hero-slider');
    
    if (heroSlider) {
        heroSlider.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
        });
        
        heroSlider.addEventListener('touchend', (e) => {
            const touchEndX = e.changedTouches[0].clientX;
            const diff = touchStartX - touchEndX;
            
            if (Math.abs(diff) > 50) {
                stopSlideshow();
                if (diff > 0) {
                    nextSlide();
                } else {
                    prevSlide();
                }
                startSlideshow();
            }
        });
    }
    
    // Start slideshow
    startSlideshow();
    
    // Pause on hover
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.addEventListener('mouseenter', stopSlideshow);
        hero.addEventListener('mouseleave', startSlideshow);
    }
}

// Theme Toggle
function initializeTheme() {
    const themeToggle = document.querySelector('#theme-toggle');
    const html = document.documentElement;
    const icon = themeToggle?.querySelector('i');

    // Get saved theme or default to light
    const savedTheme = localStorage.getItem('theme') || 'light';
    html.setAttribute('data-theme', savedTheme);

    if (icon) {
        icon.className = savedTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            const currentTheme = html.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

            html.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);

            if (icon) {
                icon.className = newTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
            }

            // Animate theme change
            html.style.transition = 'background-color 0.3s ease, color 0.3s ease';
            setTimeout(() => {
                html.style.transition = '';
            }, 300);
        });
    }
}

// Reservation Form
function initializeReservationForm() {
    const form = document.querySelector('#reservationForm');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());
            
            // Basic validation
            if (!validateReservationForm(data)) {
                return;
            }
            
            // Show loading state
            const submitBtn = form.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            submitBtn.innerHTML = '<span class="loading"></span> Processing...';
            submitBtn.disabled = true;
            
            // Simulate form submission (replace with actual API call)
            setTimeout(() => {
                showNotification('Reservation submitted successfully! We will contact you soon.', 'success');
                form.reset();
                
                // Reset button
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
        
        // Set minimum date to today
        const dateInput = form.querySelector('#travel-date');
        if (dateInput) {
            const today = new Date().toISOString().split('T')[0];
            dateInput.setAttribute('min', today);
        }
    }
}

// Package Reservation Buttons
function initializePackageReservation() {
    const reserveBtns = document.querySelectorAll('.reserve-btn');
    
    reserveBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const packageType = this.getAttribute('data-package');
            const reservationForm = document.querySelector('#reservationForm');
            const packageSelect = document.querySelector('#package');
            
            if (packageSelect && packageType) {
                packageSelect.value = packageType;
            }
            
            // Smooth scroll to reservation form
            if (reservationForm) {
                reservationForm.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'center'
                });
                
                // Highlight form briefly
                reservationForm.classList.add('highlight');
                setTimeout(() => {
                    reservationForm.classList.remove('highlight');
                }, 2000);
            }
        });
    });
}

// Form Validation
function validateReservationForm(data) {
    const errors = [];
    
    if (!data.name || data.name.trim().length < 2) {
        errors.push('Please enter a valid name');
    }
    
    if (!data.email || !isValidEmail(data.email)) {
        errors.push('Please enter a valid email address');
    }
    
    if (!data.phone || data.phone.trim().length < 10) {
        errors.push('Please enter a valid phone number');
    }
    
    if (!data.package) {
        errors.push('Please select a tour package');
    }
    
    if (!data['travel-date']) {
        errors.push('Please select a travel date');
    }
    
    if (errors.length > 0) {
        showNotification(errors.join('<br>'), 'error');
        return false;
    }
    
    return true;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Feedback Form
function initializeFeedbackForm() {
    const form = document.querySelector('#feedbackForm');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());
            
            // Show loading state
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.innerHTML = '<span class="loading"></span> Submitting...';
            submitBtn.disabled = true;
            
            // Simulate form submission
            setTimeout(() => {
                showNotification('Thank you for your feedback! We appreciate your input.', 'success');
                form.reset();
                
                // Reset star rating
                const stars = form.querySelectorAll('.star');
                stars.forEach(star => star.classList.remove('active'));
                
                // Reset button
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }
}

// Star Rating
function initializeStarRating() {
    const starRating = document.querySelector('#star-rating');
    
    if (starRating) {
        const stars = starRating.querySelectorAll('.star');
        let rating = 0;
        
        stars.forEach((star, index) => {
            star.addEventListener('click', function() {
                rating = index + 1;
                updateStars(stars, rating);
            });
            
            star.addEventListener('mouseenter', function() {
                updateStars(stars, index + 1);
            });
        });
        
        starRating.addEventListener('mouseleave', function() {
            updateStars(stars, rating);
        });
    }
}

function updateStars(stars, rating) {
    stars.forEach((star, index) => {
        star.classList.toggle('active', index < rating);
    });
}

// Destination Modals
function initializeDestinationModals() {
    const destinationCards = document.querySelectorAll('.destination-card');
    const modal = document.querySelector('#destination-modal');
    const modalBody = document.querySelector('#modal-body');
    const closeBtn = document.querySelector('.modal-close');
    
    if (!modal || !modalBody) return;
    
    const destinationData = {
        gangtok: {
            title: 'Gangtok',
            image: 'images/destinations/gangtok-market.jpg',
            description: 'Gangtok, the capital city of Sikkim, is a vibrant hill station nestled in the Eastern Himalayas. Known for its pristine beauty, Buddhist monasteries, and rich cultural heritage, Gangtok offers visitors a perfect blend of tradition and modernity.',
            highlights: [
                'MG Marg - The heart of Gangtok',
                'Rumtek Monastery - Seat of Karma Kagyu lineage',
                'Enchey Monastery - 200-year-old sacred site',
                'Ganesh Tok - Panoramic mountain views',
                'Hanuman Tok - Peaceful temple complex',
                'Do Drul Chorten - Sacred Buddhist stupa'
            ],
            mapLink: 'https://maps.google.com/?q=Gangtok,Sikkim',
            story: 'Once a small hamlet, Gangtok has evolved into a cosmopolitan city while retaining its spiritual essence. The city serves as a gateway to North Sikkim and offers breathtaking views of Kanchenjunga, the world\'s third-highest peak.'
        },
        tsomgo: {
            title: 'Tsomgo Lake & Baba Mandir',
            image: 'images/Tsomgo-Lake.webp',
            description: 'Tsomgo Lake, also known as Changu Lake, is a glacial lake located at an altitude of 12,313 feet. This sacred lake is considered holy by the local people and is surrounded by snow-capped mountains throughout the year.',
            highlights: [
                'Sacred glacial lake at 12,400 ft',
                'Baba Harbhajan Singh Mandir',
                'Pristine mountain environment',
                'Yak rides available',
                'Snow-covered landscape year-round',
                'Spiritual significance for locals'
            ],
            mapLink: 'https://maps.google.com/?q=Tsomgo+Lake,Sikkim',
            story: 'Legend says that the lake changes colors and that Buddhist monks can predict the weather by observing its waters. The nearby Baba Mandir is dedicated to an Indian soldier and is considered a guardian spirit of the area.'
        },
        pelling: {
            title: 'Pelling',
            image: 'images/photo-1573398643956-2b9e6ade3456.avif',
            description: 'Pelling is a hill station offering some of the most spectacular views of the Kanchenjunga range. It serves as the base for trekking to various monasteries and is rich in natural beauty and cultural heritage.',
            highlights: [
                'Spectacular Kanchenjunga views',
                'Pemayangtse Monastery - Ancient Buddhist site',
                'Rabdentse Ruins - Former capital ruins',
                'Khecheopalri Lake - Sacred wishing lake',
                'Sangachoeling Monastery - Hilltop monastery',
                'Traditional Sikkimese culture'
            ],
            mapLink: 'https://maps.google.com/?q=Pelling,Sikkim',
            story: 'Pelling was once the second capital of Sikkim. The area is steeped in history and spirituality, with ancient monasteries and ruins that tell tales of the region\'s rich Buddhist heritage and royal legacy.'
        },
        'north-sikkim': {
            title: 'North Sikkim',
            image: 'images/photo-1633323773493-71920ed75215.avif',
            description: 'North Sikkim is a high-altitude paradise featuring pristine landscapes, ancient monasteries, and some of the most spectacular mountain views in the world. This region requires special permits for visitors.',
            highlights: [
                'Gurudongmar Lake - Sacred high-altitude lake',
                'Lachung & Lachen valleys',
                'Yumthang Valley - Valley of flowers',
                'Zero Point - Indo-China border area',
                'Ancient Buddhist monasteries',
                'Unique high-altitude ecosystem'
            ],
            mapLink: 'https://maps.google.com/?q=North+Sikkim',
            story: 'North Sikkim remains one of the most pristine and untouched regions in the Himalayas. The area is home to ancient trade routes, sacred lakes, and monasteries that have preserved Tibetan Buddhist culture for centuries.'
        },
        ravangla: {
            title: 'Ravangla',
            image: 'images/WhatsApp Image 2025-09-17 at 00.14.13.jpeg',
            description: 'Ravangla is a serene hill station known for its peaceful environment, Buddha Park, and panoramic views of the Himalayas. It offers visitors a chance to experience authentic Sikkimese culture in a tranquil setting.',
            highlights: [
                'Buddha Park with giant statue',
                'Ralang Monastery - Historical importance',
                'Mainom Hill - Highest peak in South Sikkim',
                'Temi Tea Garden visits',
                'Traditional village experiences',
                'Panoramic Himalayan views'
            ],
            mapLink: 'https://maps.google.com/?q=Ravangla,Sikkim',
            story: 'Ravangla has emerged as a spiritual and cultural center, with the Buddha Park serving as a symbol of peace and harmony. The town maintains its traditional charm while welcoming visitors to experience authentic Sikkimese hospitality.'
        },
        varsey: {
            title: 'Varsey Rhododendron Sanctuary',
            image: 'images/photo-1615966192539-f1731963b19a.avif',
            description: 'Varsey Rhododendron Sanctuary is a biodiversity hotspot covering 104 square kilometers. It\'s famous for its rhododendron blooms, diverse wildlife, and pristine forest ecosystem.',
            highlights: [
                'Over 30 species of rhododendrons',
                'Diverse wildlife including red pandas',
                'Pristine forest ecosystem',
                'Trekking and hiking trails',
                'Bird watching opportunities',
                'Photography paradise'
            ],
            mapLink: 'https://maps.google.com/?q=Varsey+Rhododendron+Sanctuary,Sikkim',
            story: 'The sanctuary blooms into a riot of colors during spring when rhododendrons flower. It represents Sikkim\'s commitment to conservation and offers visitors a chance to experience the region\'s incredible biodiversity.'
        }
    };
    
    destinationCards.forEach(card => {
        card.addEventListener('click', function() {
            const destination = this.getAttribute('data-destination');
            const data = destinationData[destination];
            
            if (data) {
                showDestinationModal(data);
            }
        });
    });
    
    function showDestinationModal(data) {
        modalBody.innerHTML = `
            <div class="destination-detail">
                <img src="${data.image}" alt="${data.title}" class="destination-detail-image">
                <div class="destination-detail-content">
                    <h2>${data.title}</h2>
                    <p class="destination-story">${data.story}</p>
                    <p class="destination-description">${data.description}</p>
                    
                    <div class="destination-highlights">
                        <h3>Highlights</h3>
                        <ul>
                            ${data.highlights.map(highlight => `<li>${highlight}</li>`).join('')}
                        </ul>
                    </div>
                    
                    <div class="destination-actions">
                        <a href="${data.mapLink}" target="_blank" class="btn btn-primary">
                            <i class="fas fa-map-marker-alt"></i> View on Map
                        </a>
                        <button class="btn btn-secondary reserve-destination">
                            <i class="fas fa-calendar-check"></i> Plan Visit
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        modal.classList.add('active');
        
        // Add event listener to the new reserve button
        const reserveBtn = modalBody.querySelector('.reserve-destination');
        if (reserveBtn) {
            reserveBtn.addEventListener('click', function() {
                modal.classList.remove('active');
                document.querySelector('#reservation').scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'center'
                });
            });
        }
    }
    
    // Close modal events
    if (closeBtn) {
        closeBtn.addEventListener('click', () => modal.classList.remove('active'));
    }
    
    modal?.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            modal.classList.remove('active');
        }
    });
}

// Event Calendar
function initializeEventCalendar() {
    const prevBtn = document.querySelector('.prev-month');
    const nextBtn = document.querySelector('.next-month');
    const currentMonthEl = document.querySelector('#current-month');
    const eventsList = document.querySelector('.events-list');

    if (!currentMonthEl || !eventsList) return;

    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    let currentMonth = new Date().getMonth();
    let currentYear = new Date().getFullYear();

    // Dynamic events data
    const culturalEvents = [
        { date: '02-10', title: 'Losar Celebration', description: 'Tibetan New Year with traditional dances, prayers, and cultural performances', type: 'festival' },
        { date: '02-17', title: 'Losar Special Tour', description: 'Guided tour of monasteries during Losar celebrations', type: 'tour' },
        { date: '05-23', title: 'Saga Dawa Festival', description: 'Buddha\'s enlightenment anniversary with special prayers and offerings', type: 'festival' },
        { date: '05-30', title: 'Drukpa Tsheshi', description: 'Birth anniversary of Guru Rinpoche with masked dances', type: 'festival' },
        { date: '07-15', title: 'Guru Purnima', description: 'Celebration of spiritual teachers with meditation and teachings', type: 'festival' },
        { date: '08-15', title: 'Independence Day', description: 'National holiday with cultural programs and flag hoisting', type: 'national' },
        { date: '09-23', title: 'Autumn Festival', description: 'Harvest festival with traditional music and dance performances', type: 'festival' },
        { date: '10-01', title: 'Dasain Festival', description: 'Major Hindu festival with family gatherings and cultural events', type: 'festival' },
        { date: '10-15', title: 'Tihar Festival', description: 'Festival of lights with traditional dances and decorations', type: 'festival' },
        { date: '12-25', title: 'Christmas Celebration', description: 'Christmas festivities with carol singing and cultural programs', type: 'festival' },
        { date: '01-01', title: 'New Year Celebration', description: 'New Year festivities with cultural programs and events', type: 'national' },
        { date: '01-15', title: 'Pongal Harvest', description: 'South Indian harvest festival with traditional ceremonies', type: 'festival' }
    ];

    function getEventsForMonth(month, year) {
        const monthStr = String(month + 1).padStart(2, '0');
        return culturalEvents.filter(event => event.date.startsWith(monthStr));
    }

    function updateCalendar() {
        currentMonthEl.textContent = `${months[currentMonth]} ${currentYear}`;
        updateEvents();
    }

    function updateEvents() {
        const monthEvents = getEventsForMonth(currentMonth, currentYear);
        const eventsHtml = monthEvents.map(event => {
            const [month, day] = event.date.split('-');
            return `
                <div class="event-card">
                    <div class="event-date">
                        <span class="day">${day}</span>
                        <span class="month">${months[currentMonth].substring(0, 3)}</span>
                    </div>
                    <div class="event-details">
                        <h4>${event.title}</h4>
                        <p class="event-time">All Day Event</p>
                        <p class="event-location">${event.description}</p>
                    </div>
                    <div class="event-actions">
                        <button class="btn btn-primary btn-sm book-event">Book Now</button>
                        <button class="btn btn-outline btn-sm remind-event">Set Reminder</button>
                    </div>
                </div>
            `;
        }).join('');

        eventsList.innerHTML = eventsHtml || '<p class="no-events">No cultural events scheduled for this month.</p>';

        // Re-attach event listeners
        attachEventListeners();
    }

    function attachEventListeners() {
        const bookBtns = eventsList.querySelectorAll('.book-event');
        const remindBtns = eventsList.querySelectorAll('.remind-event');

        bookBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const eventCard = this.closest('.event-card');
                const eventTitle = eventCard.querySelector('h4').textContent;
                showEventBookingModal(eventTitle);
            });
        });

        remindBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const eventCard = this.closest('.event-card');
                const eventTitle = eventCard.querySelector('h4').textContent;
                showNotification(`Reminder set for "${eventTitle}". You'll be notified before the event.`, 'info');
            });
        });
    }

    prevBtn?.addEventListener('click', function() {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        updateCalendar();
    });

    nextBtn?.addEventListener('click', function() {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        updateCalendar();
    });

    // Initialize
    updateCalendar();
}

// Event Booking Modal
function showEventBookingModal(eventTitle) {
    // Create modal overlay
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'modal-overlay event-booking-modal';
    modalOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.7);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        backdrop-filter: blur(5px);
    `;

    // Create modal content
    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content';
    modalContent.style.cssText = `
        background: var(--bg-primary);
        border-radius: var(--radius-lg);
        padding: var(--spacing-xl);
        max-width: 500px;
        width: 90%;
        max-height: 90vh;
        overflow-y: auto;
        box-shadow: var(--shadow-xl);
        border: 1px solid var(--text-secondary);
    `;

    modalContent.innerHTML = `
        <div class="modal-header">
            <h3 style="margin: 0; color: var(--primary-color);">Book Event: ${eventTitle}</h3>
            <button class="modal-close" style="
                background: none;
                border: none;
                font-size: var(--font-size-xl);
                cursor: pointer;
                color: var(--text-secondary);
                padding: var(--spacing-xs);
                border-radius: var(--radius-sm);
            ">&times;</button>
        </div>
        <form class="event-booking-form" style="margin-top: var(--spacing-lg);">
            <div class="form-group" style="margin-bottom: var(--spacing-md);">
                <label style="display: block; margin-bottom: var(--spacing-xs); font-weight: 500;">Full Name *</label>
                <input type="text" name="name" required style="
                    width: 100%;
                    padding: var(--spacing-sm);
                    border: 1px solid var(--text-secondary);
                    border-radius: var(--radius-md);
                    font-size: var(--font-size-base);
                ">
            </div>
            <div class="form-group" style="margin-bottom: var(--spacing-md);">
                <label style="display: block; margin-bottom: var(--spacing-xs); font-weight: 500;">Email *</label>
                <input type="email" name="email" required style="
                    width: 100%;
                    padding: var(--spacing-sm);
                    border: 1px solid var(--text-secondary);
                    border-radius: var(--radius-md);
                    font-size: var(--font-size-base);
                ">
            </div>
            <div class="form-group" style="margin-bottom: var(--spacing-md);">
                <label style="display: block; margin-bottom: var(--spacing-xs); font-weight: 500;">Phone Number *</label>
                <input type="tel" name="phone" required style="
                    width: 100%;
                    padding: var(--spacing-sm);
                    border: 1px solid var(--text-secondary);
                    border-radius: var(--radius-md);
                    font-size: var(--font-size-base);
                ">
            </div>
            <div class="form-group" style="margin-bottom: var(--spacing-md);">
                <label style="display: block; margin-bottom: var(--spacing-xs); font-weight: 500;">Number of Participants</label>
                <select name="participants" style="
                    width: 100%;
                    padding: var(--spacing-sm);
                    border: 1px solid var(--text-secondary);
                    border-radius: var(--radius-md);
                    font-size: var(--font-size-base);
                ">
                    <option value="1">1 Person</option>
                    <option value="2">2 People</option>
                    <option value="3">3 People</option>
                    <option value="4">4 People</option>
                    <option value="5+">5+ People</option>
                </select>
            </div>
            <div class="form-group" style="margin-bottom: var(--spacing-md);">
                <label style="display: block; margin-bottom: var(--spacing-xs); font-weight: 500;">Special Requirements</label>
                <textarea name="requirements" rows="3" placeholder="Any special dietary requirements, accessibility needs, etc." style="
                    width: 100%;
                    padding: var(--spacing-sm);
                    border: 1px solid var(--text-secondary);
                    border-radius: var(--radius-md);
                    font-size: var(--font-size-base);
                    resize: vertical;
                "></textarea>
            </div>
            <div class="form-actions" style="
                display: flex;
                gap: var(--spacing-md);
                margin-top: var(--spacing-lg);
            ">
                <button type="button" class="btn btn-outline cancel-booking" style="flex: 1;">Cancel</button>
                <button type="submit" class="btn btn-primary submit-booking" style="flex: 1;">Submit Booking</button>
            </div>
        </form>
    `;

    modalOverlay.appendChild(modalContent);
    document.body.appendChild(modalOverlay);

    // Add event listeners
    const closeBtn = modalContent.querySelector('.modal-close');
    const cancelBtn = modalContent.querySelector('.cancel-booking');
    const form = modalContent.querySelector('.event-booking-form');

    const closeModal = () => {
        modalOverlay.remove();
    };

    closeBtn.addEventListener('click', closeModal);
    cancelBtn.addEventListener('click', closeModal);

    // Close on overlay click
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            closeModal();
        }
    });

    // Handle form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const formData = new FormData(form);
        const bookingData = {
            event: eventTitle,
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            participants: formData.get('participants'),
            requirements: formData.get('requirements'),
            timestamp: new Date().toISOString()
        };

        // Here you would typically send the data to a server
        console.log('Event booking submitted:', bookingData);

        // Show success message
        showNotification(`Booking request for "${eventTitle}" has been submitted successfully! We'll contact you within 24 hours with confirmation details.`, 'success');

        closeModal();
    });

    // Focus first input
    setTimeout(() => {
        const firstInput = modalContent.querySelector('input[name="name"]');
        if (firstInput) firstInput.focus();
    }, 100);
}

// Gallery
function initializeGallery() {
    const galleryGrid = document.querySelector('#gallery-grid');
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    if (!galleryGrid) return;
    
    // Sample gallery data (replace with actual data)
    const galleryItems = [
        // Monasteries
        { src: 'images/monasteries/rumtek-monastery.jpg', alt: 'Rumtek Monastery - Seat of Karma Kagyu', category: 'monasteries' },
        { src: 'images/monasteries/pemayangtse-monastery.jpg', alt: 'Pemayangtse Monastery - Perfect Sublime Lotus', category: 'monasteries' },
        { src: 'images/monasteries/enchey-monastery.jpg', alt: 'Enchey Monastery - Solitary Temple', category: 'monasteries' },
        { src: 'images/gallery/monastery-interior.jpg', alt: 'Sacred Monastery Interior', category: 'monasteries' },
        { src: 'images/panoramas/monastery-360-2.jpg', alt: 'Monastery Mountain View', category: 'monasteries' },
        { src: 'images/panoramas/monastery-360-3.jpg', alt: 'Monastery Panoramic View', category: 'monasteries' },
        
        // Landscapes
        { src: 'images/hero/hero-monastery-panorama.jpg', alt: 'Himalayan Monastery Panorama', category: 'landscapes' },
        { src: 'images/Tsomgo-Lake.webp', alt: 'Sacred Tsomgo Lake', category: 'landscapes' },
        { src: 'images/destinations/yumthang-valley.jpg', alt: 'Yumthang Valley of Flowers', category: 'landscapes' },
        { src: 'images/photo-1633323773493-71920ed75215.avif', alt: ' AdNorth Sikkimventure', category: 'landscapes' },
        { src: 'images/packages/3-day-scenic.jpg', alt: 'Scenic Mountain Views', category: 'landscapes' },
        { src: 'images/panoramas/monastery-360-1.jpg', alt: 'Mountain Peak Views', category: 'landscapes' },
        { src: 'images/panoramas/monastery-360-4.jpg', alt: 'Himalayan Range', category: 'landscapes' },
        
        // Culture
        { src: 'images/gallery/prayer-flags.jpg', alt: 'Colorful Prayer Flags', category: 'culture' },
        { src: 'images/gallery/traditional-dance.jpg', alt: 'Traditional Sikkimese Dance', category: 'culture' },
        { src: 'images/destinations/gangtok-market.jpg', alt: 'Local Gangtok Culture', category: 'culture' },
        { src: 'images/packages/5-day-explorer.jpg', alt: 'Cultural Exploration', category: 'culture' },
        { src: 'images/packages/1-day-tour.jpg', alt: 'Local Cultural Experience', category: 'culture' },
        { src: 'images/8th-image-1.jpg', alt: 'Gangtok', category: 'culture' },
        { src: 'images/tsomgo-lake-gangtok.jpeg', alt: 'Gangtok', category: 'culture' }
    ];
    
    function renderGallery(items) {
        galleryGrid.innerHTML = items.map(item => `
            <div class="gallery-item" data-category="${item.category}">
                <img src="${item.src}" alt="${item.alt}" loading="lazy">
                <div class="gallery-overlay">
                    <i class="fas fa-search-plus"></i>
                </div>
            </div>
        `).join('');
        
        // Add click events to gallery items
        galleryGrid.querySelectorAll('.gallery-item').forEach(item => {
            item.addEventListener('click', function() {
                const img = this.querySelector('img');
                showImageModal(img.src, img.alt);
            });
        });
    }
    
    function filterGallery(category) {
        const filteredItems = category === 'all' 
            ? galleryItems 
            : galleryItems.filter(item => item.category === category);
        
        renderGallery(filteredItems);
        
        // Animate items
        setTimeout(() => {
            galleryGrid.querySelectorAll('.gallery-item').forEach((item, index) => {
                setTimeout(() => {
                    item.classList.add('animate-fade-in-up');
                }, index * 50);
            });
        }, 50);
    }
    
    // Filter button events
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const category = this.getAttribute('data-filter');
            filterGallery(category);
        });
    });
    
    // Initialize with all items
    filterGallery('all');
}

function showImageModal(src, alt) {
    // Create or get image modal
    let imageModal = document.querySelector('#image-modal');
    
    if (!imageModal) {
        imageModal = document.createElement('div');
        imageModal.id = 'image-modal';
        imageModal.className = 'modal';
        imageModal.innerHTML = `
            <div class="modal-content image-modal-content">
                <span class="modal-close">&times;</span>
                <img src="" alt="">
                <div class="image-modal-caption"></div>
            </div>
        `;
        document.body.appendChild(imageModal);
    }
    
    const img = imageModal.querySelector('img');
    const caption = imageModal.querySelector('.image-modal-caption');
    const closeBtn = imageModal.querySelector('.modal-close');
    
    img.src = src;
    img.alt = alt;
    caption.textContent = alt;
    
    imageModal.classList.add('active');
    
    // Close events
    closeBtn.addEventListener('click', () => imageModal.classList.remove('active'));
    imageModal.addEventListener('click', function(e) {
        if (e.target === imageModal) {
            imageModal.classList.remove('active');
        }
    });
}

// Search Functionality
function initializeSearch() {
    const searchOverlay = document.querySelector('#search-overlay');
    const searchInput = document.querySelector('#search-input');
    const searchResults = document.querySelector('#search-results');
    const searchClose = document.querySelector('.search-close');
    
    // Search data
    const searchData = [
        { title: 'Gangtok Tour Package', type: 'package', url: '#packages' },
        { title: 'Tsomgo Lake Visit', type: 'destination', url: '#destinations' },
        { title: 'Virtual 360° Tour', type: 'experience', url: '#virtual-tours' },
        { title: 'Rumtek Monastery', type: 'destination', url: '#destinations' },
        { title: 'North Sikkim Adventure', type: 'package', url: '#packages' },
        { title: 'Cultural Events', type: 'event', url: '#events' },
        { title: 'Photo Gallery', type: 'media', url: '#gallery' },
        { title: 'Book Reservation', type: 'service', url: '#reservation' },
        { title: 'Contact Information', type: 'contact', url: '#contact' },
        { title: 'Emergency Numbers', type: 'emergency', url: '.emergency' }
    ];
    
    // Open search with Ctrl+K or Cmd+K
    document.addEventListener('keydown', function(e) {
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            openSearch();
        }
        
        if (e.key === 'Escape' && searchOverlay?.classList.contains('active')) {
            closeSearch();
        }
    });
    
    function openSearch() {
        searchOverlay?.classList.add('active');
        searchInput?.focus();
    }
    
    function closeSearch() {
        searchOverlay?.classList.remove('active');
        if (searchInput) searchInput.value = '';
        if (searchResults) searchResults.innerHTML = '';
    }
    
    searchClose?.addEventListener('click', closeSearch);
    searchOverlay?.addEventListener('click', function(e) {
        if (e.target === searchOverlay) {
            closeSearch();
        }
    });
    
    // Search input handler
    searchInput?.addEventListener('input', function() {
        const query = this.value.toLowerCase();
        
        if (query.length < 2) {
            searchResults.innerHTML = '';
            return;
        }
        
        const filtered = searchData.filter(item => 
            item.title.toLowerCase().includes(query) ||
            item.type.toLowerCase().includes(query)
        );
        
        searchResults.innerHTML = filtered.map(item => `
            <div class="search-result-item" data-url="${item.url}">
                <div class="search-result-title">${highlightMatch(item.title, query)}</div>
                <div class="search-result-type">${item.type}</div>
            </div>
        `).join('');
        
        // Add click events
        searchResults.querySelectorAll('.search-result-item').forEach(item => {
            item.addEventListener('click', function() {
                const url = this.getAttribute('data-url');
                closeSearch();
                
                const target = document.querySelector(url);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
    });
    
    function highlightMatch(text, query) {
        const regex = new RegExp(`(${query})`, 'gi');
        return text.replace(regex, '<mark>$1</mark>');
    }
}

// Emergency Contacts
function initializeEmergencyContacts() {
    const emergencyNumbers = document.querySelectorAll('.emergency-number');
    
    emergencyNumbers.forEach(link => {
        link.addEventListener('click', function(e) {
            // Show confirmation on desktop (phones will handle tel: links automatically)
            if (window.innerWidth > 768) {
                const number = this.textContent.trim();
                if (confirm(`Call ${number}?`)) {
                    // On desktop, this might not work, so show alternative
                    showNotification(`Please dial ${number} on your phone`, 'info');
                    e.preventDefault();
                }
            }
        });
    });
}

// Animations
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll(`
        .price-card, .package-card, .reach-card, .destination-card,
        .contact-card, .emergency-card, .event-card, .official-card
    `);
    
    animateElements.forEach(el => observer.observe(el));
}

// Smooth Scrolling
function initializeSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#') {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
                return;
            }
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Notification System
function showNotification(message, type = 'info') {
    // Create notification container if it doesn't exist
    let container = document.querySelector('.notification-container');
    if (!container) {
        container = document.createElement('div');
        container.className = 'notification-container';
        document.body.appendChild(container);
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${getNotificationIcon(type)}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Add to container
    container.appendChild(notification);
    
    // Animate in
    setTimeout(() => notification.classList.add('show'), 100);
    
    // Auto remove after 5 seconds
    const autoRemove = setTimeout(() => removeNotification(notification), 5000);
    
    // Close button
    notification.querySelector('.notification-close').addEventListener('click', () => {
        clearTimeout(autoRemove);
        removeNotification(notification);
    });
}

function getNotificationIcon(type) {
    const icons = {
        success: 'check-circle',
        error: 'exclamation-circle',
        warning: 'exclamation-triangle',
        info: 'info-circle'
    };
    return icons[type] || 'info-circle';
}

function removeNotification(notification) {
    notification.classList.add('hide');
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
}

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Add CSS for notifications
const notificationStyles = `
.notification-container {
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 10000;
    pointer-events: none;
}

.notification {
    background: var(--bg-primary);
    border-radius: var(--radius-md);
    box-shadow: var(--shadow-xl);
    margin-bottom: var(--spacing-md);
    padding: var(--spacing-md);
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-width: 300px;
    max-width: 400px;
    transform: translateX(100%);
    opacity: 0;
    transition: all 0.3s ease;
    pointer-events: auto;
    border-left: 4px solid var(--primary-color);
}

.notification.notification-success {
    border-left-color: var(--success-color);
}

.notification.notification-error {
    border-left-color: var(--danger-color);
}

.notification.notification-warning {
    border-left-color: var(--warning-color);
}

.notification.show {
    transform: translateX(0);
    opacity: 1;
}

.notification.hide {
    transform: translateX(100%);
    opacity: 0;
}

.notification-content {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
    flex: 1;
}

.notification-content i {
    font-size: var(--font-size-lg);
    color: var(--primary-color);
}

.notification-success .notification-content i {
    color: var(--success-color);
}

.notification-error .notification-content i {
    color: var(--danger-color);
}

.notification-warning .notification-content i {
    color: var(--warning-color);
}

.notification-close {
    background: none;
    border: none;
    color: var(--text-secondary);
    cursor: pointer;
    padding: var(--spacing-xs);
    border-radius: var(--radius-sm);
    transition: background var(--transition-fast);
}

.notification-close:hover {
    background: var(--bg-secondary);
}

.search-result-item {
    padding: var(--spacing-md);
    cursor: pointer;
    border-bottom: 1px solid var(--bg-secondary);
    transition: background var(--transition-fast);
}

.search-result-item:hover {
    background: var(--bg-secondary);
}

.search-result-title {
    font-weight: 500;
    color: var(--text-primary);
}

.search-result-type {
    font-size: var(--font-size-sm);
    color: var(--text-secondary);
    text-transform: capitalize;
}

.search-result-item mark {
    background: var(--primary-color);
    color: var(--white);
    padding: 2px 4px;
    border-radius: 2px;
}

.destination-detail-image {
    width: 100%;
    height: 300px;
    object-fit: cover;
    border-radius: var(--radius-lg) var(--radius-lg) 0 0;
}

.destination-detail-content {
    padding: var(--spacing-xl);
}

.destination-detail h2 {
    font-size: var(--font-size-2xl);
    color: var(--text-primary);
    margin-bottom: var(--spacing-md);
}

.destination-story {
    font-style: italic;
    color: var(--text-secondary);
    margin-bottom: var(--spacing-lg);
    border-left: 4px solid var(--primary-color);
    padding-left: var(--spacing-md);
}

.destination-description {
    color: var(--text-primary);
    margin-bottom: var(--spacing-lg);
    line-height: 1.7;
}

.destination-highlights h3 {
    color: var(--text-primary);
    margin-bottom: var(--spacing-md);
}

.destination-highlights ul {
    list-style: none;
    padding: 0;
    margin-bottom: var(--spacing-xl);
}

.destination-highlights li {
    padding: var(--spacing-xs) 0;
    color: var(--text-secondary);
    position: relative;
    padding-left: var(--spacing-lg);
}

.destination-highlights li::before {
    content: '✓';
    color: var(--success-color);
    font-weight: bold;
    position: absolute;
    left: 0;
}

.destination-actions {
    display: flex;
    gap: var(--spacing-md);
    flex-wrap: wrap;
}

.image-modal-content {
    max-width: 90vw;
    max-height: 90vh;
    padding: 0;
}

.image-modal-content img {
    width: 100%;
    height: auto;
    max-height: 80vh;
    object-fit: contain;
}

.image-modal-caption {
    padding: var(--spacing-md);
    text-align: center;
    color: var(--text-primary);
    font-weight: 500;
}

.reservation.highlight {
    animation: highlight 2s ease-in-out;
}

@keyframes highlight {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.02); box-shadow: 0 0 20px rgba(212, 165, 116, 0.3); }
}

@media (max-width: 768px) {
    .notification-container {
        left: 10px;
        right: 10px;
        top: 10px;
    }
    
    .notification {
        min-width: auto;
        max-width: none;
    }
    
    .destination-actions {
        flex-direction: column;
    }
    
    .destination-actions .btn {
        text-align: center;
    }
}
`;

// Add styles to head
const styleSheet = document.createElement('style');
styleSheet.textContent = notificationStyles;
document.head.appendChild(styleSheet);