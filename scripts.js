// Main JavaScript for 9to5 University Portal

document.addEventListener('DOMContentLoaded', function() {
    // Initialize current year in footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();
    
    // Mobile Menu Toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            this.innerHTML = mainNav.classList.contains('active') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.mobile-menu-toggle') && 
            !event.target.closest('.main-nav') &&
            mainNav.classList.contains('active')) {
            mainNav.classList.remove('active');
            mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });
    
    // Cookie Consent Management
    initializeCookieConsent();
    
    // Initialize page-specific functionality
    initializePage();
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const targetElement = document.querySelector(href);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (mainNav.classList.contains('active')) {
                    mainNav.classList.remove('active');
                    mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
                }
            }
        });
    });
});

function initializeCookieConsent() {
    const cookieBanner = document.getElementById('cookieConsent');
    const acceptBtn = document.getElementById('acceptCookies');
    const rejectBtn = document.getElementById('rejectCookies');
    
    // Check if user has already made a choice
    if (!localStorage.getItem('cookieConsent') && cookieBanner) {
        setTimeout(() => {
            cookieBanner.style.display = 'block';
        }, 1000);
    }
    
    if (acceptBtn) {
        acceptBtn.addEventListener('click', function() {
            localStorage.setItem('cookieConsent', 'accepted');
            if (cookieBanner) {
                cookieBanner.style.display = 'none';
            }
            showNotification('Cookie preferences saved successfully!', 'success');
        });
    }
    
    if (rejectBtn) {
        rejectBtn.addEventListener('click', function() {
            localStorage.setItem('cookieConsent', 'rejected');
            if (cookieBanner) {
                cookieBanner.style.display = 'none';
            }
            showNotification('Cookie preferences saved successfully!', 'success');
        });
    }
}

function initializePage() {
    const currentPage = window.location.pathname.split('/').pop();
    
    switch(currentPage) {
        case 'resume-builder.html':
            initializeResumeBuilder();
            break;
        case 'hustle-jobs.html':
            initializeJobListings();
            break;
        case 'courses.html':
            initializeCourses();
            break;
        case 'login.html':
            initializeLogin();
            break;
    }
}

// Resume Builder Functionality
function initializeResumeBuilder() {
    // Load templates
    loadTemplates();
    
    // Initialize form
    const resumeForm = document.getElementById('resumeForm');
    if (resumeForm) {
        resumeForm.addEventListener('submit', function(e) {
            e.preventDefault();
            generateResume();
        });
        
        // Auto-save form data
        const formInputs = resumeForm.querySelectorAll('input, textarea, select');
        formInputs.forEach(input => {
            input.addEventListener('input', debounce(saveFormData, 500));
        });
        
        // Load saved data
        loadFormData();
    }
    
    // Download buttons
    const downloadPdfBtn = document.getElementById('downloadPdf');
    const downloadWordBtn = document.getElementById('downloadWord');
    
    if (downloadPdfBtn) {
        downloadPdfBtn.addEventListener('click', downloadResumePDF);
    }
    
    if (downloadWordBtn) {
        downloadWordBtn.addEventListener('click', downloadResumeWord);
    }
}

function loadTemplates() {
    const templateContainer = document.getElementById('templateContainer');
    if (!templateContainer) return;
    
    const templates = [
        {
            id: 'professional',
            name: 'Professional',
            description: 'Clean, ATS-friendly design',
            color: '#1a365d',
            premium: false
        },
        {
            id: 'modern',
            name: 'Modern',
            description: 'Contemporary design with accents',
            color: '#2d4a8a',
            premium: false
        },
        {
            id: 'executive',
            name: 'Executive',
            description: 'Bold design for leadership roles',
            color: '#d4af37',
            premium: true
        },
        {
            id: 'creative',
            name: 'Creative',
            description: 'Unique design for creative fields',
            color: '#e53e3e',
            premium: true
        },
        {
            id: 'minimalist',
            name: 'Minimalist',
            description: 'Simple and clean design',
            color: '#4a5568',
            premium: false
        },
        {
            id: 'academic',
            name: 'Academic',
            description: 'Formal design for academic use',
            color: '#2d3748',
            premium: false
        }
    ];
    
    let templatesHTML = '';
    templates.forEach(template => {
        templatesHTML += `
            <div class="template-card" data-template-id="${template.id}">
                <div class="template-preview" style="background: linear-gradient(135deg, ${template.color}, ${darkenColor(template.color, 20)})">
                    ${template.name}
                    ${template.premium ? '<span class="badge-premium"><i class="fas fa-crown"></i></span>' : ''}
                </div>
                <h4>${template.name}</h4>
                <p>${template.description}</p>
                <button class="btn btn-primary select-template" data-template-id="${template.id}">
                    <i class="fas fa-check"></i> Select
                </button>
            </div>
        `;
    });
    
    templateContainer.innerHTML = templatesHTML;
    
    // Add event listeners to template selection
    document.querySelectorAll('.select-template').forEach(button => {
        button.addEventListener('click', function() {
            const templateId = this.getAttribute('data-template-id');
            selectTemplate(templateId);
        });
    });
    
    // Select first template by default
    if (templates.length > 0) {
        selectTemplate(templates[0].id);
    }
}

