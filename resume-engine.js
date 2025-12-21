// resume-engine.js - World-Class Resume Generator

class ResumeEngine {
    constructor() {
        this.templates = this.getTemplates();
        this.currentTemplate = 'executive';
        this.resumeData = this.loadResumeData();
        this.init();
    }

    init() {
        this.renderTemplates();
        this.bindEvents();
        this.loadFromStorage();
        this.setupFormValidation();
        this.setupAIEnhancement();
        
        // Auto-save form changes
        this.setupAutoSave();
    }

    getTemplates() {
        return [
            {
                id: 'executive',
                name: 'Executive',
                description: 'Premium design for senior professionals',
                category: 'premium',
                color: '#c9a959',
                accent: '#0a2342',
                layout: 'traditional',
                icon: 'fas fa-crown'
            },
            {
                id: 'modern',
                name: 'Modern',
                description: 'Contemporary design with clean lines',
                category: 'professional',
                color: '#1c3b5e',
                accent: '#c9a959',
                layout: 'modern',
                icon: 'fas fa-bolt'
            },
            {
                id: 'creative',
                name: 'Creative',
                description: 'Innovative design for creative fields',
                category: 'creative',
                color: '#2c3e50',
                accent: '#c9a959',
                layout: 'creative',
                icon: 'fas fa-palette'
            },
            {
                id: 'minimal',
                name: 'Minimalist',
                description: 'Clean and simple ATS-friendly',
                category: 'professional',
                color: '#4a6572',
                accent: '#c9a959',
                layout: 'minimal',
                icon: 'fas fa-minimize'
            },
            {
                id: 'academic',
                name: 'Academic',
                description: 'Formal design for research roles',
                category: 'academic',
                color: '#0a2342',
                accent: '#c9a959',
                layout: 'academic',
                icon: 'fas fa-graduation-cap'
            },
            {
                id: 'corporate',
                name: 'Corporate',
                description: 'Traditional business design',
                category: 'professional',
                color: '#2d4a7a',
                accent: '#c9a959',
                layout: 'corporate',
                icon: 'fas fa-building'
            }
        ];
    }

