import { Router } from 'express';
import FeedbackController from '@modules/feedback/controllers/FeedbackController';

const feedbackRouter = Router();
const feedbackController = new FeedbackController();

feedbackRouter.post('/', feedbackController.create);
feedbackRouter.get('/', feedbackController.findAll);
feedbackRouter.get('/:id', feedbackController.findById);

export default feedbackRouter;
