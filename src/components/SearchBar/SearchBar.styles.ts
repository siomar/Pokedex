import styled from 'styled-components/native';

export const Container = styled.View`
  padding: 15px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Button = styled.TouchableOpacity`
  padding: 0px 20px;
`;

export const TextInput = styled.TextInput`
  flex: 1;
  height: 35px;
  border-radius: 35px;
  padding: 0px 10px;
  border: 2px solid ${({theme}) => theme.colors.gray_light};
  color: ${({theme}) => theme.colors.gray_light};
`;
