import express from 'express';
import { createFund, deleteFund, editFund, getFunds } from '../controllers/funds.controllers.js';

const fundsRouter = express.Router();

fundsRouter.get('/funds', getFunds);

fundsRouter.put('/fund/update/:id', editFund);

fundsRouter.post('/fund/new', createFund);

fundsRouter.delete('/fund/delete/:id', deleteFund);


export default fundsRouter;