// Main JavaScript for 9to5 University Job Portal

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('nav ul');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.innerHTML = navMenu.classList.contains('active') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
        });
    }
    
    // Cookie consent functionality
    const cookieConsent = document.getElementById('cookieConsent');
    const acceptCookiesBtn = document.getElementById('acceptCookies');
    const rejectCookiesBtn = document.getElementById('rejectCookies');
    
    // Check if user has already made a choice
    if (!localStorage.getItem('cookieConsent')) {
        setTimeout(() => {
            if (cookieConsent) {
                cookieConsent.style.display = 'block';
            }
        }, 1000);
    }
    
    if (acceptCookiesBtn) {
        acceptCookiesBtn.addEventListener('click', function() {
            localStorage.setItem('cookieConsent', 'accepted');
            if (cookieConsent) {
                cookieConsent.style.display = 'none';
            }
            // You can add analytics tracking here
            console.log('Cookies accepted');
        });
    }
    
    if (rejectCookiesBtn) {
        rejectCookiesBtn.addEventListener('click', function() {
            localStorage.setItem('cookieConsent', 'rejected');
            if (cookieConsent) {
                cookieConsent.style.display = 'none';
            }
            console.log('Cookies rejected');
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (navMenu && navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    if (mobileMenuBtn) {
                        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                    }
                }
            }
        });
    });
    
    // Form validation for login and registration
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            let isValid = true;
            const inputs = this.querySelectorAll('input[required], select[required], textarea[required]');
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = 'var(--danger)';
                    
                    // Add error message
                    if (!input.nextElementSibling || !input.nextElementSibling.classList.contains('error-message')) {
                        const errorMsg = document.createElement('span');
                        errorMsg.className = 'error-message';
                        errorMsg.style.color = 'var(--danger)';
                        errorMsg.style.fontSize = '0.85rem';
                        errorMsg.style.display = 'block';
                        errorMsg.style.marginTop = '5px';
                        errorMsg.textContent = 'This field is required';
                        input.parentNode.appendChild(errorMsg);
                    }
                } else {
                    input.style.borderColor = 'var(--medium-gray)';
                    // Remove error message if exists
                    const errorMsg = input.nextElementSibling;
                    if (errorMsg && errorMsg.classList.contains('error-message')) {
                        errorMsg.remove();
                    }
                }
            });
            
            if (!isValid) {
                e.preventDefault();
                alert('Please fill in all required fields.');
            }
        });
    });
    
    // Initialize job listings if on jobs page
    if (window.location.pathname.includes('hustle-jobs.html')) {
        initializeJobListings();
    }
    
    // Initialize resume builder if on resume page
    if (window.location.pathname.includes('resume-builder.html')) {
        initializeResumeBuilder();
    }
    
    // Initialize courses if on courses page
    if (window.location.pathname.includes('courses.html')) {
        initializeCourses();
    }
    
    // Update copyright year
    const copyrightElements = document.querySelectorAll('.footer-bottom p');
    const currentYear = new Date().getFullYear();
    copyrightElements.forEach(element => {
        element.innerHTML = element.innerHTML.replace('2023', currentYear);
    });
});

