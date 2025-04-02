import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import db from './config/db.js';// kol nera routeriu

const app = express()


app.listen(3000, _ => {
    console.log('serveris veikia per http://localhost:3000 porta')
})