import { CompanyReportDTO } from '../../types/dto';
import { CompanyReport } from '../../types/models';
import request from '../utils/request';

function getCurrentUnhandled(companyId: number): Promise<CompanyReport> {
  return request.get(`/CompanyReport/CurrentUnhandled/${companyId}`);
}

function create(data: CompanyReportDTO): Promise<CompanyReport> {
  return request.post('/CompanyReport/Create', data);
}

const companyReportServices = {
  getCurrentUnhandled,
  create,
};

export default companyReportServices;
