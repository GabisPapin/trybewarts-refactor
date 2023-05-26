import User from '@modules/users/typeorm/entities/User';
import UserRepository from '@modules/users/typeorm/repositories/UserRepository';
import {
  ICreate,
  IUserRepository,
} from '@modules/users/typeorm/repositories/UserRepositoryInterface';

export default class UserSessionService {
  private userRepository: IUserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  public async createSession({ email, password }: ICreate): Promise<User> {
    const createUser = await this.userRepository.create({ email, password });

    return createUser;
  }

  public async findAllUsers(): Promise<User[]> {
    const users = await this.userRepository.findAll();

    return users;
  }
}
