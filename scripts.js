// ====== APP STATE ======
let currentTab = 'personal';
let currentStep = 1;
let currentTemplate = 'sa-classic';
let selectedSector = 'retail';
let resumeData = null;

// ====== UTILITY FUNCTIONS ======
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
        case 'success': icon = 'check-circle'; break;
        case 'error': icon = 'exclamation-circle'; break;
        case 'warning': icon = 'exclamation-triangle'; break;
    }
    
    toast.innerHTML = `<i class="fas fa-${icon}"></i> ${message}`;
    
    // Show toast
    toast.classList.add('show');
    
    // Auto hide after 3 seconds
    toast.timeoutId = setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// ====== INITIALIZATION ======
document.addEventListener('DOMContentLoaded', function() {
    // Initialize with South African examples
    initSouthAfricanExamples();
    setupEventListeners();
    setupCookieConsent();
    
    // Scroll header effect
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.main-header');
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
});

// ====== COOKIE CONSENT ======
function setupCookieConsent() {
    // Check if CookieYes is loaded
    if (!window.cookieyes) {
        // Show our fallback consent after 2 seconds
        setTimeout(() => {
            const consent = getCookie('cookie_consent');
            if (!consent) {
                showCookieConsent();
            }
        }, 2000);
    }
    
    // Setup cookie consent buttons
    const acceptBtn = document.getElementById('acceptCookies');
    const rejectBtn = document.getElementById('rejectCookies');
    const customizeBtn = document.getElementById('customizeCookies');
    
    if (acceptBtn) acceptBtn.addEventListener('click', acceptCookies);
    if (rejectBtn) rejectBtn.addEventListener('click', rejectCookies);
    if (customizeBtn) customizeBtn.addEventListener('click', () => {
        hideCookieConsent();
        showToast('Cookie customization would open here in a real implementation', 'info');
    });
}

function showCookieConsent() {
    const consent = document.getElementById('cookieConsent');
    if (consent) {
        setTimeout(() => {
            consent.classList.add('show');
        }, 1000);
    }
}

function hideCookieConsent() {
    const consent = document.getElementById('cookieConsent');
    if (consent) {
        consent.classList.remove('show');
    }
}

function acceptCookies() {
    setCookie('cookie_consent', 'accepted', 365);
    hideCookieConsent();
    showToast('Cookie preferences saved', 'success');
}

function rejectCookies() {
    setCookie('cookie_consent', 'rejected', 365);
    hideCookieConsent();
    showToast('Cookie preferences saved', 'info');
}

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

// ====== MOBILE MENU ======
function toggleMobileMenu() {
    const mobileNav = document.getElementById('mobileNav');
    mobileNav.classList.toggle('active');
    document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
}

// ====== SCROLL FUNCTIONS ======
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        window.scrollTo({
            top: section.offsetTop - 80,
            behavior: 'smooth'
        });
    }
}

// ====== SETUP EVENT LISTENERS ======
function setupEventListeners() {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    window.scrollTo({
                        top: target.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Initialize sector selection
    selectSector('retail');
    
    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            showToast('Message sent successfully!', 'success');
            this.reset();
        });
    }
    
    // Close modals when clicking outside
    window.addEventListener('click', function(event) {
        const loginModal = document.getElementById('loginModal');
        const saveModal = document.getElementById('saveModal');
        
        if (event.target === loginModal) {
            hideLoginModal();
        }
        
        if (event.target === saveModal) {
            hideSaveModal();
        }
    });
    
    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Ctrl/Cmd + S to save
        if ((e.ctrlKey || e.metaKey) && e.key === 's') {
            e.preventDefault();
            showSaveModal();
        }
        
        // Escape to close modals
        if (e.key === 'Escape') {
            hideLoginModal();
            hideSaveModal();
        }
    });
    
    // Update preview on all input changes
    document.querySelectorAll('input, textarea').forEach(input => {
        if (!input.classList.contains('exp-title') && !input.classList.contains('edu-degree')) {
            input.addEventListener('input', updatePreview);
        }
    });
}

