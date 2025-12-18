// ====== UTILITY FUNCTIONS ======

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

// Toast Notification System
let toastTimeout = null;
function showToast(message, type = 'info') {
    const toast = document.getElementById('toast');
    if (!toast) {
        // Create toast if it doesn't exist
        const toastEl = document.createElement('div');
        toastEl.id = 'toast';
        toastEl.className = 'toast';
        document.body.appendChild(toastEl);
    }
    
    const toastEl = document.getElementById('toast');
    
    // Clear existing timeout
    if (toastTimeout) {
        clearTimeout(toastTimeout);
    }
    
    // Set message and type
    toastEl.textContent = message;
    toastEl.className = 'toast';
    toastEl.classList.add(type);
    
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
    
    toastEl.innerHTML = `<i class="fas fa-${icon}"></i> ${message}`;
    
    // Show toast
    toastEl.classList.add('show');
    
    // Auto hide after 3 seconds
    toastTimeout = setTimeout(() => {
        toastEl.classList.remove('show');
    }, 3000);
}

// Make functions globally available
window.escapeHTML = escapeHTML;
window.formatText = formatText;
window.showToast = showToast;

console.log('Utils loaded');