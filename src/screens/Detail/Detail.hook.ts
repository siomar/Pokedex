import {useEffect, useState} from 'react';
import {useAppDispatch} from '../../redux/store';
import {Pokemon} from '../../types/pokemon';
import {useRoute} from '@react-navigation/native';
import {getPokemon} from '../../services/pokemons';
import {createPokemonItemList} from '../../helpers';
import {increment} from '../../redux/reducers/pokemons';
import {useErrorBoundary} from 'react-error-boundary';

const useDetail = ({navigation}) => {
  const [pokemon, setPokemon] = useState<Pokemon>({} as Pokemon);
  const dispatch = useAppDispatch();

  const {showBoundary} = useErrorBoundary();
  const route = useRoute<any>();

  async function getDetailPokemon(url: string) {
    try {
      const response = await getPokemon({url});
      setPokemon(response);
    } catch (error) {
      showBoundary('Error on search pokemon');
    }
  }

  function navigateToCaptured() {
    dispatch(increment(createPokemonItemList(pokemon)));
    navigation.navigate('Captured');
  }

  useEffect(() => {
    getDetailPokemon(route.params.url);
  }, [route.params.url]);

  return {pokemon, navigateToCaptured};
};

export default useDetail;
