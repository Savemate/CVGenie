// Resume templates for the resume builder

const resumeTemplates = [
    {
        id: 1,
        name: "Professional Classic",
        description: "Clean, traditional design suitable for any industry",
        category: "professional",
        color: "#4a6bff",
        layout: "standard"
    },
    {
        id: 2,
        name: "Modern Minimalist",
        description: "Sleek and contemporary design with clean lines",
        category: "modern",
        color: "#2d3436",
        layout: "minimal"
    },
    {
        id: 3,
        name: "Creative Portfolio",
        description: "Bold design perfect for creative professionals",
        category: "creative",
        color: "#ff6b6b",
        layout: "creative"
    },
    {
        id: 4,
        name: "Academic",
        description: "Formal layout ideal for academic and research positions",
        category: "academic",
        color: "#4ecdc4",
        layout: "standard"
    },
    {
        id: 5,
        name: "Executive",
        description: "Elegant design for senior-level professionals",
        category: "professional",
        color: "#6c757d",
        layout: "executive"
    },
    {
        id: 6,
        name: "Tech Industry",
        description: "Modern layout optimized for technology roles",
        category: "tech",
        color: "#667eea",
        layout: "modern"
    }
];

// Initialize templates when the page loads
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('templates-container')) {
        loadTemplates();
        setupTemplateSelection();
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
        
        // Set selected if it's the first template
        if (template.id === 1) {
            templateCard.classList.add('selected');
            localStorage.setItem('selectedTemplate', template.id.toString());
        }
        
        templateCard.innerHTML = `
            <div class="template-preview" style="background-color: ${template.color}20; border-color: ${template.color}">
                <div style="width: 80%; height: 80%; background-color: white; border-radius: 8px; padding: 20px; position: relative;">
                    <!-- Header section -->
                    <div style="height: 40px; background-color: ${template.color}; margin-bottom: 30px;"></div>
                    
                    <!-- Content sections -->
                    <div style="display: flex; margin-bottom: 20px;">
                        <div style="width: 30%; height: 100px; background-color: ${template.color}30; margin-right: 20px;"></div>
                        <div style="flex: 1; height: 100px; background-color: ${template.color}20;"></div>
                    </div>
                    
                    <div style="height: 80px; background-color: ${template.color}10; margin-bottom: 20px;"></div>
                    <div style="height: 60px; background-color: ${template.color}20;"></div>
                </div>
            </div>
            <div class="template-info">
                <h4>${template.name}</h4>
                <p>${template.description}</p>
                <button class="btn-small select-template-btn">Select Template</button>
            </div>
        `;
        
        container.appendChild(templateCard);
    });
}

function setupTemplateSelection() {
    const container = document.getElementById('templates-container');
    if (!container) return;
    
    container.addEventListener('click', function(e) {
        if (e.target.classList.contains('select-template-btn') || e.target.closest('.select-template-btn')) {
            const templateCard = e.target.closest('.template-card');
            const templateId = templateCard.getAttribute('data-template-id');
            
            // Remove selected class from all cards
            document.querySelectorAll('.template-card').forEach(card => {
                card.classList.remove('selected');
            });
            
            // Add selected class to clicked card
            templateCard.classList.add('selected');
            
            // Save selection
            localStorage.setItem('selectedTemplate', templateId);
            
            // Update preview if on preview section
            updateResumePreview();
        }
    });
}

