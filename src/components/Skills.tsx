import React, { FC } from 'react';

interface SkillsData {
  technical: string[];
  tools: string[];
  methodologies: string[];
}

interface Props {
  skills: SkillsData;
}

const Skills: FC<Props> = ({ skills }) => (
  <section className="card">
    <h3>Habilidades Técnicas</h3>
    
    <h4>Lenguajes y Frameworks</h4>
    <ul className="skills-list">
      {skills.technical.map((skill, index) => <li key={index}>{skill}</li>)}
    </ul>

    <h4>Herramientas y Plataformas</h4>
    <ul className="skills-list">
      {skills.tools.map((skill, index) => <li key={index}>{skill}</li>)}
    </ul>

    <h4>Metodologías y Conceptos</h4>
    <ul className="skills-list">
      {skills.methodologies.map((skill, index) => <li key={index}>{skill}</li>)}
    </ul>
  </section>
);

export default Skills;