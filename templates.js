// Resume templates for the resume builder
const resumeTemplates = [
    {
        id: 1,
        name: "Professional Classic",
        description: "Clean, traditional design suitable for any industry",
        category: "professional",
        color: "#4a6bff",
        layout: "standard",
        previewColor: "#4a6bff20"
    },
    {
        id: 2,
        name: "Modern Minimalist",
        description: "Sleek and contemporary design with clean lines",
        category: "modern",
        color: "#2d3436",
        layout: "minimal",
        previewColor: "#2d343620"
    },
    {
        id: 3,
        name: "Creative Portfolio",
        description: "Bold design perfect for creative professionals",
        category: "creative",
        color: "#ff6b6b",
        layout: "creative",
        previewColor: "#ff6b6b20"
    },
    {
        id: 4,
        name: "Academic Formal",
        description: "Formal layout ideal for academic and research positions",
        category: "academic",
        color: "#4ecdc4",
        layout: "standard",
        previewColor: "#4ecdc420"
    },
    {
        id: 5,
        name: "Executive",
        description: "Elegant design for senior-level professionals",
        category: "professional",
        color: "#6c757d",
        layout: "executive",
        previewColor: "#6c757d20"
    },
    {
        id: 6,
        name: "Tech Industry",
        description: "Modern layout optimized for technology roles",
        category: "tech",
        color: "#667eea",
        layout: "modern",
        previewColor: "#667eea20"
    }
];

// Initialize templates when the page loads
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('templates-container')) {
        loadTemplates();
        setupTemplateSelection();
        
        // Load saved template preference
        const savedTemplateId = localStorage.getItem('selectedTemplate') || '1';
        const templateCard = document.querySelector(`[data-template-id="${savedTemplateId}"]`);
        if (templateCard) {
            templateCard.classList.add('selected');
        }
    }
});

function loadTemplates() {
    const container = document.getElementById('templates-container');
    if (!container) return;
    
    container.innerHTML = '';
    
    resumeTemplates.forEach(template => {
        const templateCard = document.createElement('div');
        templateCard.className = 'template-card';
        templateCard.setAttribute('data-template-id', template.id);
        
        templateCard.innerHTML = `
            <div class="template-preview" style="background-color: ${template.previewColor}; border: 2px solid ${template.color}30;">
                <div class="template-sample">
                    <!-- Header -->
                    <div class="sample-header" style="background-color: ${template.color};"></div>
                    <!-- Content sections -->
                    <div class="sample-content">
                        <div class="sample-left" style="background-color: ${template.color}40;"></div>
                        <div class="sample-right" style="background-color: ${template.color}20;"></div>
                    </div>
                    <div class="sample-section" style="background-color: ${template.color}30;"></div>
                    <div class="sample-section" style="background-color: ${template.color}10;"></div>
                </div>
            </div>
            <div class="template-info">
                <h4>${template.name}</h4>
                <p>${template.description}</p>
                <button class="btn-small select-template-btn" data-template-id="${template.id}">
                    <i class="fas fa-check"></i> Select
                </button>
            </div>
        `;
        
        container.appendChild(templateCard);
    });
}

function setupTemplateSelection() {
    const container = document.getElementById('templates-container');
    if (!container) return;
    
    container.addEventListener('click', function(e) {
        const selectBtn = e.target.closest('.select-template-btn');
        if (selectBtn) {
            const templateId = selectBtn.getAttribute('data-template-id');
            
            // Remove selected class from all cards
            document.querySelectorAll('.template-card').forEach(card => {
                card.classList.remove('selected');
            });
            
            // Add selected class to clicked card
            const templateCard = selectBtn.closest('.template-card');
            templateCard.classList.add('selected');
            
            // Save selection
            localStorage.setItem('selectedTemplate', templateId);
            
            // Update preview if on preview section
            if (typeof updateResumePreview === 'function') {
                updateResumePreview();
            }
            
            // Show confirmation
            const templateName = templateCard.querySelector('h4').textContent;
            showNotification(`Template "${templateName}" selected!`, 'success');
        }
    });
}

