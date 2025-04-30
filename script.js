// Global variable to store resume data
let resumeData = null;

// Execute when DOM is fully loaded
document.addEventListener('DOMContentLoaded', function () {
    loadResumeData('data.json');
});

async function loadResumeData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        resumeData = await response.json();
        initializeResume(resumeData);
        setupEventListeners();
    } catch (error) {
        console.error('Error loading resume data:', error);
        displayErrorMessage(error);
    }
}

// Function to display error message on the page
function displayErrorMessage(error) {
    document.body.innerHTML = `
        <div style="text-align: center; padding: 50px;">
            <h2>Error loading resume data</h2>
            <p>Please check your connection and ensure 'data.json' is in the correct location.</p>
            <p>Error details: ${error.message}</p>
        </div>
    `;
}
// Initialize the resume with data
function initializeResume(data) {
    // Set personal info
    setTextContent('header-name', data?.personal_info?.name || '');
    setTextContent('header-title-es', 'Ingeniero de Desarrollo & QA');
    setTextContent('header-title-en', 'Development & QA Engineer');

    const profileImageEl = document.getElementById('profile-image');
    if (data?.personal_info?.picture) {
        profileImageEl.src = data.personal_info.picture;
        profileImageEl.alt = data.personal_info.name;
    } else {
        // If no image, hide the element
        profileImageEl.style.display = 'none';
    }

    // Add social links
    addSocialLinks(data?.personal_info?.contact || {});

    // Populate About section
    setTextContent('about-description-es', data?.summary?.es || '');
    setTextContent('about-description-en', data?.summary?.en || '');

    // Populate skills
    populateSkills(data?.skills || {});

    // Populate languages
    populateLanguages(data?.languages || {});

    // Populate experience (only first 3 initially)
    if (data?.experience) {
        populateExperience(data.experience.slice(0, 3));
    }

    // Populate certifications (only first 6 initially)
    if (data?.certifications) {
        populateCertifications(data.certifications.slice(0, 6));
    }

    // Populate education
    populateEducation(data?.education || []);
}
// Utility function to set text content based on id
function setTextContent(elementId, text) {
    const element = document.getElementById(elementId);
    if (element) {
        element.textContent = text;
    } else {
        console.warn(`Element with ID '${elementId}' not found.`);
    }
}
// Utility function to set profile image
function setProfileImage(elementId, imageUrl, altText) {
    const element = document.getElementById(elementId);
    if (element) {
        element.src = imageUrl;
        element.alt = altText;
    } else {
        console.warn(`Profile image with ID '${elementId}' not found.`);
    }
}

function addSocialLinks(contact) {
    const socialIconsContainer = document.getElementById('social-icons');
    if (!socialIconsContainer) {
        console.warn('Social icons container not found.');
        return;
    }

    socialIconsContainer.innerHTML = '';  // Clear existing content
    // Create social links dynamically
    if (contact.linkedin) {
        socialIconsContainer.innerHTML += `<a href="${contact.linkedin}" target="_blank" title="LinkedIn" rel="noopener noreferrer"><i class="fab fa-linkedin-in"></i></a>`;
    }
    if (contact.github) {
        socialIconsContainer.innerHTML += `<a href="${contact.github}" target="_blank" title="GitHub" rel="noopener noreferrer"><i class="fab fa-github"></i></a>`;
    }
    if (contact.repo_git) {
        socialIconsContainer.innerHTML += `<a href="${contact.repo_git}" target="_blank" title="Git Repo" rel="noopener noreferrer"><i class="fab fa-github"></i></a>`;
    }
    if (contact.email) {
        socialIconsContainer.innerHTML += `<a href="mailto:${contact.email}" title="Email"><i class="fas fa-envelope"></i></a>`;
    }
    if (contact.phone) {
        socialIconsContainer.innerHTML += `<a href="tel:${contact.phone.split(' ')[0]}" title="Phone"><i class="fas fa-phone"></i></a>`;
    }
}


