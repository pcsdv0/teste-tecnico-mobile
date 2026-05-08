import React, { useState, useEffect, useContext } from 'react';
import { View, FlatList, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import api from '../services/api';
import ProductCard from '../components/ProductCard';
import Loading from '../components/Loading';
import { ThemeContext } from '../contexts/ThemeContext';
import { translateCategory } from '../utils/formatters';

export default function Home({ navigation }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');

  const { theme, isDark, toggleTheme } = useContext(ThemeContext);

  const categories = ['Todos', "electronics", "jewelery", "men's clothing", "women's clothing"];

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    try {
      const response = await api.get('/products');
      setProducts(response.data);
    } catch (err) {
      setError('Não foi possível carregar os produtos. Verifique sua conexão.');
    } finally {
      setLoading(false);
    }
  }

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchText.toLowerCase());
    const matchesCategory = selectedCategory === 'Todos' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (loading) return <Loading />;

  if (error) {
    return (
      <View style={[styles.center, { backgroundColor: theme.background }]}>
        <Text style={[styles.errorText, { color: theme.text }]}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      
      <View style={styles.header}>
        <TextInput
          style={[styles.searchInput, { backgroundColor: theme.surface, color: theme.text, borderColor: theme.border }]}
          placeholder="Buscar produto..."
          placeholderTextColor={theme.textSecondary}
          value={searchText}
          onChangeText={setSearchText}
        />
        <TouchableOpacity onPress={toggleTheme} style={[styles.themeButton, { backgroundColor: theme.surface, borderColor: theme.border }]}>
          <Text style={{ fontSize: 20 }}>{isDark ? '☀️' : '🌙'}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.categoriesWrapper}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoriesContainer}>
          {categories.map((cat) => (
            <TouchableOpacity 
              key={cat} 
              onPress={() => setSelectedCategory(cat)}
              style={[
                styles.categoryChip, 
                { 
                  backgroundColor: selectedCategory === cat ? theme.primary : theme.surface,
                  borderColor: selectedCategory === cat ? theme.primary : theme.border
                }
              ]}
            >
              <Text style={{ 
                color: selectedCategory === cat ? '#fff' : theme.textSecondary,
                fontWeight: selectedCategory === cat ? 'bold' : 'normal'
              }}>
                {translateCategory(cat)}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {filteredProducts.length === 0 ? (
        <View style={styles.center}>
          <Text style={[styles.emptyText, { color: theme.textSecondary }]}>Nenhum produto encontrado.</Text>
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
    flexDirection: 'row',
    padding: 16,
    gap: 12,
  },
  searchInput: {
    flex: 1,
    height: 48,
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    borderWidth: 1,
  },
  themeButton: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  categoriesWrapper: { marginBottom: 8 },
  categoriesContainer: { paddingHorizontal: 16, gap: 8 },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
  },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  errorText: { fontSize: 16, textAlign: 'center' },
  emptyText: { fontSize: 16, textAlign: 'center' },
});