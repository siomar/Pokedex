import React, {useEffect, useState} from 'react';
import {useErrorBoundary} from 'react-error-boundary';
import {getPokemon} from '../../services/pokemons';

type Props = {
  url: string;
};

const useSpecie = ({
  url,
}: Props): {
  specieInfo: any;
} => {
  const [specieInfo, setspecieInfo] = useState({} as any);
  const {showBoundary} = useErrorBoundary();

  async function getInfo() {
    try {
      const response = await getPokemon({url});
      const egg_groups = await getEggGroup(response.egg_groups);
      setspecieInfo({...response, new_egg_groups: egg_groups});
    } catch (error) {
      showBoundary(error);
    }
  }
  function getEggGroup(eggGroups: {name: string; url: string}[]) {
    try {
      const searchs = eggGroups.map(
        async ({url}): Promise<any> => await getPokemon({url}),
      );
      const response = Promise.all(searchs);
      return response;
    } catch (error) {
      showBoundary(error);
    }
  }

  useEffect(() => {
    getInfo();
  }, []);

  return {specieInfo};
};

export default useSpecie;
