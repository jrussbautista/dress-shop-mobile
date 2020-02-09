import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Categories = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate("Search")}>
        <View style={styles.list}>
          <Text style={styles.text}>Women</Text>
          <Image
            style={styles.listImg}
            source={{
              uri: `https://res.cloudinary.com/djlbfjouc/image/upload/v1581156792/categ-01_vkugx1.webp`
            }}
          />
        </View>
      </TouchableOpacity>
      <TouchableOpacity>
        <View style={styles.list}>
          <Text style={styles.text}>Women</Text>
          <Image
            style={styles.listImg}
            source={{
              uri: `https://res.cloudinary.com/djlbfjouc/image/upload/v1581156821/categ-02_ianehv.webp`
            }}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Categories;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10
  },
  listImg: {
    width: "100%",
    height: 150,
    resizeMode: "cover"
  },
  list: {
    borderWidth: 0.5,
    borderColor: "#eee",
    marginBottom: 15,
    position: "relative"
  },
  text: {
    position: "absolute",
    zIndex: 10,
    top: 20,
    left: 20,
    fontSize: 16,
    textTransform: "uppercase",
    fontWeight: "700"
  }
});
