import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const contactsApi = createApi({
  reducerPath: 'contactsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://connections-api.herokuapp.com' }),
  tagTypes: ['Contact'],
  endpoints: (builder) => ({

    getAllContacts: builder.query({
      query: (token) => ({
        url: `/contacts`,
        method: 'GET',
        headers: {
          'authorization': `Bearer ${token}`
        },
      }),
      providesTags: ['Contact'],
    }),

    addContact: builder.mutation({
      query: ({token, newUser}) => ({
        url: `/contacts`,
        method: 'POST',
        body: newUser,
        headers: {
          'authorization': `Bearer ${token}`
        },
      }),
      invalidatesTags: ['Contact'],
    }),

    delContact: builder.mutation({
      query: ({token, id}) => ({
        url: `/contacts/${id}`,
        method: 'DELETE',
        headers: {
          'authorization': `Bearer ${token}`
        },
      }),
      invalidatesTags: ['Contact'],
    }),

    editContact: builder.mutation({
      query: ({token, editUser}) => ({
        url: `/contacts/${editUser.id}`,
        method: 'PATCH',
        body: {
          name: editUser.name,
          number: editUser.number
        },
        headers: {
          'authorization': `Bearer ${token}`
        },
      }),
      invalidatesTags: ['Contact'],
    }),
  }),
});

export const { useGetAllContactsQuery, useAddContactMutation,
  useDelContactMutation, useEditContactMutation } = contactsApi;