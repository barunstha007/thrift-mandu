import { TypeOrmModuleOptions } from '@nestjs/typeorm';
// import { config } from 'dotenv';

// config();

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'mongodb',
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT, 10),
  username: process.env.POSTGRES_USER,
  password: String(process.env.POSTGRES_PASSWORD),
  database: process.env.POSTGRES_DATABASE,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  autoLoadEntities: true,
  synchronize: true, // Set to false in production
  logging: ['error'],
};