function getSelectedTemplate() {
    const selectedTemplateId = localStorage.getItem('selectedTemplate') || '1';
    return resumeTemplates.find(t => t.id.toString() === selectedTemplateId);
}

function updateResumePreview() {
    const previewContainer = document.getElementById('resume-preview');
    if (!previewContainer) return;
    
    // Get selected template
    const template = getSelectedTemplate();
    
    // Collect resume data
    const resumeData = collectResumeDataForPreview();
    
    // Generate HTML preview based on template
    let previewHTML = '';
    
    switch(template.layout) {
        case 'minimal':
            previewHTML = generateMinimalPreview(resumeData, template.color);
            break;
        case 'creative':
            previewHTML = generateCreativePreview(resumeData, template.color);
            break;
        case 'executive':
            previewHTML = generateExecutivePreview(resumeData, template.color);
            break;
        case 'modern':
            previewHTML = generateModernPreview(resumeData, template.color);
            break;
        default:
            previewHTML = generateStandardPreview(resumeData, template.color);
    }
    
    previewContainer.innerHTML = previewHTML;
}

function collectResumeDataForPreview() {
    // Collect data from form for preview
    const data = {
        personal: {
            name: document.getElementById('full-name')?.value || 'John Doe',
            email: document.getElementById('email')?.value || 'john.doe@example.com',
            phone: document.getElementById('phone')?.value || '079 487 4559',
            address: document.getElementById('address')?.value || 'Johannesburg, Gauteng',
            linkedin: document.getElementById('linkedin')?.value || 'linkedin.com/in/johndoe',
            summary: document.getElementById('summary')?.value || 'Experienced professional with proven track record in delivering exceptional results. Strong leadership skills with expertise in strategic planning and team management.'
        },
        education: [],
        experience: [],
        skills: [],
        languages: document.getElementById('languages')?.value || 'English (Fluent), Afrikaans (Conversational)',
        certifications: document.getElementById('certifications')?.value || 'Project Management Professional (PMP)',
        objective: document.getElementById('career-objective')?.value || 'Seeking a challenging position where I can utilize my skills and experience to contribute to organizational success.'
    };
    
    // Collect education entries
    const educationEntries = document.querySelectorAll('.education-entry');
    educationEntries.forEach((entry, index) => {
        const inputs = entry.querySelectorAll('input, textarea');
        if (inputs.length >= 5) {
            data.education.push({
                institution: inputs[0].value || 'University of Johannesburg',
                qualification: inputs[1].value || 'Bachelor of Commerce',
                field: inputs[2].value || 'Business Management',
                graduation: inputs[3].value || '2018',
                achievements: inputs[4].value || 'Graduated Cum Laude'
            });
        }
    });
    
    // Add default education if none
    if (data.education.length === 0) {
        data.education.push({
            institution: 'University of Johannesburg',
            qualification: 'Bachelor of Commerce',
            field: 'Business Management',
            graduation: '2018',
            achievements: 'Graduated Cum Laude, Dean\'s List'
        });
    }
    
    // Collect experience entries
    const experienceEntries = document.querySelectorAll('.experience-entry');
    experienceEntries.forEach((entry, index) => {
        const inputs = entry.querySelectorAll('input, textarea');
        if (inputs.length >= 5) {
            data.experience.push({
                title: inputs[0].value || 'Project Manager',
                company: inputs[1].value || 'Tech Solutions SA',
                startDate: inputs[2].value || 'June 2020',
                endDate: inputs[3].value || 'Present',
                responsibilities: inputs[4].value || 'Led cross-functional teams in delivering complex projects. Managed budgets up to R5 million and improved project delivery time by 30%.'
            });
        }
    });
    
    // Add default experience if none
    if (data.experience.length === 0) {
        data.experience.push({
            title: 'Project Manager',
            company: 'Tech Solutions SA',
            startDate: 'June 2020',
            endDate: 'Present',
            responsibilities: 'Led cross-functional teams in delivering complex projects. Managed budgets up to R5 million and improved project delivery time by 30%.'
        });
        data.experience.push({
            title: 'Team Leader',
            company: 'Innovate Africa',
            startDate: 'January 2018',
            endDate: 'May 2020',
            responsibilities: 'Managed a team of 15 professionals. Implemented new processes that increased team productivity by 25%.'
        });
    }
    
    // Collect skills
    const skillTags = document.querySelectorAll('.skill-tag span');
    skillTags.forEach(tag => {
        data.skills.push(tag.textContent);
    });
    
    // Add default skills if none
    if (data.skills.length === 0) {
        data.skills = ['Project Management', 'Team Leadership', 'Strategic Planning', 'Budget Management', 'Stakeholder Engagement', 'Problem Solving'];
    }
    
    return data;
}

