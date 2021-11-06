import _ from "lodash";
import { AppDispatch } from '../../app/store';
import { CompanyTypeModification } from '../../types/models';
import { CompanyTypeModificationActionTypes } from '../reducers/companyTypeModification.reducer';
import companyTypeModificationServices from '../services/companyTypeModification.services';
import { AppThunk } from './type';
import verificationProcessActions from './verificationProcess.action';

function getReport(month: number, year: number): AppThunk<Promise<CompanyTypeModification[]>> {
  return async (dispatch: AppDispatch) => {
    dispatch<CompanyTypeModificationActionTypes>({
      type: 'COMPANY_TYPE_MODIFICATION_LOADING',
    });
    try {
      const result = await companyTypeModificationServices.getReport(month, year);
      dispatch<CompanyTypeModificationActionTypes>({
        type: 'COMPANY_TYPE_MODIFICATION_LOADED',
        payload: result,
      });
      return result;
    } catch (e) {
      dispatch<CompanyTypeModificationActionTypes>({
        type: 'COMPANY_TYPE_MODIFICATION_LOAD_FAILED',
      });
      return [];
    }
  };
}

function getByCompanyId(companyId: number): AppThunk<Promise<CompanyTypeModification[]>> {
  return async (dispatch: AppDispatch) => {
    dispatch<CompanyTypeModificationActionTypes>({
      type: 'COMPANY_TYPE_MODIFICATION_LOADING',
    });
    try {
      const result = await companyTypeModificationServices.getByCompanyId(companyId);
      dispatch<CompanyTypeModificationActionTypes>({
        type: 'COMPANY_TYPE_MODIFICATION_LOADED',
        payload: result,
      });
      return result;
    } catch (e) {
      dispatch<CompanyTypeModificationActionTypes>({
        type: 'COMPANY_TYPE_MODIFICATION_LOAD_FAILED',
      });
      return [];
    }
  };
}

function getById(id: number): AppThunk<Promise<CompanyTypeModification>> {
  return async (dispatch: AppDispatch) => {
    dispatch<CompanyTypeModificationActionTypes>({
      type: 'COMPANY_TYPE_MODIFICATION_LOADING',
    });
    try {
      const result = await companyTypeModificationServices.getById(id);
      if (result.modification === 'VERIFICATION') {
        dispatch(verificationProcessActions.loadVerificationDetail(result.verificationProcessId));
      }
      dispatch<CompanyTypeModificationActionTypes>({
        type: 'COMPANY_TYPE_MODIFICATION_DETAIL_LOADED',
        payload: result,
      });
      return result;
    } catch (e) {
      dispatch<CompanyTypeModificationActionTypes>({
        type: 'COMPANY_TYPE_MODIFICATION_LOAD_FAILED',
      });
      throw e;
    }
  };
}

const companyTypeModificationActions = {
  getReport,
  getByCompanyId,
  getById,
};

export default companyTypeModificationActions;
