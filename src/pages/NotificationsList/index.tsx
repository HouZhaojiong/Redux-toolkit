import { useLayoutEffect } from 'react';
import { useAppSelector, useAppDispatch } from '@/hooks';
import { selectAllUsers } from '@/store/slice/usersSlice';
import {
  selectAllNotifications,
  allNotificationsRead,
} from '@/store/slice/notificationsSlice';
import { formatDistanceToNow, parseISO } from 'date-fns';

let timeout: any;

const NotificationsList = () => {
  const notifications = useAppSelector(selectAllNotifications);
  const users = useAppSelector(selectAllUsers);
  const dispatch = useAppDispatch();

  useLayoutEffect(() => {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      dispatch(allNotificationsRead());
    }, 500);
  });

  const renderedNotifications = notifications.map((notification) => {
    const date = parseISO(notification.date);
    const timeAgo = formatDistanceToNow(date);
    const user = users.find((user) => user.id === notification.user) || {
      name: 'Unknown User',
    };

    return (
      <div
        key={notification.id}
        style={{ color: notification.isNew ? 'green' : '' }}
      >
        <div>
          <b>{user.name}</b> {notification.message}
        </div>
        <div title={notification.date}>
          <i>{timeAgo} ago</i>
        </div>
      </div>
    );
  });

  return (
    <section className='notificationsList'>
      <h2>Notifications</h2>
      {renderedNotifications}
    </section>
  );
};

export default NotificationsList;
