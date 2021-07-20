import getEnvVars from '../../environment';

const env = getEnvVars();

export const IS_PROD = !__DEV__;
export const API_URL = env.apiUrl;

export const PAGE_LIMIT = 12;
export const PAGE = 1;

export const GOOGLE_ANDROID_STANDALONE_CLIENT_ID =
  '421746734282-vvmkdjvmmk7p96nrdcead4i69hpbehhg.apps.googleusercontent.com';
export const GOOGLE_ANDROID_CLIENT_ID =
  '421746734282-0ffu9dgc6sjaiooo9pqvis8c8llh4npq.apps.googleusercontent.com';
