import React from 'react';
import {
  BoxTitle,
  Container,
  Egg,
  Line,
  List,
  SubEgg,
  Title,
} from './Specie.styles';
import {Each} from '../../helpers/each';
import useSpecie from './Specie.hook';

type Props = {
  url: string;
};

const Specie: React.FC<Props> = ({url}: Props) => {
  const {specieInfo} = useSpecie({url});

  if (!specieInfo.name || !specieInfo.egg_groups) {
    return <></>;
  }

  return (
    <Container>
      <BoxTitle>
        <Title>{specieInfo.name}</Title>
      </BoxTitle>
      <Line />
      <List>
        <Each
          of={specieInfo.egg_groups || []}
          render={(item, index) => (
            <>
              <Egg>Egg group type {item.name}</Egg>
              <Title>Pokemons</Title>
              <SubEgg>
                {specieInfo.new_egg_groups[index].pokemon_species
                  .map(({name}) => name)
                  .join(', ')}
                .
              </SubEgg>
            </>
          )}
        />
      </List>
    </Container>
  );
};

export default Specie;
