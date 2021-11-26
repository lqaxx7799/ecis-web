import { AppDispatch } from '../../app/store';
import { CompanyReportDTO } from '../../types/dto';
import { CompanyReport } from '../../types/models';
import companyReportServices from '../services/companyReport.services';
import { AppThunk } from './type';

function canCreateReport(companyId: number): AppThunk<Promise<boolean>> {
  return (dispatch: AppDispatch) => {
    return companyReportServices.canCreateReport(companyId);
  };
}

function create(payload: CompanyReportDTO): AppThunk<Promise<CompanyReport>> {
  return (dispatch: AppDispatch) => {
    return companyReportServices.create(payload);
  }
}

const companyReportActions = {
  canCreateReport, 
  create,
};

export default companyReportActions;
