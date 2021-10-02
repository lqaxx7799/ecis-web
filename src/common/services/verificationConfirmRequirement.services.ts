import { VerificationConfirmRequirement } from '../../types/models';
import request from '../utils/request';

function getPendingByCompanyId(companyId: number): Promise<VerificationConfirmRequirement[]> {
  return request.get(`/VerificationConfirmRequirement/PendingByCompanyId/${companyId}`);
}

function getById(id: number): Promise<VerificationConfirmRequirement> {
  return request.get(`/VerificationConfirmRequirement/ById/${id}`);
}

const verificationConfirmRequirementServices = {
  getPendingByCompanyId,
  getById,
};

export default verificationConfirmRequirementServices;
