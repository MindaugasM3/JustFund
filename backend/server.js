import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import usersRouter from './routes/users.routes.js';
import fundsRouter from './routes/funds.routes.js';
import userDataRouter from './routes/userData.routes.js';
import path from "path";
import { fileURLToPath } from 'url';
import commentsRouter from './routes/comments.routes.js';

dotenv.config();

const app = express();
const frontURL = 'http://localhost:5173';
const PORT = process.env.PORT || 3000;


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));


app.use(express.json({limit: '50mb'}));
app.use(cookieParser());
app.use(cors({origin: frontURL, credentials: true}));

app.use('/auth', usersRouter);
app.use('/api', fundsRouter);
app.use('/api', userDataRouter);
app.use('/api', commentsRouter);


app.listen(PORT, _ => {
    console.log(`server started at http://localhost:${PORT}`);
});