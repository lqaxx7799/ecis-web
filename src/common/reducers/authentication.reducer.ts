import { Account, Company, Role, ThirdParty } from '../../types/models';

export const AUTHENTICATION_AUTHENTICATED = 'AUTHENTICATION_AUTHENTICATED';
export const AUTHENTICATION_INIT = 'AUTHENTICATION_INIT';
export const AUTHENTICATION_LOG_OUT = 'AUTHENTICATION_LOG_OUT';
export const AUTHENTICATION_THIRD_PARTY_UPDATED = 'AUTHENTICATION_THIRD_PARTY_UPDATED';

interface AuthenticationAuthenticated {
  type: typeof AUTHENTICATION_AUTHENTICATED;
  payload: {
    account: Account;
    role: Role;
    company?: Company | null;
    thirdParty?: ThirdParty | null;
  };
};

interface AuthenticationInit {
  type: typeof AUTHENTICATION_INIT;
  payload: {
    account?: Account | null;
    role?: Role | null;
    company?: Company | null;
    thirdParty?: ThirdParty | null;
  };
};

interface AuthenticationLogOut {
  type: typeof AUTHENTICATION_LOG_OUT;
};

interface AuthenticationThirdPartyUpdated {
  type: typeof AUTHENTICATION_THIRD_PARTY_UPDATED;
  payload: ThirdParty;
};

export type AuthenticationActionTypes = 
  | AuthenticationAuthenticated
  | AuthenticationInit
  | AuthenticationLogOut
  | AuthenticationThirdPartyUpdated;

export type AuthenticationState = {
  account?: Account | null;
  company?: Company | null;
  thirdParty?: ThirdParty | null;
  role?: Role | null;
  isInit: boolean;
};

const initialState: AuthenticationState = {
  account: null,
  role: null,
  company: null,
  thirdParty: null,
  isInit: false,
};

const authenticationReducer = (state = initialState, action: AuthenticationActionTypes): AuthenticationState => {
  switch (action.type) {
    case AUTHENTICATION_AUTHENTICATED:
      return {
        ...state,
        ...action.payload,
      };
    case AUTHENTICATION_INIT:
      return {
        ...state,
        ...action.payload,
        isInit: true,
      };
    case AUTHENTICATION_LOG_OUT:
      return {
        ...state,
        account: null,
        role: null,
        company: null,
        thirdParty: null,
      };
    case AUTHENTICATION_THIRD_PARTY_UPDATED:
      return {
        ...state,
        thirdParty: action.payload,
      };
    default:
      return state;
  }
};

export default authenticationReducer;
