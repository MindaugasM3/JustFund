import express from 'express';
import {getUserAuth, logoutUser, registerNewUser, updateUser, usersData} from '../controllers/users.controllers.js'

const usersRouter = express.Router();

usersRouter.get('/users', usersData)

usersRouter.post('/user/register', registerNewUser)

usersRouter.put('/user/update' ,updateUser)

usersRouter.get('/user/login', getUserAuth)

usersRouter.post('/user/logout', logoutUser)

// maybe delete?

export default usersRouter;