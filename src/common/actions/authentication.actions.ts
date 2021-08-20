import { AppDispatch } from "../../app/store";
import { LogInDTO } from "../../types/dto";
import { Account } from "../../types/models";
import authenticationServices from "../services/authentication.services";
import { AppThunk } from "./type";

function authenticate(payload: LogInDTO): AppThunk<Promise<Account>> {
  return async (dispatch: AppDispatch) => {
    try {
      const account = await authenticationServices.authenticate(payload) as Account & {
        token: string;
      };
      dispatch({
        type: 'AUTHENTICATION_AUTHENTICATED',
        payload: account,
      });
      authenticationServices.setToken(account.token);
      return account;
    } catch (e) {
      throw e;
    }
  }
}

const authenticationActions = {
  authenticate,
};

export default authenticationActions;
