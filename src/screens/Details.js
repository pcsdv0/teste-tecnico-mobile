import React from 'react';
import styled from 'styled-components/native';

// Usamos ScrollView no lugar da View normal para garantir que a tela seja rolável, 
// já que a descrição dos produtos pode ser grande e não caber em telas menores.
const Container = styled.ScrollView`
  flex: 1;
  background-color: #ffffff;
  padding: 16px;
`;

const ProductImage = styled.Image`
  width: 100%;
  height: 300px;
  margin-bottom: 24px;
`;

const Category = styled.Text`
  font-size: 14px;
  color: #888;
  text-transform: uppercase;
  margin-bottom: 8px;
`;

const Title = styled.Text`
  font-size: 22px;
  font-weight: bold;
  color: #333;
  margin-bottom: 16px;
`;

const Price = styled.Text`
  font-size: 26px;
  color: #2e8b57;
  font-weight: bold;
  margin-bottom: 24px;
`;

const DescriptionTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin-bottom: 8px;
`;

const Description = styled.Text`
  font-size: 16px;
  color: #666;
  line-height: 24px;
  margin-bottom: 40px; /* Margem extra no final para não colar no fundo da tela */
`;

export default function Details({ route }) {
  // O route.params resgata os dados que a Home enviou pela navegação
  const { product } = route.params;

  return (
    <Container>
      <ProductImage source={{ uri: product.image }} resizeMode="contain" />
      <Category>{product.category}</Category>
      <Title>{product.title}</Title>
      <Price>R$ {product.price.toFixed(2)}</Price>
      
      <DescriptionTitle>Sobre o produto</DescriptionTitle>
      <Description>{product.description}</Description>
    </Container>
  );
}