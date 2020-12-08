import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from 'react-native';
import { colors } from '@/theme';

interface Props {
  title: string;
  onPress?(): void;
  type?: 'primary' | 'default' | 'inverted';
  style?: ViewStyle;
  disabled?: boolean;
}

const Button: React.FC<Props> = ({
  title,
  onPress,
  type = 'default',
  style,
  disabled = false,
}) => {
  let btnStyle,
    btnTextStyle = {};

  switch (type) {
    case 'primary':
      btnStyle = styles.primary;
      break;
    case 'inverted':
      btnStyle = styles.inverted;
      btnTextStyle = styles.invertedText;
      break;
    default:
      btnStyle = {};
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.btn, btnStyle, style]}
      disabled={disabled}
    >
      <Text style={[styles.btnText, btnTextStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  btn: {
    backgroundColor: colors.dark,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
    paddingHorizontal: 15,
  },
  btnText: {
    color: '#fff',
    fontSize: 16,
  },
  primary: {
    backgroundColor: colors.primary,
  },
  inverted: {
    backgroundColor: '#fff',
    borderColor: colors.primary,
    borderWidth: 1,
  },
  invertedText: {
    color: colors.primary,
  },
});
