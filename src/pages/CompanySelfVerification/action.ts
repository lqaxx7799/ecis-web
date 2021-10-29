import { AppDispatch, RootState } from "../../app/store";
import criteriaActions from "../../common/actions/criteria.action";
import criteriaDetailActions from "../../common/actions/criteriaDetail.action";
import criteriaTypeActions from "../../common/actions/criteriaType.action";
import { AppThunk } from "../../common/actions/type";
import verificationCriteriaServices from "../../common/services/verificationCriteria.services";
import verificationDocumentServices from "../../common/services/verificationDocument.services";
import verificationProcessServices from "../../common/services/verificationProcess.services";
import { VerificationCriteria, VerificationDocument, VerificationProcess } from "../../types/models";
import { CompanySelfVerificationActionTypes } from "./reducer";

function createDocument(data: Partial<VerificationDocument>): AppThunk<Promise<VerificationDocument>> {
  return async (dispatch: AppDispatch) => {
    const document = await verificationDocumentServices.create(data);
    dispatch<CompanySelfVerificationActionTypes>({
      type: "COMPANY_SELF_VERIFICATION_DOCUMENT_CREATED",
      payload: document,
    });
    return document;
  };
}

function editDocument(data: VerificationDocument | undefined): AppThunk<void> {
  return (dispatch: AppDispatch) => {
    dispatch<CompanySelfVerificationActionTypes>({
      type: "COMPANY_SELF_VERIFICATION_DOCUMENT_EDITED",
      payload: data,
    });
  };
}

function changeEditDocumentModalState(state: boolean): AppThunk<void> {
  return (dispatch: AppDispatch) => {
    dispatch<CompanySelfVerificationActionTypes>({
      type: "COMPANY_SELF_VERIFICATION_DOCUMENT_MODAL_STATE_CHANGED",
      payload: state,
    });
  };
}

function updateDocument(data: Partial<VerificationDocument>): AppThunk<Promise<VerificationDocument>> {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    const updatedDocument = await verificationDocumentServices.update(data);
    const state = getState();
    const updatedDocuments = state.companySelfVerification.verificationDocuments.map(
      (document) => document.id === updatedDocument.id ? updatedDocument : document
    );
    dispatch<CompanySelfVerificationActionTypes>({
      type: "COMPANY_SELF_VERIFICATION_DOCUMENTS_UPDATED",
      payload: updatedDocuments,
    });
    return updatedDocument;
  };
}

function removeDocument(documentId: number): AppThunk<Promise<void>> {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    await verificationDocumentServices.remove(documentId);
    const state = getState();
    const updatedDocuments = state.companySelfVerification.verificationDocuments.filter(
      (document) => document.id !== documentId
    );
    dispatch<CompanySelfVerificationActionTypes>({
      type: "COMPANY_SELF_VERIFICATION_DOCUMENTS_UPDATED",
      payload: updatedDocuments,
    });
  };
}

function loadSelfVerification(processId: number): AppThunk<Promise<VerificationProcess | null>> {
  return async (dispatch: AppDispatch) => {
    dispatch<CompanySelfVerificationActionTypes>({
      type: 'COMPANY_SELF_VERIFICATION_DETAIL_LOADING',
    });
    try {
      const [process, criterias, documents] = await Promise.all([
        verificationProcessServices.getById(processId),
        verificationCriteriaServices.getAllByProcessId(processId),
        verificationDocumentServices.getAllByProcessId(processId),
        dispatch(criteriaActions.getAll()),
        dispatch(criteriaTypeActions.getAll()),
      ]);
      dispatch<CompanySelfVerificationActionTypes>({
        type: 'COMPANY_SELF_VERIFICATION_DETAIL_LOADED',
        payload: {
          editingProcess: process,
          verificationCriterias: criterias,
          verificationDocuments: documents,
        },
      });
      return process;
    } catch (e) {
      dispatch<CompanySelfVerificationActionTypes>({
        type: 'COMPANY_SELF_VERIFICATION_DETAIL_LOAD_FAILED',
      });
      return null;
    }
  };
}

