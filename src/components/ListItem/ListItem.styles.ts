import styled from 'styled-components/native';

export const Card = styled.TouchableOpacity`
  width: 33%;
  height: auto;
  background-color: ${({theme}) => theme.colors.gray};
  justify-content: center;
  align-items: center;
  padding: 20px;
  position: relative;
`;

export const Image = styled.Image`
  width: 80px;
  height: 80px;
`;

export const Title = styled.Text`
  font-size: 15px;
  color: ${({theme}) => theme.colors.white};
  margin-top: 12px;
  text-align: center;
  width: 100%;
`;

export const Code = styled.Text`
  font-size: 15px;
  color: ${({theme}) => theme.colors.white};
  position: absolute;
  z-index: 10;
  top: 10px;
  left: 10px;
`;
