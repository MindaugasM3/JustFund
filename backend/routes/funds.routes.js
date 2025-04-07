import express from 'express';
import { createFund, deleteFund, editFund, getFunds, saveFundImage } from '../controllers/funds.controllers.js';
import { authMiddlewareToken } from '../middlewares/authMiddleware.js';

const fundsRouter = express.Router();

fundsRouter.get('/funds', getFunds);

fundsRouter.put('/fund/update/:id', authMiddlewareToken, editFund);

fundsRouter.delete('/fund/delete/:id', authMiddlewareToken, deleteFund);

fundsRouter.post('/fund/new', authMiddlewareToken, createFund);

fundsRouter.post('/fund/images', saveFundImage)

export default fundsRouter;