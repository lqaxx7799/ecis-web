import { AppDispatch } from '../../app/store';
import { VerificationConfirmRequirement } from '../../types/models';
import { VerificationConfirmRequirementActionTypes } from '../reducers/verificationConfirmRequirement.reducer';
import verificationConfirmRequirementServices from '../services/verificationConfirmRequirement.services';
import { AppThunk } from './type';

function getPendingByCompanyId(companyId: number): AppThunk<Promise<VerificationConfirmRequirement[]>> {
  return async (dispatch: AppDispatch) => {
    dispatch<VerificationConfirmRequirementActionTypes>({
      type: 'VERIFICATION_CONFIRM_REQUIREMENT_LOADING',
    });
    try {
      const result = await verificationConfirmRequirementServices.getPendingByCompanyId(companyId);
      dispatch<VerificationConfirmRequirementActionTypes>({
        type: 'VERIFICATION_CONFIRM_REQUIREMENT_LOADED',
        payload: result,
      });
      return result;
    } catch (e) {
      dispatch<VerificationConfirmRequirementActionTypes>({
        type: 'VERIFICATION_CONFIRM_REQUIREMENT_LOAD_FAILED',
      });
      return [];
    }
  };
}

function getById(processId: number): AppThunk<Promise<VerificationConfirmRequirement | undefined>> {
  return async (dispatch: AppDispatch) => {
    dispatch<VerificationConfirmRequirementActionTypes>({
      type: 'VERIFICATION_CONFIRM_REQUIREMENT_LOADING',
    });
    try {
      const result = await verificationConfirmRequirementServices.getById(processId);
      dispatch<VerificationConfirmRequirementActionTypes>({
        type: 'VERIFICATION_CONFIRM_REQUIREMENT_EDITING_LOADED',
        payload: result,
      });
      return result;
    } catch (e) {
      dispatch<VerificationConfirmRequirementActionTypes>({
        type: 'VERIFICATION_CONFIRM_REQUIREMENT_LOAD_FAILED',
      });
      return undefined;
    }
  };
}

const verificationConfirmRequirementActions = {
  getPendingByCompanyId,
  getById,
};

export default verificationConfirmRequirementActions;
