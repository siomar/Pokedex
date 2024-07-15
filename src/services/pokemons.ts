import {createPokemonItemList} from '../helpers';
import {Pokemon, PokemonList} from '../types/pokemon';

type GetPokemonsResponse = {
  results: PokemonList[];
};

const header = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  },
};

const URL = 'https://pokeapi.co/api/v2/pokemon';

export async function getPokemons({
  offset = 0,
}: {
  offset: number;
}): Promise<GetPokemonsResponse> {
  try {
    if (offset === 1302) {
      return {results: []};
    }
    const response = await fetch(`${URL}?offset=${offset}`, header);

    if (!response.ok) {
      const message = `Error: ${response.status} ${response.statusText}`;
      throw new Error(message);
    }

    const resData = await response.json();

    return resData;
  } catch (error) {
    throw error;
  }
}

export async function searchPokemon({
  search,
}: {
  search: string;
}): Promise<GetPokemonsResponse> {
  try {
    const response = await fetch(`${URL}/${search.toLowerCase()}`, header);

    if (!response.ok) {
      const message = `Error: ${response.status} ${response.statusText}`;
      throw new Error(message);
    }

    const resData = await response.json();

    return {
      results: [createPokemonItemList(resData)],
    };
  } catch (error) {
    throw error;
  }
}

export async function getPokemon({url}: {url: string}): Promise<Pokemon | any> {
  try {
    const response = await fetch(url, header);

    if (!response.ok) {
      const message = `Error: ${response.status} ${response.statusText}`;
      throw new Error(message);
    }

    const resData = await response.json();
    return resData;
  } catch (error) {
    throw error;
  }
}
