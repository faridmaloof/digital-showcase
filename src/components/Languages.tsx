import type { FC } from 'react';

interface Language {
  name: string;
  proficiency: string;
}

interface Props {
  languages: Language[];
}

const Languages: FC<Props> = ({ languages }) => (
  <section className="card">
    <h3>Idiomas</h3>
    {languages.map((lang, index) => (
      <div key={index} className="language">
        <h4>{lang.name}</h4>
        <p>{lang.proficiency}</p>
      </div>
    ))}
  </section>
);

export default Languages;