// Initialize job listings
function initializeJobListings() {
    const jobsContainer = document.getElementById('jobsContainer');
    
    if (!jobsContainer) return;
    
    // Check if we have jobs data
    const jobs = JSON.parse(localStorage.getItem('jobs')) || [];
    
    if (jobs.length === 0) {
        jobsContainer.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-briefcase"></i>
                <h3>No Jobs Available Right Now</h3>
                <p>We're currently updating our job listings. Please check back soon for new opportunities.</p>
                <p>In the meantime, you can <a href="resume-builder.html">build your resume</a> so you're ready when new jobs are posted.</p>
            </div>
        `;
    } else {
        // Display jobs
        let jobsHTML = '';
        jobs.forEach(job => {
            jobsHTML += `
                <div class="job-card">
                    <span class="job-category">${job.category}</span>
                    <h3>${job.title}</h3>
                    <p><i class="fas fa-building"></i> ${job.company}</p>
                    <p><i class="fas fa-map-marker-alt"></i> ${job.location}</p>
                    <p>${job.description}</p>
                    <p class="job-salary"><i class="fas fa-money-bill-wave"></i> ${job.salary}</p>
                    <div style="margin-top: 20px;">
                        <button class="btn btn-primary apply-btn" data-job-id="${job.id}">Apply Now</button>
                    </div>
                </div>
            `;
        });
        
        jobsContainer.innerHTML = jobsHTML;
        
        // Add event listeners to apply buttons
        document.querySelectorAll('.apply-btn').forEach(button => {
            button.addEventListener('click', function() {
                const jobId = this.getAttribute('data-job-id');
                applyForJob(jobId);
            });
        });
    }
}

// Initialize resume builder
function initializeResumeBuilder() {
    const templateContainer = document.getElementById('templateContainer');
    const resumePreview = document.getElementById('resumePreview');
    
    if (!templateContainer || !resumePreview) return;
    
    // Load templates from templates.js if available
    if (typeof resumeTemplates !== 'undefined') {
        let templatesHTML = '';
        resumeTemplates.forEach((template, index) => {
            templatesHTML += `
                <div class="template-card" data-template-id="${index}">
                    <div class="template-preview" style="background: ${template.color}">
                        <h4 style="color: white; padding: 20px;">${template.name}</h4>
                    </div>
                    <h4>${template.name}</h4>
                    <p>${template.description}</p>
                    <button class="btn btn-secondary select-template" data-template-id="${index}">Select</button>
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
    }
    
    // Form handling for resume builder
    const resumeForm = document.getElementById('resumeForm');
    if (resumeForm) {
        resumeForm.addEventListener('submit', function(e) {
            e.preventDefault();
            generateResume();
        });
    }
}

// Initialize courses
function initializeCourses() {
    const coursesContainer = document.getElementById('coursesContainer');
    
    if (!coursesContainer) return;
    
    // Sample courses data
    const courses = [
        {
            id: 1,
            title: "Career Readiness 101",
            description: "Learn essential skills for job searching and workplace success.",
            duration: "4 weeks",
            icon: "fas fa-user-tie"
        },
        {
            id: 2,
            title: "Resume Writing Mastery",
            description: "Create a resume that stands out and gets you interviews.",
            duration: "2 weeks",
            icon: "fas fa-file-alt"
        },
        {
            id: 3,
            title: "Interview Preparation",
            description: "Master the art of interviewing and negotiation.",
            duration: "3 weeks",
            icon: "fas fa-comments"
        },
        {
            id: 4,
            title: "Workplace Ethics",
            description: "Understand professional conduct and workplace rights.",
            duration: "2 weeks",
            icon: "fas fa-balance-scale"
        }
    ];
    
    let coursesHTML = '';
    courses.forEach(course => {
        coursesHTML += `
            <div class="course-card">
                <div class="course-image">
                    <i class="${course.icon}"></i>
                </div>
                <div class="course-content">
                    <span class="course-duration">${course.duration}</span>
                    <h3>${course.title}</h3>
                    <p>${course.description}</p>
                    <button class="btn btn-primary" style="margin-top: 15px;">Enroll Now</button>
                </div>
            </div>
        `;
    });
    
    coursesContainer.innerHTML = coursesHTML;
}

// Apply for a job
function applyForJob(jobId) {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    
    if (!isLoggedIn) {
        if (confirm('You need to log in to apply for jobs. Would you like to go to the login page?')) {
            window.location.href = 'login.html?redirect=hustle-jobs.html';
        }
        return;
    }
    
    // Check if resume is uploaded
    const hasResume = localStorage.getItem('userResume');
    
    if (!hasResume) {
        if (confirm('You need to upload a resume to apply for jobs. Would you like to go to the resume builder?')) {
            window.location.href = 'resume-builder.html';
        }
        return;
    }
    
    // Record application
    const applications = JSON.parse(localStorage.getItem('jobApplications')) || [];
    applications.push({
        jobId: jobId,
        date: new Date().toISOString(),
        status: 'pending'
    });
    
    localStorage.setItem('jobApplications', JSON.stringify(applications));
    
    alert('Application submitted successfully! We will contact you if your profile matches the job requirements.');
}

