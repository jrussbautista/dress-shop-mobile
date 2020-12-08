import React from 'react';
import { View, Text } from 'react-native';

interface Props {
  message?: string;
  description?: string;
}

const ErrorMessage = ({
  message = 'Uh oh! Something went wrong :(',
  description = 'Look like something went wrong. Try again later.',
}: Props) => {
  return (
    <View>
      <Text>{message}</Text>
      <Text>{description}</Text>
    </View>
  );
};

export default ErrorMessage;
