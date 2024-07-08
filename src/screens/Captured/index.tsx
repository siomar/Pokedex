import React from 'react';
import {FlatList} from 'react-native';
import {Container} from './Captured.styles';
import ListItem from '../../components/ListItem';
import {formatName, getIdByURL} from '../../helpers';
import {useSelector} from 'react-redux';
import {CapturedScreenNavigationProp} from '../../types';

const Captured: React.FC<{
  navigation: CapturedScreenNavigationProp;
}> = ({navigation}) => {
  const {captured} = useSelector(state => state.pokemons);

  return (
    <Container>
      <FlatList
        data={captured}
        contentContainerStyle={{gap: 3, flexGrow: 1}}
        columnWrapperStyle={{
          gap: 3,
          justifyContent: 'flex-start',
        }}
        numColumns={3}
        keyExtractor={(_, index) => index + _.name}
        renderItem={({item: {url, name}}) => (
          <ListItem
            name={formatName(name)}
            id={getIdByURL(url)}
            onPress={() => navigation.navigate('Detail', {url})}
          />
        )}
      />
    </Container>
  );
};

export default Captured;
