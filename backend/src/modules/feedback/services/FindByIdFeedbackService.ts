import Feedback from '@modules/feedback/typeorm/entities/Feedback';
import FeedbackRepository from '@modules/feedback/typeorm/repositories/FeedbackRepository';
import { IFeedbackRepository } from '@modules/feedback/typeorm/repositories/FeedbackRepositoryInterface';

export default class FindByIdFeedbackService {
  private feedbackRepository: IFeedbackRepository;

  constructor() {
    this.feedbackRepository = new FeedbackRepository();
  }

  public async findById(id: string): Promise<Feedback | null> {
    const feedback = await this.feedbackRepository.findById(id);

    return feedback;
  }
}
