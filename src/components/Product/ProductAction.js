import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput
} from 'react-native';
import colors from '../../utils/colors';

const ProductAction = ({ addCart }) => {
  const [qty, setQty] = useState('1');

  const handleChangeQty = action => {
    if (action === 'add') {
      if (qty >= 10) {
        alert('Ops you can buy up to 10 max');
        return;
      }
      setQty(qty => (parseInt(qty) + 1).toString());
    } else {
      if (qty > 1) setQty(qty => (parseInt(qty) - 1).toString());
    }
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.qtyContainer}>
        <TouchableOpacity
          onPress={() => handleChangeQty('add')}
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
          onPress={() => handleChangeQty('sub')}
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
