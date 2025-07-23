import type { FC } from 'react';

interface Props {
  summary: string;
}

const Summary: FC<Props> = ({ summary }) => (
  <section className="card">
    <h3>Resumen Profesional</h3>
    <p>{summary}</p>
  </section>
);

export default Summary;