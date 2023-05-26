import { ICreate } from '@modules/users/typeorm/repositories/UserRepositoryInterface';
import AppError from '@shared/errors/AppError';
import * as Joi from 'joi';

export function sessionVerify({ email, password }: ICreate): void {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(16).required(),
  });

  const { value, error } = schema.validate({ email, password });

  if (error) {
    throw new AppError(error.message, 400);
  }
}
