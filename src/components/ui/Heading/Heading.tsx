import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';

interface Props {
  title: string;
  style?: ViewStyle;
}

const Heading: React.FC<Props> = ({ title, style }) => {
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.text}>{title}</Text>
    </View>
  );
};

export default Heading;

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    fontWeight: '700',
  },
  container: {
    paddingVertical: 15,
  },
});
