// ====== APP STATE ======
let currentTab = 'personal';
let currentStep = 1;
let currentTemplate = 'professional';
let selectedCareerField = 'retail';
let resumeData = null;

// ====== INITIALIZATION ======
document.addEventListener('DOMContentLoaded', function() {
    // Initialize with career examples
    setTimeout(() => {
        initCareerExamples();
        setupEventListeners();
        hideLoading();
        setupCookieConsent();
    }, 1000);
    
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

// ====== LOADING ======
function hideLoading() {
    const loading = document.getElementById('loading');
    loading.classList.add('loaded');
    setTimeout(() => {
        loading.style.display = 'none';
    }, 300);
}

// ====== COOKIE CONSENT ======
function setupCookieConsent() {
    setTimeout(() => {
        const consent = getCookie('cookie_consent');
        if (!consent) {
            showCookieConsent();
        }
    }, 2000);
}

function showCookieConsent() {
    const consent = document.getElementById('cookieConsent');
    setTimeout(() => {
        consent.classList.add('show');
    }, 1000);
}

function hideCookieConsent() {
    const consent = document.getElementById('cookieConsent');
    consent.classList.remove('show');
}

// Setup cookie consent buttons
document.addEventListener('DOMContentLoaded', function() {
    const acceptBtn = document.getElementById('acceptCookies');
    const rejectBtn = document.getElementById('rejectCookies');
    const customizeBtn = document.getElementById('customizeCookies');
    
    if (acceptBtn) acceptBtn.addEventListener('click', acceptCookies);
    if (rejectBtn) rejectBtn.addEventListener('click', rejectCookies);
    if (customizeBtn) customizeBtn.addEventListener('click', () => {
        hideCookieConsent();
        showToast('Cookie customization would open here', 'info');
    });
});

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
    
    // Initialize career field selection
    selectCareerField('retail');
    
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
}

// ====== START BUILDING ======
function startBuilding() {
    // Show progress tracker
    document.getElementById('toddler').classList.add('active');
    
    // Scroll to builder section
    scrollToSection('builder');
    
    // Show first tab
    changeTab('personal');
    
    showToast('Welcome to 9to5 University Career Builder!', 'info');
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
    
    // Update progress tracker
    const steps = {
        'personal': 1,
        'experience': 2,
        'education': 3,
        'skills': 4,
        'preview': 5
    };
    
    if (steps[tabName]) {
        updateProgressTracker(steps[tabName]);
    }
    
    currentTab = tabName;
    
    // Update preview if we're on the preview tab
    if (tabName === 'preview') {
        updatePreview();
    }
}

// ====== UPDATE PROGRESS TRACKER ======
function updateProgressTracker(step) {
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
    document.getElementById('progressFill').style.width = `${progress}%`;
}

// ====== SELECT CAREER FIELD ======
function selectCareerField(field) {
    selectedCareerField = field;
    document.querySelectorAll('.field-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Find and activate the clicked button
    event.target.classList.add('active');
    
    // Update form examples based on field
    updateCareerFieldExamples(field);
}

// ====== UPDATE CAREER FIELD EXAMPLES ======
function updateCareerFieldExamples(field) {
    const examples = {
        'corporate': { 
            title: 'Office Administrator', 
            skills: 'Microsoft Office, Administrative Support, Data Entry, Communication, Time Management',
            summary: 'Professional Office Administrator with strong organizational and communication skills. Committed to efficient office management and supporting team productivity.'
        },
        'technical': { 
            title: 'Technical Specialist', 
            skills: 'Technical Support, System Administration, Troubleshooting, Network Management, IT Security',
            summary: 'Technical professional with expertise in system administration and IT support. Focused on maintaining optimal system performance and user satisfaction.'
        },
        'healthcare': { 
            title: 'Healthcare Professional', 
            skills: 'Patient Care, Medical Terminology, Healthcare Administration, Clinical Skills, EHR Systems',
            summary: 'Dedicated healthcare professional committed to providing quality patient care and supporting medical team operations.'
        },
        'education': { 
            title: 'Education Professional', 
            skills: 'Curriculum Development, Classroom Management, Educational Technology, Student Assessment, Lesson Planning',
            summary: 'Passionate education professional focused on creating engaging learning environments and supporting student development.'
        },
        'retail': { 
            title: 'Retail Manager', 
            skills: 'Customer Service, Team Management, Inventory Control, Sales Techniques, Visual Merchandising',
            summary: 'Experienced Retail Manager with 5+ years in retail management. Skilled in team leadership, inventory management, and driving store profitability.'
        },
        'creative': { 
            title: 'Creative Professional', 
            skills: 'Graphic Design, Content Creation, Digital Media, Brand Development, Creative Strategy',
            summary: 'Creative professional with expertise in visual design and content development. Focused on creating compelling brand experiences.'
        },
        'skilled': { 
            title: 'Skilled Trade Professional', 
            skills: 'Technical Expertise, Quality Control, Safety Compliance, Equipment Operation, Project Management',
            summary: 'Skilled trade professional committed to quality workmanship and adherence to safety standards.'
        }
    };
    
    const example = examples[field] || examples.retail;
    document.getElementById('jobTitle').value = example.title;
    document.getElementById('technicalSkills').value = example.skills;
    document.getElementById('summary').value = example.summary;
    
    updatePreview();
}

// ====== INITIALIZE CAREER EXAMPLES ======
function initCareerExamples() {
    // Add initial experience section
    addExperience();
    
    // Add initial education section
    addEducation();
    
    // Set career examples
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
    
    showToast('Welcome to 9to5 University Career Platform', 'info');
}

// ====== ADD EXPERIENCE ======
function addExperience() {
    const container = document.getElementById('experience-container');
    const id = Date.now();
    
    const html = `
        <div class="form-section experience-section" id="exp-${id}">
            <div class="form-section-header">
                <h4><i class="fas fa-briefcase"></i> Work Experience</h4>
                <button class="btn btn-outline" style="padding: 5px 10px; font-size: 12px;" onclick="removeSection('exp-${id}')">
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
    showToast('Experience section added to your career profile', 'success');
}

// ====== ADD EDUCATION ======
function addEducation() {
    const container = document.getElementById('education-container');
    const id = Date.now();
    
    const html = `
        <div class="form-section education-section" id="edu-${id}">
            <div class="form-section-header">
                <h4><i class="fas fa-graduation-cap"></i> Education & Training</h4>
                <button class="btn btn-outline" style="padding: 5px 10px; font-size: 12px;" onclick="removeSection('edu-${id}')">
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
    showToast('Education section added to your career profile', 'success');
}

// ====== REMOVE SECTION ======
function removeSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.remove();
        updatePreview();
        showToast('Section removed from your career profile', 'info');
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
        summary: document.getElementById('summary').value || 'Professional summary goes here...',
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
        case 'professional':
            html = renderProfessionalTemplate(data);
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
            html = renderProfessionalTemplate(data);
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
        'professional': 'Professional University Template',
        'modern': 'Modern Template',
        'jobjack': 'JobJack Style Template',
        'executive': 'Executive Template',
        'simple': 'Simple Template'
    };
    
    showToast(`${templateNames[template]} selected for your resume`, 'info');
}

