import express from 'express';
import { authMiddlewareToken } from '../middlewares/authMiddleware.js';
import { getChatUser, getMessages, saveMessageInDb } from '../controllers/chat.controllers.js';

const chatRouter = express.Router()

chatRouter.get('/get/users', authMiddlewareToken, getChatUser);

chatRouter.get('/get/messages/:id', authMiddlewareToken, getMessages);

chatRouter.post('/save/message', authMiddlewareToken, saveMessageInDb);

export default chatRouter;