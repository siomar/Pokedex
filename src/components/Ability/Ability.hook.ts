import {useEffect, useState} from 'react';
import {getPokemon} from '../../services/pokemons';
import {Ability as AbilityType} from '../../types/pokemon';
import {useErrorBoundary} from 'react-error-boundary';

type Props = {
  ability: AbilityType;
};
const useAbility = ({ability}: Props): {abilityInfo: any} => {
  const [abilityInfo, setAbilityInfo] = useState({} as any);
  const {showBoundary} = useErrorBoundary();
  async function getInfo() {
    try {
      const response = await getPokemon({url: ability.ability.url});
      setAbilityInfo(response);
    } catch (error) {
      console.log('Erro capturado:', error);
      showBoundary(error);
    }
  }

  useEffect(() => {
    getInfo();
  }, []);

  return {abilityInfo};
};

export default useAbility;
