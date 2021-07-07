const ENV = {
  dev: {
    googleClientId:
      '421746734282-0ffu9dgc6sjaiooo9pqvis8c8llh4npq.apps.googleusercontent.com',
    apiUrl: 'https://dress-shop-api.vercel.app/api',
  },
  prod: {
    googleClientId:
      '421746734282-vvmkdjvmmk7p96nrdcead4i69hpbehhg.apps.googleusercontent.com',
    apiUrl: 'http://192.168.1.4:5000/api',
  },
};

const getEnvVars = () => {
  if (__DEV__) {
    return ENV.dev;
  } else {
    return ENV.prod;
  }
};

export default getEnvVars;
