import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity
} from 'react-native';
import { Formik } from 'formik';
import colors from '../utils/colors';
import { useAuth } from '../store';
import { PageLoader } from '../components/Shared/Loader';
import { useNavigation } from '@react-navigation/native';

const Login = () => {
  const navigation = useNavigation();
  const { login, error, clearError } = useAuth();
  const [submit, setSubmit] = useState(false);

  useEffect(() => {
    return () => clearError();
  }, []);

  const handleLogin = async values => {
    try {
      setSubmit(true);
      await login(values);
      navigation.navigate('Home');
    } catch (error) {
      console.log(error);
    } finally {
      setSubmit(false);
    }
  };

  return (
    <View style={styles.container}>
      {submit && <PageLoader />}
      <Text style={styles.pageTitle}>Login to your account </Text>
      {error && (
        <View style={styles.alert}>
          <Text style={styles.alertText}>{error}</Text>
        </View>
      )}
      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={async values => handleLogin(values)}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <>
            <View style={styles.group}>
              <TextInput
                style={styles.input}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
              />
            </View>
            <View style={styles.group}>
              <TextInput
                style={styles.input}
                secureTextEntry={true}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
              />
            </View>
            <View style={styles.group}>
              <TouchableOpacity style={styles.btn} onPress={handleSubmit}>
                <Text style={styles.btnText}>Login</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </Formik>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    padding: 20
  },
  pageTitle: {
    fontSize: 20
  },
  group: {
    marginVertical: 10
  },
  input: {
    height: 50,
    borderColor: colors.dark,
    borderBottomWidth: 1
  },
  btn: {
    backgroundColor: colors.dark,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  btnText: {
    fontSize: 20,
    color: '#fff'
  },
  alert: {
    paddingVertical: 15
  },
  alertText: {
    color: 'red',
    fontSize: 18
  }
});
