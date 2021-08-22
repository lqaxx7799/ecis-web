import { Account } from '../../types/models';

export const AUTHENTICATION_AUTHENTICATED = 'AUTHENTICATION_AUTHENTICATED';
export const AUTHENTICATION_INIT = 'AUTHENTICATION_INIT';

interface AuthenticationAuthenticated {
  type: typeof AUTHENTICATION_AUTHENTICATED;
  payload: Account;
};

interface AuthenticationInit {
  type: typeof AUTHENTICATION_INIT;
  payload: Account | null | undefined;
};

export type AuthenticationActionTypes = 
  | AuthenticationAuthenticated
  | AuthenticationInit;

export type AuthenticationState = {
  account: Account | null | undefined;
  isInit: boolean;
};

const initialState: AuthenticationState = {
  account: null,
  isInit: false,
};

const authReducer = (state = initialState, action: AuthenticationActionTypes): AuthenticationState => {
  switch (action.type) {
    case AUTHENTICATION_AUTHENTICATED:
      return {
        ...state,
        account: action.payload,
      };
    case AUTHENTICATION_INIT:
      return {
        ...state,
        account: action.payload,
        isInit: true,
      };
    default:
      return state;
  }
};

export default authReducer;
