import { AppDispatch } from '../../app/store';
import { VerificationProcess } from '../../types/models';
import { VerificationProcessActionTypes } from '../reducers/verificationProcess.reducer';
import verificationCriteriaServices from '../services/verificationCriteria.services';
import verificationDocumentServices from '../services/verificationDocument.services';
import verificationProcessServices from '../services/verificationProcess.services';
import companyTypeActions from './companyType.action';
import criteriaActions from './criteria.action';
import criteriaDetailActions from './criteriaDetail.action';
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

function loadVerificationDetail(processId: number): AppThunk<Promise<VerificationProcess | null>> {
  return async (dispatch: AppDispatch) => {
    dispatch<VerificationProcessActionTypes>({
      type: 'VERIFICATION_PROCESS_LOADING',
    });
    try {
      const [process, criterias, documents] = await Promise.all([
        verificationProcessServices.getById(processId),
        verificationCriteriaServices.getAllByProcessId(processId),
        verificationDocumentServices.getAllByProcessId(processId),
        dispatch(criteriaActions.getAll()),
        dispatch(criteriaTypeActions.getAll()),
        dispatch(criteriaDetailActions.getAll()),
        dispatch(companyTypeActions.getAll()),
      ]);
      dispatch<VerificationProcessActionTypes>({
        type: 'VERIFICATION_PROCESS_DETAIL_LOADED',
        payload: {
          editingProcess: process,
          verificationCriterias: criterias,
          verificationDocuments: documents,
        },
      });
      return process;
    } catch (e) {
      dispatch<VerificationProcessActionTypes>({
        type: 'VERIFICATION_PROCESS_LOAD_FAILED',
      });
      return null;
    }
  };
}

const verificationProcessActions = {
  getAllByCompany,
  loadVerificationDetail,
};

export default verificationProcessActions;
