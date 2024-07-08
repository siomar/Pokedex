import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: ${({theme}) => theme.colors.dark};
  justify-content: center;
  align-itens: center;
`;

export const Title = styled.Text`
  font-size: 34px;
  color: ${({theme}) => theme.colors.secondary};
  font-weight: bold;
  text-align: center;
`;

export const Subtitle = styled.Text`
  font-size: 24px;
  color: ${({theme}) => theme.colors.white};
  text-align: center;
  margin-bottom: 30%;
`;

export const Button = styled.Button``;
