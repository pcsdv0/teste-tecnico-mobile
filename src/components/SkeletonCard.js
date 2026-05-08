import React, { useEffect, useRef, useContext } from 'react';
import { Animated, Dimensions } from 'react-native';
import styled from 'styled-components/native';
import { ThemeContext } from '../contexts/ThemeContext';

const cardWidth = (Dimensions.get('window').width / 2) - 24;

const Card = styled.View`
  width: ${cardWidth}px;
  background-color: ${props => props.surface};
  border-radius: 16px;
  padding: 12px;
  margin-bottom: 16px;
  border-width: 1px;
  border-color: ${props => props.border};
`;

const SkeletonImage = styled(Animated.View)`
  width: 100%;
  height: 140px;
  border-radius: 12px;
  margin-bottom: 12px;
  background-color: ${props => props.skeletonColor};
`;

const SkeletonTextLong = styled(Animated.View)`
  height: 12px;
  border-radius: 4px;
  background-color: ${props => props.skeletonColor};
  margin-bottom: 6px;
  width: 90%;
`;

const SkeletonTextShort = styled(Animated.View)`
  height: 12px;
  border-radius: 4px;
  background-color: ${props => props.skeletonColor};
  margin-bottom: 16px;
  width: 60%;
`;

const BottomRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const SkeletonPrice = styled(Animated.View)`
  height: 18px;
  border-radius: 4px;
  background-color: ${props => props.skeletonColor};
  width: 50%;
`;

export default function SkeletonCard() {
  const { theme, isDark } = useContext(ThemeContext);
  const opacity = useRef(new Animated.Value(0.3)).current;
  const skeletonColor = isDark ? '#323238' : '#E2E8F0';

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, { toValue: 0.7, duration: 800, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 0.3, duration: 800, useNativeDriver: true }),
      ])
    ).start();
  }, [opacity]);

  return (
    <Card surface={theme.surface} border={theme.border}>
      <SkeletonImage style={{ opacity }} skeletonColor={skeletonColor} />
      <SkeletonTextLong style={{ opacity }} skeletonColor={skeletonColor} />
      <SkeletonTextShort style={{ opacity }} skeletonColor={skeletonColor} />
      <BottomRow>
        <SkeletonPrice style={{ opacity }} skeletonColor={skeletonColor} />
      </BottomRow>
    </Card>
  );
}