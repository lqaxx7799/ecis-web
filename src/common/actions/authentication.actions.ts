import { AppActions, AppDispatch } from "../../app/store";
import { LogInDTO } from "../../types/dto";
import { Account, ThirdParty } from "../../types/models";
import { AuthenticationActionTypes } from "../reducers/authentication.reducer";
import authenticationServices from "../services/authentication.services";
import companyServices from "../services/company.services";
import roleServices from "../services/role.services";
import thirdPartyServices from "../services/thirdParty.services";
import { AppThunk } from "./type";

function authenticate(payload: LogInDTO): AppThunk<Promise<Account>> {
  return async (dispatch: AppDispatch) => {
    try {
      const account = await authenticationServices.authenticate(payload) as Account & {
        token: string;
      };
      authenticationServices.setToken(account.token);

      const role = await roleServices.getById(account.roleId);
      if (role.roleName === 'Company') {
        const company = await companyServices.getByAccountId(account.id);
        dispatch<AuthenticationActionTypes>({
          type: 'AUTHENTICATION_INIT',
          payload: {
            account,
            role,
            company,
          },
        });
      } else if (role.roleName === 'ThirdParty') {
        const thirdParty = await thirdPartyServices.getByAccountId(account.id);
        dispatch<AuthenticationActionTypes>({
          type: 'AUTHENTICATION_INIT',
          payload: {
            account,
            role,
            thirdParty,
          },
        });
      }
      return account;
    } catch (e) {
      throw e;
    }
  }
}

function validate(): AppThunk<Promise<Account>> {
  return async (dispatch: AppDispatch) => {
    try {
      const account = await authenticationServices.validate() as Account;

      const role = await roleServices.getById(account.roleId);
      if (role.roleName === 'Company') {
        const company = await companyServices.getByAccountId(account.id);
        dispatch<AuthenticationActionTypes>({
          type: 'AUTHENTICATION_INIT',
          payload: {
            account,
            role,
            company,
          },
        });
      } else if (role.roleName === 'ThirdParty') {
        const thirdParty = await thirdPartyServices.getByAccountId(account.id);
        dispatch<AuthenticationActionTypes>({
          type: 'AUTHENTICATION_INIT',
          payload: {
            account,
            role,
            thirdParty,
          },
        });
      }
      return account;
    } catch (e) {
      dispatch<AuthenticationActionTypes>({
        type: 'AUTHENTICATION_INIT',
        payload: {},
      });
      throw e;
    }
  } 
}

function thirdPartyResetSecret(): AppThunk<Promise<ThirdParty>> {
  return async (dispatch: AppDispatch, getState) => {
    const state = getState();
    const thirdPartyId = state.authentication?.thirdParty?.id ?? 0;
    const thirdParty = await thirdPartyServices.resetSecret(thirdPartyId);
    dispatch<AuthenticationActionTypes>({
      type: 'AUTHENTICATION_THIRD_PARTY_UPDATED',
      payload: thirdParty,
    });
    return thirdParty;
  };
}

function logOut(): AppThunk<void> {
  return (dispatch: AppDispatch) => {
    dispatch<AuthenticationActionTypes>({
      type: 'AUTHENTICATION_LOG_OUT',
    });
    authenticationServices.removeToken();
    window.location.reload();
  }
}

const authenticationActions = {
  authenticate,
  validate,
  logOut,
  thirdPartyResetSecret,
};

export default authenticationActions;
