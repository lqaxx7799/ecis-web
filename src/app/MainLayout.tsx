import { Button, Container } from '@mantine/core';
import { Link } from 'react-router-dom';

type Props = {
  children: JSX.Element;
};

const MainLayout = ({ children }: Props) => {
  return (
    <>
      <div className="header">
        <div className="header-main">
          <Button component={Link} to="/">ECIS</Button>
        </div>
        <div className="spacer" />
        <div className="header-end">
          <Button style={{ marginRight: '8px' }}>Đăng nhập</Button>
          <Button>Đăng ký</Button>
        </div>
      </div>
      <Container className="layout-main">
        {children}
      </Container>
    </>
  );
}

export default MainLayout;