function updateResumePreview() {
    const previewContainer = document.getElementById('resume-preview');
    if (!previewContainer) return;
    
    // Get selected template
    const selectedTemplateId = localStorage.getItem('selectedTemplate') || '1';
    const template = resumeTemplates.find(t => t.id.toString() === selectedTemplateId);
    
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
    // This function collects data from the form for the preview
    // Similar to collectResumeData() but specifically for preview
    const data = {
        personal: {
            name: document.getElementById('full-name')?.value || 'John Doe',
            email: document.getElementById('email')?.value || 'john.doe@example.com',
            phone: document.getElementById('phone')?.value || '(123) 456-7890',
            address: document.getElementById('address')?.value || 'San Francisco, CA',
            linkedin: document.getElementById('linkedin')?.value || 'linkedin.com/in/johndoe',
            summary: document.getElementById('summary')?.value || 'Experienced professional with a proven track record...'
        },
        education: [],
        experience: [],
        skills: [],
        languages: document.getElementById('languages')?.value || 'English (Native), Spanish (Intermediate)',
        certifications: document.getElementById('certifications')?.value || 'Project Management Professional (PMP), Google Analytics Certified'
    };
    
    // Collect education entries
    const educationEntries = document.querySelectorAll('.education-entry');
    educationEntries.forEach((entry, index) => {
        const inputs = entry.querySelectorAll('input, textarea');
        if (inputs.length >= 5) {
            data.education.push({
                institution: inputs[0].value || (index === 0 ? 'Stanford University' : ''),
                degree: inputs[1].value || (index === 0 ? 'Bachelor of Science' : ''),
                field: inputs[2].value || (index === 0 ? 'Computer Science' : ''),
                graduation: inputs[3].value || (index === 0 ? '2018' : ''),
                achievements: inputs[4].value || (index === 0 ? 'Graduated Magna Cum Laude, Dean\'s List' : '')
            });
        }
    });
    
    // Add default education if none
    if (data.education.length === 0) {
        data.education.push({
            institution: 'Stanford University',
            degree: 'Bachelor of Science',
            field: 'Computer Science',
            graduation: '2018',
            achievements: 'Graduated Magna Cum Laude, Dean\'s List'
        });
    }
    
    // Collect experience entries
    const experienceEntries = document.querySelectorAll('.experience-entry');
    experienceEntries.forEach((entry, index) => {
        const inputs = entry.querySelectorAll('input, textarea');
        if (inputs.length >= 5) {
            data.experience.push({
                title: inputs[0].value || (index === 0 ? 'Senior Software Engineer' : 'Software Developer'),
                company: inputs[1].value || (index === 0 ? 'Tech Solutions Inc.' : 'Startup Company'),
                startDate: inputs[2].value || (index === 0 ? 'June 2020' : 'January 2018'),
                endDate: inputs[3].value || (index === 0 ? 'Present' : 'May 2020'),
                responsibilities: inputs[4].value || (index === 0 ? 'Led development of customer-facing applications...' : 'Developed and maintained web applications...')
            });
        }
    });
    
    // Add default experience if none
    if (data.experience.length === 0) {
        data.experience.push({
            title: 'Senior Software Engineer',
            company: 'Tech Solutions Inc.',
            startDate: 'June 2020',
            endDate: 'Present',
            responsibilities: 'Led development of customer-facing applications, mentored junior developers, and implemented agile development processes.'
        });
        data.experience.push({
            title: 'Software Developer',
            company: 'Startup Company',
            startDate: 'January 2018',
            endDate: 'May 2020',
            responsibilities: 'Developed and maintained web applications, collaborated with design team on UI/UX improvements.'
        });
    }
    
    // Collect skills
    const skillTags = document.querySelectorAll('.skill-tag span');
    skillTags.forEach(tag => {
        data.skills.push(tag.textContent);
    });
    
    // Add default skills if none
    if (data.skills.length === 0) {
        data.skills = ['JavaScript', 'React', 'Node.js', 'Python', 'Project Management', 'Agile Methodologies'];
    }
    
    return data;
}

