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
  console.log("data all event: ", data);
  
  return data;
  // await Event.findAll({raw: true})
  //   .then((data) => {
  //     console.log("data: ", data);
  //     return data as unknown as Event
  //   })
  //   .catch((err) => {
  //     console.log("err: ", err);
  //     return err
  //   })
}


// **** Export default **** //

export default {
  getAll,
} as const;