function populateSkills(skillsData) {
    populateSkillCategory('lenguajes_programacion-skills', skillsData?.lenguajes_programacion || []);
    populateSkillCategory('calidad_automatizacion-skills', skillsData?.calidad_automatizacion || []);
    populateSkillCategory('gestion_proyectos_metodologias-skills', skillsData?.gestion_proyectos_metodologias || []);
    populateSkillCategory('herramientas_tecnologias-skills', skillsData?.herramientas_tecnologias || []);
    populateSkillCategory('practicas_tecnicas-skills', skillsData?.practicas_tecnicas || []);
    populateSkillCategory('soft_skills-skills', skillsData?.soft_skills || []);
}

function populateSkillCategory(containerId, skills) {
    const container = document.getElementById(containerId);
    if (!container) {
        console.warn(`Skill list container not found with ID: ${containerId}`);
        return;
    }

    // Clear existing content
    container.innerHTML = '';

    // Add skills
    skills.forEach(skill => {
        const skillItem = document.createElement('div');
        skillItem.classList.add('skill-item');
        skillItem.textContent = skill;
        container.appendChild(skillItem);
    });

    // Add "Show More" button if needed
    const containerWidth = container.offsetWidth;
    const skillItems = container.querySelectorAll('.skill-item');
    let totalWidth = 0;

    skillItems.forEach(item => {
        totalWidth += item.offsetWidth + 10; // +10 for gap
    });

    // If skills exceed container width, add show more button
    if (totalWidth > containerWidth) {
        const showMoreBtn = document.createElement('button');
        showMoreBtn.classList.add('show-more-skills');
        showMoreBtn.innerHTML = `
            <span class="es-content">Mostrar más</span>
            <span class="en-content">Show more</span>
            <i class="fas fa-chevron-down"></i>
        `;

        showMoreBtn.addEventListener('click', function () {
            const skillList = this.parentElement.querySelector('.skill-list');
            skillList.classList.toggle('expanded');

            if (skillList.classList.contains('expanded')) {
                this.innerHTML = `
                    <span class="es-content">Mostrar menos</span>
                    <span class="en-content">Show less</span>
                    <i class="fas fa-chevron-up"></i>
                `;
            } else {
                this.innerHTML = `
                    <span class="es-content">Mostrar más</span>
                    <span class="en-content">Show more</span>
                    <i class="fas fa-chevron-down"></i>
                `;
            }
        });

        container.parentElement.appendChild(showMoreBtn);
    }
}

// Function to populate languages
function populateLanguages(languages) {
    const container = document.getElementById('languages-container');
    if (!container) {
        console.warn('Languages container not found.');
        return;
    }
    container.innerHTML = '';

    for (const [language, level] of Object.entries(languages)) {
        const languageItem = document.createElement('div');
        languageItem.classList.add('language-item');
        languageItem.textContent = `${language} - ${level}`;
        container.appendChild(languageItem);
    }
}

// Function to create a timeline item for an experience
function createTimelineItem(exp) {
    return `
        <div class="timeline-item">
            <div class="timeline-header">
                <div class="timeline-company">${exp.company}</div>
                <div class="timeline-date">${exp.start_date} - ${exp.end_date}</div>
            </div>
            <div class="timeline-role es-content">${exp.title.es}</div>
            <div class="timeline-role en-content">${exp.title.en}</div>
            <ul class="timeline-description">
                ${exp.responsibilities.es.map(r => `<li class="es-content">${r}</li>`).join('')}
                ${exp.responsibilities.en.map(r => `<li class="en-content">${r}</li>`).join('')}
            </ul>
        </div>
    `;
}

// Populate experience section
function populateExperience(experience) {
    const timeline = document.getElementById('experience-timeline');
    if (!timeline) {
        console.warn('Experience timeline not found.');
        return;
    }
    timeline.innerHTML = '';  // Clear existing content

    experience.forEach(exp => {
        timeline.innerHTML += createTimelineItem(exp);
    });
}

