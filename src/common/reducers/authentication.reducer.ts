import { Account } from '../../types/models';

export const AUTHENTICATION_AUTHENTICATED = 'AUTHENTICATION_AUTHENTICATED';

interface AuthenticationAuthenticated {
  type: typeof AUTHENTICATION_AUTHENTICATED;
  payload: Account;
};

export type AuthenticationActionTypes = 
  | AuthenticationAuthenticated;

export type AuthenticationState = {
  account: Account | null | undefined;
};

const initialState: AuthenticationState = {
  account: null,
};

const authReducer = (state = initialState, action: AuthenticationActionTypes) => {
  switch (action.type) {
    case AUTHENTICATION_AUTHENTICATED:
      return {
        ...state,
        account: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
