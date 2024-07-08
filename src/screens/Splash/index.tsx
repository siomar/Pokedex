import React, {useEffect} from 'react';
import {ActivityIndicator, View} from 'react-native';
import {useAppDispatch} from '../../redux/store';
import {getListPokemons} from '../../redux/reducers/pokemons';
import {CommonActions} from '@react-navigation/native';
import {colors} from '../../styles/theme';

const Splash: React.FC = ({navigation}: any) => {
  const dispatch = useAppDispatch();

  async function getPokemons() {
    dispatch(getListPokemons());
    setTimeout(
      () =>
        navigation.reset({
          index: 0,
          routes: [{name: 'Home'}],
        }),
      2000,
    );
  }
  useEffect(() => {
    getPokemons();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <ActivityIndicator color={colors.dark} />
    </View>
  );
};

export default Splash;
