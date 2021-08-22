import Cookies from "js-cookie";
import { LogInDTO } from "../../types/dto";
import request from "../utils/request";
import { store } from "../../app/store";

function isLoggedIn(roles: number[] | undefined): boolean {
  const state = store.getState();
  const { isInit, account } = state.authentication;
  if (!isInit) {
    return true;
  }
  if (!account) {
    return false;
  }
  if (roles) {
    return roles.includes(account.roleId);
  }
  return true;
}

function validate() {
  return request.get('/Authentication/Validate');
}

function authenticate(payload: LogInDTO) {
  return request.post('/Authentication/Authenticate', payload);
}

function getToken() {
  return Cookies.get('appToken');
}

function setToken(token: string) {
  Cookies.set('appToken', token);
}

const authenticationServices = {
  authenticate,
  validate,
  isLoggedIn,
  getToken,
  setToken,
};

export default authenticationServices;
