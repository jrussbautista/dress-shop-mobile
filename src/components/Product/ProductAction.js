import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput
} from 'react-native';
import colors from '../../utils/colors';

const ProductAction = ({ addCart, qty, handleQty }) => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.qtyContainer}>
        <TouchableOpacity
          onPress={() => handleQty('add')}
          style={[
            styles.qtyBtn,
            { borderRightWidth: 1, borderRightColor: '#d5d5d5' }
          ]}
        >
          <View>
            <Text> + </Text>
          </View>
        </TouchableOpacity>
        <TextInput value={qty} style={styles.input} />
        <TouchableOpacity
          onPress={() => handleQty('sub')}
          style={[
            styles.qtyBtn,
            { borderLeftWidth: 1, borderLeftColor: '#d5d5d5' }
          ]}
        >
          <View>
            <Text> - </Text>
          </View>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity onPress={addCart}>
          <View style={styles.btn}>
            <Text style={styles.btnText}> Add to cart </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProductAction;

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    flex: 1,
    paddingVertical: 15
  },
  btn: {
    backgroundColor: colors.primary,
    borderRadius: 50,
    height: 40,
    justifyContent: 'center',
    width: 150,
    alignItems: 'center',
    marginHorizontal: 20
  },
  btnText: {
    color: '#fff',
    fontSize: 17
  },
  qtyContainer: {
    flexDirection: 'row',
    borderColor: '#d5d5d5',
    borderWidth: 1
  },
  qtyBtn: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center'
  },
  input: {
    width: 40,
    alignItems: 'center',
    textAlign: 'center',
    backgroundColor: '#f7f7f7'
  }
});
