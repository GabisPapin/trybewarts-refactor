import User from '@modules/users/typeorm/entities/User';
import UserRepository from '@modules/users/typeorm/repositories/UserRepository';
import { IUserRepository } from '@modules/users/typeorm/repositories/UserRepositoryInterface';

export default class FindUserService {
  private userRepository: IUserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  public async findAllUsers(): Promise<User[]> {
    const users = await this.userRepository.findAll();

    return users;
  }
}
