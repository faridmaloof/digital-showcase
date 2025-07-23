import { useState } from 'react';
import type { FC } from 'react';
import { formatDateRange } from '../utils/dateFormatter';

interface Job {
  company: string;
  title: string;
  startDate: { year: number; month?: string };
  endDate: { year: number; month?: string } | string;
  description: string;
  featured: boolean;
}

interface Props {
  experience: Job[];
}

const Experience: FC<Props> = ({ experience }) => {
  const [showAll, setShowAll] = useState(false);
  const featuredExperience = experience.filter(job => job.featured);
  const visibleExperience = showAll ? experience : featuredExperience;

  return (
    <section className="card">
      <h3>Experiencia Profesional</h3>
      {visibleExperience.map((job, index) => (
        <div key={index} className="job">
          <h4>{job.title} at {job.company}</h4>
          <p><em>{formatDateRange(job.startDate, job.endDate)}</em></p>
          <p>{job.description}</p>
        </div>
      ))}
      {experience.length > featuredExperience.length && (
        <button onClick={() => setShowAll(!showAll)} className="toggle-button">
          {showAll ? 'Mostrar solo destacada' : 'Mostrar toda la experiencia'}
        </button>
      )}
    </section>
  );
};

export default Experience;