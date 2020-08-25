import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '@/theme';
import { AntDesign } from '@expo/vector-icons';

interface SearchFilterProps {
  active: 'low' | 'high';
  onSelect(val: string): void;
}

interface DropDownProps {
  onSelect(val: string): void;
}

const DropDown = ({ onSelect }: DropDownProps) => {
  return (
    <View style={styles.dropdown}>
      <TouchableOpacity
        style={styles.dropdownItem}
        onPress={() => onSelect('low')}
      >
        <Text style={styles.dropdownText}> Low to High </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.dropdownItem}
        onPress={() => onSelect('high')}
      >
        <Text style={styles.dropdownText}> High to Low </Text>
      </TouchableOpacity>
    </View>
  );
};

export const SearchFilter = ({ active, onSelect }: SearchFilterProps) => {
  const [isOpenDropdown, setIsOpenDropDown] = useState(true);

  let activeText = '';

  if (active === 'low') {
    activeText = 'Low to High';
  } else if (active === 'high') {
    activeText = 'High to Low';
  }

  const handleSelect = (val: string) => {
    setIsOpenDropDown(false);
    onSelect(val);
  };

  const dropdownElement = isOpenDropdown ? (
    <DropDown onSelect={handleSelect} />
  ) : null;

  const arrowNameIcon = isOpenDropdown ? 'up' : 'down';

  return (
    <>
      <TouchableOpacity style={styles.filter}>
        <Text style={styles.sortText}> Sort By </Text>
        <View style={styles.filterBox}>
          <Text> Price {activeText} </Text>
          <AntDesign name={arrowNameIcon} size={20} color="black" />
        </View>
        {dropdownElement}
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  filter: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    position: 'relative',
  },
  sortText: {
    fontSize: 14,
    marginRight: 5,
  },
  filterBox: {
    borderWidth: 1,
    borderColor: colors.lightGray,
    flex: 1,
    height: 40,
    alignItems: 'center',
    borderRadius: 6,
    paddingHorizontal: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dropdown: {
    position: 'absolute',
    backgroundColor: '#fff',
    top: 50,
    zIndex: 99,
    flex: 1,
    width: '100%',
    padding: 10,
    borderRadius: 6,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },
  dropdownItem: {
    paddingVertical: 5,
    flex: 1,
    backgroundColor: '#000',
  },
  dropdownText: {
    textAlign: 'center',
  },
});
