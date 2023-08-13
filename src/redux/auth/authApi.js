import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://connections-api.herokuapp.com' }),
  tagTypes: ['User'],
  endpoints: (builder) => ({
    getCurrentUser: builder.query({
      query: () => `/users/current`,
      providesTags: ['User'],
    }),

    signUp: builder.mutation({
      query: (newUser) => ({
        url: `/users/signup`,
        method: 'POST',
        body: newUser,
      }),
      invalidatesTags: ['User'],
    }),
    login: builder.mutation({
      query: (currentUser) => ({
        url: `/users/login`,
        method: 'POST',
        body: currentUser,
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

export const { useGetCurrentUserQuery, useSignUpMutation, useLoginMutation } = authApi;