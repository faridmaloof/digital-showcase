document.addEventListener('DOMContentLoaded', function () {
    // Language switching functionality
    const langButtons = document.querySelectorAll('.lang-btn');

    langButtons.forEach(button => {
        button.addEventListener('click', function () {
            // Remove active class from all buttons
            langButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');

            // Get selected language
            const lang = this.getAttribute('data-lang');

            // Hide all language-specific elements
            document.querySelectorAll('.lang-en, .lang-es').forEach(el => {
                el.style.display = 'none';
            });

            // Show elements for selected language
            document.querySelectorAll(`.lang-${lang}`).forEach(el => {
                el.style.display = '';
            });
        });
    });

    // Show more experience functionality
    const showMoreBtn = document.getElementById('show-more-btn');
    const moreExperience = document.getElementById('more-experience');

    if (showMoreBtn && moreExperience) {
        showMoreBtn.addEventListener('click', function () {
            if (moreExperience.style.display === 'none') {
                moreExperience.style.display = 'block';
                this.textContent = this.textContent.includes('Show') ? 'Show Less Experience' : 'Mostrar Menos Experiencia';
            } else {
                moreExperience.style.display = 'none';
                this.textContent = this.textContent.includes('Less') ? 'Show More Experience' : 'Mostrar Más Experiencia';
            }
        });
    }

    // Contact form submission
    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', async function (e) {
            e.preventDefault();

            // Get form values
            const formData = new FormData(contactForm);
            const currentLang = document.querySelector('.lang-btn.active').getAttribute('data-lang');

            try {
                // Mostrar indicador de carga
                const submitBtn = contactForm.querySelector('button[type="submit"]');
                const originalBtnText = submitBtn.textContent;
                submitBtn.disabled = true;
                submitBtn.textContent = currentLang === 'en' ? 'Sending...' : 'Enviando...';

                // Enviar a Formspree
                const response = await fetch('https://formspree.io/f/myyayyya', {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    if (currentLang === 'en') {
                        alert(`Thank you, ${formData.get('name')}! Your message has been sent successfully. I'll get back to you soon.`);
                    } else {
                        alert(`¡Gracias, ${formData.get('name')}! Tu mensaje ha sido enviado con éxito. Me pondré en contacto contigo pronto.`);
                    }
                    contactForm.reset();
                } else {
                    throw new Error('Form submission failed');
                }
            } catch (error) {
                if (currentLang === 'en') {
                    alert('There was an error sending your message. Please try again later or contact me directly at faridmaloof@gmail.com');
                } else {
                    alert('Hubo un error al enviar tu mensaje. Por favor intenta nuevamente más tarde o contáctame directamente a faridmaloof@gmail.com');
                }
                console.error('Form submission error:', error);
            } finally {
                submitBtn.disabled = false;
                submitBtn.textContent = originalBtnText;
            }
        });
    }

    // Smooth scrolling for navigation
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Función para calcular y mostrar la duración de la experiencia
function calculateExperienceDurations() {
    const experienceItems = document.querySelectorAll('.experience-item');

    experienceItems.forEach(item => {
        const dateElement = item.querySelector('.date');
        if (!dateElement) return;

        const dateText = dateElement.textContent;
        if (!dateText.includes('Present')) return;

        // Extraer fechas del texto
        const dateParts = dateText.split('·')[0].trim().split(' - ');
        const startDateStr = dateParts[0];
        const endDateStr = dateParts[1].includes('Present') ? new Date() : dateParts[1];

        // Convertir a objetos Date
        const startDate = parseDate(startDateStr);
        const endDate = endDateStr instanceof Date ? endDateStr : parseDate(endDateStr);

        // Calcular diferencia
        const duration = calculateDateDifference(startDate, endDate);

        // Actualizar el texto
        const newText = dateText.replace(/·.*/, ` · ${duration}`);
        dateElement.textContent = newText;
    });
}

// Función para parsear fechas en formato "MMM YYYY" (ej. "Jun 2023")
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

// Función para calcular diferencia entre fechas en formato "X años Y meses"
function calculateDateDifference(startDate, endDate) {
    let months = (endDate.getFullYear() - startDate.getFullYear()) * 12;
    months -= startDate.getMonth();
    months += endDate.getMonth();

    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;

    // Obtener el idioma activo
    const activeLang = document.querySelector('.lang-btn.active').getAttribute('data-lang');

    if (activeLang === 'es') {
        return `${years > 0 ? `${years} año${years !== 1 ? 's' : ''} ` : ''}${remainingMonths} mes${remainingMonths !== 1 ? 'es' : ''}`.trim();
    } else {
        return `${years > 0 ? `${years} yr${years !== 1 ? 's' : ''} ` : ''}${remainingMonths} mo${remainingMonths !== 1 ? 's' : ''}`.trim();
    }
}

// Llamar a la función cuando el DOM esté listo y al cambiar de idioma
document.addEventListener('DOMContentLoaded', calculateExperienceDurations);

// También recalcular al cambiar idioma
document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', calculateExperienceDurations);
});
