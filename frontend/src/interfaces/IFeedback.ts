export interface IFormData {
  name: string;
  lastname: string;
  email: string;
  house: string;
  family: string;
  stack: string;
  score: string;
  comments: string;
}

export interface ITextArea {
  ContextProps: {
    handleSaveComments: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    setValueCounter: (maxLengthTextArea: number) => void;
    valueCounter: number;
    setEventKey: (event: string) => void;
    eventKey: string;
  };
}
