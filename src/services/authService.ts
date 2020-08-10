import { User } from '@/types';
import apiClient from '@/utils/apiClient';
import catchError from '@/utils/catchError';

interface UserData {
  user: User;
  token: string;
}

interface UserPasswordData {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

interface UserFields {
  name: string;
  email: string;
  image: string | ArrayBuffer | null;
}

const getMe = async (): Promise<UserData> => {
  try {
    const { data } = await apiClient.get(`/auth/me`);
    const userData: UserData = {
      token: data.data.token,
      user: data.data.user,
    };
    return userData;
  } catch (error) {
    throw new Error(catchError(error));
  }
};

const verifyGoogleIdToken = async (idToken: string): Promise<UserData> => {
  try {
    const url = `/auth/google`;
    const { data } = await apiClient.post(url, { idToken });
    const userData: UserData = {
      user: data.data.user,
      token: data.data.token,
    };
    return userData;
  } catch (error) {
    return Promise.reject(error);
  }
};

const login = async (email: string, password: string): Promise<UserData> => {
  try {
    const url = `/auth/login`;
    const { data } = await apiClient.post(url, { email, password });
    const userData: UserData = {
      user: data.data.user,
      token: data.data.token,
    };

    return userData;
  } catch (error) {
    throw new Error(catchError(error));
  }
};

const signUp = async ({
  email,
  password,
  name,
}: {
  email: string;
  password: string;
  name: string;
}): Promise<UserData> => {
  try {
    const url = `/auth/signUp`;
    const { data } = await apiClient.post(url, { email, password, name });
    const userData: UserData = {
      user: data.data.user,
      token: data.data.token,
    };
    return userData;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const AuthService = {
  getMe,
  login,
  signUp,
  verifyGoogleIdToken,
};
