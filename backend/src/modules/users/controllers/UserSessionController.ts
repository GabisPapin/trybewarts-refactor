import { Request, Response } from 'express';
import UserSessionService from '@modules/users/services/UserSessionService';
import { sessionVerify } from '@modules/users/middlewares/UserSessionVerify';
import FindUserService from '@modules/users/services/FindUserService';

export default class UserSessionController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    sessionVerify({ email, password });

    const userSession = new UserSessionService();

    const user = await userSession.createSession({
      email,
      password,
    });

    return res.status(201).json({ user });
  }

  public async list(req: Request, res: Response): Promise<Response> {
    const findUser = new FindUserService();

    const listUser = await findUser.findAllUsers();

    return res.status(200).json({ listUser });
  }
}
