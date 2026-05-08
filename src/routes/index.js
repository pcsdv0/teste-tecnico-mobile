import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from '../screens/Home';
import Details from '../screens/Details';

// Optei pelo 'Native Stack' em vez do Stack Navigator tradicional.
// A vantagem técnica aqui é a performance: ele delega as animações de transição de tela direto para as 
// threads nativas do próprio Android/iOS. Isso garante que a navegação do app seja fluida e pareça 
// 100% um aplicativo nativo, sem dar aquelas "engasgadas" comuns.
const Stack = createNativeStackNavigator();

export default function Routes() {
  return (
    // Preferi isolar a lógica de roteamento neste arquivo dedicado em vez de jogar tudo misturado no App.js.
    // Isso mantém a raiz do projeto limpa e deixa a arquitetura preparada para crescer (por exemplo, 
    // se no futuro precisarmos adicionar um fluxo de telas de Login antes de mostrar a Home).
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen 
          name="Home" 
          component={Home} 
          // Ocultando o header padrão para podermos usar o nosso próprio cabeçalho customizado na Home
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