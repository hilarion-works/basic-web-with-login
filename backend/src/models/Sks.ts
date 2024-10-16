import moment from 'moment';


// **** Variables **** //

const INVALID_CONSTRUCTOR_PARAM = 'nameOrObj arg must a string or an object ' + 
  'with the appropriate user keys.';

// export enum UserRoles {
//   Standard,
//   Admin,
// }

export interface UserRoles {
  id: number;
  name: string;
}


// **** Types **** //

export interface IUser {
  id: number;
  name: string;
  email: string;
  created_at: Date;
  role_id: number;
  password?: string;
}

export interface ISessionUser {
  id: number;
  email: string;
  name: string;
}


// **** Functions **** //

/**
 * Create new User.
 */
function new_(
  name?: string,
  email?: string,
  created_at?: Date,
  role?: number,
  password?: string,
  id?: number, // id last cause usually set by db
): IUser {
  return {
    id: (id ?? -1),
    name: (name ?? ''),
    email: (email ?? ''),
    created_at: (created_at ? new Date(created_at) : new Date()),
    role_id: (role ?? 1),
    ...( password ? { password } : {}),
  };
}

/**
 * Get user instance from object.
 */
function from(param: object): IUser {
  if (!isUser(param)) {
    throw new Error(INVALID_CONSTRUCTOR_PARAM);
  }
  return new_(param.name, param.email, param.created_at, param.id);
}

/**
 * See if the param meets criteria to be a user.
 */
function isUser(arg: unknown): arg is IUser {
  return (
    !!arg &&
    typeof arg === 'object' &&
    'id' in arg && typeof arg.id === 'number' && 
    'email' in arg && typeof arg.email === 'string' && 
    'name' in arg && typeof arg.name === 'string' &&
    'created_at' in arg && moment(arg.created_at as string | Date).isValid()
  );
}




// **** Export default **** //

export default {
  new: new_,
  from,
  isUser,
} as const;
