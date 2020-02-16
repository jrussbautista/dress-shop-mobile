import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const HeaderTitle = () => {
  return (
    <View>
      <Text style={styles.title}> Dress </Text>
    </View>
  );
};

export default HeaderTitle;

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: '700'
  }
});
