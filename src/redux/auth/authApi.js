import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://connections-api.herokuapp.com' }),
  tagTypes: ['user'],
  endpoints: (builder) => ({

    getCurrentUser: builder.query({
      query: (token) => ({
        url: `/users/current`,
        method: 'GET',
        headers: {
          'authorization': `Bearer ${token}`
        },
      }),
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

    logout: builder.mutation({
      query: (token) => ({
        url: `/users/logout`,
        method: 'POST',
        headers: {
          'authorization': `Bearer ${token}`
        },
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

export const { useGetCurrentUserQuery, useSignUpMutation,
  useLoginMutation, useLogoutMutation, } = authApi;