import { CompanyRegistrationDTO } from '../../types/dto';
import request from '../utils/request';

function registerCompany(payload: CompanyRegistrationDTO): Promise<CompanyRegistrationDTO> {
  return request.post('/Company/RegisterCompany', payload);
}

const companyServices = {
  registerCompany,
};

export default companyServices;
