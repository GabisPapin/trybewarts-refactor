import React from 'react';
import { type ITextArea } from 'interfaces/IFeedback';

const TextArea = (props: ITextArea): JSX.Element => {
  const { handleSaveComments, setValueCounter, valueCounter, setEventKey, eventKey } =
    props.ContextProps;

  const counterTextArea = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
    eventKey: string,
  ): void => {
    const valueArea = event.target.value;
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
    <div>
      <label htmlFor="comments">
        Deixe seu comentário
        <textarea
          id="comments"
          cols={30}
          rows={10}
          maxLength={500}
          onKeyDown={event => {
            setEventKey(event.key);
          }}
          onChange={event => {
            handleSaveComments(event);
            counterTextArea(event, eventKey);
          }}
        ></textarea>
      </label>
      <span>{valueCounter}</span>
    </div>
  );
};

export default TextArea;
