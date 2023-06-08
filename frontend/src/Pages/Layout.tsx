import React from 'react';
import Session from 'components/Session';
import Feedback from 'components/feedback/Feedback';

const Layout = (): JSX.Element => {
  return (
    <>
      <Session />
      <Feedback />
    </>
  );
};

export default Layout;
