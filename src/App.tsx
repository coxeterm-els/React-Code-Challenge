import { FC } from 'react';

import './style.css';
import { UserList } from './UserList';

export const App: FC<{ name: string }> = ({ name }) => {
  return (
    <div>
      <UserList />
    </div>
  );
};
