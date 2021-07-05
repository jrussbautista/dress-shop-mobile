import { TextInput, Button, PageLoader } from '@/components/ui';
import { useAuth, useToast } from '@/contexts';
import { AuthService } from '@/services';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Constants from 'expo-constants';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';

const EditProfileScreen = () => {
  const { currentUser, updateCurrentUser } = useAuth();
  const { showToast } = useToast();
  const navigation = useNavigation();

  const initialState = {
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    image: '',
  };

  const [userInfo, setUserInfo] = useState(initialState);
  const [updating, setUpdating] = useState(false);

  const updateProfile = async () => {
    if (!currentUser) {
      return;
    }
    try {
      setUpdating(true);
      const results = await AuthService.updateProfile(
        currentUser?._id,
        userInfo
      );
      updateCurrentUser(results);
      showToast('success', 'Successfully profile updated');
      navigation.goBack();
    } catch (error) {
      showToast('error', error.message);
    } finally {
      setUpdating(false);
    }
  };

  const handleChangeText = (name: string, val: string) => {
    setUserInfo({ ...userInfo, [name]: val });
  };

  const getPermissionAsync = async () => {
    if (Constants.platform?.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        showToast(
          'error',
          'Sorry, we need camera roll permissions to make this work!'
        );
        return false;
      }
    }

    return true;
  };

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        base64: true,
      });
      if (!result.cancelled) {
        if (result.base64) {
          const encodeBase64 = `data:image/gif;base64,${result.base64}`;
          setUserInfo({ ...userInfo, image: encodeBase64 });
        }
      }
    } catch (e) {
      alert(e.message);
    }
  };

  const onImageChange = async () => {
    const checkPermission = await getPermissionAsync();
    if (checkPermission) {
      pickImage();
    }
  };

  const renderImage = () => {
    let imageUri: null | string = null;

    if (userInfo.image) {
      imageUri = userInfo.image;
    } else if (currentUser?.imageURL) {
      imageUri = currentUser.imageURL;
    }

    if (imageUri) {
      return (
        <ImageBackground style={styles.imgBg} source={{ uri: imageUri }}>
          <View style={styles.overlay}>
            <TouchableOpacity
              style={styles.btnUploadImage}
              onPress={onImageChange}
            >
              <Feather name="edit-2" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </ImageBackground>
      );
    }
  };

  const pageLoaderElement = updating ? <PageLoader visible={updating} /> : null;

  return (
    <View style={styles.container}>
      {pageLoaderElement}
      <View style={styles.imageWrapper}>{renderImage()}</View>
      <TextInput
        label="Name"
        value={userInfo.name}
        onChangeText={(val) => handleChangeText('name', val)}
      />
      <TextInput
        label="Email"
        value={userInfo.email}
        onChangeText={(val) => handleChangeText('email', val)}
      />
      <View>
        <Button title="Update" onPress={updateProfile} disabled={updating} />
      </View>
    </View>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  imageWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  imgBg: {
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: 'hidden',
    resizeMode: 'center',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  btnUploadImage: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
