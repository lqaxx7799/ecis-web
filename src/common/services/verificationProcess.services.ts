import { VerificationProcess } from '../../types/models';
import request from '../utils/request';

function getAllByCompany(companyId: number): Promise<VerificationProcess[]> {
  return request.get(`/VerificationProcess/GetByCompany/${companyId}`);
}

const verificationProcessServices = {
  getAllByCompany,
};

export default verificationProcessServices;
