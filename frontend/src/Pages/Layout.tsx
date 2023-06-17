import { Divider } from '@mui/material';
import Session from 'components/Session';
import Feedback from 'components/feedback/Feedback';

const Layout = (): JSX.Element => {
  return (
    <>
      <Session />
      <Divider />
      <Feedback />
    </>
  );
};

export default Layout;
