import React from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { colors } from '@/theme';

interface Props {
  type: string;
  message: string;
  active: boolean;
  animatedValue: any;
}

const Toast: React.FC<Props> = ({ type, message, active, animatedValue }) => {
  const typeStyle = type === 'success' ? styles.success : styles.danger;

  if (!active) return null;

  const animation = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-300, 0],
  });

  return (
    <Animated.View
      style={[
        styles.toastContainer,
        {
          transform: [
            {
              translateY: animation,
            },
          ],
        },
      ]}
    >
      <View style={[styles.toast, typeStyle]}>
        <Text style={styles.toastText}> {message}</Text>
      </View>
    </Animated.View>
  );
};

export default Toast;

const styles = StyleSheet.create({
  toastContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    elevation: 999,
    alignItems: 'center',
    zIndex: 10000,
    top: 50,
    padding: 10,
  },
  toast: {
    width: '100%',
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 5,
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    borderRadius: 6,
  },
  toastText: {
    color: '#fff',
  },
  success: {
    backgroundColor: colors.success,
  },
  danger: {
    backgroundColor: colors.danger,
  },
});