// Populate certifications section
function populateCertifications(certifications) {
    const container = document.getElementById('certifications-container');
    if (!container) {
        console.warn('Certifications container not found.');
        return;
    }
    container.innerHTML = '';  // Clear existing content

    certifications.forEach(cert => {
        container.innerHTML += `
            <div class="certification-item">
                <div class="certification-header">
                    <div class="certification-title es-content">${cert.title.es}</div>
                    <div class="certification-title en-content">${cert.title.en}</div>
                    <div class="certification-date">${cert.expiration}</div>
                </div>
                <div class="certification-issuer">${cert.organization}</div>
               ${cert.credential_url ? `<a href="${cert.credential_url}" target="_blank" class="certification-link es-content">Ver credencial</a>
                <a href="${cert.credential_url}" target="_blank" class="certification-link en-content">View credential</a>` : ''}
            </div>
        `;
    });
}

// Populate education section
function populateEducation(education) {
    const container = document.getElementById('education-container');
    if (!container) {
        console.warn('Education container not found.');
        return;
    }
    container.innerHTML = ''; // Clear any existing content

    education.forEach(edu => {
        container.innerHTML += `
            <div class="education-item">
                <div class="education-institution">${edu.institution}</div>
                <div class="education-degree es-content">${edu.degree_es}</div>
                <div class="education-degree en-content">${edu.degree_en}</div>
                <div class="education-date">${edu.date}</div>
            </div>
        `;
    });
}

// Set up event listeners
// Now you need to declare the vars for each Show More button
function setupEventListeners() {
    // Language switcher
    document.querySelectorAll('.language-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.getAttribute('data-lang');
            document.body.setAttribute('lang', lang);
            setActiveLanguage(lang);
        });
    });
    // For simplicity, let's use the same "getText" as before
    const getText = (button) => ({
        showLessTextEs: 'Mostrar menos',
        showMoreTextEs: 'Mostrar más',
        showLessTextEn: 'Show less',
        showMoreTextEn: 'Show more'
    });

    // Setup event listeners for the skills
    setupShowMoreButton('show-more-technologies', resumeData.skills.technologies, function (skills) {
        populateSkillCategory('technologies-skills', skills);
    }, 5, 'technologies-skills', (cert) => {

    }, getText
    );
    setupShowMoreButton('show-more-qa', resumeData.skills.qa_testing, function (skills) {
        populateSkillCategory('qa-skills', skills);
    }, 5, 'qa-skills', (cert) => {

    }, getText
    );
    setupShowMoreButton('show-more-methodologies', resumeData.skills.methodologies, function (skills) {
        populateSkillCategory('methodologies-skills', skills);
    }, 5, 'methodologies-skills', (cert) => {

    }, getText
    );
    setupShowMoreButton('show-more-languages', resumeData.skills.languagesArray, function (skills) {
        populateSkillCategory('languages', skills);
    }, 5, 'languages', (cert) => {

    }, getText
    );
    setupShowMoreButton('show-more-additionals', resumeData.skills.additional, function (skills) {
        populateSkillCategory('additionals', skills);
    }, 5, 'additionals', (cert) => {

    }, getText
    );

    // "Show More" functionality for experience
    setupShowMoreButton('show-more-exp', resumeData.experience, populateExperience, 3, 'experience-timeline', createTimelineItem, (button) => {
        return {
            showLessTextEs: 'Mostrar menos experiencia',
            showMoreTextEs: 'Mostrar más experiencia',
            showLessTextEn: 'Show less experience',
            showMoreTextEn: 'Show more experience'
        };
    });


    // "Show More" functionality for certifications
    setupShowMoreButton('show-more-certs', resumeData.certifications, populateCertifications, 6, 'certifications-container', (cert) => {
        return `
            <div class="certification-item">
                <div class="certification-header">
                    <div class="certification-title es-content">${cert.title.es}</div>
                    <div class="certification-title en-content">${cert.title.en}</div>
                    <div class="certification-date">${cert.expiration}</div>
                </div>
                <div class="certification-issuer">${cert.organization}</div>
                ${cert.credential_url ? `<a href="${cert.credential_url}" target="_blank" class="certification-link es-content">Ver credencial</a>
                <a href="${cert.credential_url}" target="_blank" class="certification-link en-content">View credential</a>` : ''}
            </div>
        `;
    }, (button) => {
        return {
            showLessTextEs: 'Mostrar menos certificaciones',
            showMoreTextEs: 'Mostrar más certificaciones',
            showLessTextEn: 'Show less certifications',
            showMoreTextEn: 'Show more certifications',
        };
    });
}

