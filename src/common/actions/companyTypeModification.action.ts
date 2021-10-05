import _ from "lodash";
import { AppDispatch } from '../../app/store';
import { CompanyTypeModification } from '../../types/models';
import { CompanyTypeModificationActionTypes } from '../reducers/companyTypeModification.reducer';
import companyTypeModificationServices from '../services/companyTypeModification.services';
import { AppThunk } from './type';

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

const companyTypeModificationActions = {
  getReport,
};

export default companyTypeModificationActions;
