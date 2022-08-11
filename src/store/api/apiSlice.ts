import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (builder) => ({
    getPosts: builder.query<Promise<any>, void>({
      query: () => '/post',
      transformResponse: (response: any) => {
        return response.data;
      },
    }),
  }),
});

export const { useGetPostsQuery } = apiSlice;
