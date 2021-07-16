import React from 'react';
import { Menu } from '@fluentui/react-northstar';

type Props = {
  children: JSX.Element;
};

const MainLayout = ({ children }: Props) => {
  return (
    <div>
      <Menu
        items={[
          'Profile',
          'My account',
          {
            content: 'Messages',
            key: 'messages',
            menu: ['Drafts', 'Archive'],
          },
          'Logout',
        ]}
      />
      {children}
    </div>
  );
}

export default MainLayout;