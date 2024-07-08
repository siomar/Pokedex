import {Pokemon, PokemonList} from '../types/pokemon';

export default function createPokemonItemList({
  name,
  id,
}: Pokemon): PokemonList {
  return {name, url: `https://pokeapi.co/api/v2/pokemon/${id}/`};
}
