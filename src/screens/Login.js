import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity
} from 'react-native';
import { Formik, ErrorMessage } from 'formik';
import colors from '../utils/colors';
import { useAuth } from '../store';
import { PageLoader } from '../components/Shared/Loader';
import { useNavigation } from '@react-navigation/native';
import * as Yup from 'yup';

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

  const LoginSchema = Yup.object().shape({
    password: Yup.string()
      .min(6, 'Password is too Short!')
      .required('Password is Required'),
    email: Yup.string()
      .email('Invalid email')
      .required('Email is Required')
  });

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
        validationSchema={LoginSchema}
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
              <ErrorMessage name="email">
                {msg => (
                  <View style={styles.errorContainer}>
                    <Text style={styles.error}>{msg}</Text>
                  </View>
                )}
              </ErrorMessage>
            </View>
            <View style={styles.group}>
              <TextInput
                style={styles.input}
                secureTextEntry={true}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
              />
              <ErrorMessage name="password">
                {msg => (
                  <View style={styles.errorContainer}>
                    <Text style={styles.error}>{msg}</Text>
                  </View>
                )}
              </ErrorMessage>
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
  },
  errorContainer: {
    paddingTop: 5
  },
  error: {
    color: 'red',
    fontSize: 15
  }
});
