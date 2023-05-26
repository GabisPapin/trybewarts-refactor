import { feedbackVerify } from '@modules/feedback/middlewares/FeedbackVerify';
import Feedback from '@modules/feedback/typeorm/entities/Feedback';
import FeedbackRepository from '@modules/feedback/typeorm/repositories/FeedbackRepository';
import {
  ICreate,
  IFeedbackRepository,
} from '@modules/feedback/typeorm/repositories/FeedbackRepositoryInterface';

export default class CreateFeedbackService {
  private feedbackRepository: IFeedbackRepository;

  constructor() {
    this.feedbackRepository = new FeedbackRepository();
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
    feedbackVerify({
      name,
      lastname,
      email,
      house,
      family,
      stack,
      score,
      comments,
    });

    const feedback = await this.feedbackRepository.create({
      name,
      lastname,
      email,
      house,
      family,
      stack,
      score,
      comments,
    });

    return feedback;
  }
}
