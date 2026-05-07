import React, { createContext, useState } from 'react';

// Criamos o contexto
export const ThemeContext = createContext();

// Esse Provider vai abraçar o aplicativo inteiro
export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(false);

  // Definimos as cores de cada tema
  const theme = {
    background: isDark ? '#121212' : '#f5f5f5',
    text: isDark ? '#ffffff' : '#333333',
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