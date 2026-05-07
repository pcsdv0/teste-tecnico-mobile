import React, { useState, useEffect, useContext } from 'react';
import { View, FlatList, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import api from '../services/api';
import ProductCard from '../components/ProductCard';
import Loading from '../components/Loading';

// Importamos o nosso Contexto
import { ThemeContext } from '../contexts/ThemeContext';

export default function Home({ navigation }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchText, setSearchText] = useState('');

  // Resgatamos as funções do Tema
  const { theme, isDark, toggleTheme } = useContext(ThemeContext);

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    try {
      const response = await api.get('/products');
      setProducts(response.data);
    } catch (err) {
      setError('Ops! Não foi possível carregar os produtos. Verifique sua conexão.');
    } finally {
      setLoading(false);
    }
  }

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchText.toLowerCase())
  );

  if (loading) return <Loading />;

  if (error) {
    return (
      <View style={[styles.center, { backgroundColor: theme.background }]}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    // A cor de fundo agora vem dinamicamente do Context API
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      
      {/* Botão de Trocar Tema */}
      <View style={styles.header}>
        <TouchableOpacity onPress={toggleTheme} style={styles.themeButton}>
          <Text style={styles.themeButtonText}>
            {isDark ? '☀️ Mudar para Claro' : '🌙 Mudar para Escuro'}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar produto..."
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      {filteredProducts.length === 0 && searchText !== '' ? (
        <View style={styles.center}>
          <Text style={[styles.emptyText, { color: theme.text }]}>Nenhum produto encontrado.</Text>
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
  container: { flex: 1 },
  header: {
    padding: 16,
    alignItems: 'flex-end',
  },
  themeButton: {
    backgroundColor: '#007bff',
    padding: 8,
    borderRadius: 8,
  },
  themeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  searchInput: {
    height: 40,
    backgroundColor: '#e0e0e0',
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
  errorText: { fontSize: 16, color: '#ff0000', textAlign: 'center' },
  emptyText: { fontSize: 16, textAlign: 'center' },
});