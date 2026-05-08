import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

// Como utilizei o styled-components para encapsular o CSS nos componentes 
// e a Context API para gerenciar as cores dinâmicas do Modo Escuro,
// optei por deixar nesta pasta 'styles' apenas as métricas globais de proporção da tela.
export const metrics = {
  basePadding: 16,
  baseMargin: 16,
  baseRadius: 12,
  screenWidth: width,
  screenHeight: height,
};