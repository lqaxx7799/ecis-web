import { Switch } from 'react-router';
import AppRoute from './AppRoute';
import Home from '../pages/Home';
import MainLayout from './MainLayout';
import CompanyRegistration from '../pages/CompanyRegistration';
import RegistrationSuccess from '../pages/CompanyRegistration/RegistrationSucess';
import LogIn from '../pages/LogIn';
import { useAppDispatch, useAppSelector } from './store';
import { useEffect } from 'react';
import authenticationActions from '../common/actions/authentication.actions';
import CompanyDashboard from '../pages/Company/Dashboard';
import CompanyLayout from './CompanyLayout';

const App = () => {
  const dispatch = useAppDispatch();
  const authentication = useAppSelector((state) => state.authentication);

  useEffect(() => {
    dispatch(authenticationActions.validate());
  }, []);

  if (!authentication.isInit) {
    return null;
  }

  return (
    <div>
      <Switch>
        <AppRoute path='/dang-ky-doanh-nghiep' component={CompanyRegistration} layout={MainLayout} />
        <AppRoute path='/dang-ky-thanh-cong' component={RegistrationSuccess} layout={MainLayout} />
        <AppRoute path='/dang-nhap' component={LogIn} layout={MainLayout} />

        <AppRoute path="/doanh-nghiep" component={CompanyDashboard} layout={CompanyLayout} needAuth roles={[1]} />

        <AppRoute exact path='/' component={Home} layout={MainLayout} />
      </Switch>
    </div>
  );
}

export default App;
