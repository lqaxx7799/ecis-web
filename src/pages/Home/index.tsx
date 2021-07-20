import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../app/store';
import { authActions } from '../../store/authSlice';
import { Button, Menu, MenuItem } from '@blueprintjs/core';
import { Col, Container, Row } from 'react-grid-system';
import { Link } from 'react-router-dom';

const Home = () => {
  const { test } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  const [text, setText] = useState<string>(test);

  const onClick = () => {
    dispatch(authActions.updateTest(text));
  }

  return (
    <Row>
      <Col lg={8} sm={12}>
      </Col>
      <Col lg={4} sm={12}>
        <Menu>
          <Link to="/dang-ky-doanh-nghiep">
            <MenuItem icon="add" text="Đăng ký doanh nghiệp"/>
          </Link> 
        </Menu>
      </Col>
    </Row>
  );
}

export default Home;
