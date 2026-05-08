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
      // De volta ao normal para buscar os 20 produtos reais!
      const response = await api.get('/products'); 
      setProducts(response.data);
    } catch (err) {
      setError('Falha de conexão. Verifique sua internet.');
    } finally {
      setLoading(false);
    }
  }

  // Preferi fazer o filtro de busca e categoria direto na memória.
  // Isso poupa dados móveis e deixa a resposta mais rapida, sem precisar bater na API de novo a cada letra digitada.
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchText.toLowerCase());
    const matchesCategory = selectedCategory === 'Todos' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      
      
      <View style={styles.header}>
       
        <Text style={[styles.headerTitleClean, { color: theme.text }]}>Catálogo</Text>
        
        
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

      {/* Controle de Estados da Tela (Loading -> Error -> Empty -> Sucesso) */}
      {loading ? (
        <View style={styles.gridContainer}>
          {[1, 2, 3, 4, 5, 6].map((key) => (
            <SkeletonCard key={key} />
          ))}
        </View>
      ) : error ? (
        // Nova Tela de Erro Amigável e à prova de falhas de layout
        <View style={styles.messageContainer}>
          <Feather name="alert-circle" size={60} color={theme.primary} style={{ marginBottom: 16 }} />
          <Text style={[styles.messageTitle, { color: theme.text }]}>Ops, algo deu errado!</Text>
          <Text style={[styles.messageSubtitle, { color: theme.textSecondary }]}>{error}</Text>
        </View>
      ) : filteredProducts.length === 0 ? (
        // NOVO: Usando o emptyContainer aqui para subir a lupa
        <View style={styles.emptyContainer}>
          <Feather name="search" size={48} color={theme.border} style={{ marginBottom: 16 }} />
          <Text style={[styles.messageSubtitle, { color: theme.textSecondary }]}>Nenhum produto encontrado.</Text>
        </View>
      ) : (
        <FlatList
          data={filteredProducts}
          numColumns={2}
          keyExtractor={(item) => String(item.id)}
          columnWrapperStyle={styles.row}
          contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 20 }}
          showsVerticalScrollIndicator={false}
          // Optei pelo FlatList em vez de um .map() comum pelo ganho de performance.
          // O lazy loading nativo dele evita que o celular trave se a lista for muito grande.
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
    alignItems: 'center', // Isso aqui garante que o texto e o botão fiquem na mesma linha horizontalmente!
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 16,
  },
  
  // NOVO: Apenas um título limpo e alinhado
  headerTitleClean: { 
    fontSize: 28, 
    fontWeight: 'bold', 
    textTransform: 'capitalize', 
  },
  
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
  
  // Containers de Feedback (Erro e Vazio) com trava de altura para o Android
  messageContainer: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    paddingHorizontal: 32, 
    minHeight: 400, 
  },
  
  // NOVO: Estilo exclusivo para a busca vazia (fica na parte de cima da tela para fugir do teclado)
  emptyContainer: {
    alignItems: 'center',
    paddingHorizontal: 32,
    marginTop: 80, 
    minHeight: 300,
  },

  messageTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  messageSubtitle: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
  },
});