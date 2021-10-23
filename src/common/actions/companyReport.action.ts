import { AppDispatch } from '../../app/store';
import { CompanyReportDTO } from '../../types/dto';
import { CompanyReport } from '../../types/models';
import companyReportServices from '../services/companyReport.services';
import { AppThunk } from './type';

function create(payload: CompanyReportDTO): AppThunk<Promise<CompanyReport>> {
  return (dispatch: AppDispatch) => {
    return companyReportServices.create(payload);
  }
}

const companyReportActions = {
  create,
};

export default companyReportActions;
