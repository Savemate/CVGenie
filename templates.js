// ====== RESUME TEMPLATE RENDERING FUNCTIONS ======

// Professional University Template
function renderProfessionalTemplate(data) {
    return `
        <div style="font-family: 'Inter', sans-serif; color: var(--dark); line-height: 1.5;">
            <!-- HEADER -->
            <div style="border-bottom: 3px solid var(--primary); padding-bottom: 20px; margin-bottom: 30px;">
                <h1 style="font-size: 36px; margin: 0; color: var(--primary); font-weight: 700; letter-spacing: -0.5px;">${escapeHTML(data.personal.name)}</h1>
                <h2 style="font-size: 20px; font-weight: 600; margin: 8px 0 15px 0; color: var(--secondary);">${escapeHTML(data.personal.title)}</h2>
                <div style="display: flex; flex-wrap: wrap; gap: 15px; font-size: 14px; color: var(--gray);">
                    <div style="display: flex; align-items: center; gap: 5px;">
                        <i class="fas fa-envelope" style="color: var(--primary); width: 16px;"></i>
                        <span>${escapeHTML(data.personal.email)}</span>
                    </div>
                    <div style="display: flex; align-items: center; gap: 5px;">
                        <i class="fas fa-phone" style="color: var(--primary); width: 16px;"></i>
                        <span>${escapeHTML(data.personal.phone)}</span>
                    </div>
                    <div style="display: flex; align-items: center; gap: 5px;">
                        <i class="fas fa-map-marker-alt" style="color: var(--primary); width: 16px;"></i>
                        <span>${escapeHTML(data.personal.location)}</span>
                    </div>
                    ${data.personal.linkedin ? `
                        <div style="display: flex; align-items: center; gap: 5px;">
                            <i class="fab fa-linkedin" style="color: var(--primary); width: 16px;"></i>
                            <span>${escapeHTML(data.personal.linkedin)}</span>
                        </div>
                    ` : ''}
                </div>
            </div>

            <!-- PROFILE -->
            ${data.summary ? `
                <div style="margin-bottom: 25px;">
                    <h3 style="font-size: 18px; color: var(--primary); border-bottom: 2px solid var(--border); padding-bottom: 8px; margin-bottom: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">PROFESSIONAL PROFILE</h3>
                    <p style="line-height: 1.6; font-size: 14px; color: var(--dark);">${formatText(data.summary)}</p>
                </div>
            ` : ''}

            <!-- EXPERIENCE -->
            ${data.experience.length > 0 ? `
                <div style="margin-bottom: 25px;">
                    <h3 style="font-size: 18px; color: var(--primary); border-bottom: 2px solid var(--border); padding-bottom: 8px; margin-bottom: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">WORK EXPERIENCE</h3>
                    ${data.experience.map(exp => `
                        <div style="margin-bottom: 20px;">
                            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 5px;">
                                <div>
                                    <strong style="font-size: 16px; color: var(--dark); display: block;">${escapeHTML(exp.title)}</strong>
                                    <div style="font-size: 14px; color: var(--gray); margin-top: 2px;">
                                        ${escapeHTML(exp.company)} ${exp.location ? `| ${escapeHTML(exp.location)}` : ''}
                                    </div>
                                </div>
                                <span style="color: var(--primary); font-size: 14px; font-weight: 500; white-space: nowrap;">${escapeHTML(exp.start)} — ${escapeHTML(exp.end)}</span>
                            </div>
                            <div style="white-space: pre-line; font-size: 14px; line-height: 1.5; color: var(--dark); margin-top: 8px; padding-left: 15px;">
                                ${formatText(exp.description)}
                            </div>
                        </div>
                    `).join('')}
                </div>
            ` : ''}

            <!-- SKILLS & EDUCATION SIDE BY SIDE -->
            <div style="display: flex; flex-wrap: wrap; margin-bottom: 20px; gap: 40px;">
                <!-- SKILLS -->
                ${(data.skills.technical || data.skills.soft) ? `
                    <div style="flex: 1; min-width: 300px;">
                        <h3 style="font-size: 18px; color: var(--primary); border-bottom: 2px solid var(--border); padding-bottom: 8px; margin-bottom: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">SKILLS</h3>
                        ${data.skills.technical ? `
                            <div style="margin-bottom: 15px;">
                                <h4 style="font-size: 15px; color: var(--dark); margin-bottom: 8px; font-weight: 600;">Technical Skills</h4>
                                <div style="font-size: 14px; line-height: 1.5; color: var(--dark);">
                                    ${data.skills.technical.split(',').filter(skill => skill.trim()).map(skill => `
                                        <div style="margin-bottom: 6px; display: flex; align-items: center;">
                                            <span style="color: var(--primary); margin-right: 8px;">•</span>
                                            <span>${escapeHTML(skill.trim())}</span>
                                        </div>
                                    `).join('')}
                                </div>
                            </div>
                        ` : ''}
                        
                        ${data.skills.soft ? `
                            <div style="margin-bottom: 15px;">
                                <h4 style="font-size: 15px; color: var(--dark); margin-bottom: 8px; font-weight: 600;">Soft Skills</h4>
                                <div style="font-size: 14px; line-height: 1.5; color: var(--dark);">
                                    ${data.skills.soft.split(',').filter(skill => skill.trim()).map(skill => `
                                        <div style="margin-bottom: 6px; display: flex; align-items: center;">
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
                    <div style="flex: 1; min-width: 300px;">
                        <h3 style="font-size: 18px; color: var(--primary); border-bottom: 2px solid var(--border); padding-bottom: 8px; margin-bottom: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">EDUCATION</h3>
                        ${data.education.map(edu => `
                            <div style="margin-bottom: 18px;">
                                <strong style="font-size: 15px; display: block; margin-bottom: 4px; color: var(--dark);">${escapeHTML(edu.degree)}</strong>
                                <div style="font-size: 14px; color: var(--gray); margin-bottom: 2px;">${escapeHTML(edu.school)}</div>
                                <div style="font-size: 13px; color: var(--primary); font-weight: 500;">
                                    ${edu.location ? `${escapeHTML(edu.location)} • ` : ''}${escapeHTML(edu.end)}
                                </div>
                                ${edu.subjects ? `
                                    <div style="font-size: 13px; color: var(--gray); margin-top: 4px;">
                                        ${escapeHTML(edu.subjects)}
                                    </div>
                                ` : ''}
                            </div>
                        `).join('')}
                    </div>
                ` : ''}
            </div>
            
            <!-- CERTIFICATIONS -->
            ${data.skills.certifications ? `
                <div style="margin-top: 20px;">
                    <h3 style="font-size: 18px; color: var(--primary); border-bottom: 2px solid var(--border); padding-bottom: 8px; margin-bottom: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">CERTIFICATIONS & LICENSES</h3>
                    <div style="white-space: pre-line; font-size: 14px; line-height: 1.5; color: var(--dark);">
                        ${formatText(data.skills.certifications)}
                    </div>
                </div>
            ` : ''}
        </div>
    `;
}

// Modern Template
function renderModernTemplate(data) {
    return `
        <div style="font-family: 'Inter', sans-serif; color: var(--dark);">
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

            <!-- SKILLS & EDUCATION -->
            <div style="display: flex; flex-wrap: wrap; margin-bottom: 20px; gap: 30px;">
                <!-- SKILLS -->
                ${data.skills.technical || data.skills.soft ? `
                    <div style="flex: 1; min-width: 250px;">
                        <h3 style="font-size: 16px; text-transform: uppercase; color: var(--dark); border-bottom: 1px solid var(--border); padding-bottom: 6px; margin-bottom: 12px; font-weight: 700;">Skills</h3>
                        ${data.skills.technical ? `
                            <div style="margin-bottom: 15px;">
                                <h4 style="font-size: 14px; color: var(--primary); margin-bottom: 8px; font-weight: 600;">Technical</h4>
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
                                ${edu.subjects ? `<div style="font-size: 12px; color: var(--gray); margin-top: 2px;">${escapeHTML(edu.subjects)}</div>` : ''}
                            </div>
                        `).join('')}
                    </div>
                ` : ''}
            </div>
            
            <!-- CERTIFICATIONS -->
            ${data.skills.certifications ? `
                <div style="margin-top: 20px;">
                    <h3 style="font-size: 16px; text-transform: uppercase; color: var(--dark); border-bottom: 1px solid var(--border); padding-bottom: 6px; margin-bottom: 12px; font-weight: 700;">Certifications</h3>
                    <div style="white-space: pre-line; font-size: 14px; line-height: 1.5;">${formatText(data.skills.certifications)}</div>
                </div>
            ` : ''}
        </div>
    `;
}

