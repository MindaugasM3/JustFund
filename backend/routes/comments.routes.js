import express from 'express';
import { authMiddlewareToken, getUserData } from '../middlewares/authMiddleware.js';
import { createNewComment, getFundComments } from '../controllers/comments.controllers.js';

const commentsRouter = express.Router()

commentsRouter.get('/comments/:id', getUserData, getFundComments)

commentsRouter.post('/comments/create', authMiddlewareToken, createNewComment)

export default commentsRouter;