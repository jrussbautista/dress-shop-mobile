import React from 'react';
import { TextInput, View, StyleSheet } from 'react-native';
import { colors } from '@/theme';
import { EvilIcons } from '@expo/vector-icons';

interface Props {
  onSubmit(): void;
  value: string;
  onChangeText(val: string): void;
}

export const SearchForm: React.FC<Props> = ({
  onSubmit,
  value,
  onChangeText,
}) => {
  return (
    <View style={styles.searchContainer}>
      <EvilIcons name="search" size={24} color="black" />
      <TextInput
        placeholder="Search Product"
        style={styles.textInput}
        placeholderTextColor={colors.dark}
        onSubmitEditing={onSubmit}
        onChangeText={(val) => onChangeText(val)}
        value={value}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    borderRadius: 50,
    paddingHorizontal: 15,
    height: 50,
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: colors.lightGray,
    margin: 15,
  },
  textInput: {
    fontSize: 16,
    marginHorizontal: 5,
    color: colors.dark,
    flex: 1,
    height: '100%',
  },
});
