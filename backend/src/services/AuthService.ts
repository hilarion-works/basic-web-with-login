import UserRepo from '@src/repos/UserRepo';

import PwdUtil from '@src/util/PwdUtil';
import { tick } from '@src/util/misc';

import HttpStatusCodes from '@src/common/HttpStatusCodes';
import { RouteError } from '@src/common/classes';

import { IUser } from '@src/models/Sks';
import { User } from '@src/models';
import { generatePassword, checkPassword } from '@src/helpers/password'
import { generateToken } from '@src/helpers/jwtToken'

// **** Variables **** //

// Errors
export const Errors = {
  Unauth: 'Unauthorized',
  EmailNotFound(email: string) {
    return `User with email "${email}" not found`;
  },
} as const;


interface UserModel {
  id: number;
  role_id: number;
  name: string;
  email: string;
  password: string;
}
// **** Functions **** //

/**
 * Login a user.
 */
async function login(email: string, password: string): Promise<any> {
  let responseData = {
    message: "",
    flag: 0,
    token: ""
  }
  try {
    let user = await User.findOne({
      where: {
        email: email
      }
    });
    if (!user) {
      responseData.message = "User is not existed, please register"
      responseData.flag = 304
      return responseData
    }
    const newUser: UserModel = user!.get()  
    const statusCheck = await checkPassword(password, newUser.password, newUser.email)
    
    if (statusCheck) {
      const token = generateToken({id: newUser.id, role_id: newUser.role_id})
      responseData.message = "Access granted"
      responseData.flag = 200
      responseData.token = token
      return responseData;
    } else {
      responseData.message = "Incorrect password, please use the correct one"
      responseData.flag = 401
      return responseData
    }
  } catch (error) {
    responseData.message = error
    responseData.flag = 500
    return responseData
  }
}

/**
 * Register a user.
 */
async function register(email: string, password: string): Promise<any> {
  let responseData = {
    message: "",
    flag: 0,
    token: ""
  }
  try {
    const user = await UserRepo.getUserByEmail(email)
    if (!user) {
      const newPassword = await generatePassword(email, password)
      const data = {
        email: email,
        password: newPassword
      }
      const dataCreate = await User.create(data)
      const newUser: UserModel = dataCreate!.get()  
      const token = generateToken({id: newUser.id, role_id: newUser.role_id})
      responseData.message = "User successfuly created granted"
      responseData.flag = 200
      responseData.token = token
      return responseData;
    } else {
      responseData.message = "User is existed, please login"
      responseData.flag = 402
      return responseData
    }
  } catch (error) {
    responseData.message = error
    responseData.flag = 500
    return responseData
  }
}

// **** Export default **** //

export default {
  login,
  register,
} as const;
