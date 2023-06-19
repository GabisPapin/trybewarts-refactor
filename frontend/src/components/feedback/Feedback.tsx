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
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  MenuItem,
  Radio,
  RadioGroup,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import ImageLogo from 'components/ImageLogo';

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
  const theme = useTheme();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormData>({
    resolver: yupResolver(schema),
  });

  const handleSaveComments = (event: string): void => {
    dispatch(saveComments(event));
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
    <Box gap={10} display="flex" flexDirection="row">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        marginLeft={theme.spacing(10)}
        marginY={theme.spacing(5)}
        width="50%"
        bgcolor={theme.palette.background.default}
        component="form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Box display="flex" margin={theme.spacing(2)}>
          <Typography variant="h5" sx={{ alignSelf: 'center' }}>
            Formulário de Avaliação
          </Typography>
        </Box>
        <Box gap={2} display="flex" flexDirection="row" alignContent="space-between" marginY="10px">
          <TextField
            id="outlined-error-helper-text outlined-textarea"
            label={<Typography sx={{ fontSize: 14 }}>Nome</Typography>}
            size="small"
            helperText={
              <Typography sx={{ color: 'red', fontSize: 12 }}>{errors.name?.message}</Typography>
            }
            type="text"
            {...register('name')}
          />
          <TextField
            id="outlined-error-helper-text outlined-textarea"
            label={<Typography sx={{ fontSize: 14 }}>Sobrenome</Typography>}
            size="small"
            helperText={
              <Typography sx={{ color: 'red', fontSize: 12 }}>
                {errors.lastname?.message}
              </Typography>
            }
            type="text"
            {...register('lastname')}
          />
        </Box>
        <Box gap={4} display="flex" flexDirection="row" marginY="5px">
          <Box display="flex" marginRight={theme.spacing(12)}>
            <TextField
              id="outlined-textarea"
              label={<Typography sx={{ fontSize: 14 }}>Email</Typography>}
              size="small"
              helperText={
                <Typography sx={{ color: 'red', fontSize: 12 }}>{errors.email?.message}</Typography>
              }
              type="email"
              {...register('email')}
            />
          </Box>
          <Box display="flex">
            <TextField
              variant="outlined"
              select
              size="small"
              label={<Typography sx={{ fontSize: 14 }}>Casa</Typography>}
              defaultValue="Selecionar"
              helperText={
                <Typography sx={{ color: 'red', fontSize: 12 }}>{errors.house?.message}</Typography>
              }
              {...register('house')}
            >
              <MenuItem value="Selecionar">
                <Typography>Selecionar</Typography>
              </MenuItem>
              {dataHouse.map((option, index) => (
                <MenuItem key={index} value={option.value}>
                  <Typography>{option.value}</Typography>
                </MenuItem>
              ))}
            </TextField>
          </Box>
        </Box>
        <Divider />
        <Box>
          <Typography sx={{ fontSize: 16, margin: '10px' }}>Qual é a sua família?</Typography>
        </Box>
        <Box
          display="flex"
          flexDirection="row"
          alignItems="center"
          width="65%"
          marginY={theme.spacing(1)}
        >
          {dataFamily.map(el => (
            <Box display="flex" flexDirection="row" key={el.label}>
              <FormControl>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  name="radio-buttons-group"
                >
                  <FormControlLabel
                    value="frontend"
                    control={
                      <Radio
                        size="small"
                        sx={{ '& .MuiSvgIcon-root': { fontSize: 14 } }}
                        value={el.value}
                        aria-label={el.label}
                        {...register('family')}
                      />
                    }
                    label={<Typography>{el.label}</Typography>}
                  />
                </RadioGroup>
              </FormControl>
            </Box>
          ))}
          <Typography sx={{ fontSize: 12, color: 'red' }}>{errors.family?.message}</Typography>
        </Box>
        <Box width="70%">
          <Typography>Qual conteúdo você está com mais vontade de aprender?</Typography>
          {dataStack.map(el => (
            <Box sx={{ marginLeft: '10px' }} key={el.label}>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      sx={{ '& .MuiSvgIcon-root': { fontSize: 14 } }}
                      value={el.value}
                      {...register('stack')}
                    />
                  }
                  label={<Typography>{el.label}</Typography>}
                />
              </FormGroup>
            </Box>
          ))}
          <Typography sx={{ fontSize: 12, color: 'red' }}>{errors.stack?.message}</Typography>
        </Box>
        <Box>
          <Typography sx={{ fontSize: 16 }}>Como você avalia a Trybewarts?</Typography>
        </Box>
        <Box display="flex" flexDirection="row" margin={theme.spacing(2)}>
          {dataScore.map(el => (
            <Box key={el.label}>
              <FormControl>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  name="radio-buttons-group"
                >
                  <FormControlLabel
                    control={
                      <Radio
                        size="small"
                        sx={{ '& .MuiSvgIcon-root': { fontSize: 14 } }}
                        value={el.value}
                        aria-label={el.label}
                        {...register('score')}
                      />
                    }
                    label={<Typography>{el.label}</Typography>}
                  />
                </RadioGroup>
              </FormControl>
            </Box>
          ))}
          <Typography sx={{ fontSize: 12, color: 'red' }}>{errors.score?.message}</Typography>
        </Box>
        <Box>
          <TextArea ContextProps={ContextProps} />
          <Typography sx={{ fontSize: 12, color: 'red' }}>{errors.comments?.message}</Typography>
        </Box>
        <Box sx={{ marginLeft: '10px' }}>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  sx={{ '& .MuiSvgIcon-root': { fontSize: 14 } }}
                  onChange={() => {
                    setDisabled(false);
                  }}
                />
              }
              label={
                <Typography sx={{ fontSize: 14 }}>
                  Você concorda com o uso das informações acima?
                </Typography>
              }
            />
          </FormGroup>
        </Box>
        <Box margin={theme.spacing(4)}>
          <Button color="primary" disabled={isDisabled} variant="contained" type="submit">
            <Typography variant="button" sx={{ fontFamily: 'fantasy' }}>
              Enviar
            </Typography>
          </Button>
        </Box>
      </Box>
      <Box marginTop={theme.spacing(20)}>
        <ImageLogo />
      </Box>
    </Box>
  );
};

export default Feedback;
