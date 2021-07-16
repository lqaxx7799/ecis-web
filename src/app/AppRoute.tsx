import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router';

import authServices from '../common/services/auth.services';
import BlankLayout from './BlankLayout';

type Props = {
  component: React.ComponentType<any>;
  layout: React.ComponentType<any>;
  needAuth?: boolean;
} & RouteProps;

const AppRoute = ({
  component: Component,
  layout: Layout = BlankLayout,
  needAuth = false,
  ...rest
}: Props) => {
  const isLoggedIn = authServices.isLoggedIn();
  return (
    <Route
      {...rest}
      render={(props) =>
        !needAuth || isLoggedIn ? (
          <Layout>
            <Component {...props} />
          </Layout>
        ) : (
          <Redirect to='/' />
        )
      }
    />
  );
}

export default AppRoute;
