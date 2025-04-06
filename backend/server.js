import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import usersRouter from './routes/users.routes.js';
import fundsRouter from './routes/funds.routes.js';
import userDataRouter from './routes/userData.routes.js';

dotenv.config();

const app = express();
const frontURL = 'http://localhost:5173';
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());
app.use(cors({origin: frontURL, credentials: true}));

app.use('/auth', usersRouter);
app.use('/api', fundsRouter);
app.use('/api', userDataRouter);


app.listen(PORT, _ => {
    console.log(`server started at http://localhost:${PORT}`);
});