// JobJack Style Template
function renderJobJackTemplate(data) {
    return `
        <div style="font-family: 'Inter', sans-serif; color: var(--dark); line-height: 1.4;">
            <!-- HEADER -->
            <div style="background: var(--primary); color: white; padding: 25px; margin-bottom: 25px; border-radius: 4px;">
                <h1 style="font-size: 32px; margin: 0; font-weight: 700;">${escapeHTML(data.personal.name)}</h1>
                <h2 style="font-size: 18px; font-weight: 400; margin: 10px 0 0 0; opacity: 0.9;">${escapeHTML(data.personal.title)}</h2>
            </div>

            <!-- CONTACT INFO -->
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin-bottom: 25px; padding: 0 10px;">
                <div style="display: flex; align-items: center; gap: 8px;">
                    <i class="fas fa-envelope" style="color: var(--primary);"></i>
                    <span>${escapeHTML(data.personal.email)}</span>
                </div>
                <div style="display: flex; align-items: center; gap: 8px;">
                    <i class="fas fa-phone" style="color: var(--primary);"></i>
                    <span>${escapeHTML(data.personal.phone)}</span>
                </div>
                <div style="display: flex; align-items: center; gap: 8px;">
                    <i class="fas fa-map-marker-alt" style="color: var(--primary);"></i>
                    <span>${escapeHTML(data.personal.location)}</span>
                </div>
                ${data.personal.linkedin ? `
                    <div style="display: flex; align-items: center; gap: 8px;">
                        <i class="fab fa-linkedin" style="color: var(--primary);"></i>
                        <span>${escapeHTML(data.personal.linkedin)}</span>
                    </div>
                ` : ''}
            </div>

            <!-- TWO COLUMN LAYOUT -->
            <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 30px;">
                <!-- LEFT COLUMN -->
                <div>
                    <!-- PROFILE -->
                    ${data.summary ? `
                        <div style="margin-bottom: 25px;">
                            <h3 style="font-size: 16px; color: var(--primary); padding-bottom: 5px; margin-bottom: 12px; font-weight: 600; border-bottom: 2px solid var(--primary);">PROFILE</h3>
                            <p style="font-size: 14px; line-height: 1.5;">${formatText(data.summary)}</p>
                        </div>
                    ` : ''}

                    <!-- EXPERIENCE -->
                    ${data.experience.length > 0 ? `
                        <div style="margin-bottom: 25px;">
                            <h3 style="font-size: 16px; color: var(--primary); padding-bottom: 5px; margin-bottom: 12px; font-weight: 600; border-bottom: 2px solid var(--primary);">WORK EXPERIENCE</h3>
                            ${data.experience.map(exp => `
                                <div style="margin-bottom: 20px;">
                                    <div style="margin-bottom: 5px;">
                                        <strong style="font-size: 15px;">${escapeHTML(exp.title)}</strong>
                                        <span style="color: var(--primary); font-size: 13px; float: right;">${escapeHTML(exp.start)} - ${escapeHTML(exp.end)}</span>
                                    </div>
                                    <div style="font-size: 13px; color: var(--gray); margin-bottom: 8px;">
                                        ${escapeHTML(exp.company)} | ${escapeHTML(exp.location)}
                                    </div>
                                    <div style="font-size: 13px; white-space: pre-line;">
                                        ${formatText(exp.description)}
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    ` : ''}
                </div>

                <!-- RIGHT COLUMN -->
                <div>
                    <!-- SKILLS -->
                    ${data.skills.technical || data.skills.soft ? `
                        <div style="margin-bottom: 25px;">
                            <h3 style="font-size: 16px; color: var(--primary); padding-bottom: 5px; margin-bottom: 12px; font-weight: 600; border-bottom: 2px solid var(--primary);">SKILLS</h3>
                            <div style="display: flex; flex-wrap: wrap; gap: 8px;">
                                ${data.skills.technical ? data.skills.technical.split(',').filter(skill => skill.trim()).map(skill => `
                                    <span style="background: var(--light); padding: 4px 10px; border-radius: 20px; font-size: 12px; border: 1px solid var(--border);">
                                        ${escapeHTML(skill.trim())}
                                    </span>
                                `).join('') : ''}
                                
                                ${data.skills.soft ? data.skills.soft.split(',').filter(skill => skill.trim()).map(skill => `
                                    <span style="background: var(--light); padding: 4px 10px; border-radius: 20px; font-size: 12px; border: 1px solid var(--border);">
                                        ${escapeHTML(skill.trim())}
                                    </span>
                                `).join('') : ''}
                            </div>
                        </div>
                    ` : ''}

                    <!-- EDUCATION -->
                    ${data.education.length > 0 ? `
                        <div style="margin-bottom: 25px;">
                            <h3 style="font-size: 16px; color: var(--primary); padding-bottom: 5px; margin-bottom: 12px; font-weight: 600; border-bottom: 2px solid var(--primary);">EDUCATION</h3>
                            ${data.education.map(edu => `
                                <div style="margin-bottom: 15px;">
                                    <strong style="font-size: 14px; display: block;">${escapeHTML(edu.degree)}</strong>
                                    <div style="font-size: 12px; color: var(--gray);">${escapeHTML(edu.school)}</div>
                                    <div style="font-size: 12px; color: var(--primary);">${escapeHTML(edu.end)}</div>
                                </div>
                            `).join('')}
                        </div>
                    ` : ''}

                    <!-- CERTIFICATIONS -->
                    ${data.skills.certifications ? `
                        <div>
                            <h3 style="font-size: 16px; color: var(--primary); padding-bottom: 5px; margin-bottom: 12px; font-weight: 600; border-bottom: 2px solid var(--primary);">CERTIFICATIONS</h3>
                            <div style="font-size: 13px; white-space: pre-line;">
                                ${formatText(data.skills.certifications)}
                            </div>
                        </div>
                    ` : ''}
                </div>
            </div>
        </div>
    `;
}

// Executive Template
function renderExecutiveTemplate(data) {
    return `
        <div style="font-family: 'Inter', sans-serif; color: var(--dark);">
            <!-- HEADER -->
            <div style="background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%); color: white; padding: 40px; text-align: center; margin-bottom: 30px;">
                <h1 style="font-size: 40px; margin: 0; font-weight: 700; letter-spacing: -0.5px;">${escapeHTML(data.personal.name)}</h1>
                <h2 style="font-size: 22px; font-weight: 300; margin: 15px 0 0 0; opacity: 0.9;">${escapeHTML(data.personal.title)}</h2>
                <div style="display: flex; justify-content: center; gap: 25px; margin-top: 20px; font-size: 14px; opacity: 0.8;">
                    <span>${escapeHTML(data.personal.email)}</span>
                    <span>•</span>
                    <span>${escapeHTML(data.personal.phone)}</span>
                    <span>•</span>
                    <span>${escapeHTML(data.personal.location)}</span>
                </div>
            </div>

            <div style="padding: 0 30px;">
                <!-- PROFILE -->
                ${data.summary ? `
                    <div style="margin-bottom: 30px;">
                        <h3 style="font-size: 20px; color: var(--primary); margin-bottom: 15px; font-weight: 600; position: relative; padding-left: 15px;">
                            <span style="background: white; padding-right: 15px; position: relative;">EXECUTIVE SUMMARY</span>
                            <span style="position: absolute; left: 0; top: 50%; width: 100%; height: 2px; background: var(--border); z-index: -1;"></span>
                        </h3>
                        <p style="font-size: 15px; line-height: 1.6; color: var(--gray);">
                            ${formatText(data.summary)}
                        </p>
                    </div>
                ` : ''}

                <!-- EXPERIENCE -->
                ${data.experience.length > 0 ? `
                    <div style="margin-bottom: 30px;">
                        <h3 style="font-size: 20px; color: var(--primary); margin-bottom: 15px; font-weight: 600; position: relative; padding-left: 15px;">
                            <span style="background: white; padding-right: 15px; position: relative;">PROFESSIONAL EXPERIENCE</span>
                            <span style="position: absolute; left: 0; top: 50%; width: 100%; height: 2px; background: var(--border); z-index: -1;"></span>
                        </h3>
                        ${data.experience.map((exp, index) => `
                            <div style="margin-bottom: 25px; position: relative; padding-left: 20px; border-left: 2px solid ${index === 0 ? 'var(--primary)' : 'var(--border)'};">
                                <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                                    <strong style="font-size: 17px;">${escapeHTML(exp.title)}</strong>
                                    <span style="color: var(--primary); font-size: 14px; font-weight: 500;">${escapeHTML(exp.start)} – ${escapeHTML(exp.end)}</span>
                                </div>
                                <div style="font-size: 15px; color: var(--gray); font-style: italic; margin-bottom: 10px;">
                                    ${escapeHTML(exp.company)} | ${escapeHTML(exp.location)}
                                </div>
                                <div style="font-size: 14px; line-height: 1.5; white-space: pre-line;">
                                    ${formatText(exp.description)}
                                </div>
                            </div>
                        `).join('')}
                    </div>
                ` : ''}

                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px;">
                    <!-- SKILLS -->
                    ${data.skills.technical || data.skills.soft ? `
                        <div>
                            <h3 style="font-size: 20px; color: var(--primary); margin-bottom: 15px; font-weight: 600; position: relative; padding-left: 15px;">
                                <span style="background: white; padding-right: 15px; position: relative;">KEY SKILLS</span>
                                <span style="position: absolute; left: 0; top: 50%; width: 100%; height: 2px; background: var(--border); z-index: -1;"></span>
                            </h3>
                            ${data.skills.technical ? `
                                <div style="margin-bottom: 20px;">
                                    <h4 style="font-size: 15px; color: var(--dark); margin-bottom: 8px; font-weight: 600;">Technical Expertise</h4>
                                    <div style="font-size: 14px; line-height: 1.5;">
                                        ${data.skills.technical.split(',').filter(skill => skill.trim()).map(skill => `
                                            <div style="margin-bottom: 8px; display: flex; align-items: center;">
                                                <div style="width: 6px; height: 6px; background: var(--primary); border-radius: 50%; margin-right: 10px;"></div>
                                                <span>${escapeHTML(skill.trim())}</span>
                                            </div>
                                        `).join('')}
                                    </div>
                                </div>
                            ` : ''}
                            
                            ${data.skills.soft ? `
                                <div>
                                    <h4 style="font-size: 15px; color: var(--dark); margin-bottom: 8px; font-weight: 600;">Leadership & Management</h4>
                                    <div style="font-size: 14px; line-height: 1.5;">
                                        ${data.skills.soft.split(',').filter(skill => skill.trim()).map(skill => `
                                            <div style="margin-bottom: 8px; display: flex; align-items: center;">
                                                <div style="width: 6px; height: 6px; background: var(--primary); border-radius: 50%; margin-right: 10px;"></div>
                                                <span>${escapeHTML(skill.trim())}</span>
                                            </div>
                                        `).join('')}
                                    </div>
                                </div>
                            ` : ''}
                        </div>
                    ` : ''}

                    <!-- EDUCATION & CERTIFICATIONS -->
                    <div>
                        ${data.education.length > 0 ? `
                            <div style="margin-bottom: 30px;">
                                <h3 style="font-size: 20px; color: var(--primary); margin-bottom: 15px; font-weight: 600; position: relative; padding-left: 15px;">
                                    <span style="background: white; padding-right: 15px; position: relative;">EDUCATION</span>
                                    <span style="position: absolute; left: 0; top: 50%; width: 100%; height: 2px; background: var(--border); z-index: -1;"></span>
                                </h3>
                                ${data.education.map(edu => `
                                    <div style="margin-bottom: 15px; padding-left: 15px; border-left: 2px solid var(--border);">
                                        <strong style="font-size: 15px; display: block; margin-bottom: 4px;">${escapeHTML(edu.degree)}</strong>
                                        <div style="font-size: 14px; color: var(--gray);">${escapeHTML(edu.school)}</div>
                                        <div style="font-size: 13px; color: var(--primary);">${edu.location ? `${escapeHTML(edu.location)}, ` : ''}${escapeHTML(edu.end)}</div>
                                    </div>
                                `).join('')}
                            </div>
                        ` : ''}

                        ${data.skills.certifications ? `
                            <div>
                                <h3 style="font-size: 20px; color: var(--primary); margin-bottom: 15px; font-weight: 600; position: relative; padding-left: 15px;">
                                    <span style="background: white; padding-right: 15px; position: relative;">CERTIFICATIONS</span>
                                    <span style="position: absolute; left: 0; top: 50%; width: 100%; height: 2px; background: var(--border); z-index: -1;"></span>
                                </h3>
                                <div style="font-size: 14px; line-height: 1.5; white-space: pre-line;">
                                    ${formatText(data.skills.certifications)}
                                </div>
                            </div>
                        ` : ''}
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Simple Template
function renderSimpleTemplate(data) {
    return `
        <div style="font-family: 'Inter', sans-serif; color: var(--dark); line-height: 1.5;">
            <!-- HEADER -->
            <div style="text-align: center; margin-bottom: 30px;">
                <h1 style="font-size: 28px; margin: 0; color: var(--dark); font-weight: 600;">${escapeHTML(data.personal.name)}</h1>
                <h2 style="font-size: 16px; font-weight: 400; margin: 5px 0 15px 0; color: var(--primary);">${escapeHTML(data.personal.title)}</h2>
                <div style="display: flex; justify-content: center; flex-wrap: wrap; gap: 10px; font-size: 13px; color: var(--gray);">
                    <span>${escapeHTML(data.personal.email)}</span>
                    <span>•</span>
                    <span>${escapeHTML(data.personal.phone)}</span>
                    <span>•</span>
                    <span>${escapeHTML(data.personal.location)}</span>
                </div>
            </div>

            <!-- SECTIONS -->
            <div style="max-width: 800px; margin: 0 auto;">
                <!-- PROFILE -->
                ${data.summary ? `
                    <div style="margin-bottom: 20px;">
                        <h3 style="font-size: 16px; color: var(--dark); margin-bottom: 10px; font-weight: 600; padding-bottom: 5px; border-bottom: 1px solid var(--border);">Profile</h3>
                        <p style="font-size: 14px;">${formatText(data.summary)}</p>
                    </div>
                ` : ''}

                <!-- EXPERIENCE -->
                ${data.experience.length > 0 ? `
                    <div style="margin-bottom: 20px;">
                        <h3 style="font-size: 16px; color: var(--dark); margin-bottom: 10px; font-weight: 600; padding-bottom: 5px; border-bottom: 1px solid var(--border);">Work Experience</h3>
                        ${data.experience.map(exp => `
                            <div style="margin-bottom: 15px;">
                                <div style="margin-bottom: 5px;">
                                    <strong style="font-size: 14px;">${escapeHTML(exp.title)}</strong>
                                    <span style="float: right; font-size: 13px; color: var(--gray);">${escapeHTML(exp.start)} - ${escapeHTML(exp.end)}</span>
                                </div>
                                <div style="font-size: 13px; color: var(--gray); margin-bottom: 5px;">
                                    ${escapeHTML(exp.company)} ${exp.location ? `, ${escapeHTML(exp.location)}` : ''}
                                </div>
                                <div style="font-size: 13px; white-space: pre-line;">
                                    ${formatText(exp.description)}
                                </div>
                            </div>
                        `).join('')}
                    </div>
                ` : ''}

                <!-- SKILLS -->
                ${data.skills.technical || data.skills.soft ? `
                    <div style="margin-bottom: 20px;">
                        <h3 style="font-size: 16px; color: var(--dark); margin-bottom: 10px; font-weight: 600; padding-bottom: 5px; border-bottom: 1px solid var(--border);">Skills</h3>
                        <div style="font-size: 14px;">
                            ${data.skills.technical ? `
                                <div style="margin-bottom: 10px;">
                                    <strong style="font-size: 13px; display: block; margin-bottom: 5px;">Technical:</strong>
                                    <span>${escapeHTML(data.skills.technical)}</span>
                                </div>
                            ` : ''}
                            
                            ${data.skills.soft ? `
                                <div>
                                    <strong style="font-size: 13px; display: block; margin-bottom: 5px;">Soft Skills:</strong>
                                    <span>${escapeHTML(data.skills.soft)}</span>
                                </div>
                            ` : ''}
                        </div>
                    </div>
                ` : ''}

                <!-- EDUCATION -->
                ${data.education.length > 0 ? `
                    <div style="margin-bottom: 20px;">
                        <h3 style="font-size: 16px; color: var(--dark); margin-bottom: 10px; font-weight: 600; padding-bottom: 5px; border-bottom: 1px solid var(--border);">Education</h3>
                        ${data.education.map(edu => `
                            <div style="margin-bottom: 10px;">
                                <strong style="font-size: 14px;">${escapeHTML(edu.degree)}</strong>
                                <div style="font-size: 13px; color: var(--gray);">
                                    ${escapeHTML(edu.school)} ${edu.location ? `, ${escapeHTML(edu.location)}` : ''} ${edu.end ? ` • ${escapeHTML(edu.end)}` : ''}
                                </div>
                            </div>
                        `).join('')}
                    </div>
                ` : ''}

                <!-- CERTIFICATIONS -->
                ${data.skills.certifications ? `
                    <div>
                        <h3 style="font-size: 16px; color: var(--dark); margin-bottom: 10px; font-weight: 600; padding-bottom: 5px; border-bottom: 1px solid var(--border);">Certifications</h3>
                        <div style="font-size: 14px; white-space: pre-line;">
                            ${formatText(data.skills.certifications)}
                        </div>
                    </div>
                ` : ''}
            </div>
        </div>
    `;
}

// Export template functions
window.templates = {
    renderProfessionalTemplate,
    renderModernTemplate,
    renderJobJackTemplate,
    renderExecutiveTemplate,
    renderSimpleTemplate
};