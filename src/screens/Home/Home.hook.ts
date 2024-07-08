import {useSelector} from 'react-redux';
import {useAppDispatch} from '../../redux/store';
import {getListPokemons} from '../../redux/reducers/pokemons';
import {useState} from 'react';
import {PokemonList} from '../../types/pokemon';
import {searchPokemon} from '../../services/pokemons';
import {useErrorBoundary} from 'react-error-boundary';

const useHome = () => {
  const [pokemonList, setPokemonList] = useState<PokemonList[]>();
  const {pokemons, loading} = useSelector(state => state.pokemons);

  const dispatch = useAppDispatch();
  const {showBoundary} = useErrorBoundary();

  async function getPokemons() {
    dispatch(getListPokemons());
  }

  async function searchPokemonByName(name: string | undefined) {
    try {
      if (!name) {
        setPokemonList(pokemons);
        return;
      }
      const findByNamePokemon = pokemons.find(
        pokemon => pokemon.name === name.toLowerCase(),
      );
      if (findByNamePokemon) {
        setPokemonList([findByNamePokemon]);
        return;
      }

      const {results} = await searchPokemon({search: name});
      setPokemonList(results);
    } catch (error) {
      showBoundary('Error on search pokemon');
    }
  }

  return {
    pokemons: pokemonList ? pokemonList : pokemons,
    loading: pokemonList ? false : loading,
    getPokemons,
    searchPokemonByName,
  };
};

export default useHome;