function selectTemplate(templateId) {
    // Update UI
    document.querySelectorAll('.template-card').forEach(card => {
        card.classList.remove('selected');
    });
    
    const selectedCard = document.querySelector(`.template-card[data-template-id="${templateId}"]`);
    if (selectedCard) {
        selectedCard.classList.add('selected');
    }
    
    // Save selection
    localStorage.setItem('selectedTemplate', templateId);
    
    // Update preview if resume exists
    updateResumePreview();
}

function saveFormData() {
    const formData = {};
    const form = document.getElementById('resumeForm');
    
    if (!form) return;
    
    const inputs = form.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        if (input.name) {
            formData[input.name] = input.value;
        }
    });
    
    localStorage.setItem('resumeFormData', JSON.stringify(formData));
}

function loadFormData() {
    const savedData = localStorage.getItem('resumeFormData');
    if (!savedData) return;
    
    const formData = JSON.parse(savedData);
    const form = document.getElementById('resumeForm');
    
    if (!form) return;
    
    Object.keys(formData).forEach(key => {
        const input = form.querySelector(`[name="${key}"]`);
        if (input) {
            input.value = formData[key];
        }
    });
    
    // Update preview after loading data
    updateResumePreview();
}

function generateResume() {
    const form = document.getElementById('resumeForm');
    if (!form) return;
    
    // Validate form
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            isValid = false;
            field.style.borderColor = 'var(--danger)';
        } else {
            field.style.borderColor = '';
        }
    });
    
    if (!isValid) {
        showNotification('Please fill in all required fields', 'error');
        return;
    }
    
    // Save form data
    saveFormData();
    
    // Generate preview
    updateResumePreview();
    
    showNotification('Resume generated successfully!', 'success');
}

function updateResumePreview() {
    const previewContainer = document.getElementById('resumePreview');
    if (!previewContainer) return;
    
    // Get form data
    const savedData = localStorage.getItem('resumeFormData');
    const formData = savedData ? JSON.parse(savedData) : {};
    
    // Get selected template
    const templateId = localStorage.getItem('selectedTemplate') || 'professional';
    
    // Generate preview HTML based on template
    const previewHTML = generatePreviewHTML(formData, templateId);
    previewContainer.innerHTML = previewHTML;
}

