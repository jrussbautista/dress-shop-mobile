const ENV = {
  dev: {
    googleAndroidDevClientId:
      '421746734282-0ffu9dgc6sjaiooo9pqvis8c8llh4npq.apps.googleusercontent.com',
  },
  prod: {
    googleAndroidDevClientId: '',
    // Add other keys you want here
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
