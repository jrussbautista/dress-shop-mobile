import apiClient from './apiClient';

export const setAuthHeaderToken = (token: string): void => {
  if (token) {
    apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }
};

export const removeAuthHeaderToken = () => {
  apiClient.defaults.headers.common['Authorization'] = null;
};
