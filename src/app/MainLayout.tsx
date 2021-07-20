import React from 'react';
import { Alignment, Button, Navbar } from '@blueprintjs/core';
import BleedLayout from '../common/components/BleedLayout';
import { Container } from 'react-grid-system';

type Props = {
  children: JSX.Element;
};

const MainLayout = ({ children }: Props) => {
  return (
    <div>
      <Navbar>
        <Navbar.Group align={Alignment.LEFT}>
          <Navbar.Heading>Hệ thống ECIS</Navbar.Heading>
          <Navbar.Divider />
          <Button minimal icon="home" text="Home" />
          <Button minimal icon="document" text="Files" />
        </Navbar.Group>
      </Navbar>
      <Container style={{ marginTop: '32px' }}>
        {children}
      </Container>
    </div>
  );
}

export default MainLayout;