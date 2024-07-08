import {renderHook} from '@testing-library/react-hooks';
import useSpecie from './Specie.hook';
import {getPokemon} from '../../services/pokemons';
import {useErrorBoundary} from 'react-error-boundary';

jest.mock('../../services/pokemons');
jest.mock('react-error-boundary');

const createEggGroupResponse = (name: string) => ({
  name,
  url: `https://pokeapi.co/api/v2/egg-group/${name}/`,
});

describe('useSpecie', () => {
  const mockShowBoundary = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useErrorBoundary as jest.Mock).mockReturnValue({
      showBoundary: mockShowBoundary,
    });
  });

  it('should successfully search for species information', async () => {
    const specieUrl = 'https://pokeapi.co/api/v2/pokemon-species/1/';
    const mockSpecieResponse = {
      egg_groups: [createEggGroupResponse('monster')],
    };
    const mockEggGroupResponse = {name: 'monster'};

    (getPokemon as jest.Mock).mockImplementation(async ({url}) => {
      if (url === specieUrl) return mockSpecieResponse;
      if (url === 'https://pokeapi.co/api/v2/egg-group/monster/')
        return mockEggGroupResponse;
      throw new Error('URL não esperada');
    });

    const {result, waitForNextUpdate} = renderHook(() =>
      useSpecie({url: specieUrl}),
    );

    await waitForNextUpdate();

    expect(result.current.specieInfo).toEqual({
      ...mockSpecieResponse,
      new_egg_groups: [mockEggGroupResponse],
    });
    expect(getPokemon).toHaveBeenCalledWith({url: specieUrl});
    expect(getPokemon).toHaveBeenCalledWith({
      url: 'https://pokeapi.co/api/v2/egg-group/monster/',
    });
    expect(mockShowBoundary).not.toHaveBeenCalled();
  });

  it('should deal with error when searching for species information', async () => {
    const mockShowErrorBoundary = (
      useErrorBoundary as jest.Mock
    ).mockReturnValue({
      showBoundary: jest.fn(),
    });

    const specieUrl = 'https://pokeapi.co/api/v2/pokemon-species/1/';
    const mockError = new Error('Failed to fetch');

    (getPokemon as jest.Mock).mockRejectedValue(mockError);

    const {result} = renderHook(() => useSpecie({url: specieUrl}));

    expect(result.current.specieInfo).toEqual({});
    expect(getPokemon).toHaveBeenCalledWith({url: specieUrl});
    expect(mockShowErrorBoundary).toHaveBeenCalled();
  });

  it('should handle error when fetching egg group information', async () => {
    const mockShowErrorBoundary = (
      useErrorBoundary as jest.Mock
    ).mockReturnValue({
      showBoundary: () => jest.fn(),
    });

    const specieUrl = 'https://pokeapi.co/api/v2/pokemon-species/1/';
    const mockSpecieResponse = {
      egg_groups: [createEggGroupResponse('monster')],
    };
    const mockError = new Error('Failed to fetch');

    (getPokemon as jest.Mock).mockImplementation(async ({url}) => {
      if (url === specieUrl) return mockSpecieResponse;
      throw mockError;
    });

    const {result} = renderHook(() => useSpecie({url: specieUrl}));

    expect(result.current.specieInfo).toEqual({});
    expect(getPokemon).toHaveBeenCalledWith({url: specieUrl});
    expect(mockShowErrorBoundary).toHaveBeenCalled();
  });
});
