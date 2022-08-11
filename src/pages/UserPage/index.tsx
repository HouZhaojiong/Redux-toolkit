import { useParams, Link } from 'react-router-dom';
import { useAppSelector } from '@/hooks';
import { selectUserById } from '@/store/slice/usersSlice';
import { selectPostsByUser } from '@/store/slice/postsSlice';

const UserPage = () => {
  const { userId } = useParams();

  const user = useAppSelector((state) => selectUserById(state, userId!));

  const postsForUser = useAppSelector((state) =>
    selectPostsByUser(state, userId!)
  );

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