// ====== START BUILDING ======
function startBuilding() {
    // Show toddler
    document.getElementById('toddler').classList.add('active');
    
    // Scroll to builder section
    scrollToSection('builder');
    
    // Show first tab
    changeTab('personal');
    
    showToast('Welcome to CVGenie! Start building your professional resume.', 'info');
}

// ====== CHANGE TAB ======
function changeTab(tabName) {
    // Hide all tabs
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Remove active class from all tab buttons
    document.querySelectorAll('.tab').forEach(tabBtn => {
        tabBtn.classList.remove('active');
    });
    
    // Show selected tab
    const targetTab = document.getElementById(`${tabName}-tab`);
    if (targetTab) {
        targetTab.classList.add('active');
    }
    
    // Activate corresponding tab button
    document.querySelectorAll('.tab').forEach(tabBtn => {
        if (tabBtn.textContent.includes(tabName.charAt(0).toUpperCase() + tabName.slice(1)) || 
            tabBtn.getAttribute('onclick')?.includes(tabName)) {
            tabBtn.classList.add('active');
        }
    });
    
    // Update toddler progress
    const steps = {
        'personal': 1,
        'experience': 2,
        'education': 3,
        'skills': 4,
        'preview': 5
    };
    
    if (steps[tabName]) {
        updateToddler(steps[tabName]);
    }
    
    currentTab = tabName;
    
    // Update preview if we're on the preview tab
    if (tabName === 'preview') {
        updatePreview();
    }
}

// ====== UPDATE TODDLER ======
function updateToddler(step) {
    currentStep = step;
    
    // Update step circles
    document.querySelectorAll('.toddler-step').forEach((stepEl, index) => {
        if (index + 1 <= step) {
            stepEl.classList.add('active');
        } else {
            stepEl.classList.remove('active');
        }
    });
    
    // Update progress bar
    const progress = (step / 5) * 100;
    const progressFill = document.getElementById('progressFill');
    if (progressFill) {
        progressFill.style.width = `${progress}%`;
    }
}

