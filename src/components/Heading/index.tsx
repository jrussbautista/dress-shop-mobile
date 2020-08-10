import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface Props {
  title: string;
}

export const Heading: React.FC<Props> = ({ title }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    fontWeight: '700',
  },
  container: {
    paddingVertical: 15,
  },
});
