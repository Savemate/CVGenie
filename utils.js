// ====== UTILITY FUNCTIONS ======

// Cookie Functions
function getCookie(name) {
    const cookies = document.cookie.split('; ');
    for (let cookie of cookies) {
        const [key, value] = cookie.split('=');
        if (key === name) return value;
    }
    return null;
}

function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    document.cookie = `${name}=${value}; expires=${date.toUTCString()}; path=/; SameSite=Lax`;
}

function acceptCookies() {
    setCookie('cookie_consent', 'accepted', 365);
    setCookie('analytics_cookies', 'accepted', 365);
    setCookie('functional_cookies', 'accepted', 365);
    hideCookieConsent();
    showToast('Cookie preferences saved to 9to5 University', 'success');
}

function rejectCookies() {
    setCookie('cookie_consent', 'rejected', 365);
    setCookie('analytics_cookies', 'rejected', 365);
    setCookie('functional_cookies', 'rejected', 365);
    hideCookieConsent();
    showToast('Cookie preferences updated', 'info');
}

// Toast Notification System
function showToast(message, type = 'info') {
    const toast = document.getElementById('toast');
    if (!toast) return;
    
    // Clear existing timeout
    if (toast.timeoutId) {
        clearTimeout(toast.timeoutId);
    }
    
    // Set message and type
    toast.textContent = message;
    toast.className = 'toast';
    toast.classList.add(type);
    
    // Add icon based on type
    let icon = 'info-circle';
    switch(type) {
        case 'success':
            icon = 'check-circle';
            break;
        case 'error':
            icon = 'exclamation-circle';
            break;
        case 'warning':
            icon = 'exclamation-triangle';
            break;
    }
    
    toast.innerHTML = `<i class="fas fa-${icon}"></i> ${message}`;
    
    // Show toast
    toast.classList.add('show');
    
    // Auto hide after 3 seconds
    toast.timeoutId = setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// HTML Sanitization
function escapeHTML(str) {
    if (!str) return '';
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

function formatText(text) {
    if (!text) return '';
    return text
        .replace(/\n/g, '<br>')
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/•/g, '• ');
}

// Data Validation
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^[\+]?[0-9\s\-\(\)]+$/;
    return re.test(phone);
}

// Local Storage Functions
function saveToLocalStorage(key, data) {
    try {
        localStorage.setItem(`9to5_${key}`, JSON.stringify(data));
        return true;
    } catch (error) {
        console.error('Error saving to localStorage:', error);
        return false;
    }
}

function loadFromLocalStorage(key) {
    try {
        const data = localStorage.getItem(`9to5_${key}`);
        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.error('Error loading from localStorage:', error);
        return null;
    }
}

function clearLocalStorage() {
    const keys = Object.keys(localStorage).filter(key => key.startsWith('9to5_'));
    keys.forEach(key => localStorage.removeItem(key));
}

// Form Helpers
function collectFormData(formId) {
    const form = document.getElementById(formId);
    if (!form) return {};
    
    const data = {};
    const inputs = form.querySelectorAll('input, textarea, select');
    
    inputs.forEach(input => {
        if (input.name) {
            if (input.type === 'checkbox' || input.type === 'radio') {
                if (input.checked) {
                    data[input.name] = input.value;
                }
            } else {
                data[input.name] = input.value;
            }
        }
    });
    
    return data;
}

// Date Formatting
function formatDate(date) {
    if (!date) return '';
    
    const d = new Date(date);
    return d.toLocaleDateString('en-ZA', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

// File Download Helpers
function downloadFile(content, fileName, contentType) {
    const a = document.createElement('a');
    const file = new Blob([content], { type: contentType });
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(a.href);
}

// Progress Tracking
function trackProgress(step, totalSteps) {
    const progress = {
        step: step,
        total: totalSteps,
        percentage: Math.round((step / totalSteps) * 100),
        timestamp: new Date().toISOString()
    };
    
    saveToLocalStorage('progress', progress);
    return progress;
}

// Analytics (for learning purposes only)
function trackEvent(eventName, data = {}) {
    // In a real application, you would send this to your analytics service
    const analyticsConsent = getCookie('analytics_cookies');
    
    if (analyticsConsent === 'accepted') {
        const event = {
            name: eventName,
            data: data,
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent
        };
        
        console.log('Analytics Event:', event);
        // Here you would typically send to your analytics backend
    }
}

// Responsive Helpers
function isMobile() {
    return window.innerWidth <= 768;
}

function isTablet() {
    return window.innerWidth > 768 && window.innerWidth <= 1024;
}

function isDesktop() {
    return window.innerWidth > 1024;
}

// Accessibility Helpers
function setFocus(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.focus();
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

function announceToScreenReader(message) {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.classList.add('sr-only');
    announcement.textContent = message;
    document.body.appendChild(announcement);
    
    setTimeout(() => {
        document.body.removeChild(announcement);
    }, 1000);
}

// Debounce Function for Performance
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

// Throttle Function for Performance
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
    };
}

// Export functions for use in other files
window.utils = {
    escapeHTML,
    formatText,
    validateEmail,
    validatePhone,
    saveToLocalStorage,
    loadFromLocalStorage,
    clearLocalStorage,
    collectFormData,
    formatDate,
    downloadFile,
    trackProgress,
    trackEvent,
    isMobile,
    isTablet,
    isDesktop,
    setFocus,
    announceToScreenReader,
    debounce,
    throttle
};