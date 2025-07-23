import React, { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';

interface PersonalInfo {
  name: string;
  headline: string;
  location: string;
  email: string;
  phone: string;
  linkedin: string;
  github: string;
}

interface Props {
  personalInfo: PersonalInfo;
}

const Header: FC<Props> = ({ personalInfo }) => (
  <header className="header">
    <h1>{personalInfo.name}</h1>
    <h2>{personalInfo.headline}</h2>
    <div className="contact-info">
      <span><FontAwesomeIcon icon={faMapMarkerAlt} /> {personalInfo.location}</span>
      <span><FontAwesomeIcon icon={faEnvelope} /> <a href={`mailto:${personalInfo.email}`}>{personalInfo.email}</a></span>
      <span><FontAwesomeIcon icon={faPhone} /> {personalInfo.phone}</span>
    </div>
    <div className="social-links">
      <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faLinkedin} /> LinkedIn</a>
      <a href={personalInfo.github} target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faGithub} /> GitHub</a>
    </div>
  </header>
);

export default Header;