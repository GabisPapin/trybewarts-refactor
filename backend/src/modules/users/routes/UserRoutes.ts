import { Router } from 'express';
import UserSessionController from '@modules/users/controllers/UserSessionController';

const userRouter = Router();
const userSessionController = new UserSessionController();

userRouter.post('/', userSessionController.create);
userRouter.get('/', userSessionController.list);

export default userRouter;
