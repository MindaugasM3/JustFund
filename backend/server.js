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
import http from 'http';
import {Server} from 'socket.io';
import chatRouter from './routes/chat.routes.js';

dotenv.config();

const app = express();
const frontURL = 'http://localhost:5173';
const PORT = process.env.PORT || 3000;

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: frontURL, 
        methods: ["GET", "POST"],
        credentials: true
    }
});

app.use(cors({origin: frontURL, credentials: true}));

io.on('connection', socket => {
    console.log('naudotojas prisijunge:', socket.id)

    socket.on('sendMessage', message => {
        console.log('zinute gauta:', message)

        io.emit('receiveMessage', message)
    });

    socket.on('disconnect', _ => {
        console.log('naudotojas atsijunge:', socket.id)
    })
})


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));


app.use(express.json({limit: '50mb'}));
app.use(cookieParser());
// app.use(cors({origin: frontURL, credentials: true}));

app.use('/auth', usersRouter);
app.use('/api', fundsRouter);
app.use('/api', userDataRouter);
app.use('/api', commentsRouter);
app.use('/chat', chatRouter)


server.listen(PORT, _ => {
    console.log(`server + Socket.IO started on http://localhost:${PORT}`);
});