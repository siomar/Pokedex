import React from 'react';
import {Card, Code, Image, Title} from './ListItem.styles';

type Props = {
  name: string;
  id: string;
  onPress: () => void;
};

const ListItem: React.FC<Props> = ({name, id, onPress}: Props) => {
  const URL_GIF = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${id}.gif`;

  return (
    <Card onPress={onPress}>
      <Image
        source={{
          uri: URL_GIF,
        }}
        resizeMode="contain"
      />
      <Code>{id}.</Code>
      <Title>{name}</Title>
    </Card>
  );
};

export default ListItem;
