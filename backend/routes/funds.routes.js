import express from 'express';
import { createFund, deleteFund, editFund, getFunds, postImages } from '../controllers/funds.controllers.js';
import { authMiddlewareToken } from '../middlewares/authMiddleware.js';

const fundsRouter = express.Router();

fundsRouter.get('/funds', getFunds);

fundsRouter.put('/fund/update/:id', authMiddlewareToken, editFund);

fundsRouter.post('/fund/new', authMiddlewareToken, createFund);

fundsRouter.delete('/fund/delete/:id', authMiddlewareToken, deleteFund);

fundsRouter.post('/fund/images', authMiddlewareToken, postImages)

export default fundsRouter;