// ====== SELECT JOB SECTOR ======
function selectSector(sector) {
    selectedSector = sector;
    document.querySelectorAll('.sector-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Find and activate the clicked button
    event.target.classList.add('active');
    
    // Update form examples based on sector
    updateSectorExamples(sector);
}

// ====== UPDATE SECTOR EXAMPLES ======
function updateSectorExamples(sector) {
    const examples = {
        'corporate': { 
            title: 'Office Administrator', 
            skills: 'Microsoft Office, Administrative Support, Data Entry, Communication, Time Management',
            summary: 'Experienced Office Administrator with strong organizational and communication skills. Proven ability to manage multiple tasks efficiently while maintaining attention to detail.'
        },
        'technical': { 
            title: 'Electrician', 
            skills: 'Electrical Installations, Circuit Testing, Safety Compliance, Problem Solving, Wiring Diagrams',
            summary: 'Qualified Electrician with extensive experience in residential and commercial electrical systems. Strong focus on safety standards and quality workmanship.'
        },
        'healthcare': { 
            title: 'Enrolled Nurse', 
            skills: 'Patient Care, Medication Administration, Vital Signs, Infection Control, Wound Care',
            summary: 'Compassionate Enrolled Nurse with experience in hospital and clinic settings. Dedicated to providing high-quality patient care and support.'
        },
        'education': { 
            title: 'Foundation Phase Teacher', 
            skills: 'Lesson Planning, Classroom Management, Child Development, Assessment, Curriculum Development',
            summary: 'Dedicated Foundation Phase Teacher with a passion for early childhood education. Experienced in creating engaging learning environments.'
        },
        'retail': { 
            title: 'Store Manager', 
            skills: 'Customer Service, Team Management, Inventory Control, Sales Techniques, Visual Merchandising',
            summary: 'Experienced Store Manager with 5+ years in retail management. Skilled in team leadership, inventory management, and customer service excellence.'
        },
        'hospitality': { 
            title: 'Hotel Supervisor', 
            skills: 'Guest Services, Staff Coordination, Reservation Management, Quality Control, Event Planning',
            summary: 'Hospitality professional with experience in hotel operations and guest services. Committed to delivering exceptional customer experiences.'
        },
        'skilled': { 
            title: 'Automotive Technician', 
            skills: 'Vehicle Maintenance, Diagnostic Testing, Repair Work, Customer Service, Parts Management',
            summary: 'Skilled Automotive Technician with expertise in vehicle diagnostics and repair. Committed to providing quality service and customer satisfaction.'
        }
    };
    
    const example = examples[sector] || examples.retail;
    document.getElementById('jobTitle').value = example.title;
    document.getElementById('technicalSkills').value = example.skills;
    document.getElementById('summary').value = example.summary;
    
    updatePreview();
}

// ====== INITIALIZE EXAMPLES ======
function initSouthAfricanExamples() {
    // Add initial experience section
    addExperience();
    
    // Add initial education section
    addEducation();
    
    // Set South African examples
    setTimeout(() => {
        const expSection = document.querySelector('.experience-section');
        if (expSection) {
            expSection.querySelector('.exp-title').value = 'Store Manager';
            expSection.querySelector('.exp-company').value = 'Checkers Hyper';
            expSection.querySelector('.exp-location').value = 'Sandton, Johannesburg';
            expSection.querySelector('.exp-start').value = 'March 2019';
            expSection.querySelector('.exp-end').value = 'Present';
            expSection.querySelector('.exp-desc').value = '• Managed a team of 25 staff members\n• Increased store sales by 15% in first year\n• Implemented new inventory system reducing waste by 20%\n• Maintained excellent customer satisfaction ratings';
        }
        
        const eduSection = document.querySelector('.education-section');
        if (eduSection) {
            eduSection.querySelector('.edu-degree').value = 'National Senior Certificate';
            eduSection.querySelector('.edu-school').value = 'Alexander High School';
            eduSection.querySelector('.edu-location').value = 'Johannesburg';
            eduSection.querySelector('.edu-end').value = '2017';
        }
        
        updatePreview();
    }, 100);
}

// ====== ADD EXPERIENCE ======
function addExperience() {
    const container = document.getElementById('experience-container');
    const id = Date.now();
    
    const html = `
        <div class="form-section experience-section" id="exp-${id}">
            <div class="form-section-header">
                <h4><i class="fas fa-briefcase"></i> Work Experience</h4>
                <button type="button" class="btn btn-outline" style="padding: 5px 10px; font-size: 12px;" onclick="removeSection('exp-${id}')">
                    <i class="fas fa-trash"></i> Remove
                </button>
            </div>
            
            <div class="form-grid">
                <div class="form-group">
                    <label class="form-label">Job Title *</label>
                    <input type="text" class="form-control exp-title" placeholder="e.g., Sales Assistant, Nurse, Teacher" oninput="updatePreview()">
                </div>
                <div class="form-group">
                    <label class="form-label">Company/Employer</label>
                    <input type="text" class="form-control exp-company" placeholder="e.g., Shoprite, Netcare, Department of Education" oninput="updatePreview()">
                </div>
                <div class="form-group">
                    <label class="form-label">Location</label>
                    <input type="text" class="form-control exp-location" placeholder="e.g., Cape Town, Durban, Pretoria" oninput="updatePreview()">
                </div>
                <div class="form-group">
                    <label class="form-label">Start Date</label>
                    <input type="text" class="form-control exp-start" placeholder="e.g., Jan 2020" oninput="updatePreview()">
                </div>
                <div class="form-group">
                    <label class="form-label">End Date</label>
                    <input type="text" class="form-control exp-end" placeholder="e.g., Present or Dec 2023" oninput="updatePreview()">
                </div>
            </div>
            
            <div class="form-group">
                <label class="form-label">Responsibilities & Achievements</label>
                <textarea class="form-control exp-desc" rows="4" placeholder="• List your main responsibilities\n• Include any achievements with numbers if possible\n• Use action words like managed, created, improved" oninput="updatePreview()"></textarea>
                <small style="color: var(--gray); font-size: 13px; margin-top: 5px; display: block;">
                    <i class="fas fa-lightbulb"></i> Tip: Use the XYZ formula: "Accomplished [X] as measured by [Y], by doing [Z]"
                </small>
            </div>
        </div>
    `;
    
    container.insertAdjacentHTML('beforeend', html);
    showToast('Experience section added', 'success');
}

// ====== ADD EDUCATION ======
function addEducation() {
    const container = document.getElementById('education-container');
    const id = Date.now();
    
    const html = `
        <div class="form-section education-section" id="edu-${id}">
            <div class="form-section-header">
                <h4><i class="fas fa-graduation-cap"></i> Education & Training</h4>
                <button type="button" class="btn btn-outline" style="padding: 5px 10px; font-size: 12px;" onclick="removeSection('edu-${id}')">
                    <i class="fas fa-trash"></i> Remove
                </button>
            </div>
            
            <div class="form-grid">
                <div class="form-group">
                    <label class="form-label">Qualification/Course *</label>
                    <input type="text" class="form-control edu-degree" placeholder="e.g., Matric, Diploma, Certificate, Degree" oninput="updatePreview()">
                </div>
                <div class="form-group">
                    <label class="form-label">Institution/Training Center</label>
                    <input type="text" class="form-control edu-school" placeholder="e.g., School, College, University, Training Provider" oninput="updatePreview()">
                </div>
                <div class="form-group">
                    <label class="form-label">Location</label>
                    <input type="text" class="form-control edu-location" placeholder="e.g., City/Town" oninput="updatePreview()">
                </div>
                <div class="form-group">
                    <label class="form-label">Year Completed</label>
                    <input type="text" class="form-control edu-end" placeholder="e.g., 2020" oninput="updatePreview()">
                </div>
                <div class="form-group">
                    <label class="form-label">Subjects/Specialization (Optional)</label>
                    <input type="text" class="form-control edu-subjects" placeholder="e.g., Mathematics, Business Studies, Nursing" oninput="updatePreview()">
                </div>
            </div>
        </div>
    `;
    
    container.insertAdjacentHTML('beforeend', html);
    showToast('Education section added', 'success');
}

// ====== REMOVE SECTION ======
function removeSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.remove();
        updatePreview();
        showToast('Section removed', 'info');
    }
}

