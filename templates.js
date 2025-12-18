// ====== TEMPLATE RENDERING FUNCTIONS ======

// South African Classic Template
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
                ${data.personal.linkedin ? `
                    <div class="contact-item">
                        <i class="fab fa-linkedin"></i> ${escapeHTML(data.personal.linkedin)}
                    </div>
                ` : ''}
            </div>
        </div>
        
        ${data.summary ? `
            <div class="section">
                <div class="section-title">PROFESSIONAL PROFILE</div>
                <p style="text-align: justify; line-height: 1.6;">${formatText(data.summary)}</p>
            </div>
        ` : ''}
        
        ${data.experience.length > 0 ? `
            <div class="section">
                <div class="section-title">WORK EXPERIENCE</div>
                ${data.experience.map(exp => `
                    <div style="margin-bottom: 25px;">
                        <div style="margin-bottom: 8px;">
                            <strong style="font-size: 16px;">${escapeHTML(exp.title)}</strong>
                            <span style="float: right; color: var(--primary-light); font-weight: 500;">${escapeHTML(exp.start)} - ${escapeHTML(exp.end)}</span>
                        </div>
                        <div style="color: var(--primary-light); margin-bottom: 8px;">
                            ${escapeHTML(exp.company)}${exp.location ? ` | ${escapeHTML(exp.location)}` : ''}
                        </div>
                        <div style="white-space: pre-line; font-size: 14px; line-height: 1.5; color: var(--dark);">
                            ${formatText(exp.description)}
                        </div>
                    </div>
                `).join('')}
            </div>
        ` : ''}
        
        ${data.education.length > 0 ? `
            <div class="section">
                <div class="section-title">EDUCATION & QUALIFICATIONS</div>
                ${data.education.map(edu => `
                    <div style="margin-bottom: 20px;">
                        <div style="margin-bottom: 5px;">
                            <strong style="font-size: 15px;">${escapeHTML(edu.degree)}</strong>
                            <span style="float: right; color: var(--primary-light);">${escapeHTML(edu.end)}</span>
                        </div>
                        <div style="color: var(--primary-light);">
                            ${escapeHTML(edu.school)}${edu.location ? `, ${escapeHTML(edu.location)}` : ''}
                        </div>
                        ${edu.subjects ? `<div style="font-size: 14px; color: var(--gray); margin-top: 4px;">${escapeHTML(edu.subjects)}</div>` : ''}
                    </div>
                `).join('')}
            </div>
        ` : ''}
        
        ${data.skills.technical || data.skills.soft || data.skills.certifications ? `
            <div class="section">
                <div class="section-title">SKILLS & COMPETENCIES</div>
                ${data.skills.technical ? `
                    <div style="margin-bottom: 15px;">
                        <strong style="display: block; margin-bottom: 4px; color: var(--dark);">Professional Skills:</strong>
                        <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-top: 4px;">
                            ${data.skills.technical.split(',').filter(skill => skill.trim()).map(skill => `
                                <span style="background: var(--light); padding: 4px 10px; border-radius: 4px; font-size: 13px; color: var(--dark); border: 1px solid var(--border);">
                                    ${escapeHTML(skill.trim())}
                                </span>
                            `).join('')}
                        </div>
                    </div>
                ` : ''}
                
                ${data.skills.soft ? `
                    <div style="margin-bottom: 15px;">
                        <strong style="display: block; margin-bottom: 4px; color: var(--dark);">Personal Strengths:</strong>
                        <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-top: 4px;">
                            ${data.skills.soft.split(',').filter(skill => skill.trim()).map(skill => `
                                <span style="background: var(--light); padding: 4px 10px; border-radius: 4px; font-size: 13px; color: var(--dark); border: 1px solid var(--border);">
                                    ${escapeHTML(skill.trim())}
                                </span>
                            `).join('')}
                        </div>
                    </div>
                ` : ''}
                
                ${data.skills.certifications ? `
                    <div>
                        <strong style="display: block; margin-bottom: 4px; color: var(--dark);">Certifications & Licenses:</strong>
                        <div style="white-space: pre-line; font-size: 14px; color: var(--dark); margin-top: 4px;">
                            ${formatText(data.skills.certifications)}
                        </div>
                    </div>
                ` : ''}
            </div>
        ` : ''}
        
        <div class="section" style="margin-top: 30px; padding-top: 20px; border-top: 1px solid var(--border);">
            <p style="font-size: 12px; color: var(--gray); text-align: center;">
                <strong>References available upon request</strong><br>
                This CV was created with CVGenie - Professional Resume Builder for South Africa
            </p>
        </div>
    `;
}

// Modern Professional Template
function renderModernTemplate(data) {
    return `
        <div class="resume-header">
            <div class="name">${escapeHTML(data.personal.name)}</div>
            <div class="title">${escapeHTML(data.personal.title)}</div>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin-top: 20px;">
                <div><i class="fas fa-envelope"></i> ${escapeHTML(data.personal.email)}</div>
                <div><i class="fas fa-phone"></i> ${escapeHTML(data.personal.phone)}</div>
                <div><i class="fas fa-map-marker-alt"></i> ${escapeHTML(data.personal.location)}</div>
                ${data.personal.linkedin ? `<div><i class="fab fa-linkedin"></i> ${escapeHTML(data.personal.linkedin)}</div>` : ''}
            </div>
        </div>
        
        ${data.summary ? `
            <div class="section">
                <div class="section-title">EXECUTIVE SUMMARY</div>
                <p style="font-size: 14px; line-height: 1.6;">${formatText(data.summary)}</p>
            </div>
        ` : ''}
        
        ${data.experience.length > 0 ? `
            <div class="section">
                <div class="section-title">PROFESSIONAL EXPERIENCE</div>
                ${data.experience.map(exp => `
                    <div style="margin-bottom: 30px; padding-left: 20px; border-left: 3px solid var(--primary);">
                        <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                            <strong style="font-size: 16px;">${escapeHTML(exp.title)}</strong>
                            <span style="color: var(--primary); font-weight: 500;">${escapeHTML(exp.start)} - ${escapeHTML(exp.end)}</span>
                        </div>
                        <div style="color: var(--primary-light); margin-bottom: 12px; font-size: 14px;">
                            ${escapeHTML(exp.company)} • ${escapeHTML(exp.location)}
                        </div>
                        <div style="white-space: pre-line; font-size: 14px; line-height: 1.5;">${formatText(exp.description)}</div>
                    </div>
                `).join('')}
            </div>
        ` : ''}
        
        <div style="display: flex; flex-wrap: wrap; gap: 30px; margin-top: 30px;">
            ${data.education.length > 0 ? `
                <div style="flex: 1; min-width: 250px;">
                    <div class="section-title">EDUCATION</div>
                    ${data.education.map(edu => `
                        <div style="margin-bottom: 20px;">
                            <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                                <strong style="font-size: 15px;">${escapeHTML(edu.degree)}</strong>
                                <span style="color: var(--primary);">${escapeHTML(edu.end)}</span>
                            </div>
                            <div style="font-size: 14px; color: var(--gray);">
                                ${escapeHTML(edu.school)}${edu.location ? `, ${escapeHTML(edu.location)}` : ''}
                            </div>
                        </div>
                    `).join('')}
                </div>
            ` : ''}
            
            ${data.skills.technical || data.skills.soft ? `
                <div style="flex: 1; min-width: 250px;">
                    <div class="section-title">SKILLS</div>
                    ${data.skills.technical ? `
                        <div style="margin-bottom: 20px;">
                            <strong style="display: block; margin-bottom: 10px; color: var(--dark); font-size: 14px;">Technical Skills</strong>
                            <div style="display: flex; flex-wrap: wrap; gap: 8px;">
                                ${data.skills.technical.split(',').filter(skill => skill.trim()).map(skill => `
                                    <span style="background: var(--light); padding: 6px 12px; border-radius: 20px; font-size: 13px; color: var(--dark);">
                                        ${escapeHTML(skill.trim())}
                                    </span>
                                `).join('')}
                            </div>
                        </div>
                    ` : ''}
                    
                    ${data.skills.soft ? `
                        <div>
                            <strong style="display: block; margin-bottom: 10px; color: var(--dark); font-size: 14px;">Soft Skills</strong>
                            <div style="display: flex; flex-wrap: wrap; gap: 8px;">
                                ${data.skills.soft.split(',').filter(skill => skill.trim()).map(skill => `
                                    <span style="background: var(--light); padding: 6px 12px; border-radius: 20px; font-size: 13px; color: var(--dark);">
                                        ${escapeHTML(skill.trim())}
                                    </span>
                                `).join('')}
                            </div>
                        </div>
                    ` : ''}
                </div>
            ` : ''}
        </div>
        
        ${data.skills.certifications ? `
            <div class="section" style="margin-top: 30px;">
                <div class="section-title">CERTIFICATIONS</div>
                <div style="white-space: pre-line; font-size: 14px; line-height: 1.5;">
                    ${formatText(data.skills.certifications)}
                </div>
            </div>
        ` : ''}
    `;
}

// JobJack Style Template (Professional ATS-Friendly)
function renderJobJackTemplate(data) {
    return `
        <div style="font-family: 'Inter', sans-serif; padding: 25mm; color: var(--dark);">
            <!-- HEADER -->
            <div style="text-align: center; border-bottom: 2px solid var(--primary); padding-bottom: 20px; margin-bottom: 25px;">
                <h1 style="font-size: 32px; margin: 0; color: var(--dark); font-weight: 700;">${escapeHTML(data.personal.name)}</h1>
                <h2 style="font-size: 18px; font-weight: 500; margin: 8px 0 15px 0; color: var(--primary);">${escapeHTML(data.personal.title)}</h2>
                <div style="display: flex; justify-content: center; flex-wrap: wrap; gap: 15px; font-size: 13px; color: var(--gray);">
                    <span>${escapeHTML(data.personal.email)}</span>
                    <span>•</span>
                    <span>${escapeHTML(data.personal.phone)}</span>
                    <span>•</span>
                    <span>${escapeHTML(data.personal.location)}</span>
                    ${data.personal.linkedin ? `<span>•</span><span>${escapeHTML(data.personal.linkedin)}</span>` : ''}
                </div>
            </div>

            <!-- PROFILE -->
            ${data.summary ? `
                <div style="margin-bottom: 25px;">
                    <h3 style="font-size: 16px; text-transform: uppercase; color: var(--dark); border-bottom: 1px solid var(--border); padding-bottom: 6px; margin-bottom: 12px; font-weight: 700;">Professional Profile</h3>
                    <p style="line-height: 1.5; font-size: 14px;">${formatText(data.summary)}</p>
                </div>
            ` : ''}

            <!-- EXPERIENCE -->
            ${data.experience.length > 0 ? `
                <div style="margin-bottom: 25px;">
                    <h3 style="font-size: 16px; text-transform: uppercase; color: var(--dark); border-bottom: 1px solid var(--border); padding-bottom: 6px; margin-bottom: 12px; font-weight: 700;">Work Experience</h3>
                    ${data.experience.map(exp => `
                        <div style="margin-bottom: 22px;">
                            <div style="display: flex; justify-content: space-between; margin-bottom: 6px;">
                                <strong style="font-size: 15px;">${escapeHTML(exp.title)}</strong>
                                <span style="color: var(--primary); font-size: 14px; font-weight: 500;">${escapeHTML(exp.start)} — ${escapeHTML(exp.end)}</span>
                            </div>
                            <div style="font-style: italic; color: var(--gray); font-size: 13px; margin-bottom: 10px;">
                                ${escapeHTML(exp.company)} | ${escapeHTML(exp.location)}
                            </div>
                            <div style="white-space: pre-line; font-size: 13px; line-height: 1.4; color: var(--dark);">
                                ${formatText(exp.description)}
                            </div>
                        </div>
                    `).join('')}
                </div>
            ` : ''}

            <!-- SKILLS & EDUCATION SIDE-BY-SIDE -->
            <div style="display: flex; flex-wrap: wrap; margin-bottom: 20px; gap: 30px;">
                <!-- SKILLS -->
                ${data.skills.technical || data.skills.soft ? `
                    <div style="flex: 1; min-width: 250px;">
                        <h3 style="font-size: 16px; text-transform: uppercase; color: var(--dark); border-bottom: 1px solid var(--border); padding-bottom: 6px; margin-bottom: 12px; font-weight: 700;">Core Competencies</h3>
                        ${data.skills.technical ? `
                            <div style="margin-bottom: 15px;">
                                <h4 style="font-size: 14px; color: var(--primary); margin-bottom: 8px; font-weight: 600;">Technical Skills</h4>
                                <div style="font-size: 13px; line-height: 1.5;">
                                    ${data.skills.technical.split(',').filter(skill => skill.trim()).map(skill => `
                                        <div style="margin-bottom: 5px; display: flex; align-items: center;">
                                            <span style="color: var(--primary); margin-right: 8px;">•</span>
                                            <span>${escapeHTML(skill.trim())}</span>
                                        </div>
                                    `).join('')}
                                </div>
                            </div>
                        ` : ''}
                        
                        ${data.skills.soft ? `
                            <div style="margin-bottom: 15px;">
                                <h4 style="font-size: 14px; color: var(--primary); margin-bottom: 8px; font-weight: 600;">Soft Skills</h4>
                                <div style="font-size: 13px; line-height: 1.5;">
                                    ${data.skills.soft.split(',').filter(skill => skill.trim()).map(skill => `
                                        <div style="margin-bottom: 5px; display: flex; align-items: center;">
                                            <span style="color: var(--primary); margin-right: 8px;">•</span>
                                            <span>${escapeHTML(skill.trim())}</span>
                                        </div>
                                    `).join('')}
                                </div>
                            </div>
                        ` : ''}
                    </div>
                ` : ''}
                
                <!-- EDUCATION -->
                ${data.education.length > 0 ? `
                    <div style="flex: 1; min-width: 250px;">
                        <h3 style="font-size: 16px; text-transform: uppercase; color: var(--dark); border-bottom: 1px solid var(--border); padding-bottom: 6px; margin-bottom: 12px; font-weight: 700;">Education</h3>
                        ${data.education.map(edu => `
                            <div style="margin-bottom: 18px;">
                                <strong style="font-size: 14px; display: block; margin-bottom: 4px;">${escapeHTML(edu.degree)}</strong>
                                <div style="font-size: 13px; color: var(--gray); margin-bottom: 2px;">${escapeHTML(edu.school)}</div>
                                <div style="font-size: 12px; color: var(--primary);">${edu.location ? `${escapeHTML(edu.location)} • ` : ''}${escapeHTML(edu.end)}</div>
                                ${edu.subjects ? `<div style="font-size: 12px; color: var(--gray); margin-top: 4px;">${escapeHTML(edu.subjects)}</div>` : ''}
                            </div>
                        `).join('')}
                    </div>
                ` : ''}
            </div>

            <!-- CERTIFICATIONS -->
            ${data.skills.certifications ? `
                <div style="margin-top: 10px;">
                    <h3 style="font-size: 16px; text-transform: uppercase; color: var(--dark); border-bottom: 1px solid var(--border); padding-bottom: 6px; margin-bottom: 12px; font-weight: 700;">Certifications & Licenses</h3>
                    <div style="white-space: pre-line; font-size: 13px; line-height: 1.5;">
                        ${formatText(data.skills.certifications)}
                    </div>
                </div>
            ` : ''}
        </div>
    `;
}

// Executive Template
function renderExecutiveTemplate(data) {
    return `
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 30px;">
            <div>
                <div style="font-size: 32px; font-weight: 700; color: var(--dark); margin-bottom: 5px; letter-spacing: 0.5px;">${escapeHTML(data.personal.name)}</div>
                <div style="font-size: 18px; color: var(--primary); margin-bottom: 15px; font-weight: 500;">${escapeHTML(data.personal.title)}</div>
            </div>
            <div style="text-align: right; font-size: 13px;">
                <div>${escapeHTML(data.personal.email)}</div>
                <div>${escapeHTML(data.personal.phone)}</div>
                <div>${escapeHTML(data.personal.location)}</div>
                ${data.personal.linkedin ? `<div style="margin-top: 5px;">${escapeHTML(data.personal.linkedin)}</div>` : ''}
            </div>
        </div>
        
        ${data.summary ? `
            <div style="margin-bottom: 30px;">
                <div style="font-size: 18px; font-weight: 600; color: var(--dark); margin-bottom: 10px; padding-bottom: 5px; border-bottom: 2px solid var(--primary);">Executive Summary</div>
                <p style="text-align: justify; line-height: 1.6; font-size: 14px;">${formatText(data.summary)}</p>
            </div>
        ` : ''}
        
        ${data.experience.length > 0 ? `
            <div style="margin-bottom: 30px;">
                <div style="font-size: 18px; font-weight: 600; color: var(--dark); margin-bottom: 15px; padding-bottom: 5px; border-bottom: 2px solid var(--primary);">Professional Experience</div>
                ${data.experience.map(exp => `
                    <div style="margin-bottom: 25px;">
                        <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                            <div style="font-size: 16px; font-weight: 600;">${escapeHTML(exp.title)}</div>
                            <div style="color: var(--primary); font-weight: 500; font-size: 14px;">${escapeHTML(exp.start)} - ${escapeHTML(exp.end)}</div>
                        </div>
                        <div style="color: var(--primary-light); font-style: italic; margin-bottom: 10px; font-size: 14px;">
                            ${escapeHTML(exp.company)} | ${escapeHTML(exp.location)}
                        </div>
                        <div style="white-space: pre-line; font-size: 14px; line-height: 1.5;">${formatText(exp.description)}</div>
                    </div>
                `).join('')}
            </div>
        ` : ''}
        
        <div style="display: flex; flex-wrap: wrap; gap: 40px; margin-top: 30px;">
            ${data.education.length > 0 ? `
                <div style="flex: 1; min-width: 250px;">
                    <div style="font-size: 18px; font-weight: 600; color: var(--dark); margin-bottom: 10px; padding-bottom: 5px; border-bottom: 2px solid var(--primary);">Education</div>
                    ${data.education.map(edu => `
                        <div style="margin-bottom: 20px;">
                            <div style="display: flex; justify-content: space-between;">
                                <div style="font-size: 16px; font-weight: 600;">${escapeHTML(edu.degree)}</div>
                                <div style="color: var(--primary);">${escapeHTML(edu.end)}</div>
                            </div>
                            <div style="font-size: 14px; color: var(--gray);">${escapeHTML(edu.school)}, ${escapeHTML(edu.location)}</div>
                        </div>
                    `).join('')}
                </div>
            ` : ''}
            
            ${data.skills.technical || data.skills.soft ? `
                <div style="flex: 1; min-width: 250px;">
                    <div style="font-size: 18px; font-weight: 600; color: var(--dark); margin-bottom: 10px; padding-bottom: 5px; border-bottom: 2px solid var(--primary);">Skills</div>
                    
                    ${data.skills.technical ? `
                        <div style="margin-bottom: 15px;">
                            <div style="font-size: 14px; font-weight: 600; color: var(--primary); margin-bottom: 8px;">Technical Expertise</div>
                            <div style="font-size: 13px; line-height: 1.5;">
                                ${data.skills.technical.split(',').filter(skill => skill.trim()).map(skill => `
                                    <div style="margin-bottom: 6px; padding-left: 15px; position: relative;">
                                        <span style="position: absolute; left: 0; color: var(--primary);">›</span>
                                        ${escapeHTML(skill.trim())}
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    ` : ''}
                    
                    ${data.skills.soft ? `
                        <div>
                            <div style="font-size: 14px; font-weight: 600; color: var(--primary); margin-bottom: 8px;">Leadership & Soft Skills</div>
                            <div style="font-size: 13px; line-height: 1.5;">
                                ${data.skills.soft.split(',').filter(skill => skill.trim()).map(skill => `
                                    <div style="margin-bottom: 6px; padding-left: 15px; position: relative;">
                                        <span style="position: absolute; left: 0; color: var(--primary);">›</span>
                                        ${escapeHTML(skill.trim())}
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    ` : ''}
                </div>
            ` : ''}
        </div>
        
        ${data.skills.certifications ? `
            <div style="margin-top: 30px;">
                <div style="font-size: 18px; font-weight: 600; color: var(--dark); margin-bottom: 10px; padding-bottom: 5px; border-bottom: 2px solid var(--primary);">Certifications</div>
                <div style="white-space: pre-line; font-size: 14px; line-height: 1.5;">
                    ${formatText(data.skills.certifications)}
                </div>
            </div>
        ` : ''}
    `;
}

// Simple & Clean Template
function renderSimpleTemplate(data) {
    return `
        <div style="text-align: center; margin-bottom: 30px; padding-bottom: 20px; border-bottom: 2px solid var(--border);">
            <div style="font-size: 28px; font-weight: 600; color: var(--dark); margin-bottom: 5px;">${escapeHTML(data.personal.name)}</div>
            <div style="font-size: 16px; color: var(--primary); margin-bottom: 15px; font-weight: 500;">${escapeHTML(data.personal.title)}</div>
            <div style="display: flex; justify-content: center; flex-wrap: wrap; gap: 15px; font-size: 13px; color: var(--gray);">
                <div>${escapeHTML(data.personal.email)}</div>
                <div>${escapeHTML(data.personal.phone)}</div>
                <div>${escapeHTML(data.personal.location)}</div>
            </div>
        </div>
        
        ${data.summary ? `
            <div style="margin-bottom: 25px;">
                <div style="font-size: 16px; font-weight: 600; color: var(--dark); margin-bottom: 10px; padding-bottom: 5px; border-bottom: 1px solid var(--border);">Professional Profile</div>
                <p style="font-size: 14px; line-height: 1.6;">${formatText(data.summary)}</p>
            </div>
        ` : ''}
        
        ${data.experience.length > 0 ? `
            <div style="margin-bottom: 25px;">
                <div style="font-size: 16px; font-weight: 600; color: var(--dark); margin-bottom: 10px; padding-bottom: 5px; border-bottom: 1px solid var(--border);">Work Experience</div>
                ${data.experience.map(exp => `
                    <div style="margin-bottom: 20px;">
                        <div style="margin-bottom: 5px;">
                            <strong style="font-size: 15px;">${escapeHTML(exp.title)}</strong>
                            <span style="float: right; color: var(--primary); font-size: 13px;">${escapeHTML(exp.start)} - ${escapeHTML(exp.end)}</span>
                        </div>
                        <div style="color: var(--gray); font-size: 13px; margin-bottom: 5px;">
                            ${escapeHTML(exp.company)}${exp.location ? ` • ${escapeHTML(exp.location)}` : ''}
                        </div>
                        <div style="white-space: pre-line; font-size: 13px; line-height: 1.5;">${formatText(exp.description)}</div>
                    </div>
                `).join('')}
            </div>
        ` : ''}
        
        <div style="display: flex; flex-wrap: wrap; gap: 30px; margin-top: 20px;">
            ${data.education.length > 0 ? `
                <div style="flex: 1; min-width: 250px;">
                    <div style="font-size: 16px; font-weight: 600; color: var(--dark); margin-bottom: 10px; padding-bottom: 5px; border-bottom: 1px solid var(--border);">Education</div>
                    ${data.education.map(edu => `
                        <div style="margin-bottom: 15px;">
                            <div>
                                <strong style="font-size: 14px;">${escapeHTML(edu.degree)}</strong>
                                <span style="float: right; color: var(--primary); font-size: 13px;">${escapeHTML(edu.end)}</span>
                            </div>
                            <div style="font-size: 13px; color: var(--gray);">${escapeHTML(edu.school)}${edu.location ? `, ${escapeHTML(edu.location)}` : ''}</div>
                        </div>
                    `).join('')}
                </div>
            ` : ''}
            
            ${data.skills.technical || data.skills.soft ? `
                <div style="flex: 1; min-width: 250px;">
                    <div style="font-size: 16px; font-weight: 600; color: var(--dark); margin-bottom: 10px; padding-bottom: 5px; border-bottom: 1px solid var(--border);">Skills</div>
                    ${data.skills.technical ? `
                        <div style="margin-bottom: 15px;">
                            <div style="font-size: 14px; font-weight: 600; color: var(--primary); margin-bottom: 5px;">Technical</div>
                            <div style="font-size: 13px; line-height: 1.5;">
                                ${data.skills.technical.split(',').filter(skill => skill.trim()).map(skill => `
                                    <div style="margin-bottom: 5px;">• ${escapeHTML(skill.trim())}</div>
                                `).join('')}
                            </div>
                        </div>
                    ` : ''}
                    
                    ${data.skills.soft ? `
                        <div>
                            <div style="font-size: 14px; font-weight: 600; color: var(--primary); margin-bottom: 5px;">Soft Skills</div>
                            <div style="font-size: 13px; line-height: 1.5;">
                                ${data.skills.soft.split(',').filter(skill => skill.trim()).map(skill => `
                                    <div style="margin-bottom: 5px;">• ${escapeHTML(skill.trim())}</div>
                                `).join('')}
                            </div>
                        </div>
                    ` : ''}
                </div>
            ` : ''}
        </div>
        
        ${data.skills.certifications ? `
            <div style="margin-top: 20px;">
                <div style="font-size: 16px; font-weight: 600; color: var(--dark); margin-bottom: 10px; padding-bottom: 5px; border-bottom: 1px solid var(--border);">Certifications</div>
                <div style="white-space: pre-line; font-size: 13px; line-height: 1.5;">
                    ${formatText(data.skills.certifications)}
                </div>
            </div>
        ` : ''}
    `;
}

// ====== UTILITY FUNCTIONS ======

// Escape HTML to prevent XSS
function escapeHTML(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Format text with basic line breaks
function formatText(text) {
    if (!text) return '';
    return escapeHTML(text).replace(/\n/g, '<br>');
}