// ====== DOWNLOAD PDF ======
async function downloadPDF() {
    try {
        const downloadBtn = document.getElementById('downloadBtn');
        const originalText = downloadBtn.innerHTML;
        downloadBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Creating PDF...';
        downloadBtn.disabled = true;
        
        // Check if jsPDF is available
        if (!window.jspdf) {
            throw new Error('PDF library not loaded');
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
        
        // Set temporary styles for PDF generation
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
            width: 210 * 2.83465,
            height: 297 * 2.83465
        });
        
        // Restore original styles
        resumeElement.style.width = originalWidth;
        resumeElement.style.height = originalHeight;
        resumeElement.style.margin = originalMargin;
        resumeElement.style.boxShadow = '';
        
        const imgData = canvas.toDataURL('image/png');
        const imgWidth = 190;
        const imgHeight = canvas.height * imgWidth / canvas.width;
        
        // Add the image
        doc.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);
        
        // Add footer with 9to5 University branding
        doc.setFontSize(9);
        doc.setTextColor(100, 100, 100);
        doc.text('Created with 9to5 University - Career Education Platform', 105, 285, { align: 'center' });
        
        // Generate filename
        const fileName = document.getElementById('fullName').value 
            ? `${document.getElementById('fullName').value.replace(/\s+/g, '_')}_9to5_University_Resume.pdf`
            : '9to5_University_Professional_Resume.pdf';
        
        // Save the PDF
        doc.save(fileName);
        
        showToast('Professional resume downloaded from 9to5 University!', 'success');
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
            <title>Print Resume - 9to5 University</title>
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
                    }
                    * {
                        box-sizing: border-box;
                    }
                }
            </style>
        </head>
        <body>
            ${resumeElement.outerHTML}
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

// ====== KEYBOARD SHORTCUTS ======
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