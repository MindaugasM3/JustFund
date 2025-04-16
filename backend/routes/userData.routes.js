import express from 'express';
import { getUserFunds, getUserProfileData, updateUserData } from '../controllers/userData.controllers.js';
import { authMiddlewareToken } from '../middlewares/authMiddleware.js';

const userDataRouter = express.Router()


userDataRouter.get('/user/data', authMiddlewareToken, getUserProfileData);

userDataRouter.get('/user/funds', authMiddlewareToken, getUserFunds);

userDataRouter.put('/user/update', authMiddlewareToken, updateUserData)


export default userDataRouter;