function loadCurrentPendingSelfVerification(): AppThunk<Promise<VerificationProcess | null>> {
  return async (dispatch: AppDispatch, getState) => {
    const state = getState();
    const { company } = state.authentication;
    if (!company) {
      return null;
    }
    dispatch<CompanySelfVerificationActionTypes>({
      type: 'COMPANY_SELF_VERIFICATION_DETAIL_LOADING',
    });
    try {
      const process = await verificationProcessServices.getCurrentPendingByCompanyId(company.id);
      if (!process) {
        dispatch<CompanySelfVerificationActionTypes>({
          type: 'COMPANY_SELF_VERIFICATION_DETAIL_LOADED',
          payload: {
            editingProcess: undefined,
            verificationCriterias: [],
            verificationDocuments: [],
          },
        });
        return null;
      }
      const [criterias, documents] = await Promise.all([
        verificationCriteriaServices.getAllByProcessId(process.id),
        verificationDocumentServices.getAllByProcessId(process.id),
        dispatch(criteriaActions.getAll()),
        dispatch(criteriaTypeActions.getAll()),
        dispatch(criteriaDetailActions.getAll()),
      ]);
      dispatch<CompanySelfVerificationActionTypes>({
        type: 'COMPANY_SELF_VERIFICATION_DETAIL_LOADED',
        payload: {
          editingProcess: process,
          verificationCriterias: criterias,
          verificationDocuments: documents,
        },
      });
      return process;
    } catch (e) {
      dispatch<CompanySelfVerificationActionTypes>({
        type: 'COMPANY_SELF_VERIFICATION_DETAIL_LOAD_FAILED',
      });
      return null;
    }
  };
}

function loadLastSelfVerification(): AppThunk<Promise<VerificationProcess | null>> {
  return async (dispatch: AppDispatch, getState) => {
    const state = getState();
    const { company } = state.authentication;
    if (!company) {
      return null;
    }
    dispatch<CompanySelfVerificationActionTypes>({
      type: 'COMPANY_SELF_VERIFICATION_DETAIL_LOADING',
    });
    try {
      const process = await verificationProcessServices.getLastByCompanyId(company.id);
      if (!process) {
        dispatch<CompanySelfVerificationActionTypes>({
          type: 'COMPANY_SELF_VERIFICATION_DETAIL_LOADED',
          payload: {
            editingProcess: undefined,
            verificationCriterias: [],
            verificationDocuments: [],
          },
        });
        return null;
      }
      const [criterias, documents] = await Promise.all([
        verificationCriteriaServices.getAllByProcessId(process.id),
        verificationDocumentServices.getAllByProcessId(process.id),
        dispatch(criteriaActions.getAll()),
        dispatch(criteriaTypeActions.getAll()),
        dispatch(criteriaDetailActions.getAll()),
      ]);
      dispatch<CompanySelfVerificationActionTypes>({
        type: 'COMPANY_SELF_VERIFICATION_DETAIL_LOADED',
        payload: {
          editingProcess: process,
          verificationCriterias: criterias,
          verificationDocuments: documents,
        },
      });
      return process;
    } catch (e) {
      dispatch<CompanySelfVerificationActionTypes>({
        type: 'COMPANY_SELF_VERIFICATION_DETAIL_LOAD_FAILED',
      });
      return null;
    }
  };
}

function updateVerificationCriteria(data: Partial<VerificationCriteria>): AppThunk<Promise<VerificationCriteria>> {
  return async (dispatch: AppDispatch, getState) => {
    const criteria = await verificationCriteriaServices.update(data);
    const state = getState();
    const updatedCriterias = state.companySelfVerification.verificationCriterias.map(
      (item) => item.id !== criteria.id ? item : criteria
    );
    dispatch<CompanySelfVerificationActionTypes>({
      type: "COMPANY_SELF_VERIFICATION_CRITERIA_UPDATED",
      payload: updatedCriterias,
    });
    return criteria;
  };
}

function submitVerificationProcess(processId: number): AppThunk<Promise<VerificationProcess>> {
  return async (dispatch: AppDispatch) => {
    const process = await verificationProcessServices.submit(processId);
    dispatch<CompanySelfVerificationActionTypes>({
      type: "COMPANY_SELF_VERIFICATION_PROCESS_UPDATED",
      payload: process,
    });
    return process;
  }; 
}

const companySelfVerificationActions = {
  loadSelfVerification,
  loadCurrentPendingSelfVerification,
  loadLastSelfVerification,
  createDocument,
  editDocument,
  updateDocument,
  changeEditDocumentModalState,
  removeDocument,
  updateVerificationCriteria,
  submitVerificationProcess,
};

export default companySelfVerificationActions;