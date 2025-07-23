import React, { useState, FC } from 'react';
import { formatDateRange } from '../utils/dateFormatter';

interface Certification {
  name: string;
  authority: string;
  date: { year: number; month?: string };
  featured: boolean;
}

interface Props {
  certifications: Certification[];
}

const Certifications: FC<Props> = ({ certifications }) => {
  const [showAll, setShowAll] = useState(false);
  const featuredCerts = certifications.filter(cert => cert.featured);
  const visibleCerts = showAll ? certifications : featuredCerts;

  return (
    <section className="card">
      <h3>Certificaciones</h3>
      <ul>
        {visibleCerts.map((cert, index) => (
          <li key={index}>
            {cert.name} - {cert.authority} ({formatDateRange(cert.date)})
          </li>
        ))}
      </ul>
      {certifications.length > featuredCerts.length && (
        <button onClick={() => setShowAll(!showAll)} className="toggle-button">
          {showAll ? 'Ver Menos' : 'Ver Más'}
        </button>
      )}
    </section>
  );
};

export default Certifications;