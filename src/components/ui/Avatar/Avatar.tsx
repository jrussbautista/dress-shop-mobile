import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { User } from '@/types';
import { getFirstLetter } from '@/utils/helpers';
import { colors } from '@/theme';

interface Props {
  user: User;
}

const Avatar = ({ user }: Props) => {
  const avatarElement = user.imageURL ? (
    <Image source={{ uri: user.imageURL }} style={styles.image} />
  ) : (
    <View style={styles.nameAvatar}>
      <Text style={styles.nameText}>{getFirstLetter(user.name)}</Text>
    </View>
  );

  return <View>{avatarElement}</View>;
};

export default Avatar;

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  nameAvatar: {
    width: 100,
    height: 100,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
  nameText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
