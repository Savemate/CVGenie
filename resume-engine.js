// Resume Engine - Handles resume generation and data management

const ResumeEngine = {
    // Current resume data
    currentResume: null,
    
    // Initialize the resume engine
    init: function() {
        console.log('Resume Engine initialized');
        this.loadSavedResume();
        this.setupEventListeners();
    },
    
    // Load saved resume from localStorage
    loadSavedResume: function() {
        try {
            const savedResume = localStorage.getItem('resumeProData');
            if (savedResume) {
                this.currentResume = JSON.parse(savedResume);
                console.log('Loaded saved resume data');
                this.populateFormFromData();
            } else {
                this.currentResume = this.getDefaultResumeData();
            }
        } catch (error) {
            console.error('Error loading saved resume:', error);
            this.currentResume = this.getDefaultResumeData();
        }
    },
    
    // Get default resume data structure
    getDefaultResumeData: function() {
        return {
            personal: {
                name: '',
                email: '',
                phone: '',
                address: '',
                linkedin: '',
                summary: ''
            },
            education: [],
            experience: [],
            skills: [],
            languages: '',
            certifications: '',
            selectedTemplate: 1,
            lastUpdated: new Date().toISOString()
        };
    },
    
    // Populate form fields from resume data
    populateFormFromData: function() {
        if (!this.currentResume) return;
        
        // Personal information
        if (this.currentResume.personal) {
            const personal = this.currentResume.personal;
            if (document.getElementById('full-name')) document.getElementById('full-name').value = personal.name || '';
            if (document.getElementById('email')) document.getElementById('email').value = personal.email || '';
            if (document.getElementById('phone')) document.getElementById('phone').value = personal.phone || '';
            if (document.getElementById('address')) document.getElementById('address').value = personal.address || '';
            if (document.getElementById('linkedin')) document.getElementById('linkedin').value = personal.linkedin || '';
            if (document.getElementById('summary')) document.getElementById('summary').value = personal.summary || '';
        }
        
        // Education
        if (this.currentResume.education && this.currentResume.education.length > 0) {
            const educationContainer = document.getElementById('education-entries');
            if (educationContainer) {
                // Clear default entry
                educationContainer.innerHTML = '';
                
                // Add saved education entries
                this.currentResume.education.forEach((edu, index) => {
                    const entry = this.createEducationEntry(edu, index === 0);
                    educationContainer.appendChild(entry);
                });
            }
        }
        
        // Experience
        if (this.currentResume.experience && this.currentResume.experience.length > 0) {
            const experienceContainer = document.getElementById('experience-entries');
            if (experienceContainer) {
                // Clear default entry
                experienceContainer.innerHTML = '';
                
                // Add saved experience entries
                this.currentResume.experience.forEach((exp, index) => {
                    const entry = this.createExperienceEntry(exp, index === 0);
                    experienceContainer.appendChild(entry);
                });
            }
        }
        
        // Skills
        if (this.currentResume.skills && this.currentResume.skills.length > 0) {
            const skillsContainer = document.getElementById('skill-tags');
            if (skillsContainer) {
                skillsContainer.innerHTML = '';
                
                this.currentResume.skills.forEach(skill => {
                    const skillTag = this.createSkillTag(skill);
                    skillsContainer.appendChild(skillTag);
                });
            }
        }
        
        // Languages and Certifications
        if (document.getElementById('languages')) document.getElementById('languages').value = this.currentResume.languages || '';
        if (document.getElementById('certifications')) document.getElementById('certifications').value = this.currentResume.certifications || '';
        
        // Selected template
        if (this.currentResume.selectedTemplate) {
            localStorage.setItem('selectedTemplate', this.currentResume.selectedTemplate.toString());
            
            // Update template selection in UI
            setTimeout(() => {
                const templateCards = document.querySelectorAll('.template-card');
                templateCards.forEach(card => {
                    card.classList.remove('selected');
                    if (card.getAttribute('data-template-id') === this.currentResume.selectedTemplate.toString()) {
                        card.classList.add('selected');
                    }
                });
            }, 100);
        }
    },
    
    // Create education entry element
    createEducationEntry: function(eduData, isFirst = false) {
        const entry = document.createElement('div');
        entry.className = 'education-entry';
        
        const showRemoveButton = !isFirst || (this.currentResume.education && this.currentResume.education.length > 1);
        
        entry.innerHTML = `
            ${!isFirst ? '<hr style="margin: 1.5rem 0;">' : ''}
            <div class="form-row">
                <div class="form-group">
                    <label>Institution Name</label>
                    <input type="text" placeholder="University Name" value="${eduData.institution || ''}">
                </div>
                <div class="form-group">
                    <label>Degree/Certificate</label>
                    <input type="text" placeholder="Bachelor of Science" value="${eduData.degree || ''}">
                </div>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label>Field of Study</label>
                    <input type="text" placeholder="Computer Science" value="${eduData.field || ''}">
                </div>
                <div class="form-group">
                    <label>Graduation Year</label>
                    <input type="text" placeholder="2020" value="${eduData.graduation || ''}">
                </div>
            </div>
            <div class="form-group">
                <label>Achievements (Optional)</label>
                <textarea rows="3" placeholder="Honors, awards, or notable achievements...">${eduData.achievements || ''}</textarea>
            </div>
            ${showRemoveButton ? '<button type="button" class="btn-small remove-entry">Remove This Entry</button>' : ''}
        `;
        
        // Add event listener to remove button
        if (showRemoveButton) {
            entry.querySelector('.remove-entry').addEventListener('click', function() {
                entry.remove();
                ResumeEngine.saveResumeData();
            });
        }
        
        return entry;
    },
    
    // Create experience entry element
    createExperienceEntry: function(expData, isFirst = false) {
        const entry = document.createElement('div');
        entry.className = 'experience-entry';
        
        const showRemoveButton = !isFirst || (this.currentResume.experience && this.currentResume.experience.length > 1);
        
        entry.innerHTML = `
            ${!isFirst ? '<hr style="margin: 1.5rem 0;">' : ''}
            <div class="form-row">
                <div class="form-group">
                    <label>Job Title</label>
                    <input type="text" placeholder="Software Developer" value="${expData.title || ''}">
                </div>
                <div class="form-group">
                    <label>Company</label>
                    <input type="text" placeholder="Tech Company Inc." value="${expData.company || ''}">
                </div>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label>Start Date</label>
                    <input type="text" placeholder="June 2020" value="${expData.startDate || ''}">
                </div>
                <div class="form-group">
                    <label>End Date</label>
                    <input type="text" placeholder="Present" value="${expData.endDate || ''}">
                </div>
            </div>
            <div class="form-group">
                <label>Responsibilities & Achievements</label>
                <textarea rows="4" placeholder="Describe your responsibilities and key achievements...">${expData.responsibilities || ''}</textarea>
            </div>
            ${showRemoveButton ? '<button type="button" class="btn-small remove-entry">Remove This Entry</button>' : ''}
        `;
        
        // Add event listener to remove button
        if (showRemoveButton) {
            entry.querySelector('.remove-entry').addEventListener('click', function() {
                entry.remove();
                ResumeEngine.saveResumeData();
            });
        }
        
        return entry;
    },
    
    // Create skill tag element
    createSkillTag: function(skillText) {
        const skillTag = document.createElement('div');
        skillTag.className = 'skill-tag';
        skillTag.innerHTML = `
            <span>${skillText}</span>
            <button class="remove-skill">&times;</button>
        `;
        
        // Add remove functionality
        skillTag.querySelector('.remove-skill').addEventListener('click', function() {
            skillTag.remove();
            ResumeEngine.saveResumeData();
        });
        
        return skillTag;
    },
    
    // Collect all resume data from form
    collectResumeData: function() {
        const resumeData = this.getDefaultResumeData();
        
        // Personal information
        resumeData.personal = {
            name: document.getElementById('full-name')?.value || '',
            email: document.getElementById('email')?.value || '',
            phone: document.getElementById('phone')?.value || '',
            address: document.getElementById('address')?.value || '',
            linkedin: document.getElementById('linkedin')?.value || '',
            summary: document.getElementById('summary')?.value || ''
        };
        
        // Education
        const educationEntries = document.querySelectorAll('.education-entry');
        educationEntries.forEach(entry => {
            const inputs = entry.querySelectorAll('input, textarea');
            if (inputs.length >= 5) {
                resumeData.education.push({
                    institution: inputs[0].value,
                    degree: inputs[1].value,
                    field: inputs[2].value,
                    graduation: inputs[3].value,
                    achievements: inputs[4].value
                });
            }
        });
        
        // Experience
        const experienceEntries = document.querySelectorAll('.experience-entry');
        experienceEntries.forEach(entry => {
            const inputs = entry.querySelectorAll('input, textarea');
            if (inputs.length >= 5) {
                resumeData.experience.push({
                    title: inputs[0].value,
                    company: inputs[1].value,
                    startDate: inputs[2].value,
                    endDate: inputs[3].value,
                    responsibilities: inputs[4].value
                });
            }
        });
        
        // Skills
        const skillTags = document.querySelectorAll('.skill-tag span');
        skillTags.forEach(tag => {
            resumeData.skills.push(tag.textContent);
        });
        
        // Languages and Certifications
        resumeData.languages = document.getElementById('languages')?.value || '';
        resumeData.certifications = document.getElementById('certifications')?.value || '';
        
        // Selected template
        const selectedTemplate = localStorage.getItem('selectedTemplate') || '1';
        resumeData.selectedTemplate = parseInt(selectedTemplate);
        
        // Update timestamp
        resumeData.lastUpdated = new Date().toISOString();
        
        return resumeData;
    },
    
    // Save resume data to localStorage
    saveResumeData: function() {
        try {
            this.currentResume = this.collectResumeData();
            localStorage.setItem('resumeProData', JSON.stringify(this.currentResume));
            console.log('Resume data saved');
            
            // Update preview if on preview section
            if (typeof updateResumePreview === 'function') {
                updateResumePreview();
            }
            
            return true;
        } catch (error) {
            console.error('Error saving resume data:', error);
            return false;
        }
    },
    
    // Export resume as JSON
    exportAsJSON: function() {
        const data = this.collectResumeData();
        const dataStr = JSON.stringify(data, null, 2);
        const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
        
        const exportFileDefaultName = `resume-${new Date().toISOString().split('T')[0]}.json`;
        
        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileDefaultName);
        linkElement.click();
        
        return true;
    },
    
    // Import resume from JSON file
    importFromJSON: function(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            
            reader.onload = (event) => {
                try {
                    const importedData = JSON.parse(event.target.result);
                    
                    // Validate the imported data structure
                    if (!importedData.personal || !importedData.education || !importedData.experience || !importedData.skills) {
                        throw new Error('Invalid resume data structure');
                    }
                    
                    this.currentResume = importedData;
                    localStorage.setItem('resumeProData', JSON.stringify(this.currentResume));
                    
                    // Reload the form with imported data
                    this.populateFormFromData();
                    
                    resolve(true);
                } catch (error) {
                    reject(error);
                }
            };
            
            reader.onerror = () => {
                reject(new Error('Failed to read file'));
            };
            
            reader.readAsText(file);
        });
    },
    
    // Generate resume as PDF (placeholder - would integrate with a PDF library)
    generatePDF: function() {
        alert('PDF generation would be implemented with a library like jsPDF or by calling a backend service.\n\nFor this demo, you can use your browser\'s print function (Ctrl+P) to save as PDF.');
        
        // Collect data for PDF generation
        const resumeData = this.collectResumeData();
        
        // In a real implementation, you would:
        // 1. Use jsPDF to generate PDF client-side, OR
        // 2. Send data to a server to generate PDF, OR
        // 3. Use window.print() for a simple solution
        
        // Simple solution: Trigger print dialog
        // window.print();
        
        return resumeData;
    },
    
    // Reset resume to default
    resetResume: function() {
        if (confirm('Are you sure you want to reset your resume? All current data will be lost.')) {
            localStorage.removeItem('resumeProData');
            this.currentResume = this.getDefaultResumeData();
            this.populateFormFromData();
            return true;
        }
        return false;
    },
    
    // Setup event listeners for auto-save
    setupEventListeners: function() {
        // Auto-save on form changes with debouncing
        let saveTimeout;
        
        const autoSaveHandler = () => {
            clearTimeout(saveTimeout);
            saveTimeout = setTimeout(() => {
                this.saveResumeData();
            }, 1000); // Save 1 second after last change
        };
        
        // Listen to input events on form fields
        const formInputs = document.querySelectorAll('input, textarea, select');
        formInputs.forEach(input => {
            input.addEventListener('input', autoSaveHandler);
            input.addEventListener('change', autoSaveHandler);
        });
        
        // Listen to skill addition/removal
        const skillInput = document.getElementById('skills-input');
        const addSkillBtn = document.getElementById('add-skill-btn');
        
        if (addSkillBtn && skillInput) {
            addSkillBtn.addEventListener('click', () => {
                setTimeout(autoSaveHandler, 100);
            });
            
            skillInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    setTimeout(autoSaveHandler, 100);
                }
            });
        }
        
        // Listen to template selection
        document.addEventListener('templateSelected', autoSaveHandler);
        
        // Save before page unload
        window.addEventListener('beforeunload', () => {
            this.saveResumeData();
        });
        
        // Periodic auto-save (every 30 seconds)
        setInterval(() => {
            this.saveResumeData();
        }, 30000);
    },
    
    // Get resume statistics
    getResumeStats: function() {
        const data = this.collectResumeData();
        
        return {
            personalInfoComplete: this.isPersonalInfoComplete(data.personal),
            educationCount: data.education.length,
            experienceCount: data.experience.length,
            skillCount: data.skills.length,
            lastUpdated: data.lastUpdated,
            overallCompleteness: this.calculateCompleteness(data)
        };
    },
    
    // Check if personal info is complete
    isPersonalInfoComplete: function(personalInfo) {
        const requiredFields = ['name', 'email', 'phone', 'summary'];
        return requiredFields.every(field => personalInfo[field] && personalInfo[field].trim().length > 0);
    },
    
    // Calculate overall resume completeness percentage
    calculateCompleteness: function(resumeData) {
        let totalScore = 0;
        let maxScore = 0;
        
        // Personal info (30 points)
        maxScore += 30;
        if (resumeData.personal.name && resumeData.personal.name.trim()) totalScore += 10;
        if (resumeData.personal.email && resumeData.personal.email.trim()) totalScore += 5;
        if (resumeData.personal.phone && resumeData.personal.phone.trim()) totalScore += 5;
        if (resumeData.personal.summary && resumeData.personal.summary.trim()) totalScore += 10;
        
        // Education (20 points)
        maxScore += 20;
        if (resumeData.education.length > 0) {
            totalScore += Math.min(20, resumeData.education.length * 10);
        }
        
        // Experience (30 points)
        maxScore += 30;
        if (resumeData.experience.length > 0) {
            totalScore += Math.min(30, resumeData.experience.length * 15);
        }
        
        // Skills (20 points)
        maxScore += 20;
        if (resumeData.skills.length > 0) {
            totalScore += Math.min(20, resumeData.skills.length * 2);
        }
        
        return Math.round((totalScore / maxScore) * 100);
    },
    
    // Generate ATS (Applicant Tracking System) friendly text
    generateATSText: function() {
        const data = this.collectResumeData();
        let atsText = '';
        
        // Name and contact
        atsText += `${data.personal.name}\n`;
        atsText += `${data.personal.email} | ${data.personal.phone} | ${data.personal.address}\n`;
        if (data.personal.linkedin) atsText += `${data.personal.linkedin}\n`;
        atsText += '\n';
        
        // Summary
        atsText += `PROFESSIONAL SUMMARY\n${data.personal.summary}\n\n`;
        
        // Experience
        if (data.experience.length > 0) {
            atsText += `WORK EXPERIENCE\n`;
            data.experience.forEach(exp => {
                atsText += `${exp.title}\n`;
                atsText += `${exp.company} | ${exp.startDate} - ${exp.endDate}\n`;
                atsText += `${exp.responsibilities}\n\n`;
            });
        }
        
        // Education
        if (data.education.length > 0) {
            atsText += `EDUCATION\n`;
            data.education.forEach(edu => {
                atsText += `${edu.degree} in ${edu.field}\n`;
                atsText += `${edu.institution} | ${edu.graduation}\n`;
                if (edu.achievements) atsText += `${edu.achievements}\n`;
                atsText += '\n';
            });
        }
        
        // Skills
        if (data.skills.length > 0) {
            atsText += `SKILLS\n`;
            atsText += data.skills.join(', ') + '\n\n';
        }
        
        // Languages and Certifications
        if (data.languages) atsText += `LANGUAGES\n${data.languages}\n\n`;
        if (data.certifications) atsText += `CERTIFICATIONS\n${data.certifications}\n`;
        
        return atsText;
    },
    
    // Share resume via link (placeholder)
    generateShareableLink: function() {
        const data = this.collectResumeData();
        const compressedData = btoa(JSON.stringify(data));
        
        // In a real app, you would:
        // 1. Send data to server to get a unique ID
        // 2. Return a shortened URL
        // For demo, we'll create a data URL (limited by length)
        
        const shareUrl = `${window.location.origin}${window.location.pathname}?resume=${compressedData}`;
        
        return {
            url: shareUrl,
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() // 7 days from now
        };
    },
    
    // Load resume from shareable link
    loadFromShareableLink: function(compressedData) {
        try {
            const resumeData = JSON.parse(atob(compressedData));
            this.currentResume = resumeData;
            localStorage.setItem('resumeProData', JSON.stringify(resumeData));
            this.populateFormFromData();
            return true;
        } catch (error) {
            console.error('Error loading from shareable link:', error);
            return false;
        }
    }
};

// Initialize resume engine when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    if (document.querySelector('.resume-builder-container')) {
        ResumeEngine.init();
    }
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ResumeEngine;
}