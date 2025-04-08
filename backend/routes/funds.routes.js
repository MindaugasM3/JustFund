import express from 'express';
import { createFund, deleteFund, editFund, fetchFundedHistory, getFunds, makeFund, saveFundImage, saveInFundedHistory } from '../controllers/funds.controllers.js';
import { authMiddlewareToken } from '../middlewares/authMiddleware.js';

const fundsRouter = express.Router();

fundsRouter.get('/funds', getFunds);

fundsRouter.put('/fund/update/:id', authMiddlewareToken, editFund);

fundsRouter.delete('/fund/delete/:id', authMiddlewareToken, deleteFund);

fundsRouter.post('/fund/new', authMiddlewareToken, createFund);

fundsRouter.post('/fund/images', saveFundImage);

fundsRouter.put('/fund/fundit/:id', makeFund);

fundsRouter.get('/fund/funded/get', authMiddlewareToken, fetchFundedHistory)

fundsRouter.post('/fund/funded/save', authMiddlewareToken, saveInFundedHistory)

export default fundsRouter;