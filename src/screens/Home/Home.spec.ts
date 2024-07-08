import {renderHook, act} from '@testing-library/react-hooks';
import Redux from 'react-redux';
import {useAppDispatch} from '../../redux/store';
import {getListPokemons} from '../../redux/reducers/pokemons';
import {useErrorBoundary} from 'react-error-boundary';
import * as Services from '../../services/pokemons';
import useHome from './Home.hook';

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));
jest.mock('../../redux/store', () => ({
  useAppDispatch: jest.fn(),
}));
jest.mock('../../redux/reducers/pokemons', () => ({
  getListPokemons: jest.fn(),
}));
jest.mock('react-error-boundary', () => ({
  useErrorBoundary: jest.fn(),
}));
jest.mock('../../services/pokemons', () => ({
  searchPokemon: jest.fn(),
}));

describe('useHome', () => {
  const dispatch = jest.fn();
  const showBoundary = jest.fn();

  beforeEach(() => {
    (useAppDispatch as jest.Mock).mockReturnValue(dispatch);
    (useErrorBoundary as jest.Mock).mockReturnValue({showBoundary});
  });

  it('should fetch pokemons successfully', () => {
    const pokemons = [{id: 1, name: 'pikachu'}];
    jest
      .spyOn(Redux, 'useSelector')
      .mockReturnValue({pokemons, loading: false});

    const {result} = renderHook(() => useHome());

    act(() => {
      result.current.getPokemons();
    });

    expect(dispatch).toHaveBeenCalledWith(getListPokemons());
  });

  it('should search pokemon by name successfully', async () => {
    const pokemons = [{id: 1, name: 'pikachu'}];
    jest
      .spyOn(Redux, 'useSelector')
      .mockReturnValue({pokemons, loading: false});
    jest.spyOn(Services, 'searchPokemon').mockResolvedValue({
      results: [{id: 2, name: 'bulbasaur'}],
    });

    const {result, waitForNextUpdate} = renderHook(() => useHome());

    act(() => {
      result.current.searchPokemonByName('bulbasaur');
    });

    await waitForNextUpdate();

    expect(result.current.pokemons).toEqual([{id: 2, name: 'bulbasaur'}]);
  });

  it('should handle search error', async () => {
    const mockShowErrorBoundary = (
      useErrorBoundary as jest.Mock
    ).mockReturnValue({
      showBoundary: jest.fn(),
    });

    const pokemons = [{id: 1, name: 'pikachu'}];
    jest
      .spyOn(Redux, 'useSelector')
      .mockReturnValue({pokemons, loading: false});
    jest
      .spyOn(Services, 'searchPokemon')
      .mockRejectedValue(new Error('Search failed'));

    const {result} = renderHook(() => useHome());

    act(() => {
      result.current.searchPokemonByName('unknown');
    });

    expect(mockShowErrorBoundary).toHaveBeenCalled();
  });
});
