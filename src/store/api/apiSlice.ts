import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { IPost, IReactions } from '../slice/postsSlice';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  tagTypes: ['Post'],
  endpoints: (builder) => ({
    getPosts: builder.query<IPost[], void>({
      query: () => '/post',
      providesTags: (result = [], error, arg) => [
        'Post',
        ...result.map((post) => ({ type: 'Post' as const, id: post.id })),
      ],
    }),
    getPost: builder.query<IPost, string>({
      query: (postId) => `/post/${postId}`,
      providesTags: (result, error, arg) => [{ type: 'Post', id: arg }],
    }),
    addNewPost: builder.mutation<
      string,
      { title: string; content: string; user: string }
    >({
      query: (initialPost) => ({
        url: '/add_post',
        method: 'POST',
        body: initialPost,
      }),
      invalidatesTags: ['Post'],
    }),
    editPost: builder.mutation<
      string,
      { id: string; title: string; content: string }
    >({
      query: (post) => ({
        url: `/edit_post`,
        method: 'POST',
        body: post,
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Post', id: arg.id }],
    }),
    addReaction: builder.mutation<string, { postId: string; reaction: string }>(
      {
        query: ({ postId, reaction }) => ({
          url: `/reaction`,
          method: 'POST',
          body: { id: postId, reaction },
        }),
        // invalidatesTags: (result, error, arg) => [
        //   { type: 'Post', id: arg.postId },
        // ],
        async onQueryStarted(
          { postId, reaction },
          { dispatch, queryFulfilled }
        ) {
          const patchResult = dispatch(
            apiSlice.util.updateQueryData('getPosts', undefined, (draft) => {
              const post = draft.find((post) => post.id === postId);
              if (post) {
                post.reactions[reaction as keyof IReactions]++;
              }
            })
          );
          try {
            await queryFulfilled;
          } catch {
            patchResult.undo();
          }
        },
      }
    ),
  }),
});

export const {
  useGetPostsQuery,
  useGetPostQuery,
  useAddNewPostMutation,
  useEditPostMutation,
  useAddReactionMutation,
} = apiSlice;