// ====== UPDATE PREVIEW ======
function updatePreview() {
    resumeData = {
        personal: {
            name: document.getElementById('fullName').value || 'Your Name',
            title: document.getElementById('jobTitle').value || 'Professional Title',
            email: document.getElementById('email').value || 'email@example.com',
            phone: document.getElementById('phone').value || '+27 00 000 0000',
            location: document.getElementById('location').value || 'City, Province',
            linkedin: document.getElementById('linkedin')?.value || ''
        },
        summary: document.getElementById('summary').value || 'Professional profile goes here...',
        skills: {
            technical: document.getElementById('technicalSkills').value || '',
            soft: document.getElementById('softSkills').value || '',
            certifications: document.getElementById('certifications').value || ''
        },
        experience: [],
        education: []
    };

    // Collect experience
    document.querySelectorAll('.experience-section').forEach(section => {
        const title = section.querySelector('.exp-title')?.value || '';
        if (title.trim()) {
            resumeData.experience.push({
                title: title,
                company: section.querySelector('.exp-company')?.value || '',
                location: section.querySelector('.exp-location')?.value || '',
                start: section.querySelector('.exp-start')?.value || '',
                end: section.querySelector('.exp-end')?.value || '',
                description: section.querySelector('.exp-desc')?.value || ''
            });
        }
    });

    // Collect education
    document.querySelectorAll('.education-section').forEach(section => {
        const degree = section.querySelector('.edu-degree')?.value || '';
        if (degree.trim()) {
            resumeData.education.push({
                degree: degree,
                school: section.querySelector('.edu-school')?.value || '',
                location: section.querySelector('.edu-location')?.value || '',
                end: section.querySelector('.edu-end')?.value || '',
                subjects: section.querySelector('.edu-subjects')?.value || ''
            });
        }
    });

    renderResume(resumeData);
}

