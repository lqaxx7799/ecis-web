import { VerificationProcess } from '../../types/models';
import request from '../utils/request';

function getAllByCompany(companyId: number): Promise<VerificationProcess[]> {
  return request.get(`/VerificationProcess/GetByCompany/${companyId}`);
}

function getById(id: number): Promise<VerificationProcess> {
  return request.get(`/VerificationProcess/${id}`);
}

function getCurrentPendingByCompanyId(companyId: number): Promise<VerificationProcess> {
  return request.get(`/VerificationProcess/GetCurrentPending/${companyId}`);
}

function getLastByCompanyId(companyId: number): Promise<VerificationProcess> {
  return request.get(`/VerificationProcess/GetLast/${companyId}`);
}

function submit(processId: number): Promise<VerificationProcess> {
  return request.put(`/VerificationProcess/SubmitProcess/${processId}`);
}

const verificationProcessServices = {
  getAllByCompany,
  getCurrentPendingByCompanyId,
  getLastByCompanyId,
  getById,
  process,
  submit,
};

export default verificationProcessServices;
