import {renderHook, act} from '@testing-library/react-hooks';
import {useAppDispatch} from '../../redux/store';
import {useRoute} from '@react-navigation/native';
import {getPokemon} from '../../services/pokemons';
import {useErrorBoundary} from 'react-error-boundary';
import useDetail from './Detail.hook';

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

jest.mock('@react-navigation/native', () => ({
  useRoute: jest.fn(),
}));

jest.mock('../../services/pokemons', () => ({
  getPokemon: jest.fn(),
}));

jest.mock('react-error-boundary', () => ({
  useErrorBoundary: jest.fn(),
}));

jest.mock('../../redux/store', () => ({
  useAppDispatch: jest.fn(),
}));

describe('useDetail', () => {
  const dispatch = jest.fn();
  const showBoundary = jest.fn();

  beforeEach(() => {
    (useAppDispatch as jest.Mock).mockReturnValue(dispatch);
    (useErrorBoundary as jest.Mock).mockReturnValue({showBoundary});
  });

  it('should fetch and set Pokemon on mount', async () => {
    const mockPokemon = {name: 'Pikachu', id: 25};
    const mockRoute = {params: {url: 'pokemon-url'}};
    (useRoute as jest.Mock).mockReturnValue(mockRoute);
    (getPokemon as jest.Mock).mockResolvedValue(mockPokemon);

    const {result, waitForNextUpdate} = renderHook(() =>
      useDetail({navigation: {}}),
    );

    await waitForNextUpdate();

    expect(getPokemon).toHaveBeenCalledWith({url: mockRoute.params.url});
    expect(result.current.pokemon).toEqual(mockPokemon);
  });

  it('should navigate to Captured screen on calling navigateToCaptured', () => {
    const mockNavigation = {navigate: jest.fn()};
    (useAppDispatch as jest.Mock).mockReturnValue(jest.fn());
    const {result} = renderHook(() => useDetail({navigation: mockNavigation}));

    act(() => {
      result.current.navigateToCaptured();
    });

    expect(mockNavigation.navigate).toHaveBeenCalledWith('Captured');
  });

  it('should handle error when getPokemon fails', async () => {
    const mockShowErrorBoundary = (
      useErrorBoundary as jest.Mock
    ).mockReturnValue({
      showBoundary: jest.fn(),
    });

    const mockRoute = {params: {url: 'pokemon-url'}};
    (useRoute as jest.Mock).mockReturnValue(mockRoute);
    const mockError = new Error('Pokemon not found');
    (getPokemon as jest.Mock).mockRejectedValue(mockError);

    renderHook(() => useDetail({navigation: {}}));

    expect(getPokemon).toHaveBeenCalledWith({url: mockRoute.params.url});
    expect(mockShowErrorBoundary).toHaveBeenCalled();
  });
});
