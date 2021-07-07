import getEnvVars from '../../environment';

const env = getEnvVars();

export const IS_PROD = !__DEV__;
export const API_URL = env.apiUrl;

export const PAGE_LIMIT = 12;
export const PAGE = 1;

export const GOOGLE_ANDROID_CLIENT_ID = env.googleClientId;
