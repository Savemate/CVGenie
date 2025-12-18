// Complete Modern Template
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

// Add missing utility functions
function escapeHTML(str) {
    if (!str) return '';
    return str.toString()
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

function formatText(text) {
    if (!text) return '';
    return text
        .replace(/\n/g, '<br>')
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>');
}