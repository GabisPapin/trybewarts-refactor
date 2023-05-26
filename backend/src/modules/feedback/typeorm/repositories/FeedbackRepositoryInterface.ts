import Feedback from '@modules/feedback/typeorm/entities/Feedback';

export interface ICreate {
  name: string;
  lastname: string;
  email: string;
  house: string;
  family: string;
  stack: string;
  score: string;
  comments: string;
}

export interface IFeedbackRepository {
  create({
    name,
    lastname,
    email,
    house,
    family,
    stack,
    score,
    comments,
  }: ICreate): Promise<Feedback>;
  findAll(): Promise<Feedback[]>;
  findById(id: string): Promise<Feedback | null>;
}
