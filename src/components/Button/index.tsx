import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from 'react-native';
import { colors } from '@/theme';

interface Props {
  title: string;
  onPress?(): void;
  type?: 'primary' | 'default';
  style?: ViewStyle;
}

export const Button: React.FC<Props> = ({
  title,
  onPress,
  type = 'default',
  style,
}) => {
  const btnStyle = type === 'primary' ? styles.primary : {};

  return (
    <TouchableOpacity onPress={onPress} style={[styles.btn, btnStyle, style]}>
      <Text style={styles.btnText}>{title}</Text>
    </TouchableOpacity>
  );
};

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
});
