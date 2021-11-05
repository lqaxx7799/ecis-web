import { CompanyTypeModification } from '../../types/models';
import request from '../utils/request';

function getReport(month: number, year: number): Promise<CompanyTypeModification[]> {
  return request.get(`/Company/GetReport?month=${month}&year=${year}`);
}

function getByCompanyId(companyId: number): Promise<CompanyTypeModification[]> {
  return request.get(`/Company/GetCompanyReport/${companyId}`);
}

function getById(id: number): Promise<CompanyTypeModification> {
  return request.get(`/Company/Modification/ById/${id}`);
}

const companyTypeModificationServices = {
  getReport,
  getByCompanyId,
  getById,
};

export default companyTypeModificationServices;
