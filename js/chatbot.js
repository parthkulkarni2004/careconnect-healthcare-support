// ===========================
// CHATBOT.JS - FAQ Assistant
// ===========================

// FAQ Knowledge Base
const faqKnowledgeBase = [
    {
        keywords: ['volunteer', 'register', 'join', 'sign up', 'become volunteer', 'how to volunteer'],
        response: 'To volunteer with CareConnect, please visit our Volunteer page and fill out the registration form with your name, email, phone number, area of expertise, and availability. Our team will review your application and contact you within 2-3 business days.'
    },
    {
        keywords: ['services', 'support', 'available', 'what services', 'help'],
        response: 'We provide several healthcare support services including: Medical Assistance, Blood Donation Support, Counseling, Medicine Support, and Emergency Support. You can request any of these services through our Support Request page.'
    },
    {
        keywords: ['free', 'cost', 'paid', 'price', 'payment', 'registration free'],
        response: 'Yes! All services on CareConnect are completely free for both patients and volunteers. We are a non-profit organization dedicated to providing accessible healthcare support to everyone in need.'
    },
    {
        keywords: ['request', 'submit', 'assistance', 'how to request', 'get support'],
        response: 'To request healthcare assistance, visit our "Get Support" page and fill out the support request form with your details and healthcare needs. Select the type of support you need and provide a description of your situation. Our team will review your request and connect you with a suitable volunteer.'
    },
    {
        keywords: ['how long', 'time', 'days', 'when', 'how many days', 'response time'],
        response: 'Our goal is to connect patients with volunteers quickly. Typically, you can expect to be contacted within 24-48 hours after submitting your support request. Volunteer registrations are reviewed within 2-3 business days.'
    },
    {
        keywords: ['experience', 'qualification', 'background', 'without experience'],
        response: 'You can register as a volunteer without prior experience! We welcome passionate individuals from all backgrounds. What matters most is your willingness to learn and help others. We provide comprehensive orientation and training specific to your volunteer role.'
    },
    {
        keywords: ['blood', 'donate', 'donation', 'blood donation'],
        response: 'We provide Blood Donation Support services to help patients find blood donors and facilitate the donation process. You can request blood donation assistance through our Support Request page by selecting "Blood Donation" as the support type.'
    },
    {
        keywords: ['contact', 'reach', 'email', 'phone', 'message'],
        response: 'You can reach us at support@careconnect.org or call +91-XXXX-XXXXXX. You can also visit our FAQ page or use this chat assistant for immediate help.'
    },
    {
        keywords: ['hours', 'availability', 'working hours', 'schedule', 'open'],
        response: 'CareConnect operates 24/7 through our online platform. You can submit support requests and volunteer registrations anytime. Our team responds to inquiries during business hours.'
    },
    {
        keywords: ['privacy', 'security', 'confidential', 'data', 'safe'],
        response: 'Your privacy and data security are our top priorities. All personal information is kept confidential and used only for connecting you with appropriate volunteers or for support purposes. We follow strict data protection guidelines.'
    },
    {
        keywords: ['training', 'onboarding', 'learn', 'workshop'],
        response: 'We provide comprehensive training for all volunteers before they start assisting patients. Training includes orientation about our platform, communication guidelines, and role-specific training based on your area of expertise.'
    },
    {
        keywords: ['counseling', 'mental health', 'support'],
        response: 'We offer counseling support through trained volunteers. You can request counseling assistance through our Support Request page by selecting "Counseling" as the support type.'
    }
];

// Get chat elements
const chatForm = document.getElementById('chatForm');
const userInput = document.getElementById('userInput');
const chatHistory = document.getElementById('chatHistory');
const clearChatBtn = document.getElementById('clearChat');

// Send message function
chatForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const message = userInput.value.trim();

    if (message) {
        // Add user message to chat
        addUserMessage(message);

        // Get bot response
        const response = getBotResponse(message);

        // Add bot response to chat with delay
        setTimeout(() => {
            addBotMessage(response);
        }, 300);

        // Clear input
        userInput.value = '';
        userInput.focus();
    }
});

// Add user message to chat
function addUserMessage(message) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('user-message');
    messageDiv.innerHTML = `<div class="message-content"><p>${escapeHtml(message)}</p></div>`;
    chatHistory.appendChild(messageDiv);
    
    // Auto-scroll to bottom
    chatHistory.scrollTop = chatHistory.scrollHeight;
}

// Add bot message to chat
function addBotMessage(response) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('bot-message');
    messageDiv.innerHTML = `<div class="message-content"><p>${escapeHtml(response)}</p></div>`;
    chatHistory.appendChild(messageDiv);
    
    // Auto-scroll to bottom
    chatHistory.scrollTop = chatHistory.scrollHeight;
}

// Get bot response based on keyword matching
function getBotResponse(userMessage) {
    const lowerMessage = userMessage.toLowerCase();

    // Search through knowledge base
    for (let item of faqKnowledgeBase) {
        for (let keyword of item.keywords) {
            if (lowerMessage.includes(keyword)) {
                return item.response;
            }
        }
    }

    // Default response for unknown queries
    return 'Thank you for your question. I\'m still learning, but our support team will be happy to help you. You can also visit our main pages for more information. Is there anything else I can help you with?';
}

// Clear chat history
clearChatBtn.addEventListener('click', () => {
    if (confirm('Are you sure you want to clear the entire conversation?')) {
        chatHistory.innerHTML = `
            <div class="bot-message">
                <div class="message-content">
                    <p>👋 Hello! I'm the CareConnect Assistant. I'm here to help answer your questions about our services, volunteer opportunities, and how we can support you.</p>
                    <p>You can ask me about:</p>
                    <ul class="quick-questions">
                        <li>• How to volunteer</li>
                        <li>• Available support services</li>
                        <li>• Registration process</li>
                        <li>• How to request assistance</li>
                        <li>• Support timelines</li>
                        <li>• Blood donation information</li>
                    </ul>
                </div>
            </div>
        `;
    }
});

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}

// Focus on input field on page load
window.addEventListener('load', () => {
    userInput.focus();
});
