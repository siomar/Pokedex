import React from 'react';
import {Each} from '../../helpers/each';
import {
  BoxTitle,
  Container,
  Line,
  List,
  ListItem,
  Title,
} from './Ability.styles';
import {Ability as AbilityType} from '../../types/pokemon';
import useAbility from './Ability.hook';

type Props = {
  ability: AbilityType;
};
const Ability: React.FC<Props> = ({ability}: Props) => {
  const {abilityInfo} = useAbility({ability});

  if (!abilityInfo.effect_entries) {
    return <></>;
  }

  return (
    <Container>
      <BoxTitle>
        <Title>{ability.ability.name}</Title>
      </BoxTitle>
      <Line />
      <List>
        <Each
          of={
            abilityInfo.effect_entries.filter(
              item => item.language.name === 'en',
            ) || []
          }
          render={item => (
            <>
              <Title>{item.short_effect}</Title>
              <ListItem numberOfLines={5} ellipsizeMode="tail">
                {String(item.effect)}
              </ListItem>
            </>
          )}
        />
      </List>
    </Container>
  );
};

export default Ability;
