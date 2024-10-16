import HttpStatusCodes from '@src/common/HttpStatusCodes';

import EventService from '@src/services/EventService';
import User from '@src/models/Sks';
import response from '../util/response/response'

import { IReq, IRes } from './common/types';
import check from './common/check';


// **** Functions **** //

/**
 * Get all users.
 */
async function getAll(_: IReq, res: IRes) {
  const events = await EventService.getAll();
  response.success('success', res, events)
  // res.status(HttpStatusCodes.OK).json({ users });
}

// **** Export default **** //

export default {
  getAll,
} as const;
