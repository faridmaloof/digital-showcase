import type { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';

interface Project {
  title: string;
  description: string;
  repoUrl: string;
  liveUrl?: string;
}

interface Props {
  projects: Project[];
}

const Projects: FC<Props> = ({ projects }) => (
  <section className="card">
    <h3>Proyectos Destacados</h3>
    {projects.map((project, index) => (
      <div key={index} className="project">
        <h4>{project.title}</h4>
        <p>{project.description}</p>
        <div className="project-links">
          <a href={project.repoUrl} target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faGithub} /> Repositorio
          </a>
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faExternalLinkAlt} /> Demo en Vivo
            </a>
          )}
        </div>
      </div>
    ))}
  </section>
);

export default Projects;