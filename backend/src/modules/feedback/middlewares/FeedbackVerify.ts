import { ICreate } from '@modules/feedback/typeorm/repositories/FeedbackRepositoryInterface';
import AppError from '@shared/errors/AppError';
import * as Joi from 'joi';

export function feedbackVerify({
  name,
  lastname,
  email,
  house,
  family,
  stack,
  score,
  comments,
}: ICreate): void {
  const schema = Joi.object({
    name: Joi.string(),
    lastname: Joi.string(),
    email: Joi.string().email(),
    house: Joi.string(),
    family: Joi.string(),
    stack: Joi.string(),
    score: Joi.string(),
    comments: Joi.string(),
  }).required();

  const { value, error } = schema.validate({
    name,
    lastname,
    email,
    house,
    family,
    stack,
    score,
    comments,
  });

  if (error) {
    throw new AppError(error.message, 400);
  }
}
