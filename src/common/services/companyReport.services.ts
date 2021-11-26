import { CompanyReportDTO } from '../../types/dto';
import { CompanyReport } from '../../types/models';
import request from '../utils/request';

function canCreateReport(companyId: number): Promise<boolean> {
  return request.get(`/CompanyReport/CanCreateReport/${companyId}`);
}

function create(data: CompanyReportDTO): Promise<CompanyReport> {
  return request.post('/CompanyReport/Create', data);
}

const companyReportServices = {
  canCreateReport,
  create,
};

export default companyReportServices;