function generateStandardPreview(data, color) {
    return `
        <div class="resume-template standard-template">
            <!-- Header -->
            <div class="resume-header" style="border-bottom: 3px solid ${color};">
                <h1 style="color: ${color};">${data.personal.name}</h1>
                <div class="contact-info">
                    <span><i class="fas fa-envelope"></i> ${data.personal.email}</span>
                    <span><i class="fas fa-phone"></i> ${data.personal.phone}</span>
                    <span><i class="fas fa-map-marker-alt"></i> ${data.personal.address}</span>
                    ${data.personal.linkedin ? `<span><i class="fab fa-linkedin"></i> ${data.personal.linkedin}</span>` : ''}
                </div>
            </div>
            
            <!-- Summary -->
            <div class="resume-section">
                <h2 style="color: ${color}; border-bottom: 2px solid ${color}30;">Professional Summary</h2>
                <p>${data.personal.summary}</p>
            </div>
            
            <!-- Experience -->
            <div class="resume-section">
                <h2 style="color: ${color}; border-bottom: 2px solid ${color}30;">Work Experience</h2>
                ${data.experience.map(exp => `
                    <div class="experience-item">
                        <div class="experience-header">
                            <h3>${exp.title}</h3>
                            <span class="date">${exp.startDate} - ${exp.endDate}</span>
                        </div>
                        <div class="company" style="color: ${color};">${exp.company}</div>
                        <p>${exp.responsibilities}</p>
                    </div>
                `).join('')}
            </div>
            
            <!-- Education -->
            <div class="resume-section">
                <h2 style="color: ${color}; border-bottom: 2px solid ${color}30;">Education</h2>
                ${data.education.map(edu => `
                    <div class="education-item">
                        <div class="education-header">
                            <h3>${edu.institution}</h3>
                            <span class="date">${edu.graduation}</span>
                        </div>
                        <div class="qualification" style="color: ${color};">${edu.qualification} in ${edu.field}</div>
                        ${edu.achievements ? `<p><em>${edu.achievements}</em></p>` : ''}
                    </div>
                `).join('')}
            </div>
            
            <!-- Skills -->
            <div class="resume-section">
                <h2 style="color: ${color}; border-bottom: 2px solid ${color}30;">Skills</h2>
                <div class="skills-list">
                    ${data.skills.map(skill => `
                        <span class="skill-tag-preview" style="background-color: ${color}20; color: ${color}; border: 1px solid ${color}30;">
                            ${skill}
                        </span>
                    `).join('')}
                </div>
            </div>
            
            <!-- Additional Info -->
            <div class="resume-section">
                <h2 style="color: ${color}; border-bottom: 2px solid ${color}30;">Additional Information</h2>
                ${data.languages ? `<p><strong>Languages:</strong> ${data.languages}</p>` : ''}
                ${data.certifications ? `<p><strong>Certifications:</strong> ${data.certifications}</p>` : ''}
                ${data.objective ? `<p><strong>Career Objective:</strong> ${data.objective}</p>` : ''}
            </div>
        </div>
    `;
}

