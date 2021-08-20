import Cookies from "js-cookie";
import { LogInDTO } from "../../types/dto";
import request from "../utils/request";

function isLoggedIn(): boolean {
  return true;
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
  isLoggedIn,
  getToken,
  setToken,
};

export default authenticationServices;
