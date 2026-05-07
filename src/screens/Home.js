import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, TextInput, StyleSheet } from 'react-native';
import api from '../services/api';
import ProductCard from '../components/ProductCard';
import Loading from '../components/Loading';

export default function Home({ navigation }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Novo estado para guardar o texto da busca
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    try {
      const response = await api.get('/products');
      setProducts(response.data);
    } catch (err) {
      setError('Ops! Não foi possível carregar os produtos. Verifique sua conexão e tente novamente.');
    } finally {
      setLoading(false);
    }
  }

  // Lógica de filtro: transforma tudo em minúsculo para a busca não ser "case sensitive"
  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchText.toLowerCase())
  );

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Campo de Busca */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar produto por nome..."
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      {/* Regra de negócio: Aviso de 'nenhum resultado' */}
      {filteredProducts.length === 0 && searchText !== '' ? (
        <View style={styles.center}>
          <Text style={styles.emptyText}>Nenhum produto encontrado para "{searchText}".</Text>
        </View>
      ) : (
        <FlatList
          data={filteredProducts}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <ProductCard
              data={item}
              onPress={() => navigation.navigate('Details', { product: item })}
            />
          )}
          contentContainerStyle={{ padding: 16 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  searchContainer: {
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderColor: '#e0e0e0',
  },
  searchInput: {
    height: 40,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
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
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});