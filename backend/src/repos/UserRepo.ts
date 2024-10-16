import { IUser } from '@src/models/Sks';
import { getRandomInt } from '@src/util/misc';
import orm from './MockOrm';
import { User } from '@src/models/index'

// **** Functions **** //

/**
 * Get one user.
 */
async function getOne(email: string): Promise<IUser | null> {
  const db = await orm.openDb();
  for (const user of db.users) {
    if (user.email === email) {
      return user;
    }
  }
  return null;
}

/**
 * See if a user with the given id exists.
 */
async function persists(id: number): Promise<boolean> {
  const db = await orm.openDb();
  for (const user of db.users) {
    if (user.id === id) {
      return true;
    }
  }
  return false;
}

/**
 * Get all users.
 */
async function getAll(): Promise<any> {
  const data = await User.findAll({raw: true})
  return data;
}

async function getUserByEmail(email: string): Promise<any> {
  const data = await User.findOne({
    where: {
      email: email
    }
  });
  return data;
}

async function getUserById(id: number): Promise<any> {
  const data = await User.findOne({
    where: {
      id: id
    }
  });
  return data;
}


/**
 * Add one user.
 */
async function add(user: IUser): Promise<void> {
  const db = await orm.openDb();
  user.id = getRandomInt();
  db.users.push(user);
  return orm.saveDb(db);
}

/**
 * Update a user.
 */
async function update(user: IUser): Promise<void> {
  const db = await orm.openDb();
  for (let i = 0; i < db.users.length; i++) {
    if (db.users[i].id === user.id) {
      const dbUser = db.users[i];
      db.users[i] = {
        ...dbUser,
        name: user.name,
        email: user.email,
      };
      return orm.saveDb(db);
    }
  }
}

/**
 * Delete one user.
 */
async function delete_(id: number): Promise<void> {
  const db = await orm.openDb();
  for (let i = 0; i < db.users.length; i++) {
    if (db.users[i].id === id) {
      db.users.splice(i, 1);
      return orm.saveDb(db);
    }
  }
}


// **** Export default **** //

export default {
  getOne,
  persists,
  getAll,
  getUserByEmail,
  getUserById,
  add,
  update,
  delete: delete_,
} as const;
