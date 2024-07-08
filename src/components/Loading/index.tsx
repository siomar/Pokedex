import React from 'react';
import {Container, Image} from './Loading.styles';

import LoadingGif from '../../assets/loading.gif';

const Loading = ({loading = false}: {loading: boolean}) => {
  if (!loading) {
    return null;
  }
  return (
    <Container>
      <Image source={LoadingGif} resizeMode="contain" />
    </Container>
  );
};

export default Loading;
