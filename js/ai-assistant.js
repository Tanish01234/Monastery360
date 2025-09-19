// AI Assistant for Monastery360 Tourism Website

class SikkimTourismAssistant {
    constructor() {
        this.isOpen = false;
        this.conversationHistory = [];
        this.isTyping = false;
        this.knowledgeBase = this.initializeKnowledgeBase();
        this.currentLanguage = 'en';
        this.quickReplies = this.initializeQuickReplies();
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.loadConversationHistory();
        console.log('Sikkim Tourism AI Assistant initialized');
    }
    
    initializeKnowledgeBase() {
        return {
            packages: {
                keywords: ['package', 'tour', 'trip', 'booking', 'price', 'cost', 'itinerary'],
                response: "We offer 4 tour packages:\n\n1️⃣ **1-Day Quick Tour** - ₹2,000/person\n   • Gangtok local + Tsomgo Lake\n\n2️⃣ **3-Day Scenic Trip** - ₹6,000/person\n   • Gangtok + Tsomgo + Pelling/Ravangla\n\n3️⃣ **5-Day Explorer Trip** - ₹12,000/person\n   • Complete cultural experience\n\n4️⃣ **7-Day Adventure Trip** - ₹20,000/person\n   • Full North Sikkim expedition\n\nWould you like details about any specific package?"
            },
            permits: {
                keywords: ['permit', 'permission', 'documents', 'entry', 'nathula', 'gurudongmar', 'foreign', 'tourist'],
                response: "📋 **Permit Requirements:**\n\n🇮🇳 **For Indian Tourists:**\n• No permits needed for most areas\n• Special permits required for:\n  - Nathula Pass\n  - Gurudongmar Lake\n  - Protected areas in North Sikkim\n\n🌍 **For Foreign Tourists:**\n• Protected Area Permit (PAP) required\n• Restricted Area Permit (RAP) for certain areas\n• Apply through registered tour operators\n\n💡 We can help arrange all permits for you!"
            },
            weather: {
                keywords: ['weather', 'climate', 'temperature', 'season', 'best time', 'when to visit'],
                response: "🌤️ **Best Time to Visit Sikkim:**\n\n🌸 **March-June:** Pleasant weather (15-25°C)\n• Perfect for sightseeing\n• Clear mountain views\n• Rhododendrons in bloom\n\n🍂 **September-November:** Post-monsoon clarity\n• Excellent visibility\n• Comfortable temperatures\n• Festival season\n\n❄️ **December-February:** Cold but clear\n• Snow in higher altitudes\n• Perfect for winter sports\n\n🌧️ **July-August:** Monsoon season\n• Heavy rainfall, landslides possible\n• Not recommended for travel"
            },
            destinations: {
                keywords: ['place', 'destination', 'visit', 'see', 'gangtok', 'pelling', 'tsomgo', 'lake', 'monastery'],
                response: "🏔️ **Top Destinations in Sikkim:**\n\n🏙️ **Gangtok** - Capital city with monasteries\n🏔️ **Tsomgo Lake** - Sacred glacial lake at 12,400ft\n🏛️ **Pelling** - Spectacular Kanchenjunga views\n🌸 **Ravangla** - Buddha Park and peaceful environment\n🏔️ **North Sikkim** - Lachen, Lachung, Yumthang Valley\n🌺 **Varsey** - Rhododendron sanctuary\n\nWhich destination interests you most? I can provide detailed information!"
            },
            transport: {
                keywords: ['how to reach', 'transport', 'flight', 'train', 'bus', 'airport', 'railway'],
                response: "🚗 **How to Reach Sikkim:**\n\n✈️ **By Air:**\n• Bagdogra Airport (124km) - Major flights\n• Pakyong Airport (33km) - Limited flights\n\n🚂 **By Train:**\n• New Jalpaiguri (148km)\n• Siliguri (114km)\n\n🚌 **By Road:**\n• Well connected from Siliguri\n• Regular bus services\n• Shared taxis available\n\n🚕 We can arrange airport/railway pickup for your convenience!"
            },
            accommodation: {
                keywords: ['hotel', 'stay', 'accommodation', 'lodge', 'guesthouse', 'booking'],
                response: "🏨 **Accommodation Options:**\n\n⭐ **Luxury Hotels** - 5-star comfort with mountain views\n🏛️ **Heritage Hotels** - Traditional Sikkimese architecture\n🏠 **Homestays** - Authentic local experience\n🧗 **Budget Hotels** - Clean and comfortable\n⛺ **Eco Lodges** - Sustainable tourism options\n\nAll our packages include carefully selected accommodations. Would you like recommendations for a specific area?"
            },
            food: {
                keywords: ['food', 'cuisine', 'eat', 'restaurant', 'local food', 'momo', 'thukpa'],
                response: "🍜 **Sikkimese Cuisine:**\n\n🥟 **Must-Try Dishes:**\n• Momos - Steamed dumplings\n• Thukpa - Noodle soup\n• Gundruk - Fermented leafy vegetable\n• Sel Roti - Traditional ring-shaped bread\n• Chhurpi - Dried yak cheese\n\n🍺 **Local Drinks:**\n• Tongba - Millet beer\n• Chang - Barley beer\n• Butter tea - Salted tea\n\n🌿 Most restaurants serve vegetarian and non-vegetarian options!"
            },
            festivals: {
                keywords: ['festival', 'event', 'culture', 'celebration', 'losar', 'saga dawa'],
                response: "🎉 **Major Festivals in Sikkim:**\n\n🎊 **Losar** (Feb/Mar) - Tibetan New Year\n🕉️ **Saga Dawa** (May/Jun) - Buddha's enlightenment\n🎭 **Pang Lhabsol** (Aug/Sep) - Guardian deity festival\n🌸 **Drupka Teshi** (Jul/Aug) - First sermon of Buddha\n🏮 **Diwali** (Oct/Nov) - Festival of lights\n🎄 **Christmas** (Dec) - Celebrated by Christian community\n\nVisiting during festivals offers unique cultural experiences!"
            },
            monasteries: {
                keywords: ['monastery', 'temple', 'buddhist', 'rumtek', 'enchey', 'pemayangste'],
                response: "🏛️ **Famous Monasteries:**\n\n⛩️ **Rumtek Monastery** - Seat of Karma Kagyu\n🏛️ **Enchey Monastery** - 200-year-old sacred site\n🕉️ **Pemayangtse Monastery** - Ancient Nyingma monastery\n🏔️ **Tashiding Monastery** - Most sacred in Sikkim\n⛩️ **Dubdi Monastery** - Oldest monastery (1701)\n🏛️ **Sang Choeling** - Second oldest monastery\n\nOur virtual 360° tour lets you explore these sacred spaces!"
            },
            safety: {
                keywords: ['safety', 'secure', 'dangerous', 'crime', 'emergency', 'hospital'],
                response: "🛡️ **Safety in Sikkim:**\n\n✅ **Very Safe Destination:**\n• Low crime rates\n• Friendly local people\n• Well-developed tourism infrastructure\n• Good medical facilities\n\n🚨 **Emergency Numbers:**\n• Police: 100\n• Medical: 102\n• Tourist Helpline: +91 9832456789\n• Our 24/7 Support: 7984224248\n\n⚠️ **Precautions:**\n• Carry altitude sickness medication\n• Stay hydrated at high altitudes\n• Follow weather advisories"
            },
            altitude: {
                keywords: ['altitude', 'height', 'mountain', 'sickness', 'oxygen', 'breathe'],
                response: "🏔️ **Altitude Information:**\n\n📊 **Key Altitudes:**\n• Gangtok: 1,650m (5,410ft)\n• Tsomgo Lake: 3,753m (12,313ft)\n• Nathula Pass: 4,310m (14,140ft)\n• Gurudongmar Lake: 5,430m (17,800ft)\n\n⚕️ **Altitude Sickness Prevention:**\n• Gradual acclimatization\n• Stay hydrated\n• Avoid alcohol\n• Take rest breaks\n• Carry basic medication\n\n💡 Our guides are trained in altitude sickness management!"
            }
        };
    }
    
