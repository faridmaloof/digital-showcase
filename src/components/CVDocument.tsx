import type { FC } from 'react';
import { Page, Text, View, Document, StyleSheet, Link, Font } from '@react-pdf/renderer';
import profileData from '../data/profileData.json';
import { formatDateRange } from '../utils/dateFormatter';

// Registrar fuentes locales para un renderizado rápido y offline
Font.register({
  family: 'Lato',
  fonts: [
    { src: '/fonts/Lato-Regular.ttf' },
    { src: '/fonts/Lato-Bold.ttf', fontWeight: 'bold' },
    { src: '/fonts/Lato-BoldItalic.ttf', fontWeight: 'bold', fontStyle: 'italic' }
  ]
});

// --- Estilos para el PDF ---
const styles = StyleSheet.create({
    page: {
        padding: 40,
        fontFamily: 'Lato',
        fontSize: 10,
        color: '#333'
    },
    header: {
        textAlign: 'center',
        marginBottom: 20
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1d2d3c'
    },
    headline: {
        fontSize: 12,
        color: '#555'
    },
    contact: {
        fontSize: 9,
        marginTop: 10
    },
    link: {
        color: '#007bff',
        textDecoration: 'none'
    },
    section: {
        marginBottom: 20
    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        borderBottom: '2px solid #007bff',
        paddingBottom: 5,
        marginBottom: 10,
        color: '#1d2d3c'
    },
    entry: {
        marginBottom: 10
    },
    entryTitle: {
        fontSize: 11,
        fontWeight: 'bold'
    },
    entrySubtitle: {
        fontSize: 9,
        fontStyle: 'italic',
        color: '#6c757d'
    },
    entryDescription: {
        marginTop: 4,
    },
    viewMoreLink: {
        fontSize: 9,
        color: '#007bff',
        marginTop: 5,
        textDecoration: 'none'
    },
    // --- NUEVO: Estilos para el layout de dos columnas ---
    twoColumnSection: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 20,
    },
    leftColumn: {
      width: '40%',
      paddingRight: 15,
    },
    rightColumn: {
      width: '58%', // 58% para dejar un pequeño espacio
    }
});

const CVDocument: FC = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* ... (Sección Header y Summary, sin cambios) ... */}
      <View style={styles.header}>
        <Text style={styles.name}>{profileData.personalInfo.name}</Text>
        <Text style={styles.headline}>{profileData.personalInfo.headline}</Text>
        <Text style={styles.contact}>
          {profileData.personalInfo.email} | {profileData.personalInfo.phone}
        </Text>
        <Text style={styles.contact}>
          <Link src={profileData.personalInfo.linkedin} style={styles.link}>LinkedIn</Link> | <Link src={profileData.personalInfo.github} style={styles.link}>GitHub</Link>
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Resumen Profesional</Text>
        <Text>{profileData.summary}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Experiencia Profesional Destacada</Text>
        {profileData.experience.filter(exp => exp.featured).map((job, index) => (
          <View key={index} style={styles.entry}>
            <Text style={styles.entryTitle}>{job.title} - {job.company}</Text>
            <Text style={styles.entrySubtitle}>{formatDateRange(job.startDate, job.endDate)}</Text>
            <Text style={styles.entryDescription}>{job.description}</Text>
          </View>
        ))}
        <Link src={`${profileData.personalInfo.linkedin}/details/experience/`} style={styles.viewMoreLink}>Ver más experiencia en LinkedIn</Link>
      </View>
      
      {/* --- NUEVO: Contenedor para las dos columnas --- */}
      <View style={styles.twoColumnSection}>
        {/* --- Columna Izquierda (40%) --- */}
        <View style={styles.leftColumn}>
          <Text style={styles.sectionTitle}>Educación</Text>
          {profileData.education.filter(edu => edu.featured).map((edu, index) => (
              <View key={index} style={styles.entry}>
                  <Text style={styles.entryTitle}>{edu.degree}</Text>
                  <Text style={styles.entrySubtitle}>{edu.institution} | {formatDateRange(edu.startDate, edu.endDate)}</Text>
              </View>
          ))}
          <Link src={`${profileData.personalInfo.linkedin}/details/education/`} style={styles.viewMoreLink}>Ver más...</Link>
        </View>

        {/* --- Columna Derecha (60%) --- */}
        <View style={styles.rightColumn}>
          <Text style={styles.sectionTitle}>Certificaciones</Text>
          {profileData.certifications.filter(cert => cert.featured).map((cert, index) => (
              <View key={index} style={styles.entry}>
                  <Text style={styles.entryTitle}>{cert.name}</Text>
                  <Text style={styles.entrySubtitle}>{cert.authority} | {formatDateRange(cert.date)}</Text>
              </View>
          ))}
          <Link src={`${profileData.personalInfo.linkedin}/details/certifications/`} style={styles.viewMoreLink}>Ver más...</Link>
        </View>
      </View>

    </Page>
  </Document>
);

export default CVDocument;