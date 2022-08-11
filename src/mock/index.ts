import Mock from 'mockjs';
import posts from './posts.json';
import users from './users.json';
import notifications from './notifications.json';

let allNotifications = [...notifications];

Mock.mock('/api/post', () => {
  return posts;
});

Mock.mock('/api/user', () => {
  return users;
});

Mock.mock('/api/add_post', (options: any) => {
  // posts.push({
  //   ...JSON.parse(options.body),
  //   id: (posts.length + 1).toString(),
  //   date: new Date().toISOString(),
  //   reactions: {
  //     thumbsUp: 0,
  //     hooray: 0,
  //     heart: 0,
  //     rocket: 0,
  //     eyes: 0,
  //   },
  // });
  return {
    ...JSON.parse(options.body),
    id: (posts.length + 1).toString(),
    date: new Date().toISOString(),
    reactions: {
      thumbsUp: 0,
      hooray: 0,
      heart: 0,
      rocket: 0,
      eyes: 0,
    },
  };
});

Mock.mock('/api/notifications', (options: any) => {
  const { since } = JSON.parse(options.body);
  if (since) {
    return allNotifications.filter(
      (notification) =>
        new Date(notification.date).getTime() > new Date(since).getTime()
    );
  } else {
    return allNotifications;
  }
});

setInterval(() => {
  const data = Mock.mock({
    notifications: [
      {
        id: new Date().getTime(),
        date: new Date().toISOString(),
        message: '@title',
        user: () => {
          const users = ['0', '1', '2'];
          return users[Math.floor(Math.random() * users.length)];
        },
      },
    ],
  });
  const notification = data.notifications[0];
  allNotifications = [
    ...allNotifications,
    {
      ...notification,
      id: String(notification.id),
    },
  ];
}, 10000);
