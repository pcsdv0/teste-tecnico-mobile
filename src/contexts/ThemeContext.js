import React, { createContext, useState } from 'react';

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(false);

  // Escolhi a Context API nativa do React para gerenciar o Tema porque é uma ferramenta leve para estados globais. 
  
  
  const theme = {
    // No modo escuro, evitei o preto absoluto e o branco puro. 
    // O contraste extremo cansa muito a vista durante a leitura. 
    // Optei por tons de cinza escuro, que dão um aspecto moderno e mais leve.
    background: isDark ? '#121214' : '#F8F9FA',
    surface: isDark ? '#202024' : '#FFFFFF', 
    text: isDark ? '#E1E1E6' : '#202024', 
    textSecondary: isDark ? '#A8A8B3' : '#6C757D', 
    primary: '#8257E5', // Mantive a cor de destaque fixa para manter a identidade visual independente do tema.
    border: isDark ? '#323238' : '#E9ECEF',
  };

  function toggleTheme() {
    setIsDark(!isDark);
  }

  return (
    // Tudo que estiver dentro deste Provider terá acesso instantâneo ao tema atual e à função de trocar o tema.
    <ThemeContext.Provider value={{ isDark, theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}