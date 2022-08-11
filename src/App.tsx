import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import PostList from './pages/PostList';
import SinglePostPage from './pages/SinglePostPage';
import EditPostForm from './pages/EditPostForm';
import UsersList from './pages/UsersList';
import UserPage from './pages/UserPage';
import NotificationsList from './pages/NotificationsList';
import { useAppSelector, useAppDispatch } from './hooks';
import {
  fetchNotifications,
  selectAllNotifications,
} from './store/slice/notificationsSlice';

const App = () => {
  const dispatch = useAppDispatch();
  const notifications = useAppSelector(selectAllNotifications);

  const numUnreadNotifications = notifications.filter((n) => !n.read).length;

  let unreadNotificationsBadge;

  if (numUnreadNotifications > 0) {
    unreadNotificationsBadge = (
      <span className='badge'>{numUnreadNotifications}</span>
    );
  }

  const fetchNewNotifications = () => {
    dispatch(fetchNotifications());
  };

  return (
    <div>
      <BrowserRouter>
        <Link to='/PostList'>Posts</Link>-<Link to='/UsersList'>Users</Link>-
        <Link to='/NotificationsList'>
          Notifications
          <span style={{ color: 'red' }}>{unreadNotificationsBadge}</span>
        </Link>
        <button className='button' onClick={fetchNewNotifications}>
          Refresh Notifications
        </button>
        <Routes>
          <Route path='/PostList' element={<PostList />} />
          <Route path='/SinglePostPage/:postId' element={<SinglePostPage />} />
          <Route path='/EditPostForm/:postId' element={<EditPostForm />} />
          <Route path='/UsersList' element={<UsersList />} />
          <Route path='/UserPage/:userId' element={<UserPage />} />
          <Route path='/NotificationsList' element={<NotificationsList />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
