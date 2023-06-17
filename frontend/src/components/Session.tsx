import { useForm } from 'react-hook-form';
import { useAppDispatch } from 'redux/hooks';
import { saveEmail } from 'redux/reducers/usersSlice';
import { useSessionMutation } from 'shared/httpService';
import { type IFormDataSession } from 'interfaces/ISession';
import { Avatar, Box, Button, Icon, TextField, Typography, useTheme } from '@mui/material';
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
      <Box display="flex" marginLeft={theme.spacing(5)}>
        <Avatar
          variant="circular"
          sx={{
            bgcolor: themeName === 'light' ? green[500] : theme.palette.background.default,
          }}
        >
          <Typography variant="h5" sx={{ fontFamily: 'fantasy', fontWeight: 'bold' }}>
            T
          </Typography>
        </Avatar>
      </Box>

      <Box display="flex" marginLeft={theme.spacing(25)}>
        <Typography
          variant="h4"
          sx={{
            color: themeName === 'light' ? green[500] : theme.typography.fontFamily,
            fontWeight: 'bold',
          }}
        >
          Trybewarts
        </Typography>
      </Box>

      <Box
        gap={2}
        component="form"
        display="flex"
        flexDirection="row"
        marginLeft={theme.spacing(25)}
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
          <Typography variant="button" sx={{ fontFamily: 'fantasy' }}>
            Entrar
          </Typography>
        </Button>

        <Button onClick={toggleTheme}>
          {themeName === 'light' ? <Icon>dark_mode</Icon> : <Icon>light_mode</Icon>}
        </Button>
      </Box>
    </Box>
  );
};

export default Session;
