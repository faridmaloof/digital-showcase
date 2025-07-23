import React, { FC } from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import profileData from './data/profileData.json';
import { useTheme } from './hooks/useTheme';

import Header from './components/Header';
import Summary from './components/Summary';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Education from './components/Education';
import Skills from './components/Skills';
import Certifications from './components/Certifications';
import Languages from './components/Languages';
import ThemeToggle from './components/ThemeToggle';
import CVDocument from './components/CVDocument';

import './styles/App.css'; // Asegúrate que la ruta sea correcta si moviste el archivo
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// 👇 CAMBIO AQUÍ: Importamos el nuevo icono
import { faFileArrowDown } from '@fortawesome/free-solid-svg-icons';

const App: FC = () => {
  const [theme, toggleTheme] = useTheme();

  return (
    <div className="container">
      <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
      <div id="cv-content">
        <Header personalInfo={profileData.personalInfo} />
        <main className="main-content">
          <div className="left-column">
            <Summary summary={profileData.summary} />
            <Experience experience={profileData.experience} />
            <Projects projects={profileData.projects} />
          </div>
          <div className="right-column">
            <Skills skills={profileData.skills} />
            <Education education={profileData.education} />
            <Certifications certifications={profileData.certifications} />
            <Languages languages={profileData.languages} />
          </div>
        </main>
      </div>
      
      <PDFDownloadLink document={<CVDocument />} fileName="FaridMaloof_CV_Profesional.pdf">
        {({ loading }) => (
          <button className="download-btn">
            {loading ? 'Generando PDF...' : <><FontAwesomeIcon icon={faFileArrowDown} /> Descargar CV Resumido</>} 
            {/* 👆 CAMBIO AQUÍ: Usamos el nuevo icono */}
          </button>
        )}
      </PDFDownloadLink>
    </div>
  );
}

export default App;