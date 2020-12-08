import React from 'react';
import {
  TextInput as RNTextInput,
  StyleSheet,
  View,
  Text,
  NativeSyntheticEvent,
  TextInputFocusEventData,
  ViewStyle,
} from 'react-native';
import { colors } from '@/theme';

interface Props {
  placeholder?: string;
  value: string;
  label?: string;
  onChangeText(val: string): void;
  secureTextEntry?: boolean;
  onBlur?(e: NativeSyntheticEvent<TextInputFocusEventData>): void;
  style?: ViewStyle;
}

const MyTextInput = ({
  value,
  placeholder,
  label,
  onChangeText,
  secureTextEntry = false,
}: Props) => {
  const labelElement = label ? <Text>{label}</Text> : null;

  return (
    <View style={styles.inputContainer}>
      {labelElement}
      <RNTextInput
        style={styles.input}
        value={value}
        placeholder={placeholder}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
};

export default MyTextInput;

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 10,
  },
  input: {
    height: 45,
    borderBottomColor: colors.gray,
    borderBottomWidth: 1,
  },
});
