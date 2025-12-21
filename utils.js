// Utility functions for 9to5 University Job Portal

// Format date to readable string
function formatDate(date) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString('en-US', options);
}

// Format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount);
}

// Validate email
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Validate phone number
function validatePhone(phone) {
    const re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    return re.test(phone);
}

// Debounce function for search inputs
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

// Truncate text with ellipsis
function truncateText(text, maxLength) {
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength) + '...';
}

// Get query parameters from URL
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// Set query parameter in URL
function setQueryParam(param, value) {
    const url = new URL(window.location);
    url.searchParams.set(param, value);
    window.history.pushState({}, '', url);
}

// Remove query parameter from URL
function removeQueryParam(param) {
    const url = new URL(window.location);
    url.searchParams.delete(param);
    window.history.pushState({}, '', url);
}

// Check if user is logged in
function checkAuth() {
    return localStorage.getItem('isLoggedIn') === 'true';
}

// Login user
function loginUser(email) {
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userEmail', email);
    return true;
}

// Logout user
function logoutUser() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    window.location.href = 'index.html';
}

// Get current user email
function getCurrentUser() {
    return localStorage.getItem('userEmail');
}

// Save data to localStorage with expiration
function saveWithExpiration(key, data, hours = 24) {
    const item = {
        data: data,
        expiry: new Date().getTime() + (hours * 60 * 60 * 1000)
    };
    localStorage.setItem(key, JSON.stringify(item));
}

// Get data from localStorage with expiration check
function getWithExpiration(key) {
    const itemStr = localStorage.getItem(key);
    
    if (!itemStr) {
        return null;
    }
    
    const item = JSON.parse(itemStr);
    const now = new Date().getTime();
    
    if (now > item.expiry) {
        localStorage.removeItem(key);
        return null;
    }
    
    return item.data;
}

// Generate unique ID
function generateId() {
    return '_' + Math.random().toString(36).substr(2, 9);
}

// Copy text to clipboard
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        console.log('Text copied to clipboard');
    }).catch(err => {
        console.error('Failed to copy text: ', err);
    });
}

// Show notification
function showNotification(message, type = 'info') {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.position = 'fixed';
    notification.style.top = '20px';
    notification.style.right = '20px';
    notification.style.backgroundColor = type === 'success' ? '#28a745' : 
                                        type === 'error' ? '#dc3545' : 
                                        type === 'warning' ? '#ffc107' : '#17a2b8';
    notification.style.color = 'white';
    notification.style.padding = '15px 20px';
    notification.style.borderRadius = '5px';
    notification.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
    notification.style.zIndex = '9999';
    notification.style.maxWidth = '300px';
    
    // Add close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.remove();
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
    
    document.body.appendChild(notification);
}

// Format file size
function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Check if device is mobile
function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Add loading spinner
function showLoading(container) {
    const spinner = document.createElement('div');
    spinner.className = 'loading-spinner';
    spinner.innerHTML = '<div class="spinner"></div>';
    
    // Add styles
    spinner.style.display = 'flex';
    spinner.style.justifyContent = 'center';
    spinner.style.alignItems = 'center';
    spinner.style.padding = '40px';
    
    const innerSpinner = spinner.querySelector('.spinner');
    innerSpinner.style.border = '4px solid #f3f3f3';
    innerSpinner.style.borderTop = '4px solid var(--primary-blue)';
    innerSpinner.style.borderRadius = '50%';
    innerSpinner.style.width = '40px';
    innerSpinner.style.height = '40px';
    innerSpinner.style.animation = 'spin 1s linear infinite';
    
    // Add keyframes for animation
    if (!document.querySelector('#spinner-styles')) {
        const style = document.createElement('style');
        style.id = 'spinner-styles';
        style.textContent = `
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
    }
    
    container.innerHTML = '';
    container.appendChild(spinner);
}

// Remove loading spinner
function hideLoading(container) {
    const spinner = container.querySelector('.loading-spinner');
    if (spinner) {
        spinner.remove();
    }
}

// Export utility functions
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        formatDate,
        formatCurrency,
        validateEmail,
        validatePhone,
        debounce,
        truncateText,
        getQueryParam,
        setQueryParam,
        removeQueryParam,
        checkAuth,
        loginUser,
        logoutUser,
        getCurrentUser,
        saveWithExpiration,
        getWithExpiration,
        generateId,
        copyToClipboard,
        showNotification,
        formatFileSize,
        isMobile,
        showLoading,
        hideLoading
    };
}