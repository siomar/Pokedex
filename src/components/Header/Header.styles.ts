import styled from 'styled-components/native';

export const Container = styled.View`
  width: 100%;
  height: 120px;
  background-color: ${({theme}) => theme.colors.primary};
  padding: 50px 15px 0px;
  justify-content: center;
`;

export const Title = styled.Text`
  color: ${({theme}) => theme.colors.white};
  font-size: 24px;
  font-weight: bold;
  margin-left: 10px;
`;

export const Row = styled.View`
  flex-direction: row;
`;

export const Space = styled.View`
  flex: 1;
`;
