import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {getPokemons} from '../../services/pokemons';
import {PokemonList} from '../../types/pokemon';

export const getListPokemons = createAsyncThunk(
  'pokemons/getListPokemons',
  async (_, {getState}) => {
    try {
      const {pokemons} = getState();
      const content = await getPokemons({offset: pokemons.pokemons.length});
      return content.results;
    } catch (error: any) {
      throw new Error('Error on get pokemons');
    }
  },
);

const pokemonsServiceSlice = createSlice({
  name: 'pokemons',
  initialState: {
    loading: false,
    pokemons: [] as PokemonList[],
    captured: [] as PokemonList[],
  },
  reducers: {
    increment: (state, action) => {
      state.captured.push(action.payload);
    },
  },
  extraReducers: builder => {
    builder.addCase(getListPokemons.fulfilled, (state, action) => {
      state.pokemons = state.pokemons.concat(action.payload);
      state.loading = false;
    });
    builder.addCase(getListPokemons.pending, state => {
      state.loading = true;
    });
    builder.addCase(getListPokemons.rejected, state => {
      state.loading = false;
    });
  },
});

export const {increment} = pokemonsServiceSlice.actions;

export default pokemonsServiceSlice.reducer;
