import { Request, Response } from 'express';
import CreateFeedbackService from '@modules/feedback/services/CreateFeedbackService';
import FindAllFeedbackService from '@modules/feedback/services/FindAllFeedbackService';
import FindByIdFeedbackService from '@modules/feedback/services/FindByIdFeedbackService';

export default class FeedbackController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { name, lastname, email, house, family, stack, score, comments } =
      req.body;

    const createFeedback = new CreateFeedbackService();

    const feedback = await createFeedback.create({
      name,
      lastname,
      email,
      house,
      family,
      stack,
      score,
      comments,
    });

    return res.status(201).json({ feedback });
  }

  public async findAll(req: Request, res: Response): Promise<Response> {
    const findAllFeedback = new FindAllFeedbackService();

    const feedbackList = await findAllFeedback.findAll();

    return res.status(200).json({ feedbackList });
  }

  public async findById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const findByIdFeedback = new FindByIdFeedbackService();

    const feedback = await findByIdFeedback.findById(id);

    return res.status(200).json({ feedback });
  }
}
