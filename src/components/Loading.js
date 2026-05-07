import React from 'react';
import { ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #f5f5f5;
`;

export default function Loading() {
  return (
    <Container>
      <ActivityIndicator size="large" color="#0000ff" />
    </Container>
  );
}