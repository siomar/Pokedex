import React from 'react';
import {Container} from './Home.styles';
import {FlatList} from 'react-native';
import Loading from '../../components/Loading';
import useHome from './Home.hook';
import ListItem from '../../components/ListItem';
import {formatName, getIdByURL} from '../../helpers';
import SearchBar from '../../components/SearchBar';
import {HomeScreenNavigationProp} from '../../types';

const HomeScreen: React.FC<{navigation: HomeScreenNavigationProp}> = ({
  navigation,
}) => {
  const {pokemons, loading, getPokemons, searchPokemonByName} = useHome();

  return (
    <Container>
      <FlatList
        data={pokemons}
        contentContainerStyle={{gap: 3, flexGrow: 1}}
        columnWrapperStyle={{
          gap: 3,
          justifyContent: 'flex-start',
        }}
        numColumns={3}
        keyExtractor={(_, index) => index + _.name}
        onEndReached={getPokemons}
        onEndReachedThreshold={0.1}
        renderItem={({item: {url, name}}) => (
          <ListItem
            name={formatName(name)}
            id={getIdByURL(url)}
            onPress={() => navigation.navigate('Detail', {url})}
          />
        )}
        ListHeaderComponent={
          <SearchBar onSearch={(text?: string) => searchPokemonByName(text)} />
        }
        ListFooterComponent={<Loading loading={loading} />}
      />
    </Container>
  );
};

export default HomeScreen;
