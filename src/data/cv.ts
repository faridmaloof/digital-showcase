import type { CVData } from '../types/cv';

export const cv: CVData = {
  personal: {
    name: 'Farid Maloof Suarez',
    title: {
      es: 'Senior QA Automation Engineer | SDET | Software Engineer in Test',
      en: 'Senior QA Automation Engineer | SDET | Software Engineer in Test',
    },
    tagline: {
      es: 'Development & QA Automation',
      en: 'Development & QA Automation',
    },
    location: {
      es: 'Bogota, Colombia',
      en: 'Bogota, Colombia',
    },
    email: 'faridmaloof@gmail.com',
    phone: '+57 300 235 7202',
    linkedin: 'https://www.linkedin.com/in/fmaloofs/',
    github: 'https://github.com/faridmaloof',
  },
  summary: {
    es: 'Ingeniero de calidad y software con experiencia en automatizacion UI/API, arquitectura de pruebas y colaboracion con equipos de desarrollo y DevOps en entornos enterprise.',
    en: 'Quality and software engineer with hands-on experience in UI/API automation, test architecture, and close collaboration with Development and DevOps teams in enterprise environments.',
  },
  sections: {
    profile: { es: 'Perfil', en: 'Profile' },
    experience: { es: 'Experiencia', en: 'Experience' },
    projects: { es: 'Proyectos', en: 'Projects' },
    skills: { es: 'Skills', en: 'Skills' },
    education: { es: 'Educacion', en: 'Education' },
    certifications: { es: 'Certificaciones', en: 'Certifications' },
    languages: { es: 'Idiomas', en: 'Languages' },
    recommendations: { es: 'Recomendaciones', en: 'Recommendations' },
    featured: { es: 'Actividad destacada', en: 'Featured Activity' },
    contact: { es: 'Contacto', en: 'Contact' },
  },
  experience: [
    {
      company: 'Evertec',
      role: {
        es: 'Automation Testing Senior Specialist',
        en: 'Automation Testing Senior Specialist',
      },
      period: 'Dec 2025 - Present',
      location: { es: 'Remoto', en: 'Remote' },
      highlights: [
        {
          es: 'Diseno, desarrollo y mantenimiento de soluciones de automatizacion para entornos complejos de negocio.',
          en: 'Designed, developed, and maintained automation solutions for complex enterprise environments.',
        },
        {
          es: 'Liderazgo de iniciativas de automatizacion con enfoque en escalabilidad, cobertura y deteccion temprana de defectos.',
          en: 'Led automation initiatives focused on scalability, test coverage, and early defect detection.',
        },
        {
          es: 'Trabajo coordinado con equipos de desarrollo, QA y DevOps para mejorar calidad de releases y tiempos de entrega.',
          en: 'Collaborated with Development, QA, and DevOps teams to improve release quality and delivery lead time.',
        },
      ],
      technologies: ['Selenium', 'C#', 'SQL', 'CI/CD', 'Quality Engineering'],
    },
    {
      company: 'Stori',
      role: { es: 'Ingeniero de Automatizacion QA', en: 'QA Automation Engineer' },
      period: 'Jun 2023 - Aug 2025',
      location: { es: 'Mexico - Remoto', en: 'Mexico - Remote' },
      highlights: [
        {
          es: 'Definicion de planes de prueba y automatizacion de validaciones funcionales para productos financieros.',
          en: 'Defined test plans and automated functional validations for financial products.',
        },
        {
          es: 'Analisis de defectos y mejora continua de estrategias de QA con foco en automatizacion.',
          en: 'Analyzed defects and continuously improved QA strategies with an automation-first mindset.',
        },
      ],
      technologies: ['Automation Testing', 'Software Testing', 'Databases', 'Risk Analysis'],
    },
    {
      company: 'GMSTEK, LLC',
      role: { es: 'Development & QA Tester', en: 'Development & QA Tester' },
      period: 'Jul 2022 - Jun 2023',
      location: { es: 'US - Remoto', en: 'US - Remote' },
      highlights: [
        {
          es: 'Estandarizacion de automatizacion y ejecucion de pruebas con enfoque en consistencia operativa.',
          en: 'Standardized automation and executed testing workflows focused on operational consistency.',
        },
        {
          es: 'Participacion en ciclo completo de QA desde diseno hasta reporte y seguimiento de defectos.',
          en: 'Participated in end-to-end QA lifecycle from test design to defect reporting and tracking.',
        },
      ],
      technologies: ['Selenium', 'Java', 'Databases', 'Test Strategy'],
    },
    {
      company: 'COLSOF S.A.S',
      role: { es: 'Ingeniero Especialista', en: 'Specialist Engineer' },
      period: 'Aug 2021 - Jun 2022',
      location: { es: 'Bogota - Hibrido', en: 'Bogota - Hybrid' },
      highlights: [
        {
          es: 'Gestion de proyectos con estandares PMI y practicas agiles para entrega de valor sostenida.',
          en: 'Managed projects with PMI standards and agile practices for sustained value delivery.',
        },
        {
          es: 'Definicion de indicadores de gestion e iniciativas de innovacion tecnologica.',
          en: 'Defined delivery metrics and technology innovation initiatives.',
        },
      ],
      technologies: ['PMI', 'Agile', 'Project Leadership', 'Technology Strategy'],
    },
    {
      company: 'Busscar Oficial',
      role: {
        es: 'Desarrollador de software senior',
        en: 'Senior Software Developer',
      },
      period: 'Sep 2017 - Feb 2020',
      location: { es: 'Pereira - Presencial', en: 'Pereira - Onsite' },
      highlights: [
        {
          es: 'Desarrollo de soluciones PDM y aplicaciones empresariales con .NET y multiples motores de base de datos.',
          en: 'Developed PDM solutions and enterprise applications with .NET and multiple database engines.',
        },
        {
          es: 'Participacion en decisiones de arquitectura, seguridad y mantenibilidad de plataformas internas.',
          en: 'Contributed to architecture, security, and maintainability decisions for internal platforms.',
        },
      ],
      technologies: ['.NET', 'C#', 'MySQL', 'Oracle', 'SQL Server'],
    },
  ],
  projects: [
    {
      name: {
        es: 'Platform Picking System Development',
        en: 'Platform Picking System Development',
      },
      period: 'Jan 2019 - Mar 2019',
      context: {
        es: 'Integracion de plataforma con ERP para optimizar flujo de materiales por orden de produccion.',
        en: 'Integrated a platform with ERP to optimize material flow per production order.',
      },
      impact: {
        es: 'Mejora de trazabilidad operativa y eficiencia de separacion de materiales.',
        en: 'Improved operational traceability and material picking efficiency.',
      },
      technologies: ['ASP.NET Core', 'ERP Integration', 'Agile'],
    },
    {
      name: { es: 'PDM Design and Development', en: 'PDM Design and Development' },
      period: 'Sep 2017 - Feb 2018',
      context: {
        es: 'Diseno de sistema PDM para control de planos y cumplimiento de calidad documental.',
        en: 'Designed a PDM system for blueprint control and quality/document compliance.',
      },
      impact: {
        es: 'Repositorio centralizado para acceso seguro a documentacion critica.',
        en: 'Created a centralized repository for secure access to critical documentation.',
      },
      technologies: ['.NET Framework', 'ASP.NET Core', 'Web Development'],
    },
    {
      name: { es: 'Database Migration to Azure', en: 'Database Migration to Azure' },
      period: 'Enterprise initiative',
      context: {
        es: 'Migracion de base de datos on-premise a Azure con volumen aproximado de 6 TB.',
        en: 'Migrated on-premise databases to Azure with an approximate volume of 6 TB.',
      },
      impact: {
        es: 'Transicion segura con enfoque en continuidad operativa e integridad de datos.',
        en: 'Delivered a secure migration focused on operational continuity and data integrity.',
      },
      technologies: ['Azure', 'Data Migration', 'Quality Assurance'],
    },
    {
      name: {
        es: 'Standardization of Test Automation',
        en: 'Standardization of Test Automation',
      },
      period: 'QA initiative',
      context: {
        es: 'Definicion de framework y lineamientos para homologar la automatizacion en la organizacion.',
        en: 'Defined framework and standards to unify automation across the organization.',
      },
      impact: {
        es: 'Mayor consistencia, cobertura y confiabilidad de ejecuciones automatizadas.',
        en: 'Increased consistency, coverage, and reliability of automated executions.',
      },
      technologies: ['Java', 'Selenium', 'Test Framework Design'],
    },
  ],
  skills: [
    {
      name: { es: 'Automation & Frameworks', en: 'Automation & Frameworks' },
      items: ['Playwright', 'Selenium', 'Cypress', 'Karate', 'JMeter', 'Appium', 'xUnit', 'NUnit'],
    },
    {
      name: { es: 'Programming & Engineering', en: 'Programming & Engineering' },
      items: ['C#', '.NET', 'Java', 'OOP', 'SOLID', 'Design Patterns', 'Clean Architecture'],
    },
    {
      name: { es: 'Testing Expertise', en: 'Testing Expertise' },
      items: ['API Testing', 'Integration Testing', 'Backend Validation', 'Regression Testing', 'E2E Automation'],
    },
    {
      name: { es: 'CI/CD & DevOps', en: 'CI/CD & DevOps' },
      items: ['Jenkins', 'Azure Pipelines', 'Automated Executions', 'Release Validation', 'QA Environments'],
    },
    {
      name: { es: 'Databases & Systems', en: 'Databases & Systems' },
      items: ['SQL Server', 'Oracle', 'MySQL', 'REST APIs', 'Distributed Systems'],
    },
  ],
  education: [
    {
      institution: 'Asturias Corporacion Universitaria',
      degree: {
        es: 'Especializacion en Gerencia de Proyectos',
        en: 'Project Management Specialization',
      },
      period: 'Oct 2023 - Nov 2024',
    },
    {
      institution: 'Uniremington',
      degree: {
        es: 'Ingenieria de Sistemas',
        en: 'Systems Engineering',
      },
      period: 'Feb 2020 - Mar 2023',
    },
    {
      institution: 'Universidad Autonoma de Occidente',
      degree: {
        es: 'Ingenieria Informatica',
        en: 'Computer Engineering',
      },
      period: '2014 - 2017',
    },
    {
      institution: 'Universidad del Valle',
      degree: {
        es: 'Tecnologia en Sistemas de Informacion',
        en: 'Information Systems Technology',
      },
      period: 'Aug 2006 - May 2010',
    },
  ],
  certifications: [
    { name: 'Playwright Essential Training', issuer: 'LinkedIn Learning', date: 'Feb 2026' },
    { name: 'Robot Framework Test Automation Level 1 (Selenium)', issuer: 'LinkedIn Learning', date: 'Mar 2026' },
    { name: 'Learning ASP.NET Core', issuer: 'LinkedIn Learning', date: 'Mar 2026' },
    { name: 'Back-End Web Development with .NET', issuer: 'LinkedIn Learning', date: 'Mar 2026' },
    { name: 'AI Summit CertiProf 2026', issuer: 'CertiProf', date: 'Feb 2026' },
    { name: 'Amazon API Gateway for Serverless Applications', issuer: 'AWS', date: 'Sep 2020' },
    { name: 'Scrum Master Professional Certificate', issuer: 'CertiProf', date: 'May 2020' },
  ],
  languages: [
    { name: 'Spanish', level: { es: 'Bilingue/Nativo', en: 'Native/Bilingual' } },
    { name: 'English', level: { es: 'Profesional', en: 'Professional' } },
  ],
  recommendations: [
    {
      author: 'Jefferson Garcia Benavides',
      quote: {
        es: 'Excelente ser humano, con gran capacidad de analisis y de brindar soluciones industriales y tecnologicas.',
        en: 'Excellent professional, highly analytical and able to deliver strong industrial and technology solutions.',
      },
    },
    {
      author: 'Alejandro Castano Hoyos',
      quote: {
        es: 'Siempre fue muy responsable con sus deberes y compromisos.',
        en: 'Always highly responsible with commitments and deliverables.',
      },
    },
  ],
  featuredActivity: [
    {
      title: {
        es: 'Publicacion sobre stack de pruebas y piramide de testing',
        en: 'Post about test stack and testing pyramid',
      },
      note: {
        es: 'Contenido tecnico con alta interaccion, centrado en tooling moderno para QA Engineering.',
        en: 'High-engagement technical content focused on modern QA Engineering tooling.',
      },
    },
    {
      title: {
        es: 'Interes publico en vacantes QA Automation y SDET',
        en: 'Public activity around QA Automation and SDET opportunities',
      },
      note: {
        es: 'Participacion activa en publicaciones y oportunidades del ecosistema QA internacional.',
        en: 'Active participation in posts and opportunities across the international QA ecosystem.',
      },
    },
  ],
};
