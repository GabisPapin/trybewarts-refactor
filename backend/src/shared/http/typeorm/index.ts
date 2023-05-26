import 'dotenv/config';
import { DataSource } from 'typeorm';
import { CreateUser1684975571235 } from '../typeorm/migrations/1684980095278-create-user';
import { CreateFeedback1684976501968 } from '../typeorm/migrations/1684976501968-create-feedback';
import User from '../../../modules/users/typeorm/entities/User';
import Feedback from '../../../modules/feedback/typeorm/entities/Feedback';

export const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: 5432,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASS,
  database: process.env.POSTGRES_DB,
  entities: [User, Feedback],
  migrations: [CreateUser1684975571235, CreateFeedback1684976501968],
});
