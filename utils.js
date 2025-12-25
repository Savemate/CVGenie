// Utility functions for ResumePro website

const Utils = {
    // Format date to readable string
    formatDate: function(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    },
    
    // Format currency
    formatCurrency: function(amount, currency = 'USD') {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency
        }).format(amount);
    },
    
    // Truncate text with ellipsis
    truncateText: function(text, maxLength) {
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength) + '...';
    },
    
    // Debounce function for limiting rapid calls
    debounce: function(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    // Throttle function for limiting calls to once per interval
    throttle: function(func, limit) {
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
    },
    
    // Validate email address
    validateEmail: function(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    },
    
    // Validate phone number (simple US format)
    validatePhone: function(phone) {
        const re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
        return re.test(String(phone));
    },
    
    // Generate a unique ID
    generateId: function() {
        return 'id-' + Date.now().toString(36) + Math.random().toString(36).substr(2);
    },
    
    // Copy text to clipboard
    copyToClipboard: function(text) {
        return new Promise((resolve, reject) => {
            if (navigator.clipboard && window.isSecureContext) {
                navigator.clipboard.writeText(text)
                    .then(resolve)
                    .catch(reject);
            } else {
                // Fallback for older browsers
                const textArea = document.createElement('textarea');
                textArea.value = text;
                textArea.style.position = 'fixed';
                textArea.style.left = '-999999px';
                textArea.style.top = '-999999px';
                document.body.appendChild(textArea);
                textArea.focus();
                textArea.select();
                
                try {
                    document.execCommand('copy');
                    resolve();
                } catch (err) {
                    reject(err);
                }
                
                textArea.remove();
            }
        });
    },
    
    // Get URL parameters
    getUrlParams: function() {
        const params = {};
        window.location.search.substring(1).split('&').forEach(param => {
            const [key, value] = param.split('=');
            if (key) {
                params[decodeURIComponent(key)] = decodeURIComponent(value || '');
            }
        });
        return params;
    },
    
    // Set URL parameter without reloading
    setUrlParam: function(key, value) {
        const url = new URL(window.location);
        url.searchParams.set(key, value);
        window.history.pushState({}, '', url);
    },
    
    // Remove URL parameter
    removeUrlParam: function(key) {
        const url = new URL(window.location);
        url.searchParams.delete(key);
        window.history.pushState({}, '', url);
    },
    
    // Format file size
    formatFileSize: function(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    },
    
    // Create a download link for a file
    downloadFile: function(data, filename, type = 'text/plain') {
        const blob = new Blob([data], { type: type });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    },
    
    // Read a file as text
    readFileAsText: function(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (event) => resolve(event.target.result);
            reader.onerror = (error) => reject(error);
            reader.readAsText(file);
        });
    },
    
    // Sanitize HTML to prevent XSS
    sanitizeHTML: function(str) {
        const temp = document.createElement('div');
        temp.textContent = str;
        return temp.innerHTML;
    },
    
    // Detect mobile device
    isMobileDevice: function() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    },
    
    // Detect touch device
    isTouchDevice: function() {
        return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    },
    
    // Get browser information
    getBrowserInfo: function() {
        const ua = navigator.userAgent;
        let browser = 'Unknown';
        let version = '';
        
        if (ua.includes('Firefox')) {
            browser = 'Firefox';
            version = ua.match(/Firefox\/([0-9.]+)/)[1];
        } else if (ua.includes('Chrome') && !ua.includes('Edg')) {
            browser = 'Chrome';
            version = ua.match(/Chrome\/([0-9.]+)/)[1];
        } else if (ua.includes('Safari') && !ua.includes('Chrome')) {
            browser = 'Safari';
            version = ua.match(/Version\/([0-9.]+)/)[1];
        } else if (ua.includes('Edg')) {
            browser = 'Edge';
            version = ua.match(/Edg\/([0-9.]+)/)[1];
        } else if (ua.includes('MSIE') || ua.includes('Trident/')) {
            browser = 'Internet Explorer';
            version = ua.match(/(MSIE |rv:)([0-9.]+)/)[2];
        }
        
        return { browser, version };
    },
    
    // Get operating system
    getOperatingSystem: function() {
        const ua = navigator.userAgent;
        if (ua.includes('Windows')) return 'Windows';
        if (ua.includes('Mac')) return 'macOS';
        if (ua.includes('Linux')) return 'Linux';
        if (ua.includes('Android')) return 'Android';
        if (ua.includes('iOS') || ua.includes('iPhone') || ua.includes('iPad')) return 'iOS';
        return 'Unknown';
    },
    
    // Create a promise with timeout
    promiseWithTimeout: function(promise, timeout, timeoutError = 'Operation timed out') {
        return Promise.race([
            promise,
            new Promise((_, reject) => 
                setTimeout(() => reject(new Error(timeoutError)), timeout)
            )
        ]);
    },
    
    // Deep clone an object
    deepClone: function(obj) {
        return JSON.parse(JSON.stringify(obj));
    },
    
    // Merge objects deeply
    deepMerge: function(target, source) {
        const output = Object.assign({}, target);
        if (this.isObject(target) && this.isObject(source)) {
            Object.keys(source).forEach(key => {
                if (this.isObject(source[key])) {
                    if (!(key in target))
                        Object.assign(output, { [key]: source[key] });
                    else
                        output[key] = this.deepMerge(target[key], source[key]);
                } else {
                    Object.assign(output, { [key]: source[key] });
                }
            });
        }
        return output;
    },
    
    // Check if value is an object
    isObject: function(item) {
        return (item && typeof item === 'object' && !Array.isArray(item));
    },
    
    // Generate a random color
    getRandomColor: function() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    },
    
    // Generate a pastel color
    getPastelColor: function() {
        const hue = Math.floor(Math.random() * 360);
        return `hsl(${hue}, 70%, 85%)`;
    },
    
    // Calculate reading time for text
    calculateReadingTime: function(text, wordsPerMinute = 200) {
        const words = text.trim().split(/\s+/).length;
        return Math.ceil(words / wordsPerMinute);
    },
    
    // Escape regex special characters
    escapeRegExp: function(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    },
    
    // Capitalize first letter of each word
    capitalizeWords: function(str) {
        return str.replace(/\b\w/g, char => char.toUpperCase());
    },
    
    // Convert camelCase to kebab-case
    camelToKebab: function(str) {
        return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
    },
    
    // Convert kebab-case to camelCase
    kebabToCamel: function(str) {
        return str.replace(/-([a-z])/g, (match, letter) => letter.toUpperCase());
    },
    
    // Generate a UUID
    generateUUID: function() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            const r = Math.random() * 16 | 0;
            const v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    },
    
    // Check if element is in viewport
    isInViewport: function(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    },
    
    // Smooth scroll to element
    smoothScrollTo: function(element, offset = 0) {
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;
        
        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    },
    
    // Get current scroll position
    getScrollPosition: function() {
        return {
            x: window.pageXOffset || document.documentElement.scrollLeft,
            y: window.pageYOffset || document.documentElement.scrollTop
        };
    },
    
    // Create a cookie
    setCookie: function(name, value, days) {
        let expires = '';
        if (days) {
            const date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = '; expires=' + date.toUTCString();
        }
        document.cookie = name + '=' + (value || '') + expires + '; path=/';
    },
    
    // Get a cookie
    getCookie: function(name) {
        const nameEQ = name + '=';
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    },
    
    // Delete a cookie
    deleteCookie: function(name) {
        document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    },
    
    // Check if localStorage is available
    isLocalStorageAvailable: function() {
        try {
            const test = '__test__';
            localStorage.setItem(test, test);
            localStorage.removeItem(test);
            return true;
        } catch (e) {
            return false;
        }
    },
    
    // Check if sessionStorage is available
    isSessionStorageAvailable: function() {
        try {
            const test = '__test__';
            sessionStorage.setItem(test, test);
            sessionStorage.removeItem(test);
            return true;
        } catch (e) {
            return false;
        }
    },
    
    // Get query string from object
    objectToQueryString: function(obj) {
        return Object.keys(obj)
            .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`)
            .join('&');
    },
    
    // Parse query string to object
    queryStringToObject: function(queryString) {
        return queryString
            .replace(/^\?/, '')
            .split('&')
            .reduce((params, param) => {
                const [key, value] = param.split('=');
                params[decodeURIComponent(key)] = decodeURIComponent(value || '');
                return params;
            }, {});
    },
    
    // Format number with commas
    formatNumber: function(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    },
    
    // Generate a random integer between min and max (inclusive)
    randomInt: function(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    
    // Shuffle an array (Fisher-Yates algorithm)
    shuffleArray: function(array) {
        const newArray = [...array];
        for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray;
    },
    
    // Remove duplicates from array
    removeDuplicates: function(array) {
        return [...new Set(array)];
    },
    
    // Group array by key
    groupBy: function(array, key) {
        return array.reduce((result, item) => {
            const groupKey = item[key];
            if (!result[groupKey]) {
                result[groupKey] = [];
            }
            result[groupKey].push(item);
            return result;
        }, {});
    },
    
    // Delay execution
    delay: function(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    },
    
    // Create a data URL from string
    createDataURL: function(data, mimeType = 'text/plain') {
        return `data:${mimeType};charset=utf-8,${encodeURIComponent(data)}`;
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Utils;
}