export const IS_PROD = !__DEV__;
export const API_URL = IS_PROD
  ? 'https://dress-shop-api.vercel.app/api'
  : 'http://192.168.1.10:5000/api';

export const PAGE_LIMIT = 12;
export const PAGE = 1;
