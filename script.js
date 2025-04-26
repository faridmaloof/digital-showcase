document.addEventListener('DOMContentLoaded', function () {
    // Language switching functionality
    const langButtons = document.querySelectorAll('.language-btn');
    const body = document.body;

    // Set initial language based on HTML lang attribute
    const initialLang = body.getAttribute('lang') || 'es';
    setActiveLanguage(initialLang);

    langButtons.forEach(button => {
        button.addEventListener('click', function () {
            const lang = this.getAttribute('data-lang');
            body.setAttribute('lang', lang);
            setActiveLanguage(lang);
            calculateExperienceDurations(); // Update durations on language change
        });
    });

    function setActiveLanguage(lang) {
        // Update active state of language buttons
        langButtons.forEach(btn => {
            if (btn.getAttribute('data-lang') === lang) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }

    // Show more/less functionality with a common handler
    function setupShowMore(buttonId, contentId) {
        const button = document.getElementById(buttonId);
        const content = document.getElementById(contentId);

        if (!button || !content) return;

        button.addEventListener('click', function () {
            const isExpanded = content.classList.toggle('hidden-content');
            this.classList.toggle('active');

            // Update button text and icon
            const currentLang = document.querySelector('.language-btn.active').getAttribute('data-lang');
            const icon = this.querySelector('i');
            const textSpan = this.querySelector('span');

            if (isExpanded) {
                icon.classList.replace('fa-chevron-up', 'fa-chevron-down');
            } else {
                icon.classList.replace('fa-chevron-down', 'fa-chevron-up');
            }

            // Update text based on language and state
            const translations = {
                'skills': {
                    'en': ['Show more skills', 'Show less skills'],
                    'es': ['Mostrar más habilidades', 'Mostrar menos habilidades']
                },
                'exp': {
                    'en': ['Show more experience', 'Show less experience'],
                    'es': ['Mostrar más experiencia', 'Mostrar menos experiencia']
                },
                'certs': {
                    'en': ['Show more certifications', 'Show less certifications'],
                    'es': ['Mostrar más certificaciones', 'Mostrar menos certificaciones']
                }
            };

            const type = buttonId.split('-')[2]; // 'skills', 'exp', or 'certs'
            const [moreText, lessText] = translations[type][currentLang];
            textSpan.textContent = isExpanded ? moreText : lessText;
        });
    }

    // Set up all show more/less sections
    setupShowMore('show-more-skills', 'more-skills');
    setupShowMore('show-more-exp', 'more-experience');
    setupShowMore('show-more-certs', 'more-certifications');

    // Calculate experience durations
    function calculateExperienceDurations() {
        const experienceItems = document.querySelectorAll('.timeline-item');

        experienceItems.forEach(item => {
            const dateElement = item.querySelector('.timeline-date');
            if (!dateElement) return;

            const dateText = dateElement.textContent;
            if (!dateText.includes('Present') && !dateText.includes('Presente')) return;

            // Extract dates from text
            const dateParts = dateText.split(' - ');
            const startDateStr = dateParts[0];
            const endDateStr = dateParts[1].includes('Present') || dateParts[1].includes('Presente') ? new Date() : dateParts[1];

            // Convert to Date objects
            const startDate = parseDate(startDateStr);
            const endDate = endDateStr instanceof Date ? endDateStr : parseDate(endDateStr);

            // Calculate difference
            const duration = calculateDateDifference(startDate, endDate);

            // Update the duration span
            const durationSpan = item.querySelector('.duration');
            if (durationSpan) {
                durationSpan.textContent = duration;
            }
        });
    }

    // Helper function to parse dates in "MMM YYYY" format (e.g., "Jun 2023")
    function parseDate(dateStr) {
        if (dateStr === 'Present' || dateStr === 'Presente') return new Date();

        const months = {
            'Jan': 0, 'Feb': 1, 'Mar': 2, 'Apr': 3, 'May': 4, 'Jun': 5,
            'Jul': 6, 'Aug': 7, 'Sep': 8, 'Oct': 9, 'Nov': 10, 'Dec': 11,
            'Ene': 0, 'Feb': 1, 'Mar': 2, 'Abr': 3, 'May': 4, 'Jun': 5,
            'Jul': 6, 'Ago': 7, 'Sep': 8, 'Oct': 9, 'Nov': 10, 'Dic': 11
        };

        const parts = dateStr.split(' ');
        const month = months[parts[0]];
        const year = parseInt(parts[1]);

        return new Date(year, month, 1);
    }

    // Helper function to calculate date difference in "X years Y months" format
    function calculateDateDifference(startDate, endDate) {
        let months = (endDate.getFullYear() - startDate.getFullYear()) * 12;
        months -= startDate.getMonth();
        months += endDate.getMonth();

        const years = Math.floor(months / 12);
        const remainingMonths = months % 12;

        // Get active language
        const activeLang = document.querySelector('.language-btn.active').getAttribute('data-lang');

        if (activeLang === 'es') {
            let result = '';
            if (years > 0) {
                result += `${years} año${years !== 1 ? 's' : ''} `;
            }
            if (remainingMonths > 0) {
                result += `${remainingMonths} mes${remainingMonths !== 1 ? 'es' : ''}`;
            }
            return result.trim();
        } else {
            let result = '';
            if (years > 0) {
                result += `${years} yr${years !== 1 ? 's' : ''} `;
            }
            if (remainingMonths > 0) {
                result += `${remainingMonths} mo${remainingMonths !== 1 ? 's' : ''}`;
            }
            return result.trim();
        }
    }

    // Calculate experience durations on page load
    calculateExperienceDurations();

    // PDF Export functionality
    const downloadPdfBtn = document.getElementById('download-pdf');
    if (downloadPdfBtn) {
        downloadPdfBtn.addEventListener('click', function () {
            const element = document.getElementById('resume-content');
            const opt = {
                margin: 10,
                filename: 'Farid_Maloof_CV.pdf',
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 2 },
                jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
            };

            // Show loading state
            downloadPdfBtn.disabled = true;
            const originalContent = downloadPdfBtn.innerHTML;
            const currentLang = document.querySelector('.language-btn.active').getAttribute('data-lang');
            downloadPdfBtn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> ${currentLang === 'es' ? 'Generando PDF...' : 'Generating PDF...'
                }`;

            // Show all content before generating PDF
            const hiddenContents = document.querySelectorAll('.hidden-content');
            hiddenContents.forEach(el => {
                el.style.display = 'block';
            });

            // Generate PDF
            html2pdf().from(element).set(opt).save().then(() => {
                // Restore original state
                downloadPdfBtn.innerHTML = originalContent;
                downloadPdfBtn.disabled = false;

                // Hide content again if it was hidden before
                hiddenContents.forEach(el => {
                    const button = el.previousElementSibling?.querySelector('.show-more-btn');
                    if (button && !button.classList.contains('active')) {
                        el.style.display = 'none';
                    }
                });
            });
        });
    }

    // Animation for skill bars
    const skillItems = document.querySelectorAll('.skill-item');

    function animateSkillBars() {
        skillItems.forEach(item => {
            const level = item.getAttribute('data-level');
            const bar = item.querySelector('.skill-level');
            bar.style.width = '0';

            // Animate after a short delay
            setTimeout(() => {
                bar.style.width = level + '%';
            }, 100);
        });
    }

    // Intersection Observer for skill bar animations
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkillBars();
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const skillsSection = document.getElementById('skills');
    if (skillsSection) {
        observer.observe(skillsSection);
    }
});

// Configuración para el botón de mostrar más certificaciones
const showMoreCertsBtn = document.getElementById('show-more-certs');
const moreCertsSection = document.getElementById('more-certifications');

if (showMoreCertsBtn && moreCertsSection) {
    showMoreCertsBtn.addEventListener('click', function () {
        const isHidden = moreCertsSection.classList.toggle('hidden-content');
        this.classList.toggle('active');

        // Actualizar icono
        const icon = this.querySelector('i');
        icon.classList.toggle('fa-chevron-down');
        icon.classList.toggle('fa-chevron-up');

        // Actualizar texto según el idioma
        const currentLang = document.querySelector('.language-btn.active').getAttribute('data-lang');
        const textSpan = this.querySelector('span');

        if (currentLang === 'es') {
            textSpan.textContent = isHidden ? 'Mostrar más certificaciones' : 'Mostrar menos certificaciones';
        } else {
            textSpan.textContent = isHidden ? 'Show more certifications' : 'Show fewer certifications';
        }
    });
}
