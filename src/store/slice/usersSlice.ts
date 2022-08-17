// import {
//   createSlice,
//   createAsyncThunk,
//   createEntityAdapter,
// } from '@reduxjs/toolkit';
// import { RootState } from '..';
// import axios from 'axios';

// interface IUser {
//   id: string;
//   name: string;
// }

// export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
//   const response = await axios.get('/api/user');
//   return response.data.map((user: any) => ({
//     ...user,
//     id: user.id.toString(),
//   }));
// });

// const usersSlice = createSlice({
//   name: 'users',
//   initialState,
//   reducers: {},
//   extraReducers(builder) {
//     builder.addCase(fetchUsers.fulfilled, usersAdapter.setAll);
//   },
// });

// export default usersSlice.reducer;

// export type { IUser };

// export const { selectAll: selectAllUsers, selectById: selectUserById } =
//   usersAdapter.getSelectors((state: RootState) => state.users);

import { createSelector, createEntityAdapter } from '@reduxjs/toolkit';
import { apiSlice } from '../api/apiSlice';
import type { EntityState } from '@reduxjs/toolkit';
import { RootState } from '..';

interface IUser {
  id: string;
  name: string;
}

const usersAdapter = createEntityAdapter<IUser>();

const initialState = usersAdapter.getInitialState();

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<EntityState<IUser>, void>({
      query: () => '/user',
      transformResponse: (responseData: IUser[]) =>
        usersAdapter.setAll(initialState, responseData),
    }),
  }),
});

export const { useGetUsersQuery } = extendedApiSlice;

export const selectUsersResult = extendedApiSlice.endpoints.getUsers.select();

// export const selectAllUsers = createSelector(
//   selectUsersResult,
//   (usersResult) => usersResult?.data ?? []
// );

// export const selectUserById = createSelector(
//   selectAllUsers,
//   (state: RootState, userId: string) => userId,
//   (users, userId) => users.find((user) => user.id === userId)
// );

const selectUsersData = createSelector(
  selectUsersResult,
  (usersResult) => usersResult.data
);

export const { selectAll: selectAllUsers, selectById: selectUserById } =
  usersAdapter.getSelectors(
    (state: RootState) => selectUsersData(state) ?? initialState
  );
