import React from 'react';
import { Switch } from 'react-router';
import AppRoute from './AppRoute';
import Home from '../pages/Home';
import MainLayout from './MainLayout';

const App = () => {
  return (
    <div>
      <Switch>
        <AppRoute exact path='/' component={Home} layout={MainLayout} />
      </Switch>
    </div>
  );
}

export default App;
