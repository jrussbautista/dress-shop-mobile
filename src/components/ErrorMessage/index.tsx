import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface Props {
  message?: string;
  description?: string;
}

export const ErrorMessage = ({
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

const styles = StyleSheet.create({
  message: {},
  desc: {},
});
