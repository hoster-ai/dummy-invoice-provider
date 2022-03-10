import { registerAs } from '@nestjs/config';

export default registerAs('mongodb', () => ({
  uri: process.env.MONGO_URL,
  db: process.env.MONGO_NAME,
  username: process.env.MONGO_USERNAME,
  password: process.env.MONGO_PASSWORD,
}));
