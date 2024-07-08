import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: ${({theme}) => theme.colors.dark};
  align-items: center;
  padding: 20px 0px 100px;
`;

export const ContainerLoading = styled.SafeAreaView`
  flex: 1;
  background-color: ${({theme}) => theme.colors.gray};
`;

export const ContainerImage = styled.View`
  width: 180px;
  height: 180px;
  align-items: center;
  justify-content: center;
  border-radius: 180px;
  border: 8px solid ${({theme}) => theme.colors.gray};
  margin: 50px;
`;

export const Image = styled.Image`
  width: 100%;
  height: 100%;
`;

export const ImageAvatar = styled.Image`
  width: 70px;
  height: 70px;
  background-color: ${({theme}) => theme.colors.gray};
  padding: 50px;
  border-radius: 70px;
`;

export const PokemonName = styled.Text`
  width: 100%;
  font-size: 34px;
  color: ${({theme}) => theme.colors.white};
  margin: 20px 0px;
  font-weight: bold;
  text-align: center;
`;

export const Title = styled.Text`
  font-size: 20px;
  color: ${({theme}) => theme.colors.white};
  margin: 20px 0px;
`;

export const Code = styled.Text`
  font-size: 16px;
  color: ${({theme}) => theme.colors.red};
  position: absolute;
  z-index: 10;
  top: 10px;
  left: 10px;
`;

export const Moves = styled.View`
  background-color: ${({theme}) => theme.colors.gray};
  flex-direction: row;
  align-itens: center;
  padding: 18px;
  flex-wrap: wrap;
  border-radius: 10px;
`;

export const MoveName = styled.Text`
  width: 48%;
  font-size: 16px;
  color: ${({theme}) => theme.colors.white};
  background-color: ${({theme}) => theme.colors.dark};
  padding: 10px;
`;

export const ContainerStatus = styled.View<{flexDirection: 'row' | 'column'}>`
  width: 100%;
  flex-direction: ${({flexDirection}) => flexDirection};
  justify-content: space-between;
  align-itens: center;
  padding: 5px 10px;
`;

export const Status = styled.View`
  flex: 1;
  height: auto;
  background-color: ${({theme}) => theme.colors.gray};
  flex-direction: column;
  justify-content: flex-start;
  align-itens: center;
  padding: 18px;
`;

export const StatusTitle = styled.Text`
  font-size: 16px;
  color: ${({theme}) => theme.colors.red};
  margin: 10px 0px;
  text-align: center;
  font-weight: bold;
`;

export const StatusName = styled.Text`
  font-size: 16px;
  color: ${({theme}) => theme.colors.white};
  text-align: center;
`;

export const Capture = styled.View`
  width: 100%;
  position: absolute;
  bottom: 0px;
  z-index: 100;
  padding: 10px;
  justify-content: center;
  padding: 0px 50px 40px;
`;

export const CaptureButton = styled.TouchableOpacity`
  background-color: ${({theme}) => theme.colors.red};
  width: 100%;
  height: 50px;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
`;

export const CaptureButtonTitle = styled.Text`
  font-size: 16px;
  font-weight: bold;
  text-transform: uppercase;
  color: ${({theme}) => theme.colors.white};
`;
