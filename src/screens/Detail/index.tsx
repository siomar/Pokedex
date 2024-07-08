import React from 'react';
import {
  Capture,
  CaptureButton,
  CaptureButtonTitle,
  Code,
  Container,
  ContainerImage,
  ContainerLoading,
  ContainerStatus,
  Image,
  ImageAvatar,
  MoveName,
  Moves,
  PokemonName,
  Status,
  StatusName,
  StatusTitle,
  Title,
} from './Detail.styles';
import Loading from '../../components/Loading';
import formatName from '../../helpers/formatName';
import {Each} from '../../helpers/each';
import {ScrollView} from 'react-native';
import useDetail from './Detail.hook';
import Ability from '../../components/Ability';
import {Ability as AbilityType} from '../../types/pokemon';
import Specie from '../../components/Specie';

const DetailScreen: React.FC = ({navigation}) => {
  const {navigateToCaptured, pokemon} = useDetail({navigation});

  if (!pokemon.sprites) {
    return (
      <ContainerLoading>
        <Loading loading />
      </ContainerLoading>
    );
  }

  return (
    <>
      <ScrollView>
        <Container>
          <ContainerImage>
            <Image
              source={{uri: pokemon.sprites.other.showdown.front_default}}
              resizeMode="contain"
            />

            <ImageAvatar
              source={{uri: pokemon.sprites.front_default}}
              resizeMode="contain"
            />
          </ContainerImage>
          <PokemonName>
            <Code>{pokemon.id}.</Code> {formatName(pokemon.name)}
          </PokemonName>
          <ContainerStatus flexDirection="row">
            <Status>
              <StatusTitle>Weight</StatusTitle>
              <StatusName>{pokemon.weight} Kg</StatusName>
            </Status>
            <Status>
              <StatusTitle>Height</StatusTitle>
              <StatusName>{pokemon.height} M</StatusName>
            </Status>
            <Status>
              <StatusTitle>Types</StatusTitle>
              <Each
                of={pokemon.types}
                render={({type: {name}}: any) => (
                  <StatusName>{formatName(name)}</StatusName>
                )}
              />
            </Status>
          </ContainerStatus>

          <ContainerStatus flexDirection="column">
            <Title>Abilities</Title>
            <Each
              of={pokemon.abilities}
              render={(ability: AbilityType) => <Ability ability={ability} />}
            />
          </ContainerStatus>

          <ContainerStatus flexDirection="column">
            <Title>Species</Title>
            <Specie url={pokemon.species.url} />
          </ContainerStatus>

          <ContainerStatus flexDirection="column">
            <Title>Movies</Title>
            <Moves>
              <Each
                of={pokemon.moves.slice(0, 10)}
                render={({move}: any) => <MoveName>{move.name}</MoveName>}
              />
            </Moves>
          </ContainerStatus>
        </Container>
      </ScrollView>
      <Capture>
        <CaptureButton
          onPress={navigateToCaptured}
          accessibilityLabel={`Capture ${pokemon.name}`}>
          <CaptureButtonTitle>Capture</CaptureButtonTitle>
        </CaptureButton>
      </Capture>
    </>
  );
};

export default DetailScreen;