function generateMinimalPreview(data, color) {
    return `
        <div class="resume-template minimal-template">
            <!-- Name and Title -->
            <div class="minimal-header">
                <h1>${data.personal.name}</h1>
                <div class="minimal-contact">
                    <span>${data.personal.email}</span> • 
                    <span>${data.personal.phone}</span> • 
                    <span>${data.personal.address}</span>
                </div>
            </div>
            
            <!-- Summary -->
            <div class="minimal-summary">
                <p>${data.personal.summary}</p>
            </div>
            
            <div class="minimal-content">
                <!-- Left Column -->
                <div class="minimal-left">
                    <!-- Experience -->
                    <div class="minimal-section">
                        <h3 style="border-left: 3px solid ${color}; padding-left: 10px;">EXPERIENCE</h3>
                        ${data.experience.map(exp => `
                            <div class="minimal-item">
                                <h4>${exp.title}</h4>
                                <div class="minimal-subtitle">
                                    <span>${exp.company}</span>
                                    <span>${exp.startDate} - ${exp.endDate}</span>
                                </div>
                                <p>${exp.responsibilities}</p>
                            </div>
                        `).join('')}
                    </div>
                    
                    <!-- Education -->
                    <div class="minimal-section">
                        <h3 style="border-left: 3px solid ${color}; padding-left: 10px;">EDUCATION</h3>
                        ${data.education.map(edu => `
                            <div class="minimal-item">
                                <h4>${edu.qualification} in ${edu.field}</h4>
                                <div class="minimal-subtitle">
                                    <span>${edu.institution}</span>
                                    <span>${edu.graduation}</span>
                                </div>
                                ${edu.achievements ? `<p><em>${edu.achievements}</em></p>` : ''}
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <!-- Right Column -->
                <div class="minimal-right">
                    <!-- Skills -->
                    <div class="minimal-section">
                        <h3 style="border-left: 3px solid ${color}; padding-left: 10px;">SKILLS</h3>
                        <div class="minimal-skills">
                            ${data.skills.map(skill => `
                                <div class="minimal-skill">${skill}</div>
                            `).join('')}
                        </div>
                    </div>
                    
                    <!-- Languages -->
                    ${data.languages ? `
                    <div class="minimal-section">
                        <h3 style="border-left: 3px solid ${color}; padding-left: 10px;">LANGUAGES</h3>
                        <p>${data.languages}</p>
                    </div>
                    ` : ''}
                    
                    <!-- Certifications -->
                    ${data.certifications ? `
                    <div class="minimal-section">
                        <h3 style="border-left: 3px solid ${color}; padding-left: 10px;">CERTIFICATIONS</h3>
                        <p>${data.certifications}</p>
                    </div>
                    ` : ''}
                </div>
            </div>
        </div>
    `;
}

function generateCreativePreview(data, color) {
    return `
        <div class="resume-template creative-template">
            <!-- Sidebar -->
            <div class="creative-sidebar" style="background-color: ${color};">
                <!-- Name -->
                <div class="creative-name">
                    <h1>${data.personal.name}</h1>
                </div>
                
                <!-- Contact -->
                <div class="creative-contact">
                    <h3>CONTACT</h3>
                    <p><i class="fas fa-envelope"></i> ${data.personal.email}</p>
                    <p><i class="fas fa-phone"></i> ${data.personal.phone}</p>
                    <p><i class="fas fa-map-marker-alt"></i> ${data.personal.address}</p>
                    ${data.personal.linkedin ? `<p><i class="fab fa-linkedin"></i> ${data.personal.linkedin}</p>` : ''}
                </div>
                
                <!-- Skills -->
                <div class="creative-skills">
                    <h3>SKILLS</h3>
                    ${data.skills.map(skill => `
                        <div class="creative-skill">${skill}</div>
                    `).join('')}
                </div>
                
                <!-- Languages -->
                ${data.languages ? `
                <div class="creative-languages">
                    <h3>LANGUAGES</h3>
                    <p>${data.languages}</p>
                </div>
                ` : ''}
            </div>
            
            <!-- Main Content -->
            <div class="creative-main">
                <!-- Summary -->
                <div class="creative-section">
                    <h2 style="color: ${color};">PROFESSIONAL PROFILE</h2>
                    <p>${data.personal.summary}</p>
                </div>
                
                <!-- Experience -->
                <div class="creative-section">
                    <h2 style="color: ${color};">WORK EXPERIENCE</h2>
                    ${data.experience.map(exp => `
                        <div class="creative-item">
                            <div class="creative-item-header">
                                <h3>${exp.title}</h3>
                                <span class="creative-date">${exp.startDate} - ${exp.endDate}</span>
                            </div>
                            <div class="creative-company" style="color: ${color};">${exp.company}</div>
                            <p>${exp.responsibilities}</p>
                        </div>
                    `).join('')}
                </div>
                
                <!-- Education -->
                <div class="creative-section">
                    <h2 style="color: ${color};">EDUCATION</h2>
                    ${data.education.map(edu => `
                        <div class="creative-item">
                            <div class="creative-item-header">
                                <h3>${edu.institution}</h3>
                                <span class="creative-date">${edu.graduation}</span>
                            </div>
                            <div class="creative-qualification" style="color: ${color};">${edu.qualification} in ${edu.field}</div>
                            ${edu.achievements ? `<p><em>${edu.achievements}</em></p>` : ''}
                        </div>
                    `).join('')}
                </div>
                
                <!-- Certifications -->
                ${data.certifications ? `
                <div class="creative-section">
                    <h2 style="color: ${color};">CERTIFICATIONS</h2>
                    <p>${data.certifications}</p>
                </div>
                ` : ''}
            </div>
        </div>
    `;
}

function generateExecutivePreview(data, color) {
    return `
        <div class="resume-template executive-template">
            <!-- Header -->
            <div class="executive-header">
                <h1>${data.personal.name}</h1>
                <div class="executive-title">Senior Professional</div>
                <div class="executive-contact">
                    <span><i class="fas fa-envelope"></i> ${data.personal.email}</span>
                    <span><i class="fas fa-phone"></i> ${data.personal.phone}</span>
                    <span><i class="fas fa-map-marker-alt"></i> ${data.personal.address}</span>
                </div>
            </div>
            
            <!-- Executive Summary -->
            <div class="executive-section">
                <h2 style="color: ${color}; border-bottom: 1px solid #ddd;">EXECUTIVE SUMMARY</h2>
                <p class="executive-summary">${data.personal.summary}</p>
            </div>
            
            <!-- Core Competencies -->
            <div class="executive-section">
                <h2 style="color: ${color}; border-bottom: 1px solid #ddd;">CORE COMPETENCIES</h2>
                <div class="executive-competencies">
                    ${data.skills.map(skill => `
                        <span class="competency-tag" style="border: 1px solid ${color}; color: ${color};">${skill}</span>
                    `).join('')}
                </div>
            </div>
            
            <!-- Professional Experience -->
            <div class="executive-section">
                <h2 style="color: ${color}; border-bottom: 1px solid #ddd;">PROFESSIONAL EXPERIENCE</h2>
                ${data.experience.map(exp => `
                    <div class="executive-item">
                        <div class="executive-item-header">
                            <h3>${exp.title}</h3>
                            <span class="executive-date">${exp.startDate} - ${exp.endDate}</span>
                        </div>
                        <div class="executive-company" style="color: ${color};">${exp.company}</div>
                        <div class="executive-achievements">
                            ${exp.responsibilities.split('\n').filter(line => line.trim()).map(line => `
                                <div class="achievement">• ${line.trim()}</div>
                            `).join('')}
                        </div>
                    </div>
                `).join('')}
            </div>
            
            <!-- Education & Credentials -->
            <div class="executive-section">
                <h2 style="color: ${color}; border-bottom: 1px solid #ddd;">EDUCATION & CREDENTIALS</h2>
                ${data.education.map(edu => `
                    <div class="executive-education">
                        <h3>${edu.qualification} in ${edu.field}</h3>
                        <div class="education-details">
                            <span>${edu.institution}</span>
                            <span>${edu.graduation}</span>
                        </div>
                        ${edu.achievements ? `<div class="education-achievements">${edu.achievements}</div>` : ''}
                    </div>
                `).join('')}
                
                ${data.certifications ? `
                <div class="executive-certifications">
                    <h3>Professional Certifications</h3>
                    <p>${data.certifications}</p>
                </div>
                ` : ''}
            </div>
        </div>
    `;
}

function generateModernPreview(data, color) {
    return `
        <div class="resume-template modern-template">
            <!-- Modern Header -->
            <div class="modern-header">
                <div class="modern-name">
                    <h1>${data.personal.name}</h1>
                    <div class="modern-title">Professional</div>
                </div>
                <div class="modern-contact">
                    <div class="contact-item">
                        <i class="fas fa-envelope" style="color: ${color};"></i>
                        <span>${data.personal.email}</span>
                    </div>
                    <div class="contact-item">
                        <i class="fas fa-phone" style="color: ${color};"></i>
                        <span>${data.personal.phone}</span>
                    </div>
                    <div class="contact-item">
                        <i class="fas fa-map-marker-alt" style="color: ${color};"></i>
                        <span>${data.personal.address}</span>
                    </div>
                </div>
            </div>
            
            <!-- Profile -->
            <div class="modern-section">
                <div class="section-title" style="color: ${color};">
                    <i class="fas fa-user"></i>
                    <h2>Profile</h2>
                </div>
                <p>${data.personal.summary}</p>
            </div>
            
            <div class="modern-content">
                <!-- Left Column -->
                <div class="modern-left">
                    <!-- Experience -->
                    <div class="modern-section">
                        <div class="section-title" style="color: ${color};">
                            <i class="fas fa-briefcase"></i>
                            <h2>Experience</h2>
                        </div>
                        ${data.experience.map(exp => `
                            <div class="modern-item">
                                <div class="modern-item-header">
                                    <h3>${exp.title}</h3>
                                    <span class="modern-date">${exp.startDate} - ${exp.endDate}</span>
                                </div>
                                <div class="modern-company" style="color: ${color};">${exp.company}</div>
                                <p>${exp.responsibilities}</p>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <!-- Right Column -->
                <div class="modern-right">
                    <!-- Skills -->
                    <div class="modern-section">
                        <div class="section-title" style="color: ${color};">
                            <i class="fas fa-star"></i>
                            <h2>Skills</h2>
                        </div>
                        <div class="modern-skills">
                            ${data.skills.map(skill => `
                                <div class="modern-skill" style="background-color: ${color}20; color: ${color};">
                                    ${skill}
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    
                    <!-- Education -->
                    <div class="modern-section">
                        <div class="section-title" style="color: ${color};">
                            <i class="fas fa-graduation-cap"></i>
                            <h2>Education</h2>
                        </div>
                        ${data.education.map(edu => `
                            <div class="modern-education">
                                <h3>${edu.qualification}</h3>
                                <div class="modern-school" style="color: ${color};">${edu.institution}</div>
                                <div class="modern-date">${edu.graduation}</div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        </div>
    `;
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button class="close-notification">&times;</button>
    `;
    
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Close button
    notification.querySelector('.close-notification').addEventListener('click', () => {
        notification.classList.remove('show');
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    });
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (document.body.contains(notification)) {
            notification.classList.remove('show');
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }
    }, 5000);
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { 
        resumeTemplates, 
        loadTemplates, 
        getSelectedTemplate,
        updateResumePreview 
    };
}