// Main JavaScript file for ResumePro website

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
            if (navLinks.style.display === 'flex') {
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '100%';
                navLinks.style.left = '0';
                navLinks.style.right = '0';
                navLinks.style.backgroundColor = 'white';
                navLinks.style.padding = '1rem';
                navLinks.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
            }
        });
    }

    // Login/Register tab switching
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    if (tabBtns.length > 0) {
        tabBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const tabId = this.getAttribute('data-tab');
                
                // Update active tab button
                tabBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                
                // Show active tab content
                tabContents.forEach(content => {
                    content.classList.remove('active');
                    if (content.id === `${tabId}-tab`) {
                        content.classList.add('active');
                    }
                });
            });
        });
    }

    // Forgot password form toggle
    const forgotPasswordLink = document.getElementById('forgot-password-link');
    const forgotPasswordForm = document.getElementById('forgot-password-form');
    const backToLoginBtn = document.getElementById('back-to-login');
    
    if (forgotPasswordLink && forgotPasswordForm) {
        forgotPasswordLink.addEventListener('click', function(e) {
            e.preventDefault();
            document.getElementById('login-tab').style.display = 'none';
            forgotPasswordForm.style.display = 'block';
        });
    }
    
    if (backToLoginBtn && forgotPasswordForm) {
        backToLoginBtn.addEventListener('click', function() {
            forgotPasswordForm.style.display = 'none';
            document.getElementById('login-tab').style.display = 'block';
        });
    }

    // Show/hide password
    const showPasswordBtns = document.querySelectorAll('.show-password');
    
    showPasswordBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const input = this.parentElement.querySelector('input');
            const icon = this.querySelector('i');
            
            if (input.type === 'password') {
                input.type = 'text';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                input.type = 'password';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        });
    });

    // Password strength checker
    const passwordInput = document.getElementById('register-password');
    if (passwordInput) {
        passwordInput.addEventListener('input', function() {
            checkPasswordStrength(this.value);
        });
    }

    function checkPasswordStrength(password) {
        const strengthBar = document.querySelector('.strength-bar');
        const strengthText = document.querySelector('.strength-text');
        const requirements = document.querySelectorAll('.password-requirements li');
        
        let strength = 0;
        
        // Check requirements
        if (password.length >= 8) {
            requirements[0].classList.add('fulfilled');
            strength += 25;
        } else {
            requirements[0].classList.remove('fulfilled');
        }
        
        if (/[A-Z]/.test(password)) {
            requirements[1].classList.add('fulfilled');
            strength += 25;
        } else {
            requirements[1].classList.remove('fulfilled');
        }
        
        if (/[0-9]/.test(password)) {
            requirements[2].classList.add('fulfilled');
            strength += 25;
        } else {
            requirements[2].classList.remove('fulfilled');
        }
        
        if (/[^A-Za-z0-9]/.test(password)) {
            requirements[3].classList.add('fulfilled');
            strength += 25;
        } else {
            requirements[3].classList.remove('fulfilled');
        }
        
        // Update strength bar
        strengthBar.style.width = `${strength}%`;
        
        // Update strength text and color
        if (strength < 50) {
            strengthBar.style.backgroundColor = 'var(--danger-color)';
            strengthText.textContent = 'Password strength: Weak';
        } else if (strength < 75) {
            strengthBar.style.backgroundColor = 'var(--warning-color)';
            strengthText.textContent = 'Password strength: Fair';
        } else {
            strengthBar.style.backgroundColor = 'var(--success-color)';
            strengthText.textContent = 'Password strength: Strong';
        }
    }

    // Login form submission
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;
            
            // Simple validation
            if (!email || !password) {
                alert('Please fill in all fields');
                return;
            }
            
            // Simulate login process
            alert(`Login attempt with email: ${email}`);
            // In a real app, you would make an API call here
        });
    }

    // Register form submission
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const firstName = document.getElementById('first-name').value;
            const lastName = document.getElementById('last-name').value;
            const email = document.getElementById('register-email').value;
            const password = document.getElementById('register-password').value;
            const confirmPassword = document.getElementById('confirm-password').value;
            
            // Validation
            if (!firstName || !lastName || !email || !password || !confirmPassword) {
                alert('Please fill in all required fields');
                return;
            }
            
            if (password !== confirmPassword) {
                alert('Passwords do not match');
                return;
            }
            
            // Simulate registration
            alert(`Registration successful for ${firstName} ${lastName}`);
            // In a real app, you would make an API call here
        });
    }

    // Course category filtering
    const categoryBtns = document.querySelectorAll('.category-btn');
    const courseCards = document.querySelectorAll('.course-card');
    
    if (categoryBtns.length > 0) {
        categoryBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const category = this.getAttribute('data-category');
                
                // Update active button
                categoryBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                
                // Filter courses
                courseCards.forEach(card => {
                    if (category === 'all' || card.getAttribute('data-category') === category) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    // Job filtering
    const applyFiltersBtn = document.getElementById('apply-filters');
    if (applyFiltersBtn) {
        applyFiltersBtn.addEventListener('click', function() {
            const jobType = document.getElementById('job-type').value;
            const category = document.getElementById('category').value;
            const jobCards = document.querySelectorAll('.job-card');
            
            jobCards.forEach(card => {
                const cardType = card.getAttribute('data-type');
                const cardCategory = card.getAttribute('data-category');
                
                const typeMatch = jobType === 'all' || cardType === jobType;
                const categoryMatch = category === 'all' || cardCategory === category;
                
                if (typeMatch && categoryMatch) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }

    // Job application
    const applyBtns = document.querySelectorAll('.apply-btn');
    applyBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const jobTitle = this.closest('.job-card').querySelector('h3').textContent;
            const company = this.closest('.job-card').querySelector('.company').textContent;
            
            alert(`Applying for: ${jobTitle} at ${company}\n\nIn a real application, this would open an application form.`);
        });
    });

    // Course enrollment
    const enrollBtns = document.querySelectorAll('.enroll-btn');
    enrollBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const courseTitle = this.closest('.course-card').querySelector('h3').textContent;
            const coursePrice = this.closest('.course-card').querySelector('.course-price').textContent;
            
            if (coursePrice === 'Free') {
                alert(`Enrolling in: ${courseTitle}\n\nThis is a free course. You now have access!`);
            } else {
                alert(`Enrolling in: ${courseTitle}\n\nPrice: ${coursePrice}\n\nIn a real application, this would proceed to checkout.`);
            }
        });
    });

    // Workers rights accordion
    const accordionBtns = document.querySelectorAll('.accordion-btn');
    accordionBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const content = this.nextElementSibling;
            const icon = this.querySelector('i');
            
            // Toggle active class on content
            content.classList.toggle('active');
            
            // Rotate icon
            if (content.classList.contains('active')) {
                icon.style.transform = 'rotate(180deg)';
            } else {
                icon.style.transform = 'rotate(0deg)';
            }
        });
    });

    // Cookies banner functionality
    const cookiesBanner = document.getElementById('cookies-banner');
    const acceptCookiesBtn = document.getElementById('accept-cookies');
    const customizeCookiesBtn = document.getElementById('customize-cookies');
    const savePreferencesBtn = document.getElementById('save-preferences');
    const acceptAllCookiesBtn = document.getElementById('accept-all-cookies');
    
    // Check if user has already made a choice
    if (cookiesBanner && !localStorage.getItem('cookiesAccepted')) {
        cookiesBanner.style.display = 'block';
    } else if (cookiesBanner) {
        cookiesBanner.style.display = 'none';
    }
    
    if (acceptCookiesBtn) {
        acceptCookiesBtn.addEventListener('click', function() {
            localStorage.setItem('cookiesAccepted', 'all');
            cookiesBanner.style.display = 'none';
            alert('All cookies have been accepted. Thank you!');
        });
    }
    
    if (customizeCookiesBtn) {
        customizeCookiesBtn.addEventListener('click', function() {
            // Scroll to cookie controls section
            document.querySelector('.cookie-controls').scrollIntoView({
                behavior: 'smooth'
            });
        });
    }
    
    if (savePreferencesBtn) {
        savePreferencesBtn.addEventListener('click', function() {
            const analytics = document.getElementById('analytics-toggle').checked;
            const functionality = document.getElementById('functionality-toggle').checked;
            const marketing = document.getElementById('marketing-toggle').checked;
            
            localStorage.setItem('cookiesAccepted', 'custom');
            localStorage.setItem('analyticsCookies', analytics);
            localStorage.setItem('functionalityCookies', functionality);
            localStorage.setItem('marketingCookies', marketing);
            
            alert('Your cookie preferences have been saved!');
        });
    }
    
    if (acceptAllCookiesBtn) {
        acceptAllCookiesBtn.addEventListener('click', function() {
            document.getElementById('analytics-toggle').checked = true;
            document.getElementById('functionality-toggle').checked = true;
            document.getElementById('marketing-toggle').checked = true;
            
            localStorage.setItem('cookiesAccepted', 'all');
            alert('All cookies have been accepted. Thank you!');
        });
    }

    // Load saved cookie preferences
    if (localStorage.getItem('cookiesAccepted') === 'custom') {
        const analytics = localStorage.getItem('analyticsCookies') === 'true';
        const functionality = localStorage.getItem('functionalityCookies') === 'true';
        const marketing = localStorage.getItem('marketingCookies') === 'true';
        
        if (document.getElementById('analytics-toggle')) {
            document.getElementById('analytics-toggle').checked = analytics;
            updateToggleLabel('analytics-toggle', analytics);
        }
        if (document.getElementById('functionality-toggle')) {
            document.getElementById('functionality-toggle').checked = functionality;
            updateToggleLabel('functionality-toggle', functionality);
        }
        if (document.getElementById('marketing-toggle')) {
            document.getElementById('marketing-toggle').checked = marketing;
            updateToggleLabel('marketing-toggle', marketing);
        }
    }
    
    function updateToggleLabel(toggleId, isChecked) {
        const toggle = document.getElementById(toggleId);
        if (toggle) {
            const label = toggle.closest('.cookie-toggle').querySelector('.toggle-label');
            label.textContent = isChecked ? 'Enabled' : 'Disabled';
        }
    }

    // Toggle switch label updates
    const toggleSwitches = document.querySelectorAll('.toggle-switch input');
    toggleSwitches.forEach(toggle => {
        toggle.addEventListener('change', function() {
            const label = this.closest('.cookie-toggle').querySelector('.toggle-label');
            label.textContent = this.checked ? 'Enabled' : 'Disabled';
        });
    });

    // Form validation for contact forms
    const contactForms = document.querySelectorAll('form');
    contactForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            const requiredFields = this.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.style.borderColor = 'var(--danger-color)';
                } else {
                    field.style.borderColor = '';
                }
            });
            
            if (!isValid) {
                e.preventDefault();
                alert('Please fill in all required fields.');
            }
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Auto-hide mobile menu on link click
    const mobileLinks = document.querySelectorAll('.nav-links a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                navLinks.style.display = 'none';
            }
        });
    });

    // Testimonial slider functionality
    const testimonialSlider = document.querySelector('.testimonial-slider');
    if (testimonialSlider && testimonialSlider.children.length > 1) {
        let currentSlide = 0;
        const slides = testimonialSlider.children;
        const totalSlides = slides.length;
        
        function showSlide(index) {
            // Hide all slides
            Array.from(slides).forEach(slide => {
                slide.style.display = 'none';
            });
            
            // Show current slide
            slides[index].style.display = 'block';
            currentSlide = index;
        }
        
        // Initialize first slide
        showSlide(0);
        
        // Auto-rotate slides every 5 seconds
        setInterval(() => {
            let nextSlide = (currentSlide + 1) % totalSlides;
            showSlide(nextSlide);
        }, 5000);
    }

    // Back to top button
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.style.display = 'none';
    backToTopBtn.style.position = 'fixed';
    backToTopBtn.style.bottom = '30px';
    backToTopBtn.style.right = '30px';
    backToTopBtn.style.width = '50px';
    backToTopBtn.style.height = '50px';
    backToTopBtn.style.backgroundColor = 'var(--primary-color)';
    backToTopBtn.style.color = 'white';
    backToTopBtn.style.border = 'none';
    backToTopBtn.style.borderRadius = '50%';
    backToTopBtn.style.cursor = 'pointer';
    backToTopBtn.style.fontSize = '1.2rem';
    backToTopBtn.style.boxShadow = '0 4px 10px rgba(0,0,0,0.2)';
    backToTopBtn.style.zIndex = '1000';
    document.body.appendChild(backToTopBtn);

    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.style.display = 'block';
        } else {
            backToTopBtn.style.display = 'none';
        }
    });

    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Form validation feedback
    const formInputs = document.querySelectorAll('input, textarea, select');
    formInputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.hasAttribute('required') && !this.value.trim()) {
                this.style.borderColor = 'var(--danger-color)';
            } else {
                this.style.borderColor = '';
            }
        });
    });

    // Current year in footer
    const currentYear = new Date().getFullYear();
    const yearElements = document.querySelectorAll('.footer-bottom p');
    yearElements.forEach(element => {
        element.textContent = element.textContent.replace('2023', currentYear);
    });
});