function generateStandardPreview(data, color) {
    return `
        <div class="resume-standard" style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 800px; margin: 0 auto;">
            <!-- Header -->
            <div style="background-color: ${color}; color: white; padding: 2rem;">
                <h1 style="margin: 0; font-size: 2.5rem;">${data.personal.name}</h1>
                <div style="display: flex; flex-wrap: wrap; gap: 1rem; margin-top: 1rem;">
                    <span>${data.personal.email}</span>
                    <span>${data.personal.phone}</span>
                    <span>${data.personal.address}</span>
                    <span>${data.personal.linkedin}</span>
                </div>
            </div>
            
            <!-- Summary -->
            <div style="padding: 1.5rem 2rem; border-bottom: 2px solid #eee;">
                <h2 style="color: ${color}; margin-bottom: 0.5rem;">Professional Summary</h2>
                <p>${data.personal.summary}</p>
            </div>
            
            <!-- Experience -->
            <div style="padding: 1.5rem 2rem; border-bottom: 2px solid #eee;">
                <h2 style="color: ${color}; margin-bottom: 1rem;">Work Experience</h2>
                ${data.experience.map(exp => `
                    <div style="margin-bottom: 1.5rem;">
                        <div style="display: flex; justify-content: space-between;">
                            <h3 style="margin: 0;">${exp.title}</h3>
                            <span style="color: #666;">${exp.startDate} - ${exp.endDate}</span>
                        </div>
                        <div style="color: ${color}; font-weight: 600; margin-bottom: 0.5rem;">${exp.company}</div>
                        <p>${exp.responsibilities}</p>
                    </div>
                `).join('')}
            </div>
            
            <!-- Education -->
            <div style="padding: 1.5rem 2rem; border-bottom: 2px solid #eee;">
                <h2 style="color: ${color}; margin-bottom: 1rem;">Education</h2>
                ${data.education.map(edu => `
                    <div style="margin-bottom: 1.5rem;">
                        <div style="display: flex; justify-content: space-between;">
                            <h3 style="margin: 0;">${edu.institution}</h3>
                            <span style="color: #666;">${edu.graduation}</span>
                        </div>
                        <div style="color: ${color}; font-weight: 600; margin-bottom: 0.5rem;">${edu.degree} in ${edu.field}</div>
                        ${edu.achievements ? `<p><em>${edu.achievements}</em></p>` : ''}
                    </div>
                `).join('')}
            </div>
            
            <!-- Skills & Additional -->
            <div style="display: flex; padding: 1.5rem 2rem;">
                <div style="flex: 1;">
                    <h2 style="color: ${color}; margin-bottom: 1rem;">Skills</h2>
                    <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
                        ${data.skills.map(skill => `
                            <span style="background-color: ${color}20; color: ${color}; padding: 0.25rem 0.75rem; border-radius: 20px; font-size: 0.9rem;">
                                ${skill}
                            </span>
                        `).join('')}
                    </div>
                </div>
                <div style="flex: 1; padding-left: 2rem;">
                    <h2 style="color: ${color}; margin-bottom: 1rem;">Additional</h2>
                    ${data.languages ? `<p><strong>Languages:</strong> ${data.languages}</p>` : ''}
                    ${data.certifications ? `<p><strong>Certifications:</strong> ${data.certifications}</p>` : ''}
                </div>
            </div>
        </div>
    `;
}

