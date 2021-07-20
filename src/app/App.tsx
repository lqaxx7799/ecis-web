import React from 'react';
import { Switch } from 'react-router';
import AppRoute from './AppRoute';
import Home from '../pages/Home';
import MainLayout from './MainLayout';
import CompanyRegistration from '../pages/CompanyRegistration';

const App = () => {
  return (
    <div>
      <Switch>
        <AppRoute path='/dang-ky-doanh-nghiep' component={CompanyRegistration} layout={MainLayout} />
        <AppRoute exact path='/' component={Home} layout={MainLayout} />
      </Switch>
    </div>
  );
}

export default App;
