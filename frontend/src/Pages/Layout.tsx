import React, { type FC } from 'react';
import Session from 'components/Session';
import Feedback from 'components/Feedback';

const Layout: FC = () => {
  return (
    <>
      <Session />
      <Feedback />
    </>
  );
};

export default Layout;
