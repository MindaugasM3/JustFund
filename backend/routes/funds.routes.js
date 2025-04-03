import express from 'express';
import { createFund, deleteFund, editFund, getFunds } from '../controllers/funds.controllers.js';

const fundsRouter = express.Router();

fundsRouter.get('/fetch', getFunds);

fundsRouter.put('/update/:id', editFund);

fundsRouter.post('/new', createFund);

fundsRouter.delete('/delete/:id', deleteFund);


export default fundsRouter;