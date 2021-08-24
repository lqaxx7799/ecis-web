import { AppDispatch } from '../../app/store';
import { VerificationProcess } from '../../types/models';
import { VerificationProcessActionTypes } from '../reducers/verificationProcess.reducer';
import verificationCriteriaServices from '../services/verificationCriteria.services';
import verificationProcessServices from '../services/verificationProcess.services';
import criteriaActions from './criteria.action';
import criteriaTypeActions from './criteriaType.action';
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

function loadEditingProcess(id: number): AppThunk<Promise<VerificationProcess | null>> {
  return async (dispatch: AppDispatch) => {
    dispatch<VerificationProcessActionTypes>({
      type: 'VERIFICATION_PROCESS_LOADING',
    });
    try {
      const [process, criterias] = await Promise.all([
        verificationProcessServices.getById(id),
        verificationCriteriaServices.getAllByProcessId(id),
        dispatch(criteriaActions.getAll()),
        dispatch(criteriaTypeActions.getAll()),
      ]);
      dispatch<VerificationProcessActionTypes>({
        type: 'VERIFICATION_PROCESS_EDITING_LOADED',
        payload: {
          editingProcess: process,
          editingCriterias: criterias,
        },
      });
      return process;
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
  loadEditingProcess,
};

export default verificationProcessActions;
