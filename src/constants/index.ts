export const IS_PROD = !__DEV__;
export const API_URL = IS_PROD
  ? 'https://dress-shop-api.vercel.app/api'
  : 'http://192.168.1.3:5000/api';
