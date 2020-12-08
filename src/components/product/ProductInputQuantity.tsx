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
  value: number;
  onChangeText(value: number): void;
  handleButtonPressed(val: string): void;
  disabled?: boolean;
}

const InputQuantity: React.FC<Props> = ({
  value,
  onChangeText,
  handleButtonPressed,
  disabled,
}) => {
  const handleChangeText = (val: string) => {
    onChangeText(Number(val));
  };

  return (
    <View style={styles.qtyContainer}>
      <TouchableOpacity
        style={[
          styles.qtyBtn,
          { borderLeftWidth: 1, borderLeftColor: '#d5d5d5' },
        ]}
        onPress={() => handleButtonPressed('sub')}
        disabled={disabled}
      >
        <View>
          <Text> - </Text>
        </View>
      </TouchableOpacity>
      <TextInput
        keyboardType="numeric"
        value={String(value)}
        style={styles.input}
        onChangeText={handleChangeText}
      />
      <TouchableOpacity
        style={[
          styles.qtyBtn,
          { borderRightWidth: 1, borderRightColor: '#d5d5d5' },
        ]}
        onPress={() => handleButtonPressed('add')}
        disabled={disabled}
      >
        <View>
          <Text> + </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default InputQuantity;

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
    borderColor: 'transparent',
  },
  input: {
    width: 50,
    alignItems: 'center',
    textAlign: 'center',
    backgroundColor: '#f7f7f7',
    borderRightWidth: 1,
    borderLeftWidth: 1,
    borderColor: colors.lightGray,
  },
});
