import { CompanyReportDTO } from '../../types/dto';
import { CompanyReport } from '../../types/models';
import request from '../utils/request';

function create(data: CompanyReportDTO): Promise<CompanyReport> {
  return request.post('/CompanyReport/Create', data);
}

const companyReportServices = {
  create,
};

export default companyReportServices;
