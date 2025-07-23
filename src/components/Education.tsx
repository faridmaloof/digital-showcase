import React, { useState, FC } from 'react';
import { formatDateRange } from '../utils/dateFormatter';

interface EducationItem {
  institution: string;
  degree: string;
  startDate: { year: number; month?: string };
  endDate: { year: number; month?: string };
  featured: boolean;
}

interface Props {
  education: EducationItem[];
}

const Education: FC<Props> = ({ education }) => {
    const [showAll, setShowAll] = useState(false);
    const featuredEducation = education.filter(edu => edu.featured);
    const visibleEducation = showAll ? education : featuredEducation;

    return (
        <section className="card">
            <h3>Educación</h3>
            {visibleEducation.map((edu, index) => (
                <div key={index} className="education">
                    <h4>{edu.degree}</h4>
                    <p>{edu.institution} | {formatDateRange(edu.startDate, edu.endDate)}</p>
                </div>
            ))}
            {education.length > featuredEducation.length && (
                <button onClick={() => setShowAll(!showAll)} className="toggle-button">
                    {showAll ? 'Mostrar toda' : 'Mostrar solo destacada'}
                </button>
            )}
        </section>
    );
};

export default Education;