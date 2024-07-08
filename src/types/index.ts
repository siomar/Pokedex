import {NativeStackNavigationProp} from '@react-navigation/native-stack';

export type RootStackParamList = {
  Home: undefined;
  Detail: {url: string};
  Captured: undefined; // Exemplo de passagem de parâmetro
};

export type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Home'
>;

export type CapturedScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Captured'
>;