function generateMinimalPreview(data, color) {
    return `
        <div class="resume-minimal" style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 2rem;">
            <!-- Header -->
            <div style="text-align: center; margin-bottom: 2rem;">
                <h1 style="margin: 0 0 0.5rem 0; font-size: 2.5rem; font-weight: 300;">${data.personal.name}</h1>
                <div style="color: #666; font-size: 0.9rem;">
                    <span>${data.personal.email}</span> • 
                    <span>${data.personal.phone}</span> • 
                    <span>${data.personal.address}</span>
                </div>
            </div>
            
            <!-- Summary -->
            <div style="margin-bottom: 2rem; text-align: center;">
                <p style="color: #666; line-height: 1.6;">${data.personal.summary}</p>
            </div>
            
            <!-- Two Column Layout -->
            <div style="display: flex; gap: 3rem;">
                <!-- Left Column -->
                <div style="flex: 1;">
                    <!-- Experience -->
                    <div style="margin-bottom: 2rem;">
                        <h2 style="color: ${color}; font-size: 1.2rem; text-transform: uppercase; letter-spacing: 1px; border-bottom: 1px solid ${color}; padding-bottom: 0.5rem; margin-bottom: 1rem;">Experience</h2>
                        ${data.experience.map(exp => `
                            <div style="margin-bottom: 1.5rem;">
                                <h3 style="margin: 0 0 0.25rem 0; font-size: 1.1rem;">${exp.title}</h3>
                                <div style="color: #666; font-size: 0.9rem; margin-bottom: 0.25rem;">
                                    <span>${exp.company}</span> • 
                                    <span>${exp.startDate} - ${exp.endDate}</span>
                                </div>
                                <p style="font-size: 0.9rem; color: #666; line-height: 1.5;">${exp.responsibilities}</p>
                            </div>
                        `).join('')}
                    </div>
                    
                    <!-- Education -->
                    <div>
                        <h2 style="color: ${color}; font-size: 1.2rem; text-transform: uppercase; letter-spacing: 1px; border-bottom: 1px solid ${color}; padding-bottom: 0.5rem; margin-bottom: 1rem;">Education</h2>
                        ${data.education.map(edu => `
                            <div style="margin-bottom: 1.5rem;">
                                <h3 style="margin: 0 0 0.25rem 0; font-size: 1.1rem;">${edu.institution}</h3>
                                <div style="color: #666; font-size: 0.9rem; margin-bottom: 0.25rem;">
                                    <span>${edu.degree} in ${edu.field}</span> • 
                                    <span>${edu.graduation}</span>
                                </div>
                                ${edu.achievements ? `<p style="font-size: 0.9rem; color: #666;"><em>${edu.achievements}</em></p>` : ''}
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <!-- Right Column -->
                <div style="width: 250px;">
                    <!-- Skills -->
                    <div style="margin-bottom: 2rem;">
                        <h2 style="color: ${color}; font-size: 1.2rem; text-transform: uppercase; letter-spacing: 1px; border-bottom: 1px solid ${color}; padding-bottom: 0.5rem; margin-bottom: 1rem;">Skills</h2>
                        <div>
                            ${data.skills.map(skill => `
                                <div style="margin-bottom: 0.5rem; font-size: 0.9rem;">${skill}</div>
                            `).join('')}
                        </div>
                    </div>
                    
                    <!-- Languages -->
                    ${data.languages ? `
                    <div style="margin-bottom: 2rem;">
                        <h2 style="color: ${color}; font-size: 1.2rem; text-transform: uppercase; letter-spacing: 1px; border-bottom: 1px solid ${color}; padding-bottom: 0.5rem; margin-bottom: 1rem;">Languages</h2>
                        <p style="font-size: 0.9rem;">${data.languages}</p>
                    </div>
                    ` : ''}
                    
                    <!-- Certifications -->
                    ${data.certifications ? `
                    <div>
                        <h2 style="color: ${color}; font-size: 1.2rem; text-transform: uppercase; letter-spacing: 1px; border-bottom: 1px solid ${color}; padding-bottom: 0.5rem; margin-bottom: 1rem;">Certifications</h2>
                        <p style="font-size: 0.9rem;">${data.certifications}</p>
                    </div>
                    ` : ''}
                </div>
            </div>
        </div>
    `;
}

function generateCreativePreview(data, color) {
    return `
        <div class="resume-creative" style="font-family: 'Arial', sans-serif; max-width: 800px; margin: 0 auto; background-color: #fff; border-radius: 10px; overflow: hidden; box-shadow: 0 5px 15px rgba(0,0,0,0.1);">
            <!-- Sidebar -->
            <div style="display: flex;">
                <div style="width: 250px; background-color: ${color}; color: white; padding: 2rem;">
                    <!-- Name -->
                    <h1 style="margin: 0 0 1.5rem 0; font-size: 2rem; line-height: 1.2;">${data.personal.name}</h1>
                    
                    <!-- Contact -->
                    <div style="margin-bottom: 2rem;">
                        <h2 style="font-size: 1.2rem; margin: 0 0 1rem 0; border-bottom: 2px solid rgba(255,255,255,0.3); padding-bottom: 0.5rem;">Contact</h2>
                        <div style="font-size: 0.9rem;">
                            <p style="margin: 0.5rem 0;">📧 ${data.personal.email}</p>
                            <p style="margin: 0.5rem 0;">📱 ${data.personal.phone}</p>
                            <p style="margin: 0.5rem 0;">📍 ${data.personal.address}</p>
                            <p style="margin: 0.5rem 0;">🔗 ${data.personal.linkedin}</p>
                        </div>
                    </div>
                    
                    <!-- Skills -->
                    <div style="margin-bottom: 2rem;">
                        <h2 style="font-size: 1.2rem; margin: 0 0 1rem 0; border-bottom: 2px solid rgba(255,255,255,0.3); padding-bottom: 0.5rem;">Skills</h2>
                        <div>
                            ${data.skills.map(skill => `
                                <div style="margin-bottom: 0.5rem; font-size: 0.9rem;">• ${skill}</div>
                            `).join('')}
                        </div>
                    </div>
                    
                    <!-- Languages -->
                    ${data.languages ? `
                    <div style="margin-bottom: 2rem;">
                        <h2 style="font-size: 1.2rem; margin: 0 0 1rem 0; border-bottom: 2px solid rgba(255,255,255,0.3); padding-bottom: 0.5rem;">Languages</h2>
                        <p style="font-size: 0.9rem;">${data.languages}</p>
                    </div>
                    ` : ''}
                </div>
                
                <!-- Main Content -->
                <div style="flex: 1; padding: 2rem;">
                    <!-- Summary -->
                    <div style="margin-bottom: 2rem;">
                        <h2 style="color: ${color}; margin: 0 0 1rem 0; font-size: 1.5rem;">Profile</h2>
                        <p style="color: #666; line-height: 1.6;">${data.personal.summary}</p>
                    </div>
                    
                    <!-- Experience -->
                    <div style="margin-bottom: 2rem;">
                        <h2 style="color: ${color}; margin: 0 0 1rem 0; font-size: 1.5rem;">Experience</h2>
                        ${data.experience.map(exp => `
                            <div style="margin-bottom: 1.5rem; padding-left: 1rem; border-left: 3px solid ${color}50;">
                                <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                                    <h3 style="margin: 0; font-size: 1.2rem;">${exp.title}</h3>
                                    <span style="color: #666; font-size: 0.9rem;">${exp.startDate} - ${exp.endDate}</span>
                                </div>
                                <div style="color: ${color}; font-weight: 600; margin-bottom: 0.5rem; font-size: 1rem;">${exp.company}</div>
                                <p style="color: #666; line-height: 1.5;">${exp.responsibilities}</p>
                            </div>
                        `).join('')}
                    </div>
                    
                    <!-- Education -->
                    <div style="margin-bottom: 2rem;">
                        <h2 style="color: ${color}; margin: 0 0 1rem 0; font-size: 1.5rem;">Education</h2>
                        ${data.education.map(edu => `
                            <div style="margin-bottom: 1.5rem; padding-left: 1rem; border-left: 3px solid ${color}50;">
                                <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                                    <h3 style="margin: 0; font-size: 1.2rem;">${edu.institution}</h3>
                                    <span style="color: #666; font-size: 0.9rem;">${edu.graduation}</span>
                                </div>
                                <div style="color: ${color}; font-weight: 600; margin-bottom: 0.5rem; font-size: 1rem;">${edu.degree} in ${edu.field}</div>
                                ${edu.achievements ? `<p style="color: #666; font-size: 0.9rem;"><em>${edu.achievements}</em></p>` : ''}
                            </div>
                        `).join('')}
                    </div>
                    
                    <!-- Certifications -->
                    ${data.certifications ? `
                    <div>
                        <h2 style="color: ${color}; margin: 0 0 1rem 0; font-size: 1.5rem;">Certifications</h2>
                        <p style="color: #666;">${data.certifications}</p>
                    </div>
                    ` : ''}
                </div>
            </div>
        </div>
    `;
}

function generateExecutivePreview(data, color) {
    return `
        <div class="resume-executive" style="font-family: 'Georgia', serif; max-width: 800px; margin: 0 auto;">
            <!-- Header with border -->
            <div style="border-bottom: 4px solid ${color}; padding-bottom: 1rem; margin-bottom: 2rem;">
                <h1 style="margin: 0; font-size: 2.5rem; font-weight: normal; letter-spacing: 1px;">${data.personal.name}</h1>
                <div style="display: flex; justify-content: space-between; margin-top: 0.5rem; color: #666; font-size: 0.9rem;">
                    <div>
                        <span>${data.personal.email}</span> | 
                        <span>${data.personal.phone}</span>
                    </div>
                    <div>
                        <span>${data.personal.address}</span>
                    </div>
                </div>
            </div>
            
            <!-- Summary -->
            <div style="margin-bottom: 2rem;">
                <h2 style="color: ${color}; font-size: 1.2rem; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 1rem;">Executive Summary</h2>
                <p style="color: #444; line-height: 1.6; font-size: 1.1rem;">${data.personal.summary}</p>
            </div>
            
            <!-- Professional Experience -->
            <div style="margin-bottom: 2rem;">
                <h2 style="color: ${color}; font-size: 1.2rem; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 1rem; border-bottom: 1px solid #ddd; padding-bottom: 0.5rem;">Professional Experience</h2>
                ${data.experience.map(exp => `
                    <div style="margin-bottom: 1.5rem;">
                        <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                            <h3 style="margin: 0; font-size: 1.1rem; font-weight: 600;">${exp.title}</h3>
                            <span style="color: #666; font-style: italic;">${exp.startDate} - ${exp.endDate}</span>
                        </div>
                        <div style="color: ${color}; font-weight: 600; margin-bottom: 0.5rem; font-size: 1rem;">${exp.company}</div>
                        <p style="color: #444; line-height: 1.5;">${exp.responsibilities}</p>
                    </div>
                `).join('')}
            </div>
            
            <!-- Two Column Bottom -->
            <div style="display: flex; gap: 3rem;">
                <!-- Left Column -->
                <div style="flex: 1;">
                    <!-- Education -->
                    <div style="margin-bottom: 2rem;">
                        <h2 style="color: ${color}; font-size: 1.2rem; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 1rem; border-bottom: 1px solid #ddd; padding-bottom: 0.5rem;">Education</h2>
                        ${data.education.map(edu => `
                            <div style="margin-bottom: 1.5rem;">
                                <h3 style="margin: 0 0 0.25rem 0; font-size: 1.1rem; font-weight: 600;">${edu.institution}</h3>
                                <div style="color: #666; font-size: 0.9rem; margin-bottom: 0.25rem;">
                                    ${edu.degree} in ${edu.field}
                                </div>
                                <div style="color: ${color}; font-size: 0.9rem; font-weight: 600;">${edu.graduation}</div>
                                ${edu.achievements ? `<p style="color: #666; font-size: 0.9rem; font-style: italic; margin-top: 0.25rem;">${edu.achievements}</p>` : ''}
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <!-- Right Column -->
                <div style="flex: 1;">
                    <!-- Core Competencies -->
                    <div style="margin-bottom: 2rem;">
                        <h2 style="color: ${color}; font-size: 1.2rem; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 1rem; border-bottom: 1px solid #ddd; padding-bottom: 0.5rem;">Core Competencies</h2>
                        <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
                            ${data.skills.map(skill => `
                                <span style="background-color: ${color}15; color: ${color}; padding: 0.5rem 1rem; border-radius: 3px; font-size: 0.9rem; border: 1px solid ${color}30;">
                                    ${skill}
                                </span>
                            `).join('')}
                        </div>
                    </div>
                    
                    <!-- Additional -->
                    <div>
                        ${data.languages ? `
                        <div style="margin-bottom: 1.5rem;">
                            <h2 style="color: ${color}; font-size: 1.2rem; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 1rem; border-bottom: 1px solid #ddd; padding-bottom: 0.5rem;">Languages</h2>
                            <p style="color: #444;">${data.languages}</p>
                        </div>
                        ` : ''}
                        
                        ${data.certifications ? `
                        <div>
                            <h2 style="color: ${color}; font-size: 1.2rem; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 1rem; border-bottom: 1px solid #ddd; padding-bottom: 0.5rem;">Certifications</h2>
                            <p style="color: #444;">${data.certifications}</p>
                        </div>
                        ` : ''}
                    </div>
                </div>
            </div>
        </div>
    `;
}

function generateModernPreview(data, color) {
    return `
        <div class="resume-modern" style="font-family: 'Segoe UI', 'Roboto', sans-serif; max-width: 800px; margin: 0 auto; background: linear-gradient(135deg, #f5f7ff 0%, #ffffff 100%); padding: 2rem; border-radius: 15px; box-shadow: 0 10px 30px rgba(0,0,0,0.08);">
            <!-- Header with accent -->
            <div style="position: relative; margin-bottom: 2rem;">
                <div style="width: 100px; height: 4px; background-color: ${color}; margin-bottom: 1rem;"></div>
                <h1 style="margin: 0; font-size: 2.8rem; font-weight: 300; color: #2d3436;">
                    ${data.personal.name.split(' ').map((name, i) => 
                        i === data.personal.name.split(' ').length - 1 ? 
                        `<span style="font-weight: 700; color: ${color}">${name}</span>` : 
                        name + ' '
                    ).join('')}
                </h1>
                <div style="display: flex; flex-wrap: wrap; gap: 1rem; margin-top: 1rem; color: #666;">
                    <div style="display: flex; align-items: center;">
                        <span style="background-color: ${color}20; padding: 0.25rem 0.75rem; border-radius: 15px; font-size: 0.9rem;">
                            📧 ${data.personal.email}
                        </span>
                    </div>
                    <div style="display: flex; align-items: center;">
                        <span style="background-color: ${color}20; padding: 0.25rem 0.75rem; border-radius: 15px; font-size: 0.9rem;">
                            📱 ${data.personal.phone}
                        </span>
                    </div>
                    <div style="display: flex; align-items: center;">
                        <span style="background-color: ${color}20; padding: 0.25rem 0.75rem; border-radius: 15px; font-size: 0.9rem;">
                            📍 ${data.personal.address}
                        </span>
                    </div>
                </div>
            </div>
            
            <!-- Summary -->
            <div style="margin-bottom: 2.5rem;">
                <div style="display: flex; align-items: center; margin-bottom: 1rem;">
                    <div style="width: 30px; height: 30px; background-color: ${color}; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 1rem;">
                        <span style="color: white; font-weight: bold;">∑</span>
                    </div>
                    <h2 style="margin: 0; color: #2d3436; font-size: 1.3rem;">Summary</h2>
                </div>
                <p style="color: #666; line-height: 1.6; padding-left: 3rem;">${data.personal.summary}</p>
            </div>
            
            <!-- Experience & Education Side by Side -->
            <div style="display: flex; gap: 2rem; margin-bottom: 2.5rem;">
                <!-- Experience -->
                <div style="flex: 1;">
                    <div style="display: flex; align-items: center; margin-bottom: 1rem;">
                        <div style="width: 30px; height: 30px; background-color: ${color}; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 1rem;">
                            <span style="color: white; font-weight: bold;">💼</span>
                        </div>
                        <h2 style="margin: 0; color: #2d3436; font-size: 1.3rem;">Experience</h2>
                    </div>
                    
                    ${data.experience.map(exp => `
                        <div style="margin-bottom: 1.5rem; padding-left: 3rem; position: relative;">
                            <div style="position: absolute; left: 1rem; top: 0; width: 12px; height: 12px; background-color: ${color}; border-radius: 50%;"></div>
                            <div style="position: absolute; left: 1.4rem; top: 12px; bottom: -1.5rem; width: 2px; background-color: ${color}50;"></div>
                            
                            <div style="margin-bottom: 0.5rem;">
                                <h3 style="margin: 0 0 0.25rem 0; font-size: 1.1rem; color: #2d3436;">${exp.title}</h3>
                                <div style="color: ${color}; font-weight: 600; font-size: 0.95rem;">${exp.company}</div>
                            </div>
                            <div style="color: #666; font-size: 0.9rem; margin-bottom: 0.5rem;">${exp.startDate} - ${exp.endDate}</div>
                            <p style="color: #666; font-size: 0.9rem; line-height: 1.5;">${exp.responsibilities}</p>
                        </div>
                    `).join('')}
                </div>
                
                <!-- Education -->
                <div style="flex: 1;">
                    <div style="display: flex; align-items: center; margin-bottom: 1rem;">
                        <div style="width: 30px; height: 30px; background-color: ${color}; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 1rem;">
                            <span style="color: white; font-weight: bold;">🎓</span>
                        </div>
                        <h2 style="margin: 0; color: #2d3436; font-size: 1.3rem;">Education</h2>
                    </div>
                    
                    ${data.education.map(edu => `
                        <div style="margin-bottom: 1.5rem; padding-left: 3rem; position: relative;">
                            <div style="position: absolute; left: 1rem; top: 0; width: 12px; height: 12px; background-color: ${color}; border-radius: 50%;"></div>
                            <div style="position: absolute; left: 1.4rem; top: 12px; bottom: -1.5rem; width: 2px; background-color: ${color}50;"></div>
                            
                            <div style="margin-bottom: 0.5rem;">
                                <h3 style="margin: 0 0 0.25rem 0; font-size: 1.1rem; color: #2d3436;">${edu.institution}</h3>
                                <div style="color: ${color}; font-weight: 600; font-size: 0.95rem;">${edu.degree} in ${edu.field}</div>
                            </div>
                            <div style="color: #666; font-size: 0.9rem; margin-bottom: 0.5rem;">${edu.graduation}</div>
                            ${edu.achievements ? `<p style="color: #666; font-size: 0.9rem; line-height: 1.5;"><em>${edu.achievements}</em></p>` : ''}
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <!-- Skills & Additional -->
            <div style="display: flex; gap: 2rem;">
                <!-- Skills -->
                <div style="flex: 1;">
                    <div style="display: flex; align-items: center; margin-bottom: 1rem;">
                        <div style="width: 30px; height: 30px; background-color: ${color}; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 1rem;">
                            <span style="color: white; font-weight: bold;">⚡</span>
                        </div>
                        <h2 style="margin: 0; color: #2d3436; font-size: 1.3rem;">Skills</h2>
                    </div>
                    
                    <div style="padding-left: 3rem;">
                        <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
                            ${data.skills.map(skill => `
                                <span style="background-color: ${color}; color: white; padding: 0.5rem 1rem; border-radius: 25px; font-size: 0.9rem; font-weight: 500;">
                                    ${skill}
                                </span>
                            `).join('')}
                        </div>
                    </div>
                </div>
                
                <!-- Additional -->
                <div style="flex: 1;">
                    ${data.languages ? `
                    <div style="margin-bottom: 1.5rem;">
                        <div style="display: flex; align-items: center; margin-bottom: 0.5rem;">
                            <div style="width: 25px; height: 25px; background-color: ${color}; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 0.75rem;">
                                <span style="color: white; font-size: 0.8rem; font-weight: bold;">🌐</span>
                            </div>
                            <h3 style="margin: 0; color: #2d3436; font-size: 1.1rem;">Languages</h3>
                        </div>
                        <p style="color: #666; font-size: 0.9rem; padding-left: 2.5rem;">${data.languages}</p>
                    </div>
                    ` : ''}
                    
                    ${data.certifications ? `
                    <div>
                        <div style="display: flex; align-items: center; margin-bottom: 0.5rem;">
                            <div style="width: 25px; height: 25px; background-color: ${color}; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 0.75rem;">
                                <span style="color: white; font-size: 0.8rem; font-weight: bold;">🏆</span>
                            </div>
                            <h3 style="margin: 0; color: #2d3436; font-size: 1.1rem;">Certifications</h3>
                        </div>
                        <p style="color: #666; font-size: 0.9rem; padding-left: 2.5rem;">${data.certifications}</p>
                    </div>
                    ` : ''}
                </div>
            </div>
        </div>
    `;
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { resumeTemplates, loadTemplates };
}