function generatePreviewHTML(data, templateId) {
    const templates = {
        professional: {
            color: '#1a365d',
            accent: '#d4af37'
        },
        modern: {
            color: '#2d4a8a',
            accent: '#38a169'
        },
        executive: {
            color: '#d4af37',
            accent: '#1a365d'
        },
        creative: {
            color: '#e53e3e',
            accent: '#2d4a8a'
        },
        minimalist: {
            color: '#4a5568',
            accent: '#718096'
        },
        academic: {
            color: '#2d3748',
            accent: '#4a5568'
        }
    };
    
    const template = templates[templateId] || templates.professional;
    
    return `
        <div class="resume-preview-content" style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 800px; margin: 0 auto;">
            <header style="background: ${template.color}; color: white; padding: 40px; border-radius: 8px; margin-bottom: 30px;">
                <h1 style="margin: 0 0 10px 0; font-size: 36px; font-weight: 700;">${data.fullName || 'Your Name'}</h1>
                <p style="margin: 0; font-size: 18px; opacity: 0.9;">${data.jobTitle || 'Professional Title'} | ${data.location || 'Location'}</p>
                <div style="margin-top: 15px; display: flex; gap: 20px; flex-wrap: wrap;">
                    <span><i class="fas fa-envelope"></i> ${data.email || 'email@example.com'}</span>
                    <span><i class="fas fa-phone"></i> ${data.phone || '(123) 456-7890'}</span>
                    <span><i class="fas fa-link"></i> ${data.website || 'portfolio.com'}</span>
                </div>
            </header>
            
            <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 30px;">
                <div>
                    <section style="margin-bottom: 25px;">
                        <h2 style="color: ${template.color}; border-bottom: 2px solid ${template.accent}; padding-bottom: 8px; margin-bottom: 15px;">PROFESSIONAL SUMMARY</h2>
                        <p style="line-height: 1.6;">${data.summary || 'Results-driven professional with extensive experience...'}</p>
                    </section>
                    
                    <section style="margin-bottom: 25px;">
                        <h2 style="color: ${template.color}; border-bottom: 2px solid ${template.accent}; padding-bottom: 8px; margin-bottom: 15px;">WORK EXPERIENCE</h2>
                        <div style="margin-bottom: 15px;">
                            <h3 style="margin: 0 0 5px 0; font-size: 18px;">${data.jobTitle1 || 'Job Title'}</h3>
                            <p style="color: ${template.color}; margin: 0 0 8px 0;">
                                <strong>${data.company1 || 'Company Name'}</strong> | ${data.dates1 || 'Dates'}
                            </p>
                            <p>${data.description1 || 'Responsibilities and achievements...'}</p>
                        </div>
                    </section>
                    
                    <section style="margin-bottom: 25px;">
                        <h2 style="color: ${template.color}; border-bottom: 2px solid ${template.accent}; padding-bottom: 8px; margin-bottom: 15px;">EDUCATION</h2>
                        <div style="margin-bottom: 15px;">
                            <h3 style="margin: 0 0 5px 0; font-size: 18px;">${data.degree || 'Degree Name'}</h3>
                            <p style="color: ${template.color}; margin: 0 0 8px 0;">
                                <strong>${data.school || 'University Name'}</strong> | ${data.graduationYear || 'Graduation Year'}
                            </p>
                            <p>${data.educationDetails || 'Relevant coursework and achievements...'}</p>
                        </div>
                    </section>
                </div>
                
                <div>
                    <section style="margin-bottom: 25px;">
                        <h2 style="color: ${template.color}; border-bottom: 2px solid ${template.accent}; padding-bottom: 8px; margin-bottom: 15px;">SKILLS</h2>
                        <div style="margin-bottom: 10px;">
                            <h3 style="font-size: 16px; margin: 0 0 8px 0;">Technical</h3>
                            <p>${data.technicalSkills || 'List your technical skills here...'}</p>
                        </div>
                        <div>
                            <h3 style="font-size: 16px; margin: 0 0 8px 0;">Professional</h3>
                            <p>${data.professionalSkills || 'List your professional skills here...'}</p>
                        </div>
                    </section>
                    
                    <section style="margin-bottom: 25px;">
                        <h2 style="color: ${template.color}; border-bottom: 2px solid ${template.accent}; padding-bottom: 8px; margin-bottom: 15px;">CERTIFICATIONS</h2>
                        <p>${data.certifications || 'List your certifications here...'}</p>
                    </section>
                    
                    <section style="margin-bottom: 25px;">
                        <h2 style="color: ${template.color}; border-bottom: 2px solid ${template.accent}; padding-bottom: 8px; margin-bottom: 15px;">LANGUAGES</h2>
                        <p>${data.languages || 'List languages you speak...'}</p>
                    </section>
                </div>
            </div>
            
            <footer style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0; text-align: center; color: #718096; font-size: 14px;">
                <p>Generated by 9to5 University Resume Builder</p>
            </footer>
        </div>
    `;
}

