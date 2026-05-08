import React, { useContext } from 'react';
import { Dimensions } from 'react-native';
import styled from 'styled-components/native';
import { ThemeContext } from '../contexts/ThemeContext';
import { formatCurrency } from '../utils/formatters';
import { Feather } from '@expo/vector-icons';

// Pegamos a largura da tela para dividir os cards certinho (descontando os paddings)
const cardWidth = (Dimensions.get('window').width / 2) - 24;

const Card = styled.TouchableOpacity`
  width: ${cardWidth}px;
  background-color: ${props => props.surface};
  border-radius: 16px;
  padding: 12px;
  margin-bottom: 16px;
  border-width: 1px;
  border-color: ${props => props.border};
`;

const ImageContainer = styled.View`
  width: 100%;
  height: 140px;
  background-color: #fff;
  border-radius: 12px;
  margin-bottom: 12px;
  padding: 8px;
  justify-content: center;
  align-items: center;
`;

const ProductImage = styled.Image`
  width: 100%;
  height: 100%;
`;

const Title = styled.Text`
  font-size: 13px;
  font-weight: 600;
  color: ${props => props.text};
  margin-bottom: 8px;
  line-height: 18px;
  height: 36px; /* Mantém o tamanho fixo para 2 linhas, alinhando o grid */
`;

const PriceRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Price = styled.Text`
  font-size: 16px;
  color: ${props => props.primary};
  font-weight: 800;
`;

const RatingBadge = styled.View`
  flex-direction: row;
  align-items: center;
`;

const RatingText = styled.Text`
  font-size: 12px;
  font-weight: bold;
  color: ${props => props.textSecondary};
  margin-left: 4px;
`;

export default function ProductCard({ data, onPress }) {
  const { theme } = useContext(ThemeContext);

  return (
    <Card onPress={onPress} surface={theme.surface} border={theme.border}>
      <ImageContainer>
        <ProductImage source={{ uri: data.image }} resizeMode="contain" />
      </ImageContainer>
      
      <Title text={theme.text} numberOfLines={2}>{data.title}</Title>
      
      <PriceRow>
        <Price primary={theme.primary}>{formatCurrency(data.price)}</Price>
        <RatingBadge>
          <Feather name="star" size={12} color="#FFB800" />
          <RatingText textSecondary={theme.textSecondary}>{data.rating?.rate || '0.0'}</RatingText>
        </RatingBadge>
      </PriceRow>
    </Card>
  );
}