import React, { createContext, useState } from 'react';

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(false);

  // Paleta de cores refinada para não cansar a vista
  const theme = {
    background: isDark ? '#121214' : '#F8F9FA',
    surface: isDark ? '#202024' : '#FFFFFF', // Cor dos cards e inputs
    text: isDark ? '#E1E1E6' : '#202024', // Branco 'suave' no dark
    textSecondary: isDark ? '#A8A8B3' : '#6C757D', // Cinza para descrições
    primary: '#8257E5', // Roxo moderno para destaques e categorias selecionadas
    border: isDark ? '#323238' : '#E9ECEF',
  };

  function toggleTheme() {
    setIsDark(!isDark);
  }

  return (
    <ThemeContext.Provider value={{ isDark, theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}