// Function to handle "Show More" button functionality
function setupShowMoreButton(buttonId, dataArray, populateFunction, initialCount, containerId, generateItemHTML, getText) {
    const button = document.getElementById(buttonId);
    if (!button) {
        console.warn(`Button with ID '${buttonId}' not found.`);
        return;
    }

    let isExpanded = false;
    button.addEventListener('click', function () {
        isExpanded = !isExpanded;

        // Get active language
        const currentLang = document.body.getAttribute('lang');

        if (isExpanded) {
            populateFunction(dataArray);
            this.innerHTML = `
                <span class="es-content">${getText(button).showLessTextEs || 'Mostrar menos'}</span>
                <span class="en-content">${getText(button).showLessTextEn || 'Show less'}</span>
                <i class="fas fa-chevron-up"></i>
            `;

        } else {
            populateFunction(dataArray.slice(0, initialCount));
            this.innerHTML = `
                <span class="es-content">${getText(button).showMoreTextEs || 'Mostrar más'}</span>
                <span class="en-content">${getText(button).showMoreTextEn || 'Show more'}</span>
                <i class="fas fa-chevron-down"></i>
            `;
        }

    });
}

function getText(button) {
    return {
        showLessTextEs: button.showLessTextEs || 'Mostrar menos',
        showMoreTextEs: button.showMoreTextEs || 'Mostrar más',
        showLessTextEn: button.showLessTextEn || 'Show less',
        showMoreTextEn: 'Show more',
    };
}
// Function to set the active language
function setActiveLanguage(lang) {
    const body = document.body;

    // Update active state of language buttons
    document.querySelectorAll('.language-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-lang') === lang) {
            btn.classList.add('active');
        }
    });

    // Set lang attribute for body element
    body.setAttribute('lang', lang);

    // Call functions that need to update based on language changes here
}
// PDF Export functionality
async function generatePDF() {
    const element = document.getElementById('resume-content');
    const downloadPdfBtn = document.getElementById('download-pdf');
    const currentLang = document.body.getAttribute('lang');

    // Mostrar estado de carga
    downloadPdfBtn.disabled = true;
    const originalContent = downloadPdfBtn.innerHTML;
    downloadPdfBtn.innerHTML = `
        <i class="fas fa-spinner fa-spin"></i>
        ${currentLang === 'es' ? 'Generando PDF...' : 'Generating PDF...'}
    `;

    try {
        // Clonar el elemento para evitar afectar la visualización actual
        const elementClone = element.cloneNode(true);
        document.body.appendChild(elementClone);
        elementClone.style.position = 'absolute';
        elementClone.style.left = '-9999px';

        // Forzar la carga de imágenes externas
        await Promise.all(Array.from(elementClone.querySelectorAll('img')).map(img => {
            if (img.complete) return Promise.resolve();
            return new Promise((resolve, reject) => {
                img.onload = resolve;
                img.onerror = reject;
            });
        }));

        // Configuración de html2pdf
        const opt = {
            margin: 10,
            filename: 'Farid_Maloof_CV.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: {
                scale: 2,
                logging: true,
                useCORS: true
            },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };

        // Generar PDF
        await html2pdf().set(opt).from(elementClone).save();

    } catch (error) {
        console.error('Error generating PDF:', error);
        alert(currentLang === 'es'
            ? 'Error al generar el PDF. Por favor intente nuevamente.'
            : 'Error generating PDF. Please try again.');
    } finally {
        // Restaurar estado original
        downloadPdfBtn.innerHTML = originalContent;
        downloadPdfBtn.disabled = false;
        const clone = document.querySelector('#resume-content-clone');
        if (clone) document.body.removeChild(clone);
    }
}
