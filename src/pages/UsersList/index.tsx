import { Link } from 'react-router-dom';
import { useAppSelector } from '@/hooks';
import { selectAllUsers } from '@/store/slice/usersSlice';

const UsersList = () => {
  const users = useAppSelector(selectAllUsers);

  const renderedUsers = users.map((user) => (
    <li key={user.id}>
      <Link to={`/UserPage/${user.id}`}>{user.name}</Link>
    </li>
  ));

  return (
    <div>
      <h2>Users</h2>
      <ul>{renderedUsers}</ul>
    </div>
  );
};

export default UsersList;
