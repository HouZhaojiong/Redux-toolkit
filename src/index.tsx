import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './store';
// import { fetchUsers } from '@/store/slice/usersSlice';
import { extendedApiSlice } from '@/store/slice/usersSlice';
import App from './App';

// store.dispatch(fetchUsers());
store.dispatch(extendedApiSlice.endpoints.getUsers.initiate());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
