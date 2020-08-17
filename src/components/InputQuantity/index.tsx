import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { colors } from '@/theme';

interface Props {
  value: string;
}

export const InputQuantity: React.FC<Props> = ({ value }) => {
  return (
    <View style={styles.qtyContainer}>
      <TouchableOpacity
        style={[
          styles.qtyBtn,
          { borderRightWidth: 1, borderRightColor: '#d5d5d5' },
        ]}
      >
        <View>
          <Text> + </Text>
        </View>
      </TouchableOpacity>
      <TextInput value={value} style={styles.input} />
      <TouchableOpacity
        style={[
          styles.qtyBtn,
          { borderLeftWidth: 1, borderLeftColor: '#d5d5d5' },
        ]}
      >
        <View>
          <Text> - </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  qtyContainer: {
    flexDirection: 'row',
    borderColor: colors.lightGray,
    borderWidth: 1,
    width: 130,
  },
  qtyBtn: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: 50,
    alignItems: 'center',
    textAlign: 'center',
    backgroundColor: '#f7f7f7',
  },
});
