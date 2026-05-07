import React from 'react';
import Routes from './src/routes';
import { ThemeProvider } from './src/contexts/ThemeContext';

export default function App() {
  return (
    <ThemeProvider>
      <Routes />
    </ThemeProvider>
  );
}