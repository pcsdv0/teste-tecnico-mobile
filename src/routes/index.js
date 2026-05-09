import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from '../screens/Home';
import Details from '../screens/Details';

// Optei pelo 'Native Stack' em vez do Stack Navigator.
// A vantagem técnica aqui é a performance porque ele tem as animações de transição de tela direto para as 
// telas nativas do próprio Android ou iOS. Isso ajuda a navegação do app seja fluida e pareça 
// 100% um aplicativo nativo, sem dar aquelas "engasgadas" comuns.
const Stack = createNativeStackNavigator();

export default function Routes() {
  return (
    // Preferi isolar a lógica de roteamento neste arquivo dedicado em vez de jogar tudo misturado no App.js pra
    // manter a raiz do projeto limpa.
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen 
          name="Home" 
          component={Home} 
          
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Details" 
          component={Details} 
          // Aqui eu deixo o header nativo para aproveitar o botão de "Voltar" automático do próprio sistema
          options={{ title: 'Detalhes do Produto' }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}