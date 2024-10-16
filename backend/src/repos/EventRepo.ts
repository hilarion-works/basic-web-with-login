import { IUser } from '@src/models/Sks';
import { getRandomInt } from '@src/util/misc';
import orm from './MockOrm';
import { Event } from '@src/models/index'

// **** Functions **** //
/**
 * Get all users.
 */
async function getAll(): Promise<any> {
  const data = await Event.findAll({raw: true})
  return data;
}


// **** Export default **** //

export default {
  getAll,
} as const;
