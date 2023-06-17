import { useForm } from 'react-hook-form';
import { useAppDispatch } from 'redux/hooks';
import { saveEmail } from 'redux/reducers/usersSlice';
import { useSessionMutation } from 'shared/httpService';
import { type IFormDataSession } from 'interfaces/ISession';
import { Avatar, Box, Button, Icon, TextField, useTheme } from '@mui/material';
import { useAppThemeContext } from 'contexts/ThemeContext';
import { green } from '@mui/material/colors';

const Session = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const [session] = useSessionMutation();
  const theme = useTheme();
  const { toggleTheme, themeName } = useAppThemeContext();

  const { register, handleSubmit, reset } = useForm<IFormDataSession>();

  const onSubmit = async ({ email, password }: IFormDataSession): Promise<void> => {
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
    <Box
      component="header"
      display="flex"
      alignItems="center"
      bgcolor={theme.palette.background.paper}
      height={theme.spacing(7)}
    >
      <Box display="flex" marginLeft={theme.spacing(1)}>
        <Avatar sx={{ bgcolor: green[500], fontFamily: 'fantasy', fontWeight: 'bold' }}>T</Avatar>
      </Box>
      <Box
        gap={2}
        component="form"
        display="flex"
        marginLeft={theme.spacing(80)}
        onSubmit={handleSubmit(onSubmit)}
      >
        <TextField
          variant="outlined"
          size="small"
          sx={{ width: theme.spacing(25) }}
          type="email"
          {...register('email')}
          placeholder="email"
        />

        <TextField
          variant="outlined"
          size="small"
          sx={{ width: theme.spacing(25) }}
          type="password"
          {...register('password')}
          placeholder="senha"
        />

        <Button color="primary" disableElevation variant="contained" type="submit">
          Entrar
        </Button>

        <Button onClick={toggleTheme}>
          {themeName === 'light' ? <Icon>dark_mode</Icon> : <Icon>light_mode</Icon>}
        </Button>
      </Box>
    </Box>
  );
};

export default Session;
