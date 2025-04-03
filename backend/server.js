import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import usersRouter from './routes/users.routes.js';
import fundsRouter from './routes/funds.routes.js';

dotenv.config()

const frontURL = 'http://localhost:5173';
const PORT = process.env.PORT || 3000;
const SECRET_KEY = process.env.SECRET_KEY;

const app = express();

app.use('/user', usersRouter)
app.use('/funds', fundsRouter)


app.listen(PORT, _ => {
    console.log(`server started at http://localhost:${PORT}`);
});