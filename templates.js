// Resume Templates for 9to5 University Job Portal

const resumeTemplates = [
    {
        id: 1,
        name: "Professional Blue",
        description: "Clean and professional design with blue accent",
        color: "#1a365d",
        layout: "traditional",
        sections: ["header", "summary", "experience", "education", "skills", "contact"]
    },
    {
        id: 2,
        name: "Modern Gold",
        description: "Modern design with gold accents",
        color: "#d4af37",
        layout: "modern",
        sections: ["header", "summary", "skills", "experience", "education", "projects"]
    },
    {
        id: 3,
        name: "Minimalist",
        description: "Simple and clean minimalist design",
        color: "#333333",
        layout: "minimalist",
        sections: ["header", "experience", "education", "skills"]
    },
    {
        id: 4,
        name: "Creative",
        description: "Creative design for artistic fields",
        color: "#6a11cb",
        layout: "creative",
        sections: ["header", "portfolio", "experience", "skills", "education"]
    },
    {
        id: 5,
        name: "Academic",
        description: "Formal design for academic purposes",
        color: "#2c3e50",
        layout: "academic",
        sections: ["header", "education", "publications", "research", "experience", "skills"]
    },
    {
        id: 6,
        name: "Executive",
        description: "Bold design for executive positions",
        color: "#1a237e",
        layout: "executive",
        sections: ["header", "summary", "experience", "achievements", "education", "skills"]
    }
];

// Template preview HTML generator
function generateTemplatePreview(template) {
    return `
        <div class="template-preview" style="background: linear-gradient(135deg, ${template.color} 0%, ${darkenColor(template.color, 20)} 100%);">
            <div style="padding: 20px; color: white;">
                <h3 style="margin: 0 0 10px 0;">${template.name}</h3>
                <p style="margin: 0; opacity: 0.9; font-size: 0.9rem;">${template.description}</p>
            </div>
        </div>
    `;
}

// Helper function to darken color
function darkenColor(color, percent) {
    let r = parseInt(color.substring(1, 3), 16);
    let g = parseInt(color.substring(3, 5), 16);
    let b = parseInt(color.substring(5, 7), 16);

    r = parseInt(r * (100 - percent) / 100);
    g = parseInt(g * (100 - percent) / 100);
    b = parseInt(b * (100 - percent) / 100);

    r = (r < 0) ? 0 : r;
    g = (g < 0) ? 0 : g;
    b = (b < 0) ? 0 : b;

    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

// Get template by ID
function getTemplateById(id) {
    return resumeTemplates.find(template => template.id === parseInt(id));
}

// Get all templates
function getAllTemplates() {
    return resumeTemplates;
}

// Get templates by layout
function getTemplatesByLayout(layout) {
    return resumeTemplates.filter(template => template.layout === layout);
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        resumeTemplates,
        generateTemplatePreview,
        getTemplateById,
        getAllTemplates,
        getTemplatesByLayout
    };
}