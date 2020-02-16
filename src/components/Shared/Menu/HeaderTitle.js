import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const HeaderTitle = ({ title }) => {
  return (
    <View>
      <Text style={styles.title}> {title} </Text>
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
