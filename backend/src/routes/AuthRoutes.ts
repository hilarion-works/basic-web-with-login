import lodash from 'lodash';

import HttpStatusCodes from '@src/common/HttpStatusCodes';
import SessionUtil from '@src/util/SessionUtil';
import AuthService from '@src/services/AuthService';

import { IReq, IRes } from './common/types';
import check from './common/check';
import response from '@src/util/response/response';
// import { generatePassword, checkPassword } from '@src/helpers/password';

// **** Functions **** //

/**
 * Login a user.
 */
type BodyData = {
  email: string;
  password: string;
}
async function login(req: IReq, res: IRes) {
  try {
    const reqBody = req.body as BodyData
    const email = reqBody.email
    const password = reqBody.password
    if (lodash.isEmpty(email) || lodash.isEmpty(password)) {
      return response.error("email or password cannot be empty", res, 301)
    }
    
    const result = await AuthService.login(email, password);
    if (result.flag === 200) {
      const dataResponse = {
        token: result.token
      }
      return response.success('success', res, dataResponse)
    } else {
      return response.error(result.message, res, result.flag)
    }
  } catch (error) {
    return response.serverError("Server error", res, 500)
  }
  // res.status(HttpStatusCodes.OK).end();
}

/**
 * Logout the user.
 */
function logout(_: IReq, res: IRes) {
  SessionUtil.clearCookie(res);
  res.status(HttpStatusCodes.OK).end();
}

async function register(req: IReq, res: IRes) {
  try {
    const reqBody = req.body as BodyData
    const email = reqBody.email
    const password = reqBody.password
    if (lodash.isEmpty(email) || lodash.isEmpty(password)) {
      return response.error("email or password cannot be empty", res, 301)
    }
    const result = await AuthService.register(email, password);
    if (result.flag === 200) {
      const dataResponse = {
        token: result.token
      }
      return response.success('success', res, dataResponse)
    } else {
      return response.error(result.message, res, result.flag)
    }
  } catch (error) {
    return response.serverError("Server error", res, 500)
  }
}

// **** Export default **** //

export default {
  login,
  logout,
  register,
} as const;
