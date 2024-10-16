import { RouteError } from '@src/common/classes';
import HttpStatusCodes from '@src/common/HttpStatusCodes';

import UserRepo from '@src/repos/UserRepo';
import { IUser } from '@src/models/Sks';
import EventRepo from '@src/repos/EventRepo';


// **** Variables **** //

export const USER_NOT_FOUND_ERR = 'User not found';


// **** Functions **** //

/**
 * Get all users.
 */
function getAll(): Promise<IUser[]> {
  const data = EventRepo.getAll()
  return data;
}

// **** Export default **** //

export default {
  getAll,
} as const;
