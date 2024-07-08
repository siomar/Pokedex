import React from 'react';
import {ErrorBoundary} from 'react-error-boundary';
import {Container, Subtitle, Title, Button} from './Error.styles';
import {View} from 'react-native';

const errorTracker = (error: Error) => {
  console.error('Error boundary triggered', error);
};
const ErrorFallback: React.FC = ({resetErrorBoundary}) => {
  return (
    <Container>
      <View>
        <Title>Ops!</Title>
        <Subtitle>Pokemon not found</Subtitle>
        <Button title="Reload" onPress={resetErrorBoundary} />
      </View>
    </Container>
  );
};

const Error = ({children}: {children: React.ReactNode}): React.ReactElement => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>{children}</ErrorBoundary>
  );
};

export default Error;
