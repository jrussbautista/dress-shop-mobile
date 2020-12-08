import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import Modal from 'react-native-modal';

interface Props {
  visible: boolean;
}

const BACKDROP_OPACITY = 0.5;
const SPINNER_SIZE = 40;
const SPINNER_COLOR = '#fff';

const PageLoader = ({ visible }: Props) => {
  return (
    <Modal isVisible={visible} backdropOpacity={BACKDROP_OPACITY}>
      <View>
        <ActivityIndicator size={SPINNER_SIZE} color={SPINNER_COLOR} />
      </View>
    </Modal>
  );
};

export default PageLoader;