async function downloadResumePDF() {
    const previewContainer = document.getElementById('resumePreview');
    if (!previewContainer) {
        showNotification('Please generate a resume first', 'error');
        return;
    }
    
    showNotification('Generating PDF... Please wait', 'info');
    
    try {
        // Create a print-friendly version
        const printWindow = window.open('', '_blank');
        const printContent = `
            <!DOCTYPE html>
            <html>
            <head>
                <title>${document.getElementById('fullName')?.value || 'My Resume'} - 9to5 University</title>
                <style>
                    @import url('https://fonts.googleapis.com/css2?family=Segoe+UI:wght@300;400;500;600&display=swap');
                    body { 
                        font-family: 'Segoe UI', Arial, sans-serif; 
                        margin: 40px; 
                        color: #2d3748;
                        line-height: 1.6;
                    }
                    @media print {
                        body { margin: 20px; }
                        .no-print { display: none !important; }
                    }
                    .resume-header { 
                        background: #1a365d; 
                        color: white; 
                        padding: 30px; 
                        border-radius: 8px; 
                        margin-bottom: 25px;
                    }
                    .section-title { 
                        color: #1a365d; 
                        border-bottom: 2px solid #d4af37; 
                        padding-bottom: 5px; 
                        margin-bottom: 15px;
                    }
                    .contact-info span { margin-right: 20px; }
                    .two-column { 
                        display: grid; 
                        grid-template-columns: 2fr 1fr; 
                        gap: 25px; 
                    }
                    .print-footer { 
                        margin-top: 30px; 
                        padding-top: 15px; 
                        border-top: 1px solid #e2e8f0; 
                        text-align: center; 
                        color: #718096; 
                        font-size: 12px;
                    }
                </style>
            </head>
            <body>
                ${previewContainer.innerHTML}
                <div class="print-footer">
                    <p>Generated by 9to5 University Resume Builder | ${new Date().toLocaleDateString()}</p>
                </div>
                <script>
                    window.onload = function() {
                        window.print();
                        setTimeout(() => window.close(), 1000);
                    };
                </script>
            </body>
            </html>
        `;
        
        printWindow.document.write(printContent);
        printWindow.document.close();
        
        showNotification('PDF generated successfully! Check your print dialog.', 'success');
    } catch (error) {
        console.error('PDF generation error:', error);
        showNotification('Error generating PDF. Please try printing manually.', 'error');
    }
}

function downloadResumeWord() {
    showNotification('Word export coming soon! Use PDF export for now.', 'info');
}

// Job Listings
function initializeJobListings() {
    const jobsContainer = document.getElementById('jobsContainer');
    if (!jobsContainer) return;
    
    // Check for jobs
    const jobs = JSON.parse(localStorage.getItem('jobs')) || [];
    
    if (jobs.length === 0) {
        jobsContainer.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">
                    <i class="fas fa-briefcase"></i>
                </div>
                <h3>No Jobs Available</h3>
                <p>We're currently updating our job listings. New opportunities will be posted soon.</p>
                <p>In the meantime, prepare your resume so you're ready when jobs are available.</p>
                <a href="resume-builder.html" class="btn btn-primary">
                    <i class="fas fa-file-alt"></i> Build Your Resume
                </a>
            </div>
        `;
    }
}

// Courses
function initializeCourses() {
    // Course functionality here
}

// Login
function initializeLogin() {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleLogin();
        });
    }
    
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleRegistration();
        });
    }
}

function handleLogin() {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    // Simple validation
    if (!email || !password) {
        showNotification('Please fill in all fields', 'error');
        return;
    }
    
    // Mock authentication
    localStorage.setItem('userLoggedIn', 'true');
    localStorage.setItem('userEmail', email);
    
    showNotification('Login successful!', 'success');
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1500);
}

function handleRegistration() {
    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    // Validation
    if (!name || !email || !password || !confirmPassword) {
        showNotification('Please fill in all fields', 'error');
        return;
    }
    
    if (password !== confirmPassword) {
        showNotification('Passwords do not match', 'error');
        return;
    }
    
    if (password.length < 6) {
        showNotification('Password must be at least 6 characters', 'error');
        return;
    }
    
    // Mock registration
    const users = JSON.parse(localStorage.getItem('users')) || [];
    users.push({ name, email, password: btoa(password) });
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('userLoggedIn', 'true');
    localStorage.setItem('userEmail', email);
    
    showNotification('Registration successful!', 'success');
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1500);
}

// Utility Functions
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#38a169' : type === 'error' ? '#e53e3e' : '#3182ce'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        z-index: 9999;
        max-width: 350px;
        animation: slideIn 0.3s ease;
    `;
    
    // Add animation keyframes
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            .notification-content {
                display: flex;
                align-items: center;
                gap: 10px;
            }
            .notification-close {
                background: none;
                border: none;
                color: white;
                font-size: 20px;
                cursor: pointer;
                margin-left: auto;
                padding: 0 0 0 10px;
            }
        `;
        document.head.appendChild(style);
    }
    
    // Add close functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => notification.remove());
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
    
    document.body.appendChild(notification);
}

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

function darkenColor(color, percent) {
    let r = parseInt(color.substring(1, 3), 16);
    let g = parseInt(color.substring(3, 5), 16);
    let b = parseInt(color.substring(5, 7), 16);
    
    r = parseInt(r * (100 - percent) / 100);
    g = parseInt(g * (100 - percent) / 100);
    b = parseInt(b * (100 - percent) / 100);
    
    r = Math.max(0, r);
    g = Math.max(0, g);
    b = Math.max(0, b);
    
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}