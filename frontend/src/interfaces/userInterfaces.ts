export interface IUserSliceState {
  email: string;
}

export interface FormData {
  email: string;
  password: string;
}

export interface IResponseSession {
  email: string;
  token: string;
  created_at: Date;
  updated_at: Date;
}