// ====== RENDER RESUME ======
function renderResume(data) {
    const container = document.getElementById('resumeContent');
    if (!container) return;
    
    // Clear current classes
    container.className = '';
    
    // Add template class
    container.classList.add(`template-${currentTemplate}`);
    
    let html = '';
    
    // Render based on selected template
    switch(currentTemplate) {
        case 'sa-classic':
            html = renderSAClassicTemplate(data);
            break;
        case 'modern':
            html = renderModernTemplate(data);
            break;
        case 'jobjack':
            html = renderJobJackTemplate(data);
            break;
        case 'executive':
            html = renderExecutiveTemplate(data);
            break;
        case 'simple':
            html = renderSimpleTemplate(data);
            break;
        default:
            html = renderSAClassicTemplate(data);
    }
    
    container.innerHTML = html;
}

// ====== SELECT TEMPLATE ======
function selectTemplate(template) {
    currentTemplate = template;
    
    // Update template buttons
    document.querySelectorAll('.template-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.closest('.template-btn').classList.add('active');
    
    updatePreview();
    
    // Show appropriate toast message
    const templateNames = {
        'sa-classic': 'South African Classic',
        'modern': 'Modern Professional',
        'jobjack': 'JobJack Style',
        'executive': 'Executive',
        'simple': 'Simple & Clean'
    };
    
    showToast(`${templateNames[template]} template selected`, 'info');
}

// ====== DOWNLOAD PDF ======
async function downloadPDF() {
    try {
        const downloadBtn = document.getElementById('downloadBtn');
        const originalText = downloadBtn.innerHTML;
        downloadBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Creating PDF...';
        downloadBtn.disabled = true;
        
        // Check if jsPDF is available
        if (typeof window.jspdf === 'undefined') {
            throw new Error('PDF library not loaded. Please refresh the page.');
        }
        
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4'
        });
        
        const resumeElement = document.getElementById('resumeDisplay');
        
        if (!resumeElement) {
            throw new Error('Resume element not found');
        }
        
        // Store original styles
        const originalWidth = resumeElement.style.width;
        const originalHeight = resumeElement.style.height;
        const originalMargin = resumeElement.style.margin;
        const originalBoxShadow = resumeElement.style.boxShadow;
        
        // Set A4 size for PDF generation
        resumeElement.style.width = '210mm';
        resumeElement.style.height = '297mm';
        resumeElement.style.margin = '0';
        resumeElement.style.boxShadow = 'none';
        
        // Create canvas
        const canvas = await html2canvas(resumeElement, {
            scale: 2,
            useCORS: true,
            backgroundColor: '#ffffff',
            logging: false,
            width: 210 * 3.78, // Convert mm to pixels (96dpi)
            height: 297 * 3.78
        });
        
        // Restore original styles
        resumeElement.style.width = originalWidth;
        resumeElement.style.height = originalHeight;
        resumeElement.style.margin = originalMargin;
        resumeElement.style.boxShadow = originalBoxShadow;
        
        const imgData = canvas.toDataURL('image/png');
        const imgWidth = 190; // Leave margins
        const imgHeight = canvas.height * imgWidth / canvas.width;
        
        // Add the image
        doc.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);
        
        // Add footer with CVGenie branding
        doc.setFontSize(9);
        doc.setTextColor(100, 100, 100);
        doc.text('Created with CVGenie - Professional Resume Builder for South Africa', 105, 285, { align: 'center' });
        
        // Generate filename
        const fileName = document.getElementById('fullName').value 
            ? `${document.getElementById('fullName').value.replace(/\s+/g, '_')}_Professional_CV.pdf`
            : 'My_Professional_CV.pdf';
        
        // Save the PDF
        doc.save(fileName);
        
        showToast('Professional resume downloaded successfully!', 'success');
    } catch (error) {
        console.error('PDF generation error:', error);
        showToast('Error generating PDF. Please try again or use the print option.', 'error');
    } finally {
        const downloadBtn = document.getElementById('downloadBtn');
        if (downloadBtn) {
            downloadBtn.innerHTML = '<i class="fas fa-download"></i> Download PDF';
            downloadBtn.disabled = false;
        }
    }
}

