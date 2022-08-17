import { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { createSelector } from '@reduxjs/toolkit';
import { useAppSelector } from '@/hooks';
import { selectUserById } from '@/store/slice/usersSlice';
// import { selectPostsByUser } from '@/store/slice/postsSlice';
import { useGetPostsQuery } from '@/store/api/apiSlice';
import { IPost } from '@/store/slice/postsSlice';

const UserPage = () => {
  const { userId } = useParams();

  const user = useAppSelector((state) => selectUserById(state, userId!));

  // const postsForUser = useAppSelector((state) =>
  //   selectPostsByUser(state, userId!)
  // );

  const selectPostsForUser = useMemo(() => {
    return createSelector(
      (res: any) => res.data,
      (res: any, userId: string) => userId,
      (data: IPost[], userId) =>
        data?.filter((post) => post.user === userId) ?? []
    );
  }, []);

  const { postsForUser } = useGetPostsQuery(undefined, {
    selectFromResult: (result) => ({
      ...result,
      postsForUser: selectPostsForUser(result, userId!),
    }),
  });

  const postTitles = postsForUser.map((post) => (
    <li key={post.id}>
      <Link to={`/SinglePostPage/${post.id}`}>{post.title}</Link>
    </li>
  ));

  return (
    <section>
      <h2>{user!.name}</h2>

      <ul>{postTitles}</ul>
    </section>
  );
};

export default UserPage;
