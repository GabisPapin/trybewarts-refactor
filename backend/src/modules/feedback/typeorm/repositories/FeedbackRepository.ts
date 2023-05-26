import { Repository } from 'typeorm';
import Feedback from '@modules/feedback/typeorm/entities/Feedback';
import { dataSource } from '@shared/http/typeorm';
import { ICreate } from '@modules/feedback/typeorm/repositories/FeedbackRepositoryInterface';

export default class FeedbackRepository {
  private feedbackRepository: Repository<Feedback>;

  constructor() {
    this.feedbackRepository = dataSource.getRepository(Feedback);
  }

  public async create({
    name,
    lastname,
    email,
    house,
    family,
    stack,
    score,
    comments,
  }: ICreate): Promise<Feedback> {
    const feedback = this.feedbackRepository.create({
      name,
      lastname,
      email,
      house,
      family,
      stack,
      score,
      comments,
    });

    await this.feedbackRepository.save(feedback);

    return feedback;
  }

  public async findAll(): Promise<Feedback[]> {
    const feedbackList = await this.feedbackRepository.find();

    return feedbackList;
  }

  public async findById(id: string): Promise<Feedback | null> {
    const feedback = await this.feedbackRepository.findOneBy({ id });

    return feedback;
  }
}
