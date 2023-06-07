import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAppDispatch } from 'redux/hooks';
import { saveEmail } from 'redux/reducers/usersSlice';
import { useSessionMutation } from 'shared/httpService';
import { type IFormData } from 'interfaces/ISession';

const schema = yup
  .object({
    email: yup.string().email().required(),
    password: yup.string().min(8).max(16).required(),
  })
  .required();

const Session = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const [session] = useSessionMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async ({ email, password }: IFormData): Promise<void> => {
    try {
      await session({ email, password }).unwrap();
      dispatch(saveEmail(email));
      reset();
    } catch (error) {
      console.error(error);
      reset();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="email" {...register('email')} placeholder="Email" />
      <span>{errors.email?.message}</span>

      <input type="password" {...register('password')} placeholder="Senha" />
      <span>{errors.password?.message}</span>

      <input type="submit" />
    </form>
  );
};

export default Session;
