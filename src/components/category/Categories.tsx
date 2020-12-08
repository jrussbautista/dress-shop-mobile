import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Category } from '@/types';
import navigationNames from '@/navigation/navigationNames';

interface Props {
  categories: Category[];
}

const Categories: React.FC<Props> = ({ categories }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {categories.map((category) => (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate(navigationNames.searchTab, {
              screen: navigationNames.searchScreen,
              params: { category: category.name.toLowerCase() },
            })
          }
          key={category._id}
        >
          <View style={styles.list}>
            <Text style={styles.text}>{category.name}</Text>
            <Image
              style={styles.listImg}
              source={{
                uri: category.imageURL,
              }}
            />
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default Categories;

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    paddingHorizontal: 15,
  },
  listImg: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  list: {
    borderWidth: 0.5,
    borderColor: '#eee',
    marginBottom: 15,
    position: 'relative',
  },
  text: {
    position: 'absolute',
    zIndex: 10,
    top: 20,
    left: 20,
    fontSize: 16,
    textTransform: 'uppercase',
    fontWeight: '700',
  },
});
