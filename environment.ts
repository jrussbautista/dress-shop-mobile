const ENV = {
  dev: {
    googleAndroidDevClientId:
      '421746734282-0ffu9dgc6sjaiooo9pqvis8c8llh4npq.apps.googleusercontent.com',
  },
  prod: {
    googleAndroidDevClientId:
      '421746734282-vvmkdjvmmk7p96nrdcead4i69hpbehhg.apps.googleusercontent.com',
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
