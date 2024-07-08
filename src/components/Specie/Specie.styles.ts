import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  height: auto;
  background-color: ${({theme}) => theme.colors.gray};
  flex-direction: row;
  align-itens: center;
  flex-wrap: wrap;
  border-radius: 10px;
  margin-bottom: 20px;
`;

export const BoxTitle = styled.View``;

export const Title = styled.Text`
  font-size: 16px;
  color: ${({theme}) => theme.colors.white};
  padding: 10px;
  font-weight: bold;
`;

export const Egg = styled.Text`
  font-size: 18px;
  color: ${({theme}) => theme.colors.primary};
  padding: 10px 0px;
  font-weight: bold;
`;

export const SubEgg = styled.Text`
  font-size: 14px;
  color: ${({theme}) => theme.colors.gray_light};
  font-weight: bold;
`;

export const Line = styled.View`
  width: 100%;
  height: 2px;
  margin: 10px 0px;
  background-color: ${({theme}) => theme.colors.secondary};
`;

export const List = styled.View`
  padding: 10px;
`;
