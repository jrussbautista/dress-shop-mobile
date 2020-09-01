import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import navigationNames from '@/navigation/navigationNames';
import { useNavigation } from '@react-navigation/native';
import { Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { PageLoader, Button, MyTextInput } from '@/components';
import { colors } from '@/theme';
import { AuthService } from '@/services';
import { useAuth, useToast } from '@/store';
import { AuthLink, AuthSocial } from './components';

export const SignUpScreen = () => {
  const navigation = useNavigation();
  const { login } = useAuth();
  const { showToast } = useToast();

  const [submitting, setSubmitting] = useState(false);

  const handleSignUp = async ({
    email,
    password,
    name,
  }: {
    email: string;
    password: string;
    name: string;
  }) => {
    try {
      setSubmitting(true);
      const { user, token } = await AuthService.signUp({
        email,
        password,
        name,
      });
      await login(user, token);
      navigation.navigate(navigationNames.profileTab);
    } catch (error) {
      showToast('error', error.message);
    } finally {
      setSubmitting(false);
    }
  };

  const LoginSchema = Yup.object().shape({
    name: Yup.string()
      .min(6, 'Name is too Short!')
      .required('Name is Required'),
    password: Yup.string()
      .min(6, 'Password is too Short!')
      .required('Password is Required'),
    email: Yup.string().email('Invalid email').required('Email is Required'),
  });

  return (
    <View style={styles.container}>
      <PageLoader visible={submitting} />
      <Formik
        validationSchema={LoginSchema}
        initialValues={{ name: '', email: '', password: '' }}
        onSubmit={async (values) => handleSignUp(values)}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <>
            <View style={styles.group}>
              <MyTextInput
                label="Name"
                style={styles.input}
                onChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
                value={values.name}
              />
              <ErrorMessage name="name">
                {(msg) => (
                  <View style={styles.errorContainer}>
                    <Text style={styles.error}>{msg}</Text>
                  </View>
                )}
              </ErrorMessage>
            </View>
            <View style={styles.group}>
              <MyTextInput
                label="Email"
                style={styles.input}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
              />
              <ErrorMessage name="email">
                {(msg) => (
                  <View style={styles.errorContainer}>
                    <Text style={styles.error}>{msg}</Text>
                  </View>
                )}
              </ErrorMessage>
            </View>
            <View style={styles.group}>
              <MyTextInput
                label="Password"
                style={styles.input}
                secureTextEntry={true}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
              />
              <ErrorMessage name="password">
                {(msg) => (
                  <View style={styles.errorContainer}>
                    <Text style={styles.error}>{msg}</Text>
                  </View>
                )}
              </ErrorMessage>
            </View>
            <View style={styles.group}>
              <Button title="Log In" onPress={handleSubmit} />
            </View>
          </>
        )}
      </Formik>
      <AuthLink type="signUp" />
      <AuthSocial />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  pageTitle: {
    fontSize: 20,
  },
  group: {
    marginVertical: 10,
  },
  input: {
    height: 45,
    borderColor: colors.dark,
    borderBottomWidth: 1,
  },
  errorContainer: {
    paddingTop: 5,
  },
  error: {
    color: colors.danger,
    fontSize: 12,
  },
});
