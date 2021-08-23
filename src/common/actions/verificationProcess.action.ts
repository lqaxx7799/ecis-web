import { AppDispatch } from '../../app/store';
import { VerificationProcess } from '../../types/models';
import { VerificationProcessActionTypes } from '../reducers/verificationProcess.reducer';
import verificationProcessServices from '../services/verificationProcess.services';
import { AppThunk } from './type';

function getAllByCompany(companyId: number): AppThunk<Promise<VerificationProcess[]>> {
  return async (dispatch: AppDispatch) => {
    dispatch<VerificationProcessActionTypes>({
      type: 'VERIFICATION_PROCESS_LOADING',
    });
    try {
      const result = await verificationProcessServices.getAllByCompany(companyId);
      dispatch<VerificationProcessActionTypes>({
        type: 'VERIFICATION_PROCESS_LOADED',
        payload: result,
      });
      return result;
    } catch (e) {
      dispatch<VerificationProcessActionTypes>({
        type: 'VERIFICATION_PROCESS_LOAD_FAILED',
      });
      return [];
    }
  }
}

function getById(id: number): AppThunk<Promise<VerificationProcess | null>> {
  return async (dispatch: AppDispatch) => {
    dispatch<VerificationProcessActionTypes>({
      type: 'VERIFICATION_PROCESS_LOADING',
    });
    try {
      const result = await verificationProcessServices.getById(id);
      dispatch<VerificationProcessActionTypes>({
        type: 'VERIFICATION_PROCESS_EDITING_LOADED',
        payload: result,
      });
      return result;
    } catch (e) {
      dispatch<VerificationProcessActionTypes>({
        type: 'VERIFICATION_PROCESS_LOAD_FAILED',
      });
      return null;
    }
  }
}

const verificationProcessActions = {
  getAllByCompany,
  getById,
};

export default verificationProcessActions;