    initializeQuickReplies() {
        return [
            { text: "Tour Packages", action: "packages" },
            { text: "Best Time to Visit", action: "weather" },
            { text: "Permit Requirements", action: "permits" },
            { text: "Top Destinations", action: "destinations" },
            { text: "Book Now", action: "booking" },
            { text: "Emergency Help", action: "emergency" }
        ];
    }
    
    setupEventListeners() {
        const chatToggle = document.getElementById('chat-toggle');
        const chatClose = document.getElementById('chat-close');
        const chatInput = document.getElementById('chat-input');
        const sendButton = document.getElementById('send-message');

        if (chatToggle) {
            chatToggle.addEventListener('click', () => this.toggleChat());
        }

        if (chatClose) {
            chatClose.addEventListener('click', () => this.closeChat());
        }

        // Add clear history button
        this.addClearHistoryButton();
        
        if (chatInput) {
            chatInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    this.sendMessage();
                }
            });
            
            chatInput.addEventListener('input', () => {
                this.handleTyping();
            });
        }
        
        if (sendButton) {
            sendButton.addEventListener('click', () => this.sendMessage());
        }
        
        // Add quick reply buttons after initial message
        setTimeout(() => {
            this.showQuickReplies();
        }, 2000);
    }

    addClearHistoryButton() {
        const chatHeader = document.querySelector('.chat-header');
        if (!chatHeader) return;

        // Create clear history button
        const clearBtn = document.createElement('button');
        clearBtn.className = 'chat-clear-history';
        clearBtn.innerHTML = '<i class="fas fa-trash-alt"></i>';
        clearBtn.title = 'Clear Chat History';
        clearBtn.style.cssText = `
            background: none;
            border: none;
            color: var(--white);
            cursor: pointer;
            font-size: var(--font-size-base);
            padding: var(--spacing-xs);
            border-radius: var(--radius-sm);
            transition: all var(--transition-fast);
            margin-right: var(--spacing-sm);
        `;

        clearBtn.addEventListener('mouseenter', () => {
            clearBtn.style.background = 'rgba(255, 255, 255, 0.2)';
        });

        clearBtn.addEventListener('mouseleave', () => {
            clearBtn.style.background = 'none';
        });

        clearBtn.addEventListener('click', () => {
            if (confirm('Are you sure you want to clear all chat history? This action cannot be undone.')) {
                this.clearHistory();
                showNotification('Chat history cleared successfully!', 'success');
            }
        });

        // Insert before the close button
        const closeBtn = chatHeader.querySelector('.chat-close');
        if (closeBtn) {
            chatHeader.insertBefore(clearBtn, closeBtn);
        } else {
            chatHeader.appendChild(clearBtn);
        }
    }
    
    toggleChat() {
        const chatWindow = document.getElementById('chat-window');
        if (chatWindow) {
            this.isOpen = !this.isOpen;
            chatWindow.classList.toggle('active', this.isOpen);
            
            if (this.isOpen) {
                const chatInput = document.getElementById('chat-input');
                if (chatInput) {
                    setTimeout(() => chatInput.focus(), 300);
                }
                
                // Show welcome message if first time
                if (this.conversationHistory.length === 1) {
                    setTimeout(() => {
                        this.addBotMessage("🙏🏻 Namaste! I'm here to help you plan your perfect Sikkim adventure. What would you like to know?");
                        this.showQuickReplies();
                    }, 500);
                }
            }
        }
    }
    
    closeChat() {
        const chatWindow = document.getElementById('chat-window');
        if (chatWindow) {
            this.isOpen = false;
            chatWindow.classList.remove('active');
        }
    }
    
    sendMessage() {
        const chatInput = document.getElementById('chat-input');
        if (!chatInput) return;
        
        const message = chatInput.value.trim();
        if (!message) return;
        
        // Add user message
        this.addUserMessage(message);
        chatInput.value = '';
        
        // Process and respond
        setTimeout(() => {
            this.processMessage(message);
        }, 500);
    }
    
    addUserMessage(message) {
        const messagesContainer = document.getElementById('chat-messages');
        if (!messagesContainer) return;
        
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message user-message';
        messageDiv.innerHTML = `
            <div class="message-content">
                <p>${this.escapeHtml(message)}</p>
                <div class="message-time">${this.getCurrentTime()}</div>
            </div>
        `;
        
        messagesContainer.appendChild(messageDiv);
        this.scrollToBottom();
        
        // Save to conversation history
        this.conversationHistory.push({
            type: 'user',
            message: message,
            timestamp: new Date().toISOString()
        });
    }
    
    addBotMessage(message, isTyping = false) {
        const messagesContainer = document.getElementById('chat-messages');
        if (!messagesContainer) return;
        
        if (isTyping) {
            this.showTypingIndicator();
            setTimeout(() => {
                this.hideTypingIndicator();
                this.addActualBotMessage(message);
            }, 1000 + Math.random() * 1000);
        } else {
            this.addActualBotMessage(message);
        }
    }
    
    addActualBotMessage(message) {
        const messagesContainer = document.getElementById('chat-messages');
        if (!messagesContainer) return;
        
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message bot-message';
        messageDiv.innerHTML = `
            <div class="message-avatar">
                <i class="fas fa-robot"></i>
            </div>
            <div class="message-content">
                <div class="message-text">${this.formatMessage(message)}</div>
                <div class="message-time">${this.getCurrentTime()}</div>
            </div>
        `;
        
        messagesContainer.appendChild(messageDiv);
        this.scrollToBottom();
        
        // Save to conversation history
        this.conversationHistory.push({
            type: 'bot',
            message: message,
            timestamp: new Date().toISOString()
        });
        
        this.saveConversationHistory();
    }
    
    showTypingIndicator() {
        const messagesContainer = document.getElementById('chat-messages');
        if (!messagesContainer) return;
        
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message bot-message typing-indicator';
        typingDiv.id = 'typing-indicator';
        typingDiv.innerHTML = `
            <div class="message-avatar">
                <i class="fas fa-robot"></i>
            </div>
            <div class="message-content">
                <div class="typing-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        `;
        
        messagesContainer.appendChild(typingDiv);
        this.scrollToBottom();
    }
    
    hideTypingIndicator() {
        const typingIndicator = document.getElementById('typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }
    
    showQuickReplies() {
        const messagesContainer = document.getElementById('chat-messages');
        if (!messagesContainer) return;
        
        // Remove existing quick replies
        const existingReplies = messagesContainer.querySelector('.quick-replies');
        if (existingReplies) {
            existingReplies.remove();
        }
        
        const quickRepliesDiv = document.createElement('div');
        quickRepliesDiv.className = 'message bot-message quick-replies';
        quickRepliesDiv.innerHTML = `
            <div class="message-avatar">
                <i class="fas fa-robot"></i>
            </div>
            <div class="message-content">
                <div class="quick-reply-buttons">
                    ${this.quickReplies.map(reply => 
                        `<button class="quick-reply-btn" data-action="${reply.action}">${reply.text}</button>`
                    ).join('')}
                </div>
            </div>
        `;
        
        messagesContainer.appendChild(quickRepliesDiv);
        this.scrollToBottom();
        
        // Add event listeners to quick reply buttons
        quickRepliesDiv.querySelectorAll('.quick-reply-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const action = e.target.getAttribute('data-action');
                this.handleQuickReply(action);
                quickRepliesDiv.remove(); // Remove quick replies after selection
            });
        });
    }
    
    handleQuickReply(action) {
        const actionMap = {
            packages: "Tell me about tour packages",
            weather: "When is the best time to visit?",
            permits: "What permits do I need?",
            destinations: "What are the top destinations?",
            booking: "I want to book a tour",
            emergency: "Emergency contact information"
        };
        
        const message = actionMap[action] || action;
        this.addUserMessage(message);
        
        setTimeout(() => {
            this.processMessage(message);
        }, 500);
    }
    
    processMessage(message) {
        const lowerMessage = message.toLowerCase();
        
        // Check for booking intent
        if (this.isBookingIntent(lowerMessage)) {
            this.handleBookingRequest();
            return;
        }
        
        // Check for emergency intent
        if (this.isEmergencyIntent(lowerMessage)) {
            this.handleEmergencyRequest();
            return;
        }
        
        // Search knowledge base
        let bestMatch = null;
        let bestScore = 0;
        
        for (const [category, data] of Object.entries(this.knowledgeBase)) {
            const score = this.calculateMatchScore(lowerMessage, data.keywords);
            if (score > bestScore) {
                bestScore = score;
                bestMatch = data;
            }
        }
        
        if (bestMatch && bestScore > 0) {
            this.addBotMessage(bestMatch.response, true);
        } else {
            this.handleUnknownQuery(message);
        }
    }
    
    isBookingIntent(message) {
        const bookingKeywords = ['book', 'reserve', 'booking', 'reservation', 'want to book', 'plan trip'];
        return bookingKeywords.some(keyword => message.includes(keyword));
    }
    
    isEmergencyIntent(message) {
        const emergencyKeywords = ['emergency', 'help', 'urgent', 'contact', 'phone', 'call'];
        return emergencyKeywords.some(keyword => message.includes(keyword));
    }
    
    handleBookingRequest() {
        const response = `🎯 **Ready to Book Your Sikkim Adventure?**\n\nGreat choice! Here's how to proceed:\n\n📋 **Quick Booking Steps:**\n1️⃣ Choose your preferred package\n2️⃣ Select travel dates\n3️⃣ Fill the reservation form\n4️⃣ Get instant confirmation\n\n🔗 I'll redirect you to our booking form in a moment...\n\n📞 **Direct Contact:**\n• Phone: 7984224248\n• Email: tanishbedia123@gmail.com\n• 24×7 Support Available`;
        
        this.addBotMessage(response, true);
        
        // Redirect to booking form after a delay
        setTimeout(() => {
            this.addBotMessage("🚀 Redirecting you to our reservation form...");
            setTimeout(() => {
                const reservationSection = document.querySelector('#reservation');
                if (reservationSection) {
                    this.closeChat();
                    reservationSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    
                    // Highlight the form
                    reservationSection.classList.add('highlight');
                    setTimeout(() => {
                        reservationSection.classList.remove('highlight');
                    }, 3000);
                }
            }, 2000);
        }, 3000);
    }
    
    handleEmergencyRequest() {
        const response = `🚨 **Emergency Contacts - Available 24/7**\n\n📞 **Immediate Help:**\n• Tourist Helpline: **7984224248**\n• Police Emergency: **100**\n• Medical Emergency: **102**\n• Fire Emergency: **101**\n\n🏥 **Tourism Officials:**\n• Tourism Director: +91 9434589123\n• Tourist Assistance: +91 9832456789\n• North Sikkim Coordinator: +91 9734567890\n\n📍 **Our Office:**\nTourism Department, Paryatan Bhawan\nTadong, Gangtok, Sikkim - 737102\n\nℹ️ For non-emergency queries, I'm here to help!`;
        
        this.addBotMessage(response, true);
    }
    
    calculateMatchScore(message, keywords) {
        let score = 0;
        keywords.forEach(keyword => {
            if (message.includes(keyword.toLowerCase())) {
                score += keyword.length; // Longer keywords get higher scores
            }
        });
        return score;
    }
    
    handleUnknownQuery(message) {
        const responses = [
            "🤔 I'm not sure about that specific question. Could you try rephrasing it or ask about:\n\n• Tour packages and pricing\n• Best time to visit Sikkim\n• Permit requirements\n• Popular destinations\n• How to reach Sikkim",
            "💡 I'd love to help! I specialize in Sikkim tourism. Try asking me about:\n\n• Monasteries and culture\n• Weather and seasons\n• Travel permits\n• Accommodation options\n• Local cuisine",
            "🙋‍♂️ That's an interesting question! While I focus on Sikkim tourism, I can help you with:\n\n• Planning your itinerary\n• Booking assistance\n• Travel tips\n• Local information\n• Safety guidelines"
        ];
        
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        this.addBotMessage(randomResponse, true);
        
        // Show quick replies again
        setTimeout(() => {
            this.showQuickReplies();
        }, 2000);
    }
    
    formatMessage(message) {
        // Convert markdown-like formatting to HTML
        return message
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/\n/g, '<br>')
            .replace(/• /g, '&bull; ');
    }
    
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
    
    getCurrentTime() {
        return new Date().toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: true 
        });
    }
    
    scrollToBottom() {
        const messagesContainer = document.getElementById('chat-messages');
        if (messagesContainer) {
            setTimeout(() => {
                messagesContainer.scrollTop = messagesContainer.scrollHeight;
            }, 100);
        }
    }
    
    handleTyping() {
        // Show that user is typing (could be used for analytics)
        clearTimeout(this.typingTimeout);
        this.typingTimeout = setTimeout(() => {
            // User stopped typing
        }, 1000);
    }
    
    saveConversationHistory() {
        try {
            localStorage.setItem('sikkimChatHistory', JSON.stringify(this.conversationHistory));
        } catch (e) {
            console.warn('Could not save conversation history:', e);
        }
    }
    
    loadConversationHistory() {
        // Clear any existing chat history on page load/refresh
        localStorage.removeItem('sikkimChatHistory');

        // Always start with fresh conversation
        this.conversationHistory = [{
            type: 'bot',
            message: "🙏 Namaste! I'm your Sikkim Tourism Assistant. I can help you with permits, packages, destinations, and travel planning. How can I assist you today?",
            timestamp: new Date().toISOString()
        }];
        this.saveConversationHistory();
    }
    
    restoreConversation() {
        const messagesContainer = document.getElementById('chat-messages');
        if (!messagesContainer) return;
        
        // Clear existing messages except the initial one
        const messages = messagesContainer.querySelectorAll('.message');
        messages.forEach(msg => {
            if (!msg.classList.contains('bot-message') || !msg.innerHTML.includes('Hello! I\'m your Sikkim tourism assistant')) {
                msg.remove();
            }
        });
        
        // Restore conversation (limit to last 10 messages to avoid clutter)
        const recentHistory = this.conversationHistory.slice(-10);
        
        recentHistory.forEach(entry => {
            if (entry.type === 'user') {
                this.addUserMessage(entry.message);
            } else {
                this.addActualBotMessage(entry.message);
            }
        });
    }
    
    clearHistory() {
        this.conversationHistory = [{
            type: 'bot',
            message: "🙏 Namaste! I'm your Sikkim Tourism Assistant. I can help you with permits, packages, destinations, and travel planning. How can I assist you today?",
            timestamp: new Date().toISOString()
        }];
        
        this.saveConversationHistory();
        
        const messagesContainer = document.getElementById('chat-messages');
        if (messagesContainer) {
            messagesContainer.innerHTML = `
                <div class="message bot-message">
                    <div class="message-content">
                        <p>🙏🏻 Namaste! I'm your Sikkim tourism assistant. I can help you with:</p>
                        <ul>
                            <li>Tourism permits and requirements</li>
                            <li>Weather and best travel times</li>
                            <li>Route suggestions and directions</li>
                            <li>Package recommendations</li>
                            <li>Cultural events and festivals</li>
                        </ul>
                        <p>What would you like to know?</p>
                    </div>
                </div>
            `;
        }
        
        setTimeout(() => {
            this.showQuickReplies();
        }, 1000);
    }
    
    // Method to add feedback functionality
    addMessageFeedback(messageElement) {
        const feedbackDiv = document.createElement('div');
        feedbackDiv.className = 'message-feedback';
        feedbackDiv.innerHTML = `
            <span>Was this helpful?</span>
            <button class="feedback-btn positive" title="Helpful">
                <i class="fas fa-thumbs-up"></i>
            </button>
            <button class="feedback-btn negative" title="Not helpful">
                <i class="fas fa-thumbs-down"></i>
            </button>
        `;
        
        messageElement.appendChild(feedbackDiv);
        
        // Add event listeners
        feedbackDiv.querySelectorAll('.feedback-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const isPositive = e.currentTarget.classList.contains('positive');
                this.handleFeedback(isPositive);
                feedbackDiv.style.opacity = '0.5';
                feedbackDiv.style.pointerEvents = 'none';
            });
        });
    }
    
    handleFeedback(isPositive) {
        // In a real implementation, this would send feedback to analytics
        console.log('Feedback received:', isPositive ? 'positive' : 'negative');
        
        const response = isPositive 
            ? "Thank you for the feedback! 😊" 
            : "Sorry about that. Let me know if you need more help! 🤔";
        
        setTimeout(() => {
            this.addBotMessage(response);
        }, 1000);
    }
}

