const config = {
  env: process.env.NODE_ENV,

  // Server port
  port: process.env.PORT || 9000,

  // MongoDB connection options
  mongo: {
    uri: process.env.MONGO_URI,
  },

  userRoles: ["user", "admin", "lessor"],
  secrets: {
    session: process.env.SESSION_ID,
    secret1: process.env.PORTAL_API_SECRET1,
    secret2: process.env.PORTAL_API_SECRET2,
    apikey1: process.env.AUTH_API_KEY1,
    apikey2: process.env.AUTH_API_KEY2,
  },
};

export default config;
