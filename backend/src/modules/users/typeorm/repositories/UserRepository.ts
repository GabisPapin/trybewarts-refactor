import { Repository } from 'typeorm';
import { dataSource } from '@shared/http/typeorm';
import User from '@modules/users/typeorm/entities/User';
import { ICreate } from '@modules/users/typeorm/repositories/UserRepositoryInterface';
import { tokenSignature } from '@config/auth';
import { hash } from 'bcryptjs';

const hashNumberEight = 8;

export default class UserRepository {
  private userRepository: Repository<User>;

  constructor() {
    this.userRepository = dataSource.getRepository(User);
  }

  public async create({ email, password }: ICreate): Promise<User> {
    const passHashed = await hash(password, hashNumberEight);
    const token = await tokenSignature(passHashed);

    const user = this.userRepository.create({
      email,
      password: token,
    });

    await this.userRepository.save(user);

    return user;
  }

  public async findAll(): Promise<User[]> {
    const users = await this.userRepository.find({
      select: {
        id: true,
        email: true,
        token: true,
        created_at: true,
        updated_at: true,
      },
    });

    return users;
  }
}
