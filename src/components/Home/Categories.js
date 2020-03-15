import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import apiURL from '../../utils/apiURL';
import axios from 'axios';
import { SkeletonCategory } from '../Shared/Loader';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const getCategories = async () => {
      try {
        const { data } = await axios.get(`${apiURL}/categories`);

        setCategories(data.categories);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getCategories();
  }, []);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <SkeletonCategory />
      ) : (
        <>
          {categories.map(category => (
            <TouchableOpacity
              onPress={() => navigation.navigate('Search')}
              key={category._id}
            >
              <View style={styles.list}>
                <Text style={styles.text}>{category.name}</Text>
                <Image
                  style={styles.listImg}
                  source={{
                    uri: category.imageURL
                  }}
                />
              </View>
            </TouchableOpacity>
          ))}
        </>
      )}
    </View>
  );
};

export default Categories;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10
  },
  listImg: {
    width: '100%',
    height: 150,
    resizeMode: 'cover'
  },
  list: {
    borderWidth: 0.5,
    borderColor: '#eee',
    marginBottom: 15,
    position: 'relative'
  },
  text: {
    position: 'absolute',
    zIndex: 10,
    top: 20,
    left: 20,
    fontSize: 16,
    textTransform: 'uppercase',
    fontWeight: '700'
  }
});