// Add CSS for AI Assistant enhancements
const assistantStyles = `
<style id="ai-assistant-styles">
    .message {
        margin-bottom: var(--spacing-md);
        animation: fadeInUp 0.3s ease;
    }
    
    .bot-message {
        display: flex;
        align-items: flex-start;
        gap: var(--spacing-sm);
    }
    
    .message-avatar {
        width: 30px;
        height: 30px;
        background: var(--primary-color);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: var(--font-size-sm);
        flex-shrink: 0;
    }
    
    .message-content {
        flex: 1;
        background: var(--bg-secondary);
        padding: var(--spacing-sm) var(--spacing-md);
        border-radius: var(--radius-md);
        position: relative;
    }
    
    .user-message .message-content {
        background: var(--primary-color);
        color: white;
        margin-left: auto;
        max-width: 70%;
        border-radius: var(--radius-md) var(--radius-md) var(--radius-sm) var(--radius-md);
    }
    
    .bot-message .message-content {
        border-radius: var(--radius-md) var(--radius-md) var(--radius-md) var(--radius-sm);
    }
    
    .message-text {
        line-height: 1.5;
    }
    
    .message-time {
        font-size: var(--font-size-xs);
        opacity: 0.7;
        margin-top: var(--spacing-xs);
    }
    
    .typing-indicator .typing-dots {
        display: flex;
        gap: 4px;
        padding: var(--spacing-sm);
    }
    
    .typing-dots span {
        width: 8px;
        height: 8px;
        background: var(--text-secondary);
        border-radius: 50%;
        animation: typing 1.4s infinite;
    }
    
    .typing-dots span:nth-child(2) {
        animation-delay: 0.2s;
    }
    
    .typing-dots span:nth-child(3) {
        animation-delay: 0.4s;
    }
    
    @keyframes typing {
        0%, 60%, 100% {
            transform: translateY(0);
            opacity: 0.4;
        }
        30% {
            transform: translateY(-10px);
            opacity: 1;
        }
    }
    
    .quick-reply-buttons {
        display: flex;
        flex-wrap: wrap;
        gap: var(--spacing-xs);
        margin-top: var(--spacing-sm);
    }
    
    .quick-reply-btn {
        background: var(--primary-color);
        color: white;
        border: none;
        padding: var(--spacing-xs) var(--spacing-sm);
        border-radius: var(--radius-xl);
        font-size: var(--font-size-xs);
        cursor: pointer;
        transition: all var(--transition-fast);
        white-space: nowrap;
    }
    
    .quick-reply-btn:hover {
        background: var(--primary-dark);
        transform: translateY(-1px);
    }
    
    .message-feedback {
        display: flex;
        align-items: center;
        gap: var(--spacing-sm);
        margin-top: var(--spacing-sm);
        font-size: var(--font-size-xs);
        color: var(--text-secondary);
    }
    
    .feedback-btn {
        background: none;
        border: none;
        color: var(--text-secondary);
        cursor: pointer;
        padding: var(--spacing-xs);
        border-radius: var(--radius-sm);
        transition: all var(--transition-fast);
    }
    
    .feedback-btn:hover {
        color: var(--primary-color);
        background: var(--bg-secondary);
    }
    
    .feedback-btn.positive:hover {
        color: var(--success-color);
    }
    
    .feedback-btn.negative:hover {
        color: var(--danger-color);
    }
    
    /* Enhanced chat window */
    .chat-window {
        box-shadow: var(--shadow-xl);
        border: 1px solid rgba(0,0,0,0.1);
    }
    
    .chat-header {
        background: var(--gradient-primary);
        border-bottom: 1px solid rgba(255,255,255,0.2);
    }
    
    .chat-messages::-webkit-scrollbar {
        width: 4px;
    }
    
    .chat-messages::-webkit-scrollbar-thumb {
        background: var(--primary-color);
        border-radius: 2px;
    }
    
    /* Dark theme adjustments */
    [data-theme="dark"] .message-content {
        background: var(--bg-dark);
        border: 1px solid var(--text-secondary);
    }
    
    [data-theme="dark"] .user-message .message-content {
        background: var(--primary-color);
        border: none;
    }
    
    @media (max-width: 768px) {
        .quick-reply-buttons {
            flex-direction: column;
        }
        
        .quick-reply-btn {
            text-align: left;
            justify-content: flex-start;
        }
        
        .user-message .message-content {
            max-width: 85%;
        }
    }
</style>
`;

// Initialize AI Assistant when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Add enhanced styles
    document.head.insertAdjacentHTML('beforeend', assistantStyles);
    
    // Initialize the AI Assistant
    window.sikkimAssistant = new SikkimTourismAssistant();
    
    console.log('Sikkim Tourism AI Assistant ready');
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SikkimTourismAssistant;
}