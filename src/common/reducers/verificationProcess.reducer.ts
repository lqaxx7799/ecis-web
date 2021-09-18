import { VerificationCriteria, VerificationDocument, VerificationProcess } from '../../types/models';

export const VERIFICATION_PROCESS_LOADING = 'VERIFICATION_PROCESS_LOADING';
export const VERIFICATION_PROCESS_LOADED = 'VERIFICATION_PROCESS_LOADED';
export const VERIFICATION_PROCESS_LOAD_FAILED = 'VERIFICATION_PROCESS_LOAD_FAILED';
export const VERIFICATION_PROCESS_EDITING_LOADED = 'VERIFICATION_PROCESS_EDITING_LOADED';

interface VerificationProcessLoading {
  type: typeof VERIFICATION_PROCESS_LOADING;
};

interface VerificationProcessLoaded {
  type: typeof VERIFICATION_PROCESS_LOADED;
  payload: VerificationProcess[];
};

interface VerificationProcessLoadFailed {
  type: typeof VERIFICATION_PROCESS_LOAD_FAILED;
};

interface VerificationProcessEditingLoaded {
  type: typeof VERIFICATION_PROCESS_EDITING_LOADED;
  payload: {
    editingProcess: VerificationProcess,
    editingCriterias: VerificationCriteria[],
    editingDocuments: VerificationDocument[],
  },
};

export type VerificationProcessActionTypes = 
  | VerificationProcessLoading
  | VerificationProcessLoaded
  | VerificationProcessLoadFailed
  | VerificationProcessEditingLoaded;

export type VerificationProcessState = {
  records: VerificationProcess[];
  loading: boolean;
  editingProcess?: VerificationProcess | null;
  editingCriterias: VerificationCriteria[];
  editingDocuments: VerificationDocument[];
};

const initialState: VerificationProcessState = {
  records: [],
  loading: false,
  editingProcess: null,
  editingCriterias: [],
  editingDocuments: [],
};

const verificationProcessReducer = (state = initialState, action: VerificationProcessActionTypes): VerificationProcessState => {
  switch (action.type) {
    case VERIFICATION_PROCESS_LOADING:
      return {
        ...state,
        loading: true,
      };
    case VERIFICATION_PROCESS_LOADED:
      return {
        ...state,
        records: action.payload,
        loading: false,
      };
    case VERIFICATION_PROCESS_LOAD_FAILED:
      return {
        ...state,
        loading: false,
      };
    case VERIFICATION_PROCESS_EDITING_LOADED:
      return {
        ...state,
        loading: false,
        editingProcess: action.payload?.editingProcess,
        editingCriterias: action.payload?.editingCriterias,
        editingDocuments: action.payload?.editingDocuments,
      };
    default:
      return state;
  }
};

export default verificationProcessReducer;
