import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import type { IFormData } from 'interfaces/IFeedback';
import { dataStack, dataScore, dataFamily, dataHouse } from 'components/feedback/DataSend';
import { useFeedbackMutation } from 'shared/httpService';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { saveComments } from 'redux/reducers/feedbackSlice';
import TextArea from 'components/feedback/Textarea';

const MAX_LENGTH_TEXT_AREA = 500;

const schema = yup
  .object({
    name: yup.string().required(),
    lastname: yup.string().required(),
    email: yup.string().email().required(),
    house: yup.string().required(),
    family: yup.string().required(),
    stack: yup.array(yup.string()).required(),
    score: yup.string().required(),
    comments: yup.string().max(MAX_LENGTH_TEXT_AREA),
  })
  .required();

const Feedback = (): JSX.Element => {
  const [isDisabled, setDisabled] = useState<boolean>(true);
  const [valueCounter, setValueCounter] = useState<number>(MAX_LENGTH_TEXT_AREA);
  const [eventKey, setEventKey] = useState<string>('');
  const dispatch = useAppDispatch();
  // criei um selector porque o médoto onChange para o comments (tag textarea) já está sendo usado no counterTextArea.
  const selector = useAppSelector(state => state.feedbacks);
  const [feedback] = useFeedbackMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormData>({
    resolver: yupResolver(schema),
  });

  const handleSaveComments = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
    dispatch(saveComments(event.target.value));
  };

  const ContextProps = {
    handleSaveComments,
    setValueCounter,
    valueCounter,
    setEventKey,
    eventKey,
  };

  const onSubmit = async (data: IFormData): Promise<void> => {
    const { name, lastname, email, house, family, score, comments } = data;
    const stack = data.stack[0];

    try {
      await feedback({
        name,
        lastname,
        email,
        house,
        family,
        stack,
        score,
        comments: selector.comments,
      }).unwrap();
      reset();
    } catch (error) {
      console.error();
      reset();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Formulário de Avaliação</h2>
      <label htmlFor="firstname">
        Nome
        <input id="firstname" type="text" {...register('name')} />
      </label>
      <span>{errors.name?.message}</span>
      <label htmlFor="lastname">
        Sobrenome
        <input id="lastname" type="text" {...register('lastname')} />
      </label>
      <span>{errors.lastname?.message}</span>
      <label htmlFor="email">
        Email
        <input id="email" type="text" {...register('email')} />
      </label>
      <span>{errors.email?.message}</span>
      <label htmlFor="house">
        Casa
        <select id="house" {...register('house')}>
          <option value="Selecionar...">Selecionar...</option>
          {dataHouse.map((el, index) => (
            <option key={index} value={el.value}>
              {el.value}
            </option>
          ))}
        </select>
      </label>
      <span>{errors.house?.message}</span>
      <div>
        Qual é a sua família?
        {dataFamily.map(el => (
          <div key={el.label}>
            <input id="family" type="radio" value={el.value} {...register('family')} />
            <label htmlFor="family">{el.label}</label>
          </div>
        ))}
      </div>
      <span>{errors.family?.message}</span>
      <div>
        Qual conteúdo você está com mais vontade de aprender?
        {dataStack.map(el => (
          <div key={el.label}>
            <input id="stack" type="checkbox" value={el.value} {...register('stack')} />
            <label htmlFor="stack">{el.label}</label>
          </div>
        ))}
        <span>{errors.stack?.message}</span>
      </div>
      <div>Como você avalia a Trybewarts?</div>
      {dataScore.map(el => (
        <div key={el.label}>
          <input id="score" type="radio" value={el.value} {...register('score')} />
          <label htmlFor="score">{el.label}</label>
        </div>
      ))}
      <span>{errors.score?.message}</span>
      <TextArea ContextProps={ContextProps} />
      <span>{errors.comments?.message}</span>
      <input
        id="agreement"
        type="checkbox"
        onChange={() => {
          setDisabled(false);
        }}
      />
      <label htmlFor="agreement">Você concorda com o uso das informações acima?</label>
      <input type="submit" disabled={isDisabled} />
    </form>
  );
};

export default Feedback;
