import { useEffect } from 'react';
import { cv } from './data/cv';
import { useLocale } from './hooks/useLocale';
import type { Locale } from './types/cv';
import './styles/App.css';

const t = (locale: Locale, value: Record<Locale, string>): string => value[locale];

function App() {
  const { locale, setLocale, toggleLocale } = useLocale();

  useEffect(() => {
    document.title = `${cv.personal.name} | ${t(locale, cv.personal.title)}`;

    const description =
      locale === 'es'
        ? 'Perfil profesional de Farid Maloof Suarez: Senior QA Automation Engineer, SDET y Software Engineer in Test.'
        : 'Professional profile of Farid Maloof Suarez: Senior QA Automation Engineer, SDET, and Software Engineer in Test.';

    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'description');
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', description);

    let jsonLd = document.getElementById('person-jsonld');
    if (!jsonLd) {
      jsonLd = document.createElement('script');
      jsonLd.id = 'person-jsonld';
      jsonLd.setAttribute('type', 'application/ld+json');
      document.head.appendChild(jsonLd);
    }

    jsonLd.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: cv.personal.name,
      jobTitle: t(locale, cv.personal.title),
      email: cv.personal.email,
      telephone: cv.personal.phone,
      address: t(locale, cv.personal.location),
      sameAs: [cv.personal.linkedin, cv.personal.github],
    });
  }, [locale]);

  useEffect(() => {
    const elements = document.querySelectorAll('.reveal');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="page-shell">
      <header className="topbar">
        <div className="brand-meta">{t(locale, cv.personal.tagline)}</div>
        <div className="locale-group" role="group" aria-label="Language switch">
          <button
            type="button"
            className={locale === 'es' ? 'locale-btn active' : 'locale-btn'}
            onClick={() => setLocale('es')}
          >
            ES
          </button>
          <button
            type="button"
            className={locale === 'en' ? 'locale-btn active' : 'locale-btn'}
            onClick={() => setLocale('en')}
          >
            EN
          </button>
          <button type="button" className="locale-btn" onClick={toggleLocale} data-testid="toggle-locale">
            {locale === 'es' ? 'Switch EN' : 'Cambiar ES'}
          </button>
        </div>
      </header>

      <main className="editorial-layout">
        <section className="hero reveal">
          <p className="mono">Senior profile</p>
          <h1>{cv.personal.name}</h1>
          <h2>{t(locale, cv.personal.title)}</h2>
          <p className="lede">{t(locale, cv.summary)}</p>
        </section>

        <section className="section reveal" id="profile">
          <h3>{t(locale, cv.sections.profile)}</h3>
          <p>
            {locale === 'es'
              ? 'Perfil orientado a resultados en QA Automation y Software Engineering, con enfoque en arquitectura de pruebas, estabilidad de pipelines y escalabilidad en procesos de calidad.'
              : 'Results-driven profile focused on QA Automation and Software Engineering, with strong emphasis on test architecture, pipeline stability, and quality process scalability.'}
          </p>
        </section>

        <section className="section reveal" id="experience">
          <h3>{t(locale, cv.sections.experience)}</h3>
          <div className="timeline-grid">
            {cv.experience.map((item) => (
              <article key={`${item.company}-${item.period}`} className="timeline-card">
                <p className="mono">{item.period}</p>
                <h4>{t(locale, item.role)}</h4>
                <p className="company">{item.company}</p>
                <p className="location">{t(locale, item.location)}</p>
                <ul>
                  {item.highlights.map((point, idx) => (
                    <li key={`${item.company}-${idx}`}>{t(locale, point)}</li>
                  ))}
                </ul>
                <div className="chip-row">
                  {item.technologies.map((tech) => (
                    <span key={`${item.company}-${tech}`} className="chip">
                      {tech}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section reveal" id="projects">
          <h3>{t(locale, cv.sections.projects)}</h3>
          <div className="project-grid">
            {cv.projects.map((project) => (
              <article key={project.period + project.name.en} className="project-card">
                <p className="mono">{project.period}</p>
                <h4>{t(locale, project.name)}</h4>
                <p>{t(locale, project.context)}</p>
                <p className="impact">{t(locale, project.impact)}</p>
                <div className="chip-row">
                  {project.technologies.map((tech) => (
                    <span className="chip" key={project.name.en + tech}>
                      {tech}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section reveal" id="skills">
          <h3>{t(locale, cv.sections.skills)}</h3>
          <div className="skills-groups">
            {cv.skills.map((group) => (
              <article key={group.name.en} className="skills-group">
                <h4>{t(locale, group.name)}</h4>
                <div className="chip-row">
                  {group.items.map((skill) => (
                    <span key={group.name.en + skill} className="chip skill-chip">
                      {skill}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section reveal" id="credentials">
          <div className="three-columns">
            <article>
              <h3>{t(locale, cv.sections.education)}</h3>
              {cv.education.map((edu) => (
                <div key={edu.institution + edu.period} className="list-item">
                  <p className="mono">{edu.period}</p>
                  <h4>{edu.institution}</h4>
                  <p>{t(locale, edu.degree)}</p>
                </div>
              ))}
            </article>

            <article>
              <h3>{t(locale, cv.sections.certifications)}</h3>
              {cv.certifications.map((cert) => (
                <div key={cert.name} className="list-item">
                  <p className="mono">{cert.date}</p>
                  <h4>{cert.name}</h4>
                  <p>{cert.issuer}</p>
                </div>
              ))}
            </article>

            <article>
              <h3>{t(locale, cv.sections.languages)}</h3>
              {cv.languages.map((language) => (
                <div key={language.name} className="list-item">
                  <h4>{language.name}</h4>
                  <p>{t(locale, language.level)}</p>
                </div>
              ))}
            </article>
          </div>
        </section>

        <section className="section reveal" id="featured">
          <h3>{t(locale, cv.sections.featured)}</h3>
          <div className="project-grid">
            {cv.featuredActivity.map((post) => (
              <article key={post.title.en} className="project-card">
                <h4>{t(locale, post.title)}</h4>
                <p>{t(locale, post.note)}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section reveal" id="recommendations">
          <h3>{t(locale, cv.sections.recommendations)}</h3>
          <div className="project-grid">
            {cv.recommendations.map((recommendation) => (
              <article key={recommendation.author} className="project-card">
                <h4>{recommendation.author}</h4>
                <p>{t(locale, recommendation.quote)}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section reveal" id="contact">
          <h3>{t(locale, cv.sections.contact)}</h3>
          <div className="contact-grid">
            <a href={`mailto:${cv.personal.email}`}>{cv.personal.email}</a>
            <a href={`tel:${cv.personal.phone.replace(/\s/g, '')}`}>{cv.personal.phone}</a>
            <a href={cv.personal.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
              LinkedIn
            </a>
            <a href={cv.personal.github} target="_blank" rel="noreferrer" aria-label="GitHub">
              GitHub
            </a>
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>{cv.personal.name}</p>
        <p>{t(locale, cv.personal.location)}</p>
      </footer>
    </div>
  );
}

export default App;