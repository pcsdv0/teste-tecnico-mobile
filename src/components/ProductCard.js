import React from 'react';
import styled from 'styled-components/native';

const Card = styled.TouchableOpacity`
  background-color: #ffffff;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 12px;
  flex-direction: row;
  align-items: center;
  elevation: 2; /* Sombra no Android */
  shadow-color: #000; /* Sombra no iOS */
  shadow-opacity: 0.1;
  shadow-radius: 4px;
`;

const ProductImage = styled.Image`
  width: 80px;
  height: 80px;
  border-radius: 4px;
  margin-right: 16px;
`;

const InfoContainer = styled.View`
  flex: 1;
`;

const Title = styled.Text`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 8px;
  color: #333;
`;

const Price = styled.Text`
  font-size: 16px;
  color: #2e8b57;
  font-weight: bold;
`;

// O componente recebe os dados do produto (data) e a função de clique (onPress)
export default function ProductCard({ data, onPress }) {
  return (
    <Card onPress={onPress}>
      <ProductImage source={{ uri: data.image }} resizeMode="contain" />
      <InfoContainer>
        <Title numberOfLines={2}>{data.title}</Title>
        <Price>R$ {data.price.toFixed(2)}</Price>
      </InfoContainer>
    </Card>
  );
}