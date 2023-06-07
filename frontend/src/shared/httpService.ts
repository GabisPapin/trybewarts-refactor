import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { IFormData } from 'interfaces/ISession';

const BASE_URL = process.env.REACT_APP_API_URL;

export const sessionApi = createApi({
  reducerPath: 'users',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: build => ({
    Session: build.mutation<{ email: string; password: string }, IFormData>({
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
