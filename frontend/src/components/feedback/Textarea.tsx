import { type ITextArea } from 'interfaces/IFeedback';
import { Box, Typography } from '@mui/material';
import { TextareaAutosize } from '@mui/base';

const TextArea = (props: ITextArea): JSX.Element => {
  const { handleSaveComments, setValueCounter, valueCounter, setEventKey, eventKey } =
    props.ContextProps;

  const counterTextArea = (event: string, eventKey: string): void => {
    const valueArea = event;
    const counter = 500;

    if (eventKey === 'Backspace') {
      setValueCounter(valueCounter + 1);
    } else if (counter < 0) {
      setValueCounter(500);
    } else {
      if (eventKey !== 'Backspace') {
        setValueCounter(counter - valueArea.length);
      } else if (counter - valueArea.length < 500) {
        setValueCounter(counter - valueArea.length);
      }
    }
  };

  return (
    <Box>
      <Typography sx={{ fontSize: 16, marginBottom: '2px', marginLeft: '2px' }}>
        Deixe seu comentário
      </Typography>
      <TextareaAutosize
        minRows={6}
        maxRows={500}
        maxLength={500}
        onKeyDown={event => {
          setEventKey(event.key);
        }}
        onChange={event => {
          handleSaveComments(event.target.value);
          counterTextArea(event.target.value, eventKey);
        }}
      ></TextareaAutosize>
      <Typography sx={{ fontSize: 14, marginLeft: '2px' }}>{valueCounter}</Typography>
    </Box>
  );
};

export default TextArea;