// Resume Builder Specific Functions
if (document.querySelector('.resume-builder-container')) {
    // Section navigation in resume builder
    const sidebarSections = document.querySelectorAll('.sidebar-section');
    const formSections = document.querySelectorAll('.form-section');
    const nextButtons = document.querySelectorAll('.next-section');
    const prevButtons = document.querySelectorAll('.prev-section');

    // Initialize first section as active
    if (sidebarSections.length > 0 && formSections.length > 0) {
        sidebarSections[0].classList.add('active');
        formSections[0].classList.add('active');
    }

    // Sidebar section click
    sidebarSections.forEach(section => {
        section.addEventListener('click', function() {
            const sectionId = this.getAttribute('data-section');
            
            // Update sidebar
            sidebarSections.forEach(s => s.classList.remove('active'));
            this.classList.add('active');
            
            // Update form sections
            formSections.forEach(form => {
                form.classList.remove('active');
                if (form.id === `${sectionId}-section`) {
                    form.classList.add('active');
                }
            });
        });
    });

    // Next button click
    nextButtons.forEach(button => {
        button.addEventListener('click', function() {
            const nextSection = this.getAttribute('data-next');
            
            // Update sidebar
            sidebarSections.forEach(s => {
                s.classList.remove('active');
                if (s.getAttribute('data-section') === nextSection) {
                    s.classList.add('active');
                }
            });
            
            // Update form sections
            formSections.forEach(form => {
                form.classList.remove('active');
                if (form.id === `${nextSection}-section`) {
                    form.classList.add('active');
                    form.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });
    });

    // Previous button click
    prevButtons.forEach(button => {
        button.addEventListener('click', function() {
            const prevSection = this.getAttribute('data-prev');
            
            // Update sidebar
            sidebarSections.forEach(s => {
                s.classList.remove('active');
                if (s.getAttribute('data-section') === prevSection) {
                    s.classList.add('active');
                }
            });
            
            // Update form sections
            formSections.forEach(form => {
                form.classList.remove('active');
                if (form.id === `${prevSection}-section`) {
                    form.classList.add('active');
                    form.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });
    });

    // Add education entry
    const addEducationBtn = document.getElementById('add-education');
    if (addEducationBtn) {
        addEducationBtn.addEventListener('click', function() {
            const educationEntries = document.getElementById('education-entries');
            const newEntry = document.createElement('div');
            newEntry.className = 'education-entry';
            newEntry.innerHTML = `
                <hr style="margin: 1.5rem 0;">
                <div class="form-row">
                    <div class="form-group">
                        <label>Institution Name</label>
                        <input type="text" placeholder="University Name">
                    </div>
                    <div class="form-group">
                        <label>Degree/Certificate</label>
                        <input type="text" placeholder="Bachelor of Science">
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label>Field of Study</label>
                        <input type="text" placeholder="Computer Science">
                    </div>
                    <div class="form-group">
                        <label>Graduation Year</label>
                        <input type="text" placeholder="2020">
                    </div>
                </div>
                <div class="form-group">
                    <label>Achievements (Optional)</label>
                    <textarea rows="3" placeholder="Honors, awards, or notable achievements..."></textarea>
                </div>
                <button type="button" class="btn-small remove-entry">Remove This Entry</button>
            `;
            educationEntries.appendChild(newEntry);
            
            // Add event listener to remove button
            newEntry.querySelector('.remove-entry').addEventListener('click', function() {
                newEntry.remove();
            });
        });
    }

    // Add experience entry
    const addExperienceBtn = document.getElementById('add-experience');
    if (addExperienceBtn) {
        addExperienceBtn.addEventListener('click', function() {
            const experienceEntries = document.getElementById('experience-entries');
            const newEntry = document.createElement('div');
            newEntry.className = 'experience-entry';
            newEntry.innerHTML = `
                <hr style="margin: 1.5rem 0;">
                <div class="form-row">
                    <div class="form-group">
                        <label>Job Title</label>
                        <input type="text" placeholder="Software Developer">
                    </div>
                    <div class="form-group">
                        <label>Company</label>
                        <input type="text" placeholder="Tech Company Inc.">
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label>Start Date</label>
                        <input type="text" placeholder="June 2020">
                    </div>
                    <div class="form-group">
                        <label>End Date</label>
                        <input type="text" placeholder="Present">
                    </div>
                </div>
                <div class="form-group">
                    <label>Responsibilities & Achievements</label>
                    <textarea rows="4" placeholder="Describe your responsibilities and key achievements..."></textarea>
                </div>
                <button type="button" class="btn-small remove-entry">Remove This Entry</button>
            `;
            experienceEntries.appendChild(newEntry);
            
            // Add event listener to remove button
            newEntry.querySelector('.remove-entry').addEventListener('click', function() {
                newEntry.remove();
            });
        });
    }

    // Skills management
    const skillsInput = document.getElementById('skills-input');
    const addSkillBtn = document.getElementById('add-skill-btn');
    const skillTagsContainer = document.getElementById('skill-tags');
    
    if (addSkillBtn && skillsInput) {
        addSkillBtn.addEventListener('click', function() {
            const skillsText = skillsInput.value.trim();
            if (!skillsText) return;
            
            const skillsArray = skillsText.split(',').map(skill => skill.trim()).filter(skill => skill);
            
            skillsArray.forEach(skill => {
                // Check if skill already exists
                const existingSkills = Array.from(skillTagsContainer.querySelectorAll('.skill-tag span')).map(s => s.textContent);
                if (existingSkills.includes(skill)) return;
                
                const skillTag = document.createElement('div');
                skillTag.className = 'skill-tag';
                skillTag.innerHTML = `
                    <span>${skill}</span>
                    <button class="remove-skill">&times;</button>
                `;
                skillTagsContainer.appendChild(skillTag);
                
                // Add remove functionality
                skillTag.querySelector('.remove-skill').addEventListener('click', function() {
                    skillTag.remove();
                });
            });
            
            // Clear input
            skillsInput.value = '';
        });
        
        // Also allow pressing Enter to add skills
        skillsInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                addSkillBtn.click();
            }
        });
    }

    // Edit resume button
    const editResumeBtn = document.getElementById('edit-resume');
    if (editResumeBtn) {
        editResumeBtn.addEventListener('click', function() {
            // Go back to personal info section
            sidebarSections.forEach(s => {
                s.classList.remove('active');
                if (s.getAttribute('data-section') === 'personal') {
                    s.classList.add('active');
                }
            });
            
            formSections.forEach(form => {
                form.classList.remove('active');
                if (form.id === 'personal-section') {
                    form.classList.add('active');
                    form.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });
    }

    // Download PDF button
    const downloadPdfBtn = document.getElementById('download-pdf');
    if (downloadPdfBtn) {
        downloadPdfBtn.addEventListener('click', function() {
            alert('In a real application, this would generate and download a PDF of your resume.\n\nFor this demo, you can print the preview using your browser\'s print function (Ctrl+P).');
            
            // Simulate download
            const resumeData = collectResumeData();
            console.log('Resume data for PDF:', resumeData);
            
            // In a real app, you would send this data to a server to generate PDF
            // or use a client-side PDF generation library
        });
    }

    // Save resume button
    const saveResumeBtn = document.getElementById('save-resume');
    if (saveResumeBtn) {
        saveResumeBtn.addEventListener('click', function() {
            const resumeData = collectResumeData();
            
            // Save to localStorage
            localStorage.setItem('resumeData', JSON.stringify(resumeData));
            
            alert('Resume saved successfully! You can continue editing later.');
        });
    }

    // Load saved resume data if exists
    function loadSavedResumeData() {
        const savedData = localStorage.getItem('resumeData');
        if (savedData) {
            try {
                const data = JSON.parse(savedData);
                
                // Load personal info
                if (data.personal) {
                    if (document.getElementById('full-name')) document.getElementById('full-name').value = data.personal.name || '';
                    if (document.getElementById('email')) document.getElementById('email').value = data.personal.email || '';
                    if (document.getElementById('phone')) document.getElementById('phone').value = data.personal.phone || '';
                    if (document.getElementById('address')) document.getElementById('address').value = data.personal.address || '';
                    if (document.getElementById('linkedin')) document.getElementById('linkedin').value = data.personal.linkedin || '';
                    if (document.getElementById('summary')) document.getElementById('summary').value = data.personal.summary || '';
                }
                
                // Load skills
                if (data.skills && data.skills.length > 0) {
                    // Clear existing skill tags
                    skillTagsContainer.innerHTML = '';
                    
                    // Add saved skills
                    data.skills.forEach(skill => {
                        const skillTag = document.createElement('div');
                        skillTag.className = 'skill-tag';
                        skillTag.innerHTML = `
                            <span>${skill}</span>
                            <button class="remove-skill">&times;</button>
                        `;
                        skillTagsContainer.appendChild(skillTag);
                        
                        // Add remove functionality
                        skillTag.querySelector('.remove-skill').addEventListener('click', function() {
                            skillTag.remove();
                        });
                    });
                }
                
                console.log('Loaded saved resume data');
            } catch (error) {
                console.error('Error loading saved resume data:', error);
            }
        }
    }
    
    // Call load function when page loads
    window.addEventListener('load', loadSavedResumeData);

    // Collect all resume data for saving or PDF generation
    function collectResumeData() {
        const data = {
            personal: {
                name: document.getElementById('full-name')?.value || '',
                email: document.getElementById('email')?.value || '',
                phone: document.getElementById('phone')?.value || '',
                address: document.getElementById('address')?.value || '',
                linkedin: document.getElementById('linkedin')?.value || '',
                summary: document.getElementById('summary')?.value || ''
            },
            education: [],
            experience: [],
            skills: [],
            languages: document.getElementById('languages')?.value || '',
            certifications: document.getElementById('certifications')?.value || ''
        };
        
        // Collect education entries
        const educationEntries = document.querySelectorAll('.education-entry');
        educationEntries.forEach(entry => {
            const inputs = entry.querySelectorAll('input, textarea');
            if (inputs.length >= 5) {
                data.education.push({
                    institution: inputs[0].value,
                    degree: inputs[1].value,
                    field: inputs[2].value,
                    graduation: inputs[3].value,
                    achievements: inputs[4].value
                });
            }
        });
        
        // Collect experience entries
        const experienceEntries = document.querySelectorAll('.experience-entry');
        experienceEntries.forEach(entry => {
            const inputs = entry.querySelectorAll('input, textarea');
            if (inputs.length >= 5) {
                data.experience.push({
                    title: inputs[0].value,
                    company: inputs[1].value,
                    startDate: inputs[2].value,
                    endDate: inputs[3].value,
                    responsibilities: inputs[4].value
                });
            }
        });
        
        // Collect skills
        const skillTags = document.querySelectorAll('.skill-tag span');
        skillTags.forEach(tag => {
            data.skills.push(tag.textContent);
        });
        
        return data;
    }
}