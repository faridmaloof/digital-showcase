import jsPDF from 'jspdf';
import profileData from '../data/profileData.json';
import { formatDateRange } from './dateFormatter';

export const generatePdf = () => {
  const doc = new jsPDF('p', 'pt', 'a4');
  const margin = 40;
  const pageWidth = doc.internal.pageSize.getWidth();
  const contentWidth = pageWidth - margin * 2;
  let cursorY = margin;

  // --- Título y Encabezado ---
  doc.setFont("helvetica", "bold");
  doc.setFontSize(24);
  doc.text(profileData.personalInfo.name, pageWidth / 2, cursorY, { align: 'center' });
  cursorY += 30;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(12);
  doc.text(profileData.personalInfo.headline, pageWidth / 2, cursorY, { align: 'center' });
  cursorY += 20;

  doc.setFontSize(10);
  const contactInfo = `${profileData.personalInfo.email} | ${profileData.personalInfo.phone}`;
  doc.text(contactInfo, pageWidth / 2, cursorY, { align: 'center' });
  cursorY += 20;

  doc.setTextColor(0, 102, 204);
  doc.textWithLink("LinkedIn", pageWidth / 2 - 20, cursorY, { url: profileData.personalInfo.linkedin, align: 'right' });
  doc.textWithLink("GitHub", pageWidth / 2 + 20, cursorY, { url: profileData.personalInfo.github, align: 'left' });
  doc.setTextColor(0, 0, 0);
  cursorY += 30;
  
  // --- Función para Títulos de Sección ---
  const sectionTitle = (title: string) => {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text(title, margin, cursorY);
    cursorY += 15;
    doc.setDrawColor(200);
    doc.line(margin, cursorY - 10, pageWidth - margin, cursorY - 10);
  };

  // --- Resumen ---
  sectionTitle("Resumen Profesional");
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  const summaryLines = doc.splitTextToSize(profileData.summary, contentWidth);
  doc.text(summaryLines, margin, cursorY);
  cursorY += summaryLines.length * 12 + 10;

  // --- Experiencia (Solo destacada) ---
  sectionTitle("Experiencia Profesional Destacada");
  profileData.experience.filter(exp => exp.featured).forEach(job => {
    doc.setFont("helvetica", "bold");
    doc.text(`${job.title} - ${job.company}`, margin, cursorY);
    cursorY += 12;
    doc.setFont("helvetica", "italic");
    doc.text(formatDateRange(job.startDate, job.endDate), margin, cursorY);
    cursorY += 12;
    doc.setFont("helvetica", "normal");
    const descLines = doc.splitTextToSize(`• ${job.description}`, contentWidth - 10);
    doc.text(descLines, margin + 10, cursorY);
    cursorY += descLines.length * 12 + 5;
  });
  doc.setTextColor(0, 102, 204);
  doc.textWithLink("Ver más experiencia en LinkedIn...", margin, cursorY, { url: `${profileData.personalInfo.linkedin}/details/experience/` });
  doc.setTextColor(0, 0, 0);
  cursorY += 20;
  
  // --- Educación (Solo destacada) ---
  sectionTitle("Educación");
  profileData.education.forEach(edu => {
    doc.setFont("helvetica", "bold");
    doc.text(edu.degree, margin, cursorY);
    cursorY += 12;
    doc.setFont("helvetica", "italic");
    doc.text(`${edu.institution} | ${formatDateRange(edu.startDate, edu.endDate)}`, margin, cursorY);
    cursorY += 20;
  });
  doc.setTextColor(0, 102, 204);
  doc.textWithLink("Ver más estudios en LinkedIn...", margin, cursorY, { url: `${profileData.personalInfo.linkedin}/details/education/` });
  doc.setTextColor(0, 0, 0);
  cursorY += 20;

  // --- Certificaciones (Solo destacadas) ---
  sectionTitle("Certificaciones Destacadas");
  profileData.certifications.filter(cert => cert.featured).forEach(cert => {
    doc.setFont("helvetica", "bold");
    doc.text(cert.name, margin, cursorY);
    cursorY += 12;
    doc.setFont("helvetica", "normal");
    doc.text(`${cert.authority} | ${formatDateRange(cert.date)}`, margin, cursorY);
    cursorY += 20;
  });
  doc.setTextColor(0, 102, 204);
  doc.textWithLink("Ver más certificaciones en LinkedIn...", margin, cursorY, { url: `${profileData.personalInfo.linkedin}/details/certifications/` });
  doc.setTextColor(0, 0, 0);
  cursorY += 20;


  doc.save("FaridMaloof_CV.pdf");
};