import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { type IFormData } from 'interfaces/IFeedback';
import type { IFormDataSession } from 'interfaces/ISession';

const BASE_URL = process.env.REACT_APP_API_URL;

export const sessionApi = createApi({
  reducerPath: 'users',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: build => ({
    Session: build.mutation<{ email: string; password: string }, IFormDataSession>({
      query: body => ({
        url: 'users',
        method: 'post',
        body,
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }),
    }),
  }),
});

export const { useSessionMutation } = sessionApi;

export const feedbackApi = createApi({
  reducerPath: 'feedback',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: build => ({
    Feedback: build.mutation<
      {
        firstname: string;
        lastname: string;
        email: string;
        house: string;
        family: string;
        stack: string;
        score: string;
        comments: string;
      },
      IFormData
    >({
      query: body => ({
        url: 'feedback',
        method: 'post',
        body,
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }),
    }),
  }),
});

export const { useFeedbackMutation } = feedbackApi;
