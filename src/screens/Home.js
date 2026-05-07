import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import api from '../services/api';
import ProductCard from '../components/ProductCard';
import Loading from '../components/Loading';

// Recebemos o 'navigation' por parâmetro para conseguirmos trocar de tela
export default function Home({ navigation }) {
  // Criando os estados para guardar os produtos, o aviso de loading e possíveis erros
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // O useEffect roda a função fetchProducts assim que a tela abre
  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    try {
      // Faz a requisição na Fake Store API
      const response = await api.get('/products');
      setProducts(response.data); // Guarda os dados no estado
    } catch (err) {
      // Se der erro (ex: sem internet), salva a mensagem amigável
      setError('Ops! Não foi possível carregar os produtos. Verifique sua conexão e tente novamente.');
    } finally {
      // Independente de dar certo ou errado, tira o loading da tela
      setLoading(false);
    }
  }

  // Se estiver carregando, mostra o componente de Loading que criamos
  if (loading) {
    return <Loading />;
  }

  // Se deu erro, mostra a mensagem amigável na tela
  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  // Se deu tudo certo, renderiza a lista de produtos
  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <ProductCard
            data={item}
            // Ao clicar no card, vai para a tela 'Details' e manda os dados do produto junto
            onPress={() => navigation.navigate('Details', { product: item })}
          />
        )}
        contentContainerStyle={{ padding: 16 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: '#ff0000',
    textAlign: 'center',
  },
});