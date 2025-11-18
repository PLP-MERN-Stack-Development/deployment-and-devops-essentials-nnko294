import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import Button from './Button';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <Button
      onClick={toggleTheme}
      variant="secondary"
      size="sm"
      className="ml-auto"
      aria-pressed={theme === 'dark'}
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? 'Light' : 'Dark'}
    </Button>
  );
};

export default ThemeToggle;