// ====== PRINT RESUME ======
function printResume() {
    const resumeElement = document.getElementById('resumeDisplay');
    if (!resumeElement) {
        showToast('Resume not found for printing', 'error');
        return;
    }
    
    // Store original content
    const originalContent = document.body.innerHTML;
    
    // Create print window content
    const printContent = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Print Resume</title>
            <style>
                @media print {
                    @page {
                        size: A4;
                        margin: 20mm;
                    }
                    body { 
                        font-family: 'Inter', sans-serif;
                        margin: 0;
                        padding: 0;
                        background: white;
                        color: black;
                    }
                    * {
                        box-sizing: border-box;
                    }
                }
                body {
                    padding: 20mm;
                }
            </style>
        </head>
        <body>
            ${resumeElement.innerHTML}
        </body>
        </html>
    `;
    
    // Open print window
    const printWindow = window.open('', '_blank');
    printWindow.document.write(printContent);
    printWindow.document.close();
    
    // Wait for content to load, then print
    printWindow.onload = function() {
        printWindow.focus();
        printWindow.print();
        printWindow.close();
    };
}

// ====== MODAL FUNCTIONS ======
function showLoginModal() {
    document.getElementById('loginModal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function hideLoginModal() {
    document.getElementById('loginModal').classList.remove('active');
    document.body.style.overflow = '';
}

function showSaveModal() {
    document.getElementById('saveModal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function hideSaveModal() {
    document.getElementById('saveModal').classList.remove('active');
    document.body.style.overflow = '';
}

// ====== BASIC TEMPLATE FUNCTIONS (fallback if templates.js fails) ======
function renderSAClassicTemplate(data) {
    return `
        <div class="resume-header">
            <div class="name">${escapeHTML(data.personal.name)}</div>
            <div class="title">${escapeHTML(data.personal.title)}</div>
            <div class="contact-info">
                <div class="contact-item">
                    <i class="fas fa-envelope"></i> ${escapeHTML(data.personal.email)}
                </div>
                <div class="contact-item">
                    <i class="fas fa-phone"></i> ${escapeHTML(data.personal.phone)}
                </div>
                <div class="contact-item">
                    <i class="fas fa-map-marker-alt"></i> ${escapeHTML(data.personal.location)}
                </div>
            </div>
        </div>
        
        <div class="section">
            <div class="section-title">PROFESSIONAL PROFILE</div>
            <p>${formatText(data.summary)}</p>
        </div>
        
        ${data.experience.length > 0 ? `
            <div class="section">
                <div class="section-title">WORK EXPERIENCE</div>
                ${data.experience.map(exp => `
                    <div style="margin-bottom: 20px;">
                        <div>
                            <strong>${escapeHTML(exp.title)}</strong>
                            <span style="float: right;">${escapeHTML(exp.start)} - ${escapeHTML(exp.end)}</span>
                        </div>
                        <div>${escapeHTML(exp.company)} | ${escapeHTML(exp.location)}</div>
                        <div style="white-space: pre-line;">${formatText(exp.description)}</div>
                    </div>
                `).join('')}
            </div>
        ` : ''}
        
        ${data.education.length > 0 ? `
            <div class="section">
                <div class="section-title">EDUCATION</div>
                ${data.education.map(edu => `
                    <div style="margin-bottom: 15px;">
                        <div>
                            <strong>${escapeHTML(edu.degree)}</strong>
                            <span style="float: right;">${escapeHTML(edu.end)}</span>
                        </div>
                        <div>${escapeHTML(edu.school)} | ${escapeHTML(edu.location)}</div>
                    </div>
                `).join('')}
            </div>
        ` : ''}
    `;
}

function escapeHTML(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function formatText(text) {
    if (!text) return '';
    return escapeHTML(text).replace(/\n/g, '<br>');
}

// Make functions globally available
window.startBuilding = startBuilding;
window.changeTab = changeTab;
window.selectSector = selectSector;
window.addExperience = addExperience;
window.addEducation = addEducation;
window.removeSection = removeSection;
window.selectTemplate = selectTemplate;
window.downloadPDF = downloadPDF;
window.printResume = printResume;
window.toggleMobileMenu = toggleMobileMenu;
window.scrollToSection = scrollToSection;
window.showLoginModal = showLoginModal;
window.hideLoginModal = hideLoginModal;
window.showSaveModal = showSaveModal;
window.hideSaveModal = hideSaveModal;
window.showToast = showToast;

console.log('CVGenie scripts loaded successfully');