import express from 'express';
import { authMiddlewareToken } from '../middlewares/authMiddleware.js';
import { getChatUser } from '../controllers/chat.controllers.js';

const chatRouter = express.Router()

chatRouter.get('/get/users', authMiddlewareToken, getChatUser);

export default chatRouter;