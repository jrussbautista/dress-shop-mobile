import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from '@/components/ui';

interface Data {
  name: string;
  value: string;
}

interface Props {
  active: string;
  onPress(val: string): void;
  data: Data[];
}

const SearchFilterSelector: React.FC<Props> = ({ onPress, active, data }) => {
  const isActive = (val: string) => {
    return val.toLowerCase() === active.toLowerCase() ? 'primary' : 'inverted';
  };

  const items = data.map((item, i) => (
    <View style={styles.item} key={`item-${i}`}>
      <Button
        title={item.value}
        type={isActive(item.name)}
        onPress={() => onPress(item.name.toLowerCase())}
      />
    </View>
  ));

  return <View style={styles.categoryContainer}>{items}</View>;
};

export default SearchFilterSelector;

const styles = StyleSheet.create({
  categoryContainer: {
    flexDirection: 'row',
    paddingVertical: 10,
  },
  item: {
    marginHorizontal: 5,
  },
});
