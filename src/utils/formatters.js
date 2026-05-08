// Formata o número para o padrão de moeda do Brasil (R$)
export const formatCurrency = (value) => {
  return Number(value).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
};

// Traduz as categorias vindas da API
export const translateCategory = (category) => {
  const map = {
    "electronics": "Eletrônicos",
    "jewelery": "Joias",
    "men's clothing": "Moda Masculina",
    "women's clothing": "Moda Feminina",
  };
  return map[category] || category;
};