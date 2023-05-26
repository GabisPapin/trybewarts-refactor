import User from '@modules/users/typeorm/entities/User';

export interface ICreate {
  email: string;
  password: string;
}

export interface IUserRepository {
  create({ email, password }: ICreate): Promise<User>;
  findAll(): Promise<User[]>;
}
