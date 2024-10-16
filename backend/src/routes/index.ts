import { Router } from 'express';

import Paths from '@src/common/Paths';

import adminMw from './middleware/adminMw';
import AuthRoutes from './AuthRoutes';
import UserRoutes from './UserRoutes';
import EventRoutes from './EventRoutes';
import { checkToken } from './middleware/checkToken';
import { auth } from '@src/middleware/authLogin';


// **** Variables **** //

const apiRouter = Router();

// **** AuthRouter **** //
const authRouter = Router();
// Routes
authRouter.post(Paths.Auth.Login, AuthRoutes.login);
authRouter.post(Paths.Auth.Register, AuthRoutes.register);
authRouter.get(Paths.Auth.Logout, AuthRoutes.logout);

// Add AuthRouter
apiRouter.use(Paths.Auth.Base, authRouter);


// **** UserRouter **** //
const userRouter = Router();
// User Routes
userRouter.get(Paths.Users.Get, UserRoutes.getAll);
userRouter.post(Paths.Users.Add, UserRoutes.add);
userRouter.put(Paths.Users.Update, UserRoutes.update);
userRouter.delete(Paths.Users.Delete, UserRoutes.delete);

// Add UserRouter
// apiRouter.use(Paths.Users.Base, checkToken, userRouter);
apiRouter.use(Paths.Users.Base, userRouter);


// **** EventRouter **** //
const eventRouter = Router();
// User Routes
eventRouter.post(Paths.Event.Get, EventRoutes.getAll);

// Add UserRouter
// apiRouter.use(Paths.Users.Base, checkToken, userRouter);
apiRouter.use(Paths.Event.Base, auth, eventRouter);

// **** Export default **** //

export default apiRouter;