    renderTemplates() {
        const container = document.getElementById('templateContainer');
        if (!container) return;

        container.innerHTML = this.templates.map(template => `
            <div class="template-card ${template.id === this.currentTemplate ? 'selected' : ''}" 
                 data-template="${template.id}">
                <div class="template-preview" style="background: linear-gradient(135deg, ${template.color}, ${this.darkenColor(template.color, 20)})">
                    <div class="template-name">${template.name}</div>
                    <i class="${template.icon}" style="font-size: 2rem; margin-top: 10px;"></i>
                    ${template.category === 'premium' ? '<span class="premium-badge"><i class="fas fa-crown"></i></span>' : ''}
                </div>
                <div class="template-info">
                    <h4>${template.name}</h4>
                    <p>${template.description}</p>
                    <button class="btn btn-outline select-template" data-template="${template.id}">
                        <i class="fas fa-check"></i> ${template.id === this.currentTemplate ? 'Selected' : 'Select'}
                    </button>
                </div>
            </div>
        `).join('');

        // Add event listeners
        document.querySelectorAll('.select-template').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const templateId = e.target.closest('.select-template').dataset.template;
                this.selectTemplate(templateId);
            });
        });
    }

    selectTemplate(templateId) {
        this.currentTemplate = templateId;
        document.querySelectorAll('.template-card').forEach(card => {
            card.classList.remove('selected');
        });
        const selectedCard = document.querySelector(`.template-card[data-template="${templateId}"]`);
        if (selectedCard) {
            selectedCard.classList.add('selected');
        }
        this.saveToStorage();
        this.generatePreview();
        this.showNotification(`"${this.templates.find(t => t.id === templateId).name}" template selected`, 'success');
    }

    bindEvents() {
        // Form auto-save
        const form = document.getElementById('resumeForm');
        if (form) {
            form.addEventListener('input', this.debounce(() => {
                this.saveFormData();
            }, 500));

            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.generateResume();
            });
        }

        // Download PDF button
        const downloadPdf = document.getElementById('downloadPdf');
        if (downloadPdf) {
            downloadPdf.addEventListener('click', () => this.downloadPDF());
        }

        // AI enhancement button
        const enhanceBtn = document.getElementById('enhanceResume');
        if (enhanceBtn) {
            enhanceBtn.addEventListener('click', () => this.enhanceWithAI());
        }
    }

    setupAutoSave() {
        // Auto-save every 30 seconds
        setInterval(() => {
            if (Object.keys(this.resumeData).length > 0) {
                this.saveToStorage();
                console.log('Auto-saved resume data');
            }
        }, 30000);
    }

    saveFormData() {
        const form = document.getElementById('resumeForm');
        if (!form) return;

        const formData = new FormData(form);
        this.resumeData = Object.fromEntries(formData);
        
        // Update preview if there's significant data
        if (this.resumeData.fullName || this.resumeData.summary) {
            this.generatePreview();
        }
    }

    saveToStorage() {
        const data = {
            template: this.currentTemplate,
            formData: this.resumeData,
            lastUpdated: new Date().toISOString(),
            version: '1.0'
        };
        localStorage.setItem('9to5Resume', JSON.stringify(data));
    }

    loadFromStorage() {
        const saved = localStorage.getItem('9to5Resume');
        if (saved) {
            try {
                const data = JSON.parse(saved);
                this.currentTemplate = data.template || 'executive';
                this.resumeData = data.formData || {};
                this.populateForm();
                this.renderTemplates(); // Re-render templates with correct selection
            } catch (e) {
                console.error('Error loading saved resume:', e);
                localStorage.removeItem('9to5Resume');
            }
        }
        this.generatePreview();
    }

    loadResumeData() {
        const saved = localStorage.getItem('9to5Resume');
        if (saved) {
            try {
                const data = JSON.parse(saved);
                return data.formData || {};
            } catch (e) {
                return {};
            }
        }
        return {};
    }

    populateForm() {
        const form = document.getElementById('resumeForm');
        if (!form || !this.resumeData) return;

        Object.keys(this.resumeData).forEach(key => {
            const element = form.querySelector(`[name="${key}"]`);
            if (element) {
                element.value = this.resumeData[key];
            }
        });
    }

    generateResume() {
        if (!this.validateForm()) {
            this.showNotification('Please fill in all required fields', 'error');
            return;
        }

        this.saveFormData();
        this.generatePreview();
        this.showNotification('Resume updated successfully!', 'success');
        
        // Auto-enhance with AI suggestions
        setTimeout(() => this.suggestImprovements(), 1000);
    }

    validateForm() {
        const required = ['fullName', 'email', 'phone', 'jobTitle', 'summary'];
        return required.every(field => {
            const value = this.resumeData[field];
            return value && value.trim().length > 0;
        });
    }

    generatePreview() {
        const preview = document.getElementById('resumePreview');
        if (!preview) return;

        const template = this.templates.find(t => t.id === this.currentTemplate);
        preview.innerHTML = this.createResumeHTML(template);
    }

    createResumeHTML(template) {
        const data = this.resumeData;
        
        // If no data, show placeholder
        if (!data.fullName && !data.summary) {
            return `
                <div class="preview-placeholder">
                    <i class="fas fa-file-alt"></i>
                    <h4>Your Resume Preview</h4>
                    <p>Fill in your details and select a template to see your professional resume here</p>
                    <button class="btn btn-gold" onclick="document.querySelector('#resumeForm').scrollIntoView()">
                        <i class="fas fa-arrow-down"></i> Start Building
                    </button>
                </div>
            `;
        }

        return `
            <div class="resume-preview-content" style="
                font-family: 'Segoe UI', 'Montserrat', sans-serif;
                max-width: 210mm;
                margin: 0 auto;
                background: white;
                color: #2c3e50;
                min-height: 297mm;
                position: relative;
                box-shadow: 0 0 20px rgba(0,0,0,0.1);
            ">
                <!-- Header -->
                <header style="
                    background: ${template.color};
                    color: white;
                    padding: 40px;
                    position: relative;
                    overflow: hidden;
                ">
                    <div style="position: absolute; top: 0; right: 0; width: 200px; height: 200px; 
                         background: linear-gradient(45deg, transparent 40%, rgba(255,255,255,0.1) 50%, transparent 60%);
                         transform: rotate(45deg) translate(60px, -100px);">
                    </div>
                    
                    <h1 style="margin: 0 0 10px 0; font-size: 36px; font-weight: 700; letter-spacing: 0.5px;">
                        ${data.fullName || 'YOUR NAME'}
                    </h1>
                    <p style="margin: 0 0 20px 0; font-size: 20px; opacity: 0.9; font-weight: 300;">
                        ${data.jobTitle || 'PROFESSIONAL TITLE'}
                    </p>
                    
                    <div style="display: flex; flex-wrap: wrap; gap: 20px; font-size: 14px;">
                        ${data.email ? `<span style="display: flex; align-items: center; gap: 5px;"><i class="fas fa-envelope"></i> ${data.email}</span>` : ''}
                        ${data.phone ? `<span style="display: flex; align-items: center; gap: 5px;"><i class="fas fa-phone"></i> ${data.phone}</span>` : ''}
                        ${data.location ? `<span style="display: flex; align-items: center; gap: 5px;"><i class="fas fa-map-marker-alt"></i> ${data.location}</span>` : ''}
                        ${data.website ? `<span style="display: flex; align-items: center; gap: 5px;"><i class="fas fa-globe"></i> ${data.website.replace('https://', '').replace('http://', '')}</span>` : ''}
                        ${data.linkedin ? `<span style="display: flex; align-items: center; gap: 5px;"><i class="fab fa-linkedin"></i> ${data.linkedin.replace('https://', '').replace('http://', '').replace('www.', '').replace('linkedin.com/in/', '')}</span>` : ''}
                    </div>
                </header>

                <!-- Main Content -->
                <div style="padding: 40px; display: grid; grid-template-columns: 2fr 1fr; gap: 40px;">
                    <!-- Left Column -->
                    <div>
                        <!-- Professional Summary -->
                        ${data.summary ? `
                            <section style="margin-bottom: 30px;">
                                <h2 style="color: ${template.color}; border-bottom: 3px solid ${template.accent}; 
                                    padding-bottom: 10px; margin-bottom: 20px; font-size: 22px; display: flex; align-items: center; gap: 10px;">
                                    <i class="fas fa-user-tie"></i> PROFESSIONAL SUMMARY
                                </h2>
                                <p style="line-height: 1.6; font-size: 15px; white-space: pre-line;">${data.summary}</p>
                            </section>
                        ` : ''}

                        <!-- Work Experience -->
                        ${this.renderExperienceSection(template)}

                        <!-- Education -->
                        ${data.school || data.degree ? `
                            <section style="margin-bottom: 30px;">
                                <h2 style="color: ${template.color}; border-bottom: 3px solid ${template.accent}; 
                                    padding-bottom: 10px; margin-bottom: 20px; font-size: 22px; display: flex; align-items: center; gap: 10px;">
                                    <i class="fas fa-graduation-cap"></i> EDUCATION
                                </h2>
                                <div style="margin-bottom: 20px;">
                                    <h3 style="margin: 0 0 5px 0; font-size: 18px; color: ${template.color};">${data.degree || 'Degree'}</h3>
                                    <p style="margin: 0 0 8px 0; font-weight: 600;">${data.school || 'Institution'}</p>
                                    ${data.graduationYear ? `<p style="margin: 0; color: #7f8c8d;">${data.graduationYear}${data.educationDetails ? ' | ' + data.educationDetails : ''}</p>` : ''}
                                </div>
                            </section>
                        ` : ''}
                        
                        <!-- Projects -->
                        ${data.projects ? `
                            <section style="margin-bottom: 30px;">
                                <h2 style="color: ${template.color}; border-bottom: 3px solid ${template.accent}; 
                                    padding-bottom: 10px; margin-bottom: 20px; font-size: 22px; display: flex; align-items: center; gap: 10px;">
                                    <i class="fas fa-project-diagram"></i> NOTABLE PROJECTS
                                </h2>
                                <p style="line-height: 1.6; font-size: 15px; white-space: pre-line;">${data.projects}</p>
                            </section>
                        ` : ''}
                    </div>

                    <!-- Right Column -->
                    <div>
                        <!-- Skills -->
                        ${data.skills ? `
                            <section style="margin-bottom: 30px;">
                                <h2 style="color: ${template.color}; border-bottom: 3px solid ${template.accent}; 
                                    padding-bottom: 10px; margin-bottom: 20px; font-size: 22px; display: flex; align-items: center; gap: 10px;">
                                    <i class="fas fa-tools"></i> SKILLS
                                </h2>
                                <div style="display: flex; flex-wrap: wrap; gap: 8px;">
                                    ${data.skills.split(',').filter(skill => skill.trim()).map(skill => `
                                        <span style="
                                            background: ${template.color}15;
                                            color: ${template.color};
                                            padding: 6px 12px;
                                            border-radius: 20px;
                                            font-size: 13px;
                                            font-weight: 500;
                                            border: 1px solid ${template.color}30;
                                        ">
                                            ${skill.trim()}
                                        </span>
                                    `).join('')}
                                </div>
                            </section>
                        ` : ''}

                        <!-- Certifications -->
                        ${data.certifications ? `
                            <section style="margin-bottom: 30px;">
                                <h2 style="color: ${template.color}; border-bottom: 3px solid ${template.accent}; 
                                    padding-bottom: 10px; margin-bottom: 20px; font-size: 22px; display: flex; align-items: center; gap: 10px;">
                                    <i class="fas fa-certificate"></i> CERTIFICATIONS
                                </h2>
                                <p style="line-height: 1.6; font-size: 14px; white-space: pre-line;">${data.certifications}</p>
                            </section>
                        ` : ''}

                        <!-- Languages -->
                        ${data.languages ? `
                            <section style="margin-bottom: 30px;">
                                <h2 style="color: ${template.color}; border-bottom: 3px solid ${template.accent}; 
                                    padding-bottom: 10px; margin-bottom: 20px; font-size: 22px; display: flex; align-items: center; gap: 10px;">
                                    <i class="fas fa-language"></i> LANGUAGES
                                </h2>
                                <p style="line-height: 1.6; font-size: 14px;">${data.languages}</p>
                            </section>
                        ` : ''}
                    </div>
                </div>

                <!-- Footer -->
                <footer style="
                    padding: 20px 40px;
                    background: #f8f9fa;
                    border-top: 1px solid #e9ecef;
                    text-align: center;
                    color: #6c757d;
                    font-size: 12px;
                ">
                    <p style="margin: 0;">
                        Generated with 9to5 University Resume Pro • ${new Date().toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                        })}
                    </p>
                </footer>
            </div>
        `;
    }

    renderExperienceSection(template) {
        const experiences = [];
        for (let i = 1; i <= 3; i++) {
            const title = this.resumeData[`jobTitle${i}`];
            const company = this.resumeData[`company${i}`];
            const dates = this.resumeData[`dates${i}`];
            const location = this.resumeData[`location${i}`];
            const description = this.resumeData[`description${i}`];

            if (title || company) {
                experiences.push(`
                    <div style="margin-bottom: 25px;">
                        <h3 style="margin: 0 0 5px 0; font-size: 18px; color: ${template.color};">${title || 'Position'}</h3>
                        <p style="margin: 0 0 8px 0; font-weight: 600;">
                            ${company || 'Company'}
                            ${dates ? ` | ${dates}` : ''}
                            ${location ? ` | ${location}` : ''}
                        </p>
                        ${description ? `<p style="margin: 0; line-height: 1.6; font-size: 14px; white-space: pre-line;">${description}</p>` : ''}
                    </div>
                `);
            }
        }
        
        if (experiences.length === 0) {
            return '';
        }
        
        return `
            <section style="margin-bottom: 30px;">
                <h2 style="color: ${template.color}; border-bottom: 3px solid ${template.accent}; 
                    padding-bottom: 10px; margin-bottom: 20px; font-size: 22px; display: flex; align-items: center; gap: 10px;">
                    <i class="fas fa-briefcase"></i> WORK EXPERIENCE
                </h2>
                ${experiences.join('')}
            </section>
        `;
    }

    async downloadPDF() {
        const preview = document.getElementById('resumePreview');
        if (!preview || preview.querySelector('.preview-placeholder')) {
            this.showNotification('Please fill in your resume details first', 'error');
            return;
        }

        this.showNotification('Generating professional PDF...', 'info');

        try {
            // Create a new window for printing
            const printWindow = window.open('', '_blank');
            const template = this.templates.find(t => t.id === this.currentTemplate);
            const data = this.resumeData;
            
            const printContent = `
                <!DOCTYPE html>
                <html>
                <head>
                    <title>${data.fullName || 'Resume'} - 9to5 University</title>
                    <style>
                        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap');
                        
                        * {
                            margin: 0;
                            padding: 0;
                            box-sizing: border-box;
                        }
                        
                        body {
                            font-family: 'Montserrat', sans-serif;
                            color: #2c3e50;
                            line-height: 1.6;
                            -webkit-print-color-adjust: exact !important;
                            print-color-adjust: exact !important;
                            background: white;
                        }
                        
                        .resume-page {
                            width: 210mm;
                            min-height: 297mm;
                            margin: 0 auto;
                            background: white;
                            position: relative;
                        }
                        
                        .header {
                            background: ${template.color};
                            color: white;
                            padding: 35px 40px;
                            position: relative;
                            overflow: hidden;
                        }
                        
                        .header::after {
                            content: '';
                            position: absolute;
                            top: 0;
                            right: 0;
                            width: 200px;
                            height: 200px;
                            background: linear-gradient(45deg, transparent 40%, rgba(255,255,255,0.1) 50%, transparent 60%);
                            transform: rotate(45deg) translate(60px, -100px);
                        }
                        
                        .name {
                            font-size: 36px;
                            font-weight: 700;
                            margin-bottom: 8px;
                            letter-spacing: 0.5px;
                        }
                        
                        .title {
                            font-size: 20px;
                            opacity: 0.9;
                            margin-bottom: 25px;
                            font-weight: 300;
                        }
                        
                        .contact-info {
                            display: flex;
                            flex-wrap: wrap;
                            gap: 20px;
                            font-size: 14px;
                        }
                        
                        .contact-info span {
                            display: flex;
                            align-items: center;
                            gap: 8px;
                        }
                        
                        .content {
                            padding: 40px;
                            display: grid;
                            grid-template-columns: 2fr 1fr;
                            gap: 40px;
                        }
                        
                        .section {
                            margin-bottom: 30px;
                        }
                        
                        .section-title {
                            color: ${template.color};
                            border-bottom: 3px solid ${template.accent};
                            padding-bottom: 10px;
                            margin-bottom: 20px;
                            font-size: 22px;
                            display: flex;
                            align-items: center;
                            gap: 10px;
                        }
                        
                        .skill-tag {
                            background: ${template.color}15;
                            color: ${template.color};
                            padding: 6px 12px;
                            border-radius: 20px;
                            font-size: 13px;
                            font-weight: 500;
                            border: 1px solid ${template.color}30;
                            display: inline-block;
                            margin: 2px;
                        }
                        
                        .footer {
                            padding: 20px 40px;
                            background: #f8f9fa;
                            border-top: 1px solid #e9ecef;
                            text-align: center;
                            color: #6c757d;
                            font-size: 12px;
                        }
                        
                        @media print {
                            body { 
                                margin: 0;
                                padding: 0;
                            }
                            .resume-page { 
                                box-shadow: none;
                                page-break-after: always;
                            }
                            @page {
                                size: A4;
                                margin: 0;
                            }
                        }
                    </style>
                </head>
                <body>
                    ${preview.innerHTML}
                    <script>
                        // Auto-print and close
                        window.onload = function() {
                            window.print();
                            setTimeout(() => {
                                window.close();
                            }, 500);
                        };
                    </script>
                </body>
                </html>
            `;
            
            printWindow.document.write(printContent);
            printWindow.document.close();
            
            this.showNotification('PDF ready! Check your print dialog.', 'success');
            
        } catch (error) {
            console.error('PDF generation error:', error);
            this.showNotification('Error generating PDF. Please try the print option instead.', 'error');
            
            // Fallback: Use browser print directly
            setTimeout(() => {
                window.print();
            }, 500);
        }
    }

    setupAIEnhancement() {
        // AI-powered resume enhancement
        const enhanceBtn = document.getElementById('enhanceResume');
        if (enhanceBtn) {
            enhanceBtn.addEventListener('click', () => this.enhanceWithAI());
        }
    }

    async enhanceWithAI() {
        this.showNotification('Analyzing your resume for improvements...', 'info');
        
        // Simulate AI analysis
        setTimeout(() => {
            const suggestions = this.generateAISuggestions();
            this.showAISuggestions(suggestions);
        }, 1500);
    }

    generateAISuggestions() {
        const suggestions = [];
        const data = this.resumeData;

        // Check summary length and content
        if (!data.summary || data.summary.length < 100) {
            suggestions.push({
                type: 'summary',
                message: 'Your professional summary could be more impactful',
                suggestion: 'Add quantifiable achievements and specific skills. Aim for 3-5 sentences.'
            });
        }

        // Check skills formatting
        if (data.skills && data.skills.split(',').length < 5) {
            suggestions.push({
                type: 'skills',
                message: 'Consider adding more relevant skills',
                suggestion: 'Include 8-12 relevant technical and soft skills separated by commas.'
            });
        }

        // Check for action verbs in experience
        let hasActionVerbs = false;
        for (let i = 1; i <= 3; i++) {
            const desc = data[`description${i}`];
            if (desc && (desc.includes('Led') || desc.includes('Managed') || desc.includes('Increased') || 
                         desc.includes('Reduced') || desc.includes('Improved') || desc.includes('Developed'))) {
                hasActionVerbs = true;
                break;
            }
        }

        if (!hasActionVerbs && (data.description1 || data.description2 || data.description3)) {
            suggestions.push({
                type: 'experience',
                message: 'Use stronger action verbs in your experience descriptions',
                suggestion: 'Start bullet points with action verbs: Led, Managed, Increased, Reduced, Improved, Developed, etc.'
            });
        }

        // Check for metrics
        let hasMetrics = false;
        for (let i = 1; i <= 3; i++) {
            const desc = data[`description${i}`];
            if (desc && (desc.match(/\d+%/) || desc.match(/\$\d+/))) {
                hasMetrics = true;
                break;
            }
        }

        if (!hasMetrics && (data.description1 || data.description2 || data.description3)) {
            suggestions.push({
                type: 'metrics',
                message: 'Add quantifiable metrics to demonstrate impact',
                suggestion: 'Include numbers and percentages (e.g., "Increased sales by 25%", "Reduced costs by $10,000")'
            });
        }

        return suggestions;
    }

    showAISuggestions(suggestions) {
        const aiPanel = document.createElement('div');
        aiPanel.className = 'ai-suggestions-panel';
        aiPanel.innerHTML = `
            <div class="ai-header">
                <i class="fas fa-robot"></i>
                <h3>AI Resume Analysis</h3>
                <button class="close-ai">&times;</button>
            </div>
            <div class="ai-content">
                ${suggestions.length > 0 ? `
                    <p>We found ${suggestions.length} area${suggestions.length > 1 ? 's' : ''} for improvement:</p>
                    ${suggestions.map((s, i) => `
                        <div class="suggestion-item">
                            <span class="suggestion-number">${i + 1}</span>
                            <div class="suggestion-content">
                                <strong>${s.type.toUpperCase()}</strong>
                                <p>${s.message}</p>
                                <small><i class="fas fa-lightbulb"></i> ${s.suggestion}</small>
                            </div>
                        </div>
                    `).join('')}
                    <div class="ai-actions">
                        <button class="btn btn-gold btn-sm" onclick="applyAISuggestions()">
                            <i class="fas fa-magic"></i> Apply Suggestions
                        </button>
                        <button class="btn btn-outline btn-sm" onclick="closeAIPanel()">
                            <i class="fas fa-times"></i> Dismiss
                        </button>
                    </div>
                ` : `
                    <div class="ai-success">
                        <i class="fas fa-check-circle"></i>
                        <p>Excellent! Your resume looks strong and professional.</p>
                        <small>Continue refining and remember to customize for each job application.</small>
                    </div>
                `}
            </div>
        `;

        // Add styles
        aiPanel.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: white;
            border-radius: 12px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.2);
            z-index: 3000;
            width: 90%;
            max-width: 500px;
            overflow: hidden;
        `;

        const headerStyle = `
            background: linear-gradient(135deg, var(--navy-dark), var(--navy-medium));
            color: white;
            padding: 20px;
            display: flex;
            align-items: center;
            gap: 15px;
        `;

        aiPanel.querySelector('.ai-header').style.cssText = headerStyle;
        
        const closeBtn = aiPanel.querySelector('.close-ai');
        closeBtn.addEventListener('click', () => aiPanel.remove());
        
        // Add window functions
        window.applyAISuggestions = () => {
            this.applyAISuggestions();
            aiPanel.remove();
        };
        
        window.closeAIPanel = () => {
            aiPanel.remove();
        };
        
        document.body.appendChild(aiPanel);
        
        // Close when clicking outside
        aiPanel.addEventListener('click', (e) => {
            if (e.target === aiPanel) {
                aiPanel.remove();
            }
        });
        
        // Auto-close after 15 seconds
        setTimeout(() => {
            if (aiPanel.parentNode) {
                aiPanel.remove();
            }
        }, 15000);
    }

    applyAISuggestions() {
        const data = this.resumeData;
        
        // Enhance summary if needed
        if (data.summary && data.summary.length < 100) {
            data.summary += ' Skilled in leveraging data-driven insights to optimize performance and drive business growth.';
        }
        
        // Enhance skills if needed
        if (data.skills && data.skills.split(',').length < 8) {
            const additionalSkills = ['Project Management', 'Problem Solving', 'Team Leadership', 'Strategic Planning'];
            data.skills += additionalSkills.map(skill => `, ${skill}`).join('');
        }
        
        // Save enhanced data
        this.resumeData = data;
        this.saveToStorage();
        this.populateForm();
        this.generatePreview();
        
        this.showNotification('AI suggestions applied successfully!', 'success');
    }

    setupFormValidation() {
        const form = document.getElementById('resumeForm');
        if (!form) return;

        const requiredFields = form.querySelectorAll('[required]');
        requiredFields.forEach(field => {
            field.addEventListener('blur', () => {
                if (!field.value.trim()) {
                    field.style.borderColor = 'var(--danger)';
                    field.style.boxShadow = '0 0 0 3px rgba(231, 76, 60, 0.1)';
                } else {
                    field.style.borderColor = '';
                    field.style.boxShadow = '';
                }
            });
        });
    }

    showNotification(message, type = 'info') {
        // Remove existing notifications
        const existing = document.querySelector('.resume-notification');
        if (existing) existing.remove();

        const notification = document.createElement('div');
        notification.className = `resume-notification ${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        `;

        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#27ae60' : type === 'error' ? '#e74c3c' : '#3498db'};
            color: white;
            padding: 15px 25px;
            border-radius: 8px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
            z-index: 2000;
            display: flex;
            align-items: center;
            gap: 10px;
            animation: slideIn 0.3s ease;
        `;

        // Add animation styles
        if (!document.querySelector('#notification-styles')) {
            const style = document.createElement('style');
            style.id = 'notification-styles';
            style.textContent = `
                @keyframes slideIn {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                @keyframes slideOut {
                    from { transform: translateX(0); opacity: 1; }
                    to { transform: translateX(100%); opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }

        document.body.appendChild(notification);

        // Auto-remove
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                if (notification.parentNode) notification.remove();
            }, 300);
        }, 4000);
    }

    debounce(func, wait) {
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

    darkenColor(color, percent) {
        let r = parseInt(color.substring(1, 3), 16);
        let g = parseInt(color.substring(3, 5), 16);
        let b = parseInt(color.substring(5, 7), 16);

        r = parseInt(r * (100 - percent) / 100);
        g = parseInt(g * (100 - percent) / 100);
        b = parseInt(b * (100 - percent) / 100);

        r = Math.max(0, Math.min(255, r));
        g = Math.max(0, Math.min(255, g));
        b = Math.max(0, Math.min(255, b));

        return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
    }

    suggestImprovements() {
        // Auto-suggest improvements
        const suggestions = this.generateAISuggestions();
        if (suggestions.length > 0) {
            // Only show suggestions 50% of the time to avoid being annoying
            if (Math.random() > 0.5) {
                setTimeout(() => this.showAISuggestions(suggestions), 2000);
            }
        }
    }
}

// Initialize when page loads
if (document.getElementById('resumeForm') || document.getElementById('resumePreview')) {
    document.addEventListener('DOMContentLoaded', () => {
        window.resumeEngine = new ResumeEngine();
    });
}