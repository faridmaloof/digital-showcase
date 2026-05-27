import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

describe('Digital Showcase CV app', () => {
  beforeEach(() => {
    window.localStorage.setItem('cv-locale', 'es');
  });

  it('renders the main professional heading', () => {
    render(<App />);
    expect(screen.getByRole('heading', { level: 1, name: /Farid Maloof Suarez/i })).toBeInTheDocument();
  });

  it('shows key CV sections', () => {
    render(<App />);
    expect(screen.getByRole('heading', { level: 3, name: /Experiencia|Experience/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: /Proyectos|Projects/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: /Skills/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: /Contacto|Contact/i })).toBeInTheDocument();
  });

  it('toggles language from ES to EN', () => {
    render(<App />);
    expect(screen.getByText('Perfil')).toBeInTheDocument();
    const toggle = screen.getByTestId('toggle-locale');
    fireEvent.click(toggle);
    expect(screen.getByText('Profile')).toBeInTheDocument();
  });
});
