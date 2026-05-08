import React, { useState, useEffect, useContext } from 'react';
import { View, FlatList, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons';
import api from '../services/api';
import ProductCard from '../components/ProductCard';
import SkeletonCard from '../components/SkeletonCard';
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
      setError('Falha de conexão. Verifique sua internet.');
    } finally {
      setLoading(false);
    }
  }

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchText.toLowerCase());
    const matchesCategory = selectedCategory === 'Todos' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      
      {/* Cabeçalho Minimalista e Dinâmico */}
      <View style={styles.header}>
        <View>
          <Text style={[styles.headerSubtitle, { color: theme.textSecondary }]}>Catálogo</Text>
          <Text style={[styles.headerTitle, { color: theme.text }]}>Descubra</Text>
        </View>
        <TouchableOpacity onPress={toggleTheme} style={[styles.iconButton, { backgroundColor: theme.surface, borderColor: theme.border }]}>
          <Feather name={isDark ? "sun" : "moon"} size={20} color={theme.text} />
        </TouchableOpacity>
      </View>

      <View style={styles.searchWrapper}>
        <View style={[styles.searchContainer, { backgroundColor: theme.surface, borderColor: theme.border }]}>
          <Feather name="search" size={20} color={theme.textSecondary} style={styles.searchIcon} />
          <TextInput
            style={[styles.searchInput, { color: theme.text }]}
            placeholder="Pesquisar estilo..."
            placeholderTextColor={theme.textSecondary}
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>
      </View>

      <View style={styles.categoriesWrapper}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoriesScroll}>
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
                fontWeight: selectedCategory === cat ? '700' : '500'
              }}>
                {translateCategory(cat)}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {loading ? (
        <View style={styles.gridContainer}>
          {[1, 2, 3, 4, 5, 6].map((key) => (
            <SkeletonCard key={key} />
          ))}
        </View>
      ) : error ? (
        <View style={styles.center}>
          <Feather name="wifi-off" size={48} color={theme.textSecondary} style={{ marginBottom: 16 }} />
          <Text style={[styles.errorText, { color: theme.textSecondary }]}>{error}</Text>
        </View>
      ) : filteredProducts.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Feather name="search" size={48} color={theme.border} style={{ marginBottom: 16 }} />
          <Text style={[styles.emptyText, { color: theme.textSecondary }]}>Nenhum produto encontrado.</Text>
        </View>
      ) : (
        <FlatList
          data={filteredProducts}
          numColumns={2} // A mágica do layout estilo e-commerce real acontece aqui
          keyExtractor={(item) => String(item.id)}
          columnWrapperStyle={styles.row} // Espaça as colunas
          contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 20 }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <ProductCard
              data={item}
              onPress={() => navigation.navigate('Details', { product: item })}
            />
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
  },
  headerSubtitle: { fontSize: 14, fontWeight: '600', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 },
  headerTitle: { fontSize: 32, fontWeight: '900' },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  searchWrapper: { paddingHorizontal: 20, paddingBottom: 16 },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    borderRadius: 14,
    borderWidth: 1,
    paddingHorizontal: 16,
  },
  searchIcon: { marginRight: 12 },
  searchInput: { flex: 1, fontSize: 16 },
  categoriesWrapper: { marginBottom: 16 },
  categoriesScroll: { paddingHorizontal: 20, gap: 10 },
  categoryChip: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 24,
    borderWidth: 1,
  },
  row: { justifyContent: 'space-between' },
  gridContainer: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', paddingHorizontal: 16 },
  
  
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  
  
  emptyContainer: { 
    alignItems: 'center', 
    marginTop: 30, 
    padding: 20 
  },
  
  errorText: { fontSize: 16, textAlign: 'center' },
  emptyText: { fontSize: 16, textAlign: 'center' },
});