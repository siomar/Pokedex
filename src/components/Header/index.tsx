import React from 'react';
import {SafeAreaView, TouchableOpacity} from 'react-native';
import {Container, Row, Space, Title} from './Header.styles';
import Icon from 'react-native-vector-icons/Ionicons';
import {colors} from '../../styles/theme';

const Header = ({navigation, route, back}: any) => {
  return (
    <Container>
      <SafeAreaView>
        <Row>
          {back ? (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon
                name="chevron-back-outline"
                size={25}
                color={colors.white}
              />
            </TouchableOpacity>
          ) : null}
          <Title>Pokedex</Title>
          <Space />
          {route.name !== 'Captured' && (
            <TouchableOpacity onPress={() => navigation.navigate('Captured')}>
              <Icon name="archive-outline" size={25} color={colors.white} />
            </TouchableOpacity>
          )}
        </Row>
      </SafeAreaView>
    </Container>
  );
};

export default Header;
