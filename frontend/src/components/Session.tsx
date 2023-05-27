import { useAppDispatch } from 'redux/hooks';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormData } from 'interfaces/userInterfaces';


const schema = Yup.object({
	email: Yup.string().required(),
	password: Yup.string().min(8).required(),
}).required();

const Session = () => {
  const dispatch = useAppDispatch();
  const { handleSubmit, control, reset, formState: { errors }} = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<FormData> = async values => {
    const { email, password } = values;

    try {

    } catch (error) {

    }
  }


  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          render={({ field }) => <input type="email" {...field} />}
          name="email"
          control={control}
          defaultValue=""
        />
        <p>{errors.email?.message}</p>
        <Controller
          render={({ field }) => <input type="password" {...field} />}
          name="password"
          control={control}
          defaultValue=""
        />
        <p>{errors.password?.message}</p>
        <button type='submit'>Login</button>
      </form>
    </div>
  );
}

export default Session;
