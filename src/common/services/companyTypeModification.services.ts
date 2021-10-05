import { CompanyTypeModification } from '../../types/models';
import request from '../utils/request';

function getReport(month: number, year: number): Promise<CompanyTypeModification[]> {
  return request.get(`/Company/GetReport?month=${month}&year=${year}`);
}

const companyTypeModificationServices = {
  getReport,
};

export default companyTypeModificationServices;
