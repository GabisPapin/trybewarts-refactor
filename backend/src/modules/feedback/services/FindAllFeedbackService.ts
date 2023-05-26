import Feedback from '@modules/feedback/typeorm/entities/Feedback';
import FeedbackRepository from '@modules/feedback/typeorm/repositories/FeedbackRepository';
import { IFeedbackRepository } from '@modules/feedback/typeorm/repositories/FeedbackRepositoryInterface';

export default class FindAllFeedbackService {
  private feedbackRepository: IFeedbackRepository;

  constructor() {
    this.feedbackRepository = new FeedbackRepository();
  }

  public async findAll(): Promise<Feedback[]> {
    const feedbackList = await this.feedbackRepository.findAll();

    return feedbackList;
  }
}