// Select resume template
function selectTemplate(templateId) {
    if (typeof resumeTemplates !== 'undefined' && resumeTemplates[templateId]) {
        const template = resumeTemplates[templateId];
        localStorage.setItem('selectedTemplate', JSON.stringify(template));
        
        // Update UI to show selected template
        document.querySelectorAll('.template-card').forEach(card => {
            card.style.border = '2px solid transparent';
        });
        
        const selectedCard = document.querySelector(`.template-card[data-template-id="${templateId}"]`);
        if (selectedCard) {
            selectedCard.style.border = `2px solid var(--accent-gold)`;
        }
        
        alert(`"${template.name}" template selected. Now fill in your details.`);
    }
}

// Generate resume
function generateResume() {
    const formData = new FormData(document.getElementById('resumeForm'));
    const resumeData = {};
    
    formData.forEach((value, key) => {
        resumeData[key] = value;
    });
    
    // Save resume data
    localStorage.setItem('userResume', JSON.stringify(resumeData));
    
    // Generate resume preview
    const resumePreview = document.getElementById('resumePreview');
    if (resumePreview) {
        const selectedTemplate = JSON.parse(localStorage.getItem('selectedTemplate')) || resumeTemplates[0];
        
        let resumeHTML = `
            <div class="resume-content" style="font-family: Arial, sans-serif; padding: 40px; background: white;">
                <div style="background: ${selectedTemplate.color}; color: white; padding: 30px; border-radius: 5px; margin-bottom: 30px;">
                    <h1 style="margin: 0; font-size: 2.5rem;">${resumeData.fullName || 'Your Name'}</h1>
                    <p style="margin: 10px 0 0 0; font-size: 1.2rem;">${resumeData.jobTitle || 'Your Job Title'}</p>
                </div>
                
                <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 30px;">
                    <div>
                        <h2 style="color: ${selectedTemplate.color}; border-bottom: 2px solid ${selectedTemplate.color}; padding-bottom: 10px;">PROFESSIONAL SUMMARY</h2>
                        <p>${resumeData.summary || 'Experienced professional seeking new opportunities...'}</p>
                        
                        <h2 style="color: ${selectedTemplate.color}; border-bottom: 2px solid ${selectedTemplate.color}; padding-bottom: 10px; margin-top: 30px;">WORK EXPERIENCE</h2>
                        <p>${resumeData.experience || 'Detail your work experience here...'}</p>
                        
                        <h2 style="color: ${selectedTemplate.color}; border-bottom: 2px solid ${selectedTemplate.color}; padding-bottom: 10px; margin-top: 30px;">EDUCATION</h2>
                        <p><strong>${resumeData.school || 'University Name'}</strong><br>
                        ${resumeData.degree || 'Degree'} | ${resumeData.graduationYear || 'Graduation Year'}</p>
                    </div>
                    
                    <div>
                        <h2 style="color: ${selectedTemplate.color}; border-bottom: 2px solid ${selectedTemplate.color}; padding-bottom: 10px;">CONTACT</h2>
                        <p><strong>Email:</strong><br>${resumeData.email || 'your.email@example.com'}</p>
                        <p><strong>Phone:</strong><br>${resumeData.phone || '(123) 456-7890'}</p>
                        <p><strong>Location:</strong><br>${resumeData.location || 'City, State'}</p>
                        
                        <h2 style="color: ${selectedTemplate.color}; border-bottom: 2px solid ${selectedTemplate.color}; padding-bottom: 10px; margin-top: 30px;">SKILLS</h2>
                        <p>${resumeData.skills || 'List your key skills here...'}</p>
                    </div>
                </div>
            </div>
        `;
        
        resumePreview.innerHTML = resumeHTML;
        
        // Show download button
        const downloadBtn = document.getElementById('downloadResumeBtn');
        if (downloadBtn) {
            downloadBtn.style.display = 'block';
        }
    }
    
    alert('Resume saved successfully! You can now download it or apply for jobs.');
}

// Download resume as PDF
function downloadResume() {
    const resumePreview = document.getElementById('resumePreview');
    
    if (!resumePreview) {
        alert('Please generate a resume first.');
        return;
    }
    
    // Create a printable version
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
        <html>
            <head>
                <title>My Resume - 9to5 University</title>
                <style>
                    body { font-family: Arial, sans-serif; margin: 40px; }
                    @media print {
                        body { margin: 0; }
                    }
                </style>
            </head>
            <body>
                ${resumePreview.innerHTML}
                <script>
                    window.onload = function() {
                        window.print();
                    };
                </script>
            </body>
        </html>
    `);
    printWindow.document.close();
}