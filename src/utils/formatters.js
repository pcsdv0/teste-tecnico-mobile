// Preferi criar essas funções utilitárias separadas para manter as telas limpas.

// Como a Fake Store API traz números brutos optei por usar o 
// toLocaleString nativo do JavaScript para converter para Reais. 
// Fiz isso para entregar a "UX Refinada" que o documento pede, melhorando a experiência do usuário 
// sem precisar instalar bibliotecas pesadas.
export const formatCurrency = (value) => {
  return Number(value).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
};

// Como não temos controle sobre o banco de dados dessa API pública, 
// criei esse dicionário simples. Ler "Moda Masculina" faz muito mais sentido do que "men's clothing".
export const translateCategory = (category) => {
  const map = {
    "electronics": "Eletrônicos",
    "jewelery": "Joias",
    "men's clothing": "Moda Masculina",
    "women's clothing": "Moda Feminina",
  };
  return map[category] || category;
};