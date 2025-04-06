import express from 'express';
import { getUserFunds, getUserProfileData } from '../controllers/userData.controllers.js';
import { authMiddlewareToken } from '../middlewares/authMiddleware.js';

const userDataRouter = express.Router()


userDataRouter.get('/user/data', authMiddlewareToken, getUserProfileData);

userDataRouter.get('/user/funds', authMiddlewareToken, getUserFunds);


export default userDataRouter;
