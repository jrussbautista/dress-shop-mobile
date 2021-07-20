const ENV = {
  dev: {
    apiUrl: 'http://192.168.1.11:5000/api',
  },
  prod: {
    apiUrl: 'https://dress-shop-api.vercel.app/api',
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
