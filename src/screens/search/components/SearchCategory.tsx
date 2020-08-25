import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from '@/components';

interface Props {
  active: string;
  onPress(val: string): void;
}

export const SearchCategory: React.FC<Props> = ({ onPress, active }) => {
  const isActive = (val: string) => {
    return val === active ? 'primary' : 'default';
  };

  return (
    <View style={styles.categoryContainer}>
      <View style={styles.item}>
        <Button
          title="Men"
          type={isActive('men')}
          onPress={() => onPress('men')}
        />
      </View>
      <View style={styles.item}>
        <Button
          title="Women"
          type={isActive('women')}
          onPress={() => onPress('women')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  categoryContainer: {
    flexDirection: 'row',
    paddingVertical: 10,
  },
  item: {
    marginHorizontal: 5,
  },
});
