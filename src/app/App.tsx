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
import CompanySelfVerification from '../pages/Company/SelfVerification/components';
import CompanyEditVerification from '../pages/Company/SelfVerification/components/CompanyEditVerification';
import CompanyDetailVerification from '../pages/Company/SelfVerification/components/CompanyDetailVerification';
import VerificationResult from '../pages/VerificationResult';
import RequestVerification from '../pages/Company/SelfVerification/components/RequestVerification';
import VerificationResultDetail from '../pages/VerificationResult/VerificationResultDetail';

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
  
        <AppRoute path='/ket-qua-danh-gia/:id' component={VerificationResultDetail} layout={MainLayout} />
        <AppRoute path='/ket-qua-danh-gia' component={VerificationResult} layout={MainLayout} />

        <AppRoute path="/doanh-nghiep/yeu-cau-tu-danh-gia" component={RequestVerification} layout={CompanyLayout} needAuth roles={["Company"]} />
        <AppRoute path="/doanh-nghiep/tu-danh-gia/chi-tiet/:id" component={CompanyDetailVerification} layout={CompanyLayout} needAuth roles={["Company"]} />
        <AppRoute path="/doanh-nghiep/tu-danh-gia/sua/:id" component={CompanyEditVerification} layout={CompanyLayout} needAuth roles={["Company"]} />
        <AppRoute path="/doanh-nghiep/tu-danh-gia" component={CompanySelfVerification} layout={CompanyLayout} needAuth roles={["Company"]} />
        <AppRoute path="/doanh-nghiep" component={CompanyDashboard} layout={CompanyLayout} needAuth roles={["Company"]} />

        <AppRoute exact path='/' component={Home} layout={MainLayout} />
      </Switch>
    </div>
  );
}

export default App;
