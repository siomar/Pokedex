import {renderHook} from '@testing-library/react-hooks';
import useAbility from './Ability.hook';
import {getPokemon} from '../../services/pokemons';
import {useErrorBoundary} from 'react-error-boundary';

jest.mock('../../services/pokemons');
jest.mock('react-error-boundary');

describe('useAbility', () => {
  const mockShowBoundary = jest.fn();
  const ability = {
    ability: {
      name: 'overgrow',
      url: 'https://pokeapi.co/api/v2/ability/65/',
    },
    is_hidden: true,
    slot: 1,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useErrorBoundary as jest.Mock).mockReturnValue({
      showBoundary: mockShowBoundary,
    });
  });

  it('should fetch ability info successfully', async () => {
    const mockResponse = {name: 'overgrow', effect: 'some effect'};
    (getPokemon as jest.Mock).mockResolvedValue(mockResponse);

    const {result, waitForNextUpdate} = renderHook(() => useAbility({ability}));

    await waitForNextUpdate();

    expect(result.current.abilityInfo).toEqual(mockResponse);
    expect(getPokemon).toHaveBeenCalledWith({url: ability.ability.url});
    expect(mockShowBoundary).not.toHaveBeenCalled();
  });
  it('should handle error when fetching ability info', async () => {
    const mockShowErrorBoundary = (
      useErrorBoundary as jest.Mock
    ).mockReturnValue({
      showBoundary: jest.fn(),
    });

    const mockError = new Error('Failed to fetch');
    (getPokemon as jest.Mock).mockRejectedValue(mockError);

    const {result} = renderHook(() => useAbility({ability}));

    expect(result.current.abilityInfo).toEqual({});
    expect(getPokemon).toHaveBeenCalledWith({url: ability.ability.url});
    expect(mockShowErrorBoundary).toHaveBeenCalled();
  });
});
