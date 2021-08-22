import { Button, Container, Divider, Menu, MenuItem, MenuLabel, Text, Title } from '@mantine/core';
import { PersonIcon, PinLeftIcon, TriangleDownIcon } from '@radix-ui/react-icons';
import { Link } from 'react-router-dom';
import { useAppSelector } from './store';

type Props = {
  children?: React.ReactNode;
  isBleedLayout?: boolean;
};

const MainLayout = ({ children, isBleedLayout }: Props) => {
  const authentication = useAppSelector((state) => state.authentication);

  return (
    <>
      <div className="header">
        <div className="header-main">
          <Button component={Link} to="/" variant="link"><Title>ECIS</Title></Button>
        </div>
        <div className="spacer" />
        <div className="header-end">
          {
            authentication.account ? (
              <Menu
                zIndex={7}
                control={(
                  <Button variant="link">
                    Xin chào, {authentication.account?.email}
                    <TriangleDownIcon />
                  </Button>
                )}
              >
                <MenuLabel>Tài khoản</MenuLabel>
                <MenuItem component={Link} to="/doanh-nghiep" icon={<PersonIcon />}>Quản lý tài khoản</MenuItem>

                <Divider />
                <MenuItem color="red" icon={<PinLeftIcon />}>Đăng xuất</MenuItem>                
              </Menu>
            ) : (
              <>
                <Button
                  variant="light"
                  style={{ marginRight: '8px' }}
                  component={Link}
                  to="/dang-nhap"
                >
                  Đăng nhập
                </Button>
                <Button>Đăng ký</Button>
              </>
            )
          }
        </div>
      </div>
      {
        isBleedLayout ? children : (
          <Container className="layout-main">
            {children}
          </Container>
        )
      }
    </>
  );
}

export default MainLayout;