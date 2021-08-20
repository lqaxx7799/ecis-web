import { Switch } from 'react-router';
import AppRoute from './AppRoute';
import Home from '../pages/Home';
import MainLayout from './MainLayout';
import CompanyRegistration from '../pages/CompanyRegistration';
import RegistrationSuccess from '../pages/CompanyRegistration/RegistrationSucess';
import LogIn from '../pages/LogIn';

const App = () => {
  return (
    <div>
      <Switch>
        <AppRoute path='/dang-ky-doanh-nghiep' component={CompanyRegistration} layout={MainLayout} />
        <AppRoute path='/dang-ky-thanh-cong' component={RegistrationSuccess} layout={MainLayout} />
        <AppRoute path='/dang-nhap' component={LogIn} layout={MainLayout} />
        <AppRoute exact path='/' component={Home} layout={MainLayout} />
      </Switch>
    </div>
  );
}

export default App;
