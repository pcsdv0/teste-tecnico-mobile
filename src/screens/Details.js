import React, { useContext } from 'react';
import styled from 'styled-components/native';
import { ThemeContext } from '../contexts/ThemeContext';
import { formatCurrency, translateCategory } from '../utils/formatters';

const Container = styled.ScrollView`
  flex: 1;
  background-color: ${props => props.background};
  padding: 16px;
`;

const ImageContainer = styled.View`
  background-color: #fff;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 24px;
  border-width: 1px;
  border-color: ${props => props.border};
`;

const ProductImage = styled.Image`
  width: 100%;
  height: 300px;
`;

const Category = styled.Text`
  font-size: 14px;
  color: ${props => props.primary};
  text-transform: uppercase;
  font-weight: bold;
  margin-bottom: 8px;
`;

const Title = styled.Text`
  font-size: 22px;
  font-weight: bold;
  color: ${props => props.text};
  margin-bottom: 16px;
`;

const Price = styled.Text`
  font-size: 28px;
  color: ${props => props.text};
  font-weight: bold;
  margin-bottom: 24px;
`;

const DescriptionTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: ${props => props.text};
  margin-bottom: 8px;
`;

const Description = styled.Text`
  font-size: 16px;
  color: ${props => props.textSecondary};
  line-height: 24px;
  margin-bottom: 40px;
`;

export default function Details({ route }) {
  const { product } = route.params;
  const { theme } = useContext(ThemeContext);

  return (
    <Container background={theme.background}>
      <ImageContainer border={theme.border}>
        <ProductImage source={{ uri: product.image }} resizeMode="contain" />
      </ImageContainer>
      
      <Category primary={theme.primary}>{translateCategory(product.category)}</Category>
      <Title text={theme.text}>{product.title}</Title>
      <Price text={theme.text}>{formatCurrency(product.price)}</Price>
      
      <DescriptionTitle text={theme.text}>Sobre o produto</DescriptionTitle>
      <Description textSecondary={theme.textSecondary}>{product.description}</Description>
    </Container>
  );
}