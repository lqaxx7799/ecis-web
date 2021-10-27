import { VerificationProcess } from '../../types/models';
import request from '../utils/request';

function getAllByCompany(companyId: number): Promise<VerificationProcess[]> {
  return request.get(`/VerificationProcess/GetByCompany/${companyId}`);
}

function getById(id: number): Promise<VerificationProcess> {
  return request.get(`/VerificationProcess/${id}`);
}

function getCurrentByCompanyId(companyId: number): Promise<VerificationProcess> {
  return request.get(`/VerificationProcess/GetCurrent/${companyId}`);
}

function submit(processId: number): Promise<VerificationProcess> {
  return request.put(`/VerificationProcess/SubmitProcess/${processId}`);
}

const verificationProcessServices = {
  getAllByCompany,
  getCurrentByCompanyId,
  getById,
  process,
  submit,
};

export default verificationProcessServices;
