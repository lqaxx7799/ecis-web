import { VerificationDocument } from '../../types/models';
import request from '../utils/request';

function getAllByProcessId(processId: number): Promise<VerificationDocument[]> {
  return request.get(`/VerificationDocument/GetByProcessId/${processId}`);
}

function getById(id: number): Promise<VerificationDocument> {
  return request.get(`/VerificationDocument/${id}`);
}

function create(document: Partial<VerificationDocument>): Promise<VerificationDocument> {
  return request.post(`/VerificationDocument`, document);
}

const verificationDocumentServices = {
  getAllByProcessId,
  getById,
  create,
};

export default verificationDocumentServices;
