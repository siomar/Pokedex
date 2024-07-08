import React, {useState} from 'react';
import {colors} from '../../styles/theme';
import Icon from 'react-native-vector-icons/Ionicons';
import {Container, Button, TextInput} from './SearchBar.styles';

type Props = {
  onSearch: (text: string) => void;
};
const SearchBar: React.FC<Props> = ({onSearch}: Props) => {
  const [text, onChangeText] = useState<string>('');

  return (
    <Container>
      <TextInput
        onChangeText={onChangeText}
        value={text}
        placeholder="Search pokemon"
        autoComplete="off"
        autoCapitalize="none"
        returnKeyType="search"
        placeholderTextColor={colors.white}
        onSubmitEditing={({nativeEvent: {text}}) => onSearch(text)}
      />
      <Button onPress={() => onSearch(text)}>
        <Icon name="search-outline" size={25} color={colors.white} />
      </Button>
    </Container>
  );
};

export default SearchBar;
