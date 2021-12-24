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
import Dashboard from '../pages/Dashboard';
import CompanyLayout from './CompanyLayout';
// import CompanySelfVerification from '../pages/Company/SelfVerification/components';
import CompanyEditVerification from '../pages/Company/SelfVerification/components/CompanyEditVerification';
import CompanyDetailVerification from '../pages/Company/SelfVerification/components/CompanyDetailVerification';
import VerificationResult from '../pages/VerificationResult';
// import RequestVerification from '../pages/Company/SelfVerification/components/RequestVerification';
import VerificationResultDetail from '../pages/VerificationResult/VerificationResultDetail';
import BlankLayout from './BlankLayout';
import CompanySelfVerification from '../pages/CompanySelfVerification/components';
import SelfVerificationResult from '../pages/SelfVerificationResult/components';
import NotFound from '../pages/NotFound/components';
import { ToastContainer } from 'react-toastify';
import ModificationHistory from '../pages/ModificationHistory/components';
import ModificationDetail from '../pages/ModificationHistory/components/ModificationDetail';
import RequestVerification from '../pages/RequestVerification/components';
import ChangePassword from '../pages/ChangePassword/components';
import ModificationReport from '../pages/ModificationHistory/components/ModificationReport';
import ApiInfo from '../pages/ThirdPartyApi/components/ApiInfo';
import ApiDocumentation from '../pages/ThirdPartyApi/components/ApiDocumentation';

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
    <>
      <Switch>
        <AppRoute path='/login' component={LogIn} layout={BlankLayout} />
        <AppRoute path="/company-self-verification" component={CompanySelfVerification} layout={MainLayout} needAuth roles={["Company"]} />
        <AppRoute path="/verification-result" component={SelfVerificationResult} layout={MainLayout} needAuth roles={["Company"]} />
        <AppRoute path="/modification-history/:id" component={ModificationDetail} layout={MainLayout} needAuth roles={["Company"]} />
        <AppRoute path="/modification-history" component={ModificationHistory} layout={MainLayout} needAuth roles={["Company"]} />
        <AppRoute path="/request-verification" component={RequestVerification} layout={MainLayout} needAuth roles={["Company"]} />

        <AppRoute path="/change-password" component={ChangePassword} layout={MainLayout} needAuth roles={["Company", "ThirdParty"]} />

        {/* <AppRoute path='/dang-ky-doanh-nghiep' component={CompanyRegistration} layout={MainLayout} />
        <AppRoute path='/dang-ky-thanh-cong' component={RegistrationSuccess} layout={MainLayout} /> */}
        {/* <AppRoute path='/dang-nhap' component={LogIn} layout={MainLayout} /> */}
{/* 
        <AppRoute path='/ket-qua-danh-gia/:id' component={VerificationResultDetail} layout={MainLayout} />
        <AppRoute path='/ket-qua-danh-gia' component={VerificationResult} layout={MainLayout} /> */}

        {/* <AppRoute path="/doanh-nghiep/yeu-cau-tu-danh-gia" component={RequestVerification} layout={CompanyLayout} needAuth roles={["Company"]} /> */}
        {/* <AppRoute path="/doanh-nghiep/tu-danh-gia/chi-tiet/:id" component={CompanyDetailVerification} layout={CompanyLayout} needAuth roles={["Company"]} />
        <AppRoute path="/doanh-nghiep/tu-danh-gia/sua/:id" component={CompanyEditVerification} layout={CompanyLayout} needAuth roles={["Company"]} /> */}
        {/* <AppRoute path="/doanh-nghiep/tu-danh-gia" component={CompanySelfVerification} layout={CompanyLayout} needAuth roles={["Company"]} /> */}
        {/* <AppRoute path="/doanh-nghiep" component={CompanyDashboard} layout={CompanyLayout} needAuth roles={["Company"]} /> */}

        <AppRoute path="/modification-report/:id" component={ModificationDetail} layout={MainLayout} needAuth roles={["ThirdParty"]} />
        <AppRoute path="/modification-report" component={ModificationReport} layout={MainLayout} needAuth roles={["ThirdParty"]} />
        
        <AppRoute path="/api-info" component={ApiInfo} layout={MainLayout} needAuth roles={["ThirdParty"]} />
        <AppRoute path="/api-documentation" component={ApiDocumentation} layout={MainLayout} />

        <AppRoute exact path='/' component={Dashboard} layout={MainLayout} needAuth roles={["Company", "ThirdParty"]} />
        <AppRoute component={NotFound} layout={MainLayout} needAuth roles={["Company", "ThirdParty"]} />
      </Switch>
      <ToastContainer />
    </>
  );
}

export default App;
