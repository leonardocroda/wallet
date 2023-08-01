import { config } from 'dotenv';
config();

export const jwtConstants = {
  secret: process.env.JWT_SECRET,
};

export const databaseConstants = {
  host: process.env.HOST,
  port: parseInt(process.env.PORT),
  username: process.env.USERNAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
};

export const rabbitMQConstants = {
  url: process.env.RABBIT_MQ_URL,
};
