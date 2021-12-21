import { ThirdParty } from '../../types/models';
import request from '../utils/request';

function getById(id: number): Promise<ThirdParty> {
  return request.get(`/ThirdParty/ById/${id}`);
}

function getByAccountId(accountId: number): Promise<ThirdParty> {
  return request.get(`/ThirdParty/ByAccount/${accountId}`);
}

function resetSecret(id: number): Promise<ThirdParty> {
  return request.put(`/ThirdParty/ResetSecret/${id}`);
}

const thirdPartyServices = {
  getById,
  getByAccountId,
  resetSecret,
};

export default thirdPartyServices;
