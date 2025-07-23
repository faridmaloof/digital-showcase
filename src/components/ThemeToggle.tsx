import React, { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';

interface Props {
  theme: string;
  toggleTheme: () => void;
}

const ThemeToggle: FC<Props> = ({ theme, toggleTheme }) => (
  <button onClick={toggleTheme} className="theme-toggle">
    {theme === 'light' ? <FontAwesomeIcon icon={faMoon} /> : <FontAwesomeIcon icon={faSun} />}
  </button>
);

export default ThemeToggle;