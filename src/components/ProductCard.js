import React, { useContext } from 'react';
import styled from 'styled-components/native';
import { ThemeContext } from '../contexts/ThemeContext';
import { formatCurrency } from '../utils/formatters';

const Card = styled.TouchableOpacity`
  background-color: ${props => props.surface};
  border-radius: 12px;
  padding: 12px;
  margin-bottom: 16px;
  flex-direction: row;
  align-items: center;
  border-width: 1px;
  border-color: ${props => props.border};
  elevation: 3;
  shadow-color: #000;
  shadow-opacity: 0.05;
  shadow-radius: 8px;
  shadow-offset: 0px 4px;
`;

// Fundo branco forçado para a imagem não sumir no dark mode (se a imagem tiver fundo transparente)
const ProductImage = styled.Image`
  width: 90px;
  height: 90px;
  border-radius: 8px;
  margin-right: 16px;
  background-color: #fff; 
`;

const InfoContainer = styled.View`
  flex: 1;
  justify-content: space-between;
  height: 90px;
`;

const Title = styled.Text`
  font-size: 15px;
  font-weight: 600;
  color: ${props => props.text};
  margin-bottom: 4px;
`;

const Price = styled.Text`
  font-size: 18px;
  color: ${props => props.primary};
  font-weight: bold;
`;

export default function ProductCard({ data, onPress }) {
  const { theme } = useContext(ThemeContext);

  return (
    <Card onPress={onPress} surface={theme.surface} border={theme.border}>
      <ProductImage source={{ uri: data.image }} resizeMode="contain" />
      <InfoContainer>
        <Title text={theme.text} numberOfLines={2}>{data.title}</Title>
        <Price primary={theme.primary}>{formatCurrency(data.price)}</Price>
      </InfoContainer>
    </Card>
  );
}