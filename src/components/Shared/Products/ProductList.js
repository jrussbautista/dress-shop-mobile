import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity
} from "react-native";
import colors from "../../../utils/colors";
import { useNavigation } from "@react-navigation/native";

const ProductItem = ({ product }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("Product", { id: product._id })}
      style={styles.list}
    >
      <View style={styles.imgWrapper}>
        <Image source={{ uri: product.imageURL }} style={styles.listImg} />
      </View>
      <View style={styles.info}>
        <View>
          <Text style={styles.name} numberOfLines={2}>
            {product.name}
          </Text>
        </View>
        <View>
          <Text style={styles.price}>P{product.price}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const ProductList = ({ products }) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        renderItem={({ item }) => <ProductItem product={item} />}
        keyExtractor={item => item._id}
        numColumns={2}
      />
    </View>
  );
};

export default ProductList;

let width = Dimensions.get("screen").width / 2;

const styles = StyleSheet.create({
  list: { margin: 7.5, flex: 0.5 },
  imgWrapper: {
    width: width - 30,
    height: width - 30
  },
  listImg: {
    width: width - 30,
    height: "100%"
  },
  info: {
    padding: 5
  },
  name: {
    fontSize: 16,
    height: 40
  },
  price: {
    fontSize: 17,
    color: colors.primary,
    fontWeight: "700"
  }
});
