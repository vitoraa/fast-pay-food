export const environment = {
  jwt_key: process.env.JWT_KEY || 'asdf',
  node_env: process.env.NODE_ENV || 'development',
  mongo_uri: process.env.MONGO_URI || 'mongodb://places-mongo-srv:27017/places',
};
