import { Router } from 'express';
import userRouter from '@modules/users/routes/UserRoutes';
import feedbackRouter from '@modules/feedback/routes/FeedbackRoutes';

const routes = Router();

routes.use('/users', userRouter);
routes.use('/feedback', feedbackRouter);

export default routes;
