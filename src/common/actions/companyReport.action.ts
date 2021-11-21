import { AppDispatch } from '../../app/store';
import { CompanyReportDTO } from '../../types/dto';
import { CompanyReport } from '../../types/models';
import companyReportServices from '../services/companyReport.services';
import { AppThunk } from './type';

function getCurrentUnhandled(companyId: number): AppThunk<Promise<CompanyReport>> {
  return (dispatch: AppDispatch) => {
    return companyReportServices.getCurrentUnhandled(companyId);
  };
}

function create(payload: CompanyReportDTO): AppThunk<Promise<CompanyReport>> {
  return (dispatch: AppDispatch) => {
    return companyReportServices.create(payload);
  }
}

const companyReportActions = {
  getCurrentUnhandled, 
  create,
};

export default companyReportActions;
