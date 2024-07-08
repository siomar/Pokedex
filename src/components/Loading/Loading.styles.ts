import styled from 'styled-components/native';

export const Container = styled.View`
  background-color: ${({theme}) => theme.colors.gray};
`;

export const Image = styled.Image`
  width: 100%;
  height: 100px;
  padding: 20px;
`;
