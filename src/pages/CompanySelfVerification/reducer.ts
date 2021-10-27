import { VerificationCriteria, VerificationDocument, VerificationProcess } from "../../types/models";

export const COMPANY_SELF_VERIFICATION_DETAIL_LOADING = 'COMPANY_SELF_VERIFICATION_DETAIL_LOADING';
export const COMPANY_SELF_VERIFICATION_DETAIL_LOADED = 'COMPANY_SELF_VERIFICATION_DETAIL_LOADED';
export const COMPANY_SELF_VERIFICATION_DETAIL_LOAD_FAILED = 'COMPANY_SELF_VERIFICATION_DETAIL_LOAD_FAILED';
export const COMPANY_SELF_VERIFICATION_DOCUMENTS_UPDATED = 'COMPANY_SELF_VERIFICATION_DOCUMENTS_UPDATED';
export const COMPANY_SELF_VERIFICATION_DOCUMENT_CREATED = 'COMPANY_SELF_VERIFICATION_DOCUMENT_CREATED';
export const COMPANY_SELF_VERIFICATION_DOCUMENT_EDITED = 'COMPANY_SELF_VERIFICATION_DOCUMENT_EDITED';
export const COMPANY_SELF_VERIFICATION_DOCUMENT_MODAL_STATE_CHANGED = 'COMPANY_SELF_VERIFICATION_DOCUMENT_MODAL_STATE_CHANGED';
export const COMPANY_SELF_VERIFICATION_CRITERIA_UPDATED = 'COMPANY_SELF_VERIFICATION_CRITERIA_UPDATED';
export const COMPANY_SELF_VERIFICATION_PROCESS_UPDATED = 'COMPANY_SELF_VERIFICATION_PROCESS_UPDATED';

interface CompanySelfVerificationDetailLoading {
  type: typeof COMPANY_SELF_VERIFICATION_DETAIL_LOADING;
};

interface CompanySelfVerificationDetailLoaded {
  type: typeof COMPANY_SELF_VERIFICATION_DETAIL_LOADED;
  payload: {
    editingProcess?: VerificationProcess;
    verificationCriterias: VerificationCriteria[];
    verificationDocuments: VerificationDocument[];
  };
};

interface CompanySelfVerificationDetailLoadFailed {
  type: typeof COMPANY_SELF_VERIFICATION_DETAIL_LOAD_FAILED;
};

interface CompanySelfVerificationDocumentCreated {
  type: typeof COMPANY_SELF_VERIFICATION_DOCUMENT_CREATED;
  payload: VerificationDocument;
};

interface CompanySelfVerificationDocumentEdited {
  type: typeof COMPANY_SELF_VERIFICATION_DOCUMENT_EDITED;
  payload?: VerificationDocument;
};

interface CompanySelfVerificationDocumentModalStateChanged {
  type: typeof COMPANY_SELF_VERIFICATION_DOCUMENT_MODAL_STATE_CHANGED;
  payload: boolean;
};

interface CompanySelfVerificationDocumentsUpdated {
  type: typeof COMPANY_SELF_VERIFICATION_DOCUMENTS_UPDATED;
  payload: VerificationDocument[];
};

interface CompanySelfVerificationCriteriaUpdated {
  type: typeof COMPANY_SELF_VERIFICATION_CRITERIA_UPDATED;
  payload: VerificationCriteria[];
}

interface CompanySelfVerificationProcessUpdated {
  type: typeof COMPANY_SELF_VERIFICATION_PROCESS_UPDATED;
  payload: VerificationProcess;
}

export type CompanySelfVerificationActionTypes =
  | CompanySelfVerificationDetailLoading
  | CompanySelfVerificationDetailLoaded
  | CompanySelfVerificationDetailLoadFailed
  | CompanySelfVerificationDocumentCreated
  | CompanySelfVerificationDocumentEdited
  | CompanySelfVerificationDocumentModalStateChanged
  | CompanySelfVerificationDocumentsUpdated
  | CompanySelfVerificationCriteriaUpdated
  | CompanySelfVerificationProcessUpdated;

export type CompanySelfVerificationState = {
  loading: boolean;
  verificationDocuments: VerificationDocument[];
  verificationCriterias: VerificationCriteria[];
  editingProcess?: VerificationProcess;
  editingDocument?: VerificationDocument;
  showEditingDocumentModal: boolean;
};

const initialState: CompanySelfVerificationState = {
  loading: false,
  verificationCriterias: [],
  verificationDocuments: [],
  editingProcess: undefined,
  editingDocument: undefined,
  showEditingDocumentModal: false,
};

const companySelfVerificationReducer = (
  state: CompanySelfVerificationState = initialState,
  action: CompanySelfVerificationActionTypes
): CompanySelfVerificationState => {
  switch (action.type) {
    case "COMPANY_SELF_VERIFICATION_DETAIL_LOADING":
      return {
        ...state,
        loading: true,
      };
    case "COMPANY_SELF_VERIFICATION_DETAIL_LOADED":
      return {
        ...state,
        loading: false,
        editingProcess: action.payload.editingProcess,
        verificationCriterias: action.payload.verificationCriterias,
        verificationDocuments: action.payload.verificationDocuments,
        editingDocument: undefined,
      };
    case "COMPANY_SELF_VERIFICATION_DETAIL_LOAD_FAILED":
      return {
        ...state,
        loading: false,
      }
    case "COMPANY_SELF_VERIFICATION_DOCUMENT_CREATED":
      return {
        ...state,
        verificationDocuments: [...state.verificationDocuments, action.payload],
      };
    case "COMPANY_SELF_VERIFICATION_DOCUMENT_EDITED":
      return {
        ...state,
        editingDocument: action.payload,
      };
    case "COMPANY_SELF_VERIFICATION_DOCUMENT_MODAL_STATE_CHANGED":
      return {
        ...state,
        showEditingDocumentModal: action.payload,
      };
    case "COMPANY_SELF_VERIFICATION_DOCUMENTS_UPDATED":
      return {
        ...state,
        verificationDocuments: action.payload,
      };
    case "COMPANY_SELF_VERIFICATION_CRITERIA_UPDATED":
      return {
        ...state,
        verificationCriterias: action.payload,
      };
    case "COMPANY_SELF_VERIFICATION_PROCESS_UPDATED":
      return {
        ...state,
        editingProcess: action.payload,
      };
    default:
      return state;
  }
};

export default companySelfVerificationReducer;
