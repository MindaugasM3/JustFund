import express from 'express';
import { authMiddlewareToken, getUserData } from '../middlewares/authMiddleware.js';
import { createNewComment, deleteComment, getFundComments, updateFundComment } from '../controllers/comments.controllers.js';

const commentsRouter = express.Router()

commentsRouter.get('/comments/:id', getUserData, getFundComments);

commentsRouter.post('/comments/create', authMiddlewareToken, createNewComment);

commentsRouter.put('/comments/update', authMiddlewareToken, updateFundComment);

commentsRouter.delete('/comments/delete/:id', authMiddlewareToken, deleteComment);

export default commentsRouter;