import express from 'express';
import {getUserAuth, logoutUser, registerNewUser, updateUser, usersData} from '../controllers/users.controllers.js'

const usersRouter = express.Router();

usersRouter.get('/user', usersData)

usersRouter.post('/register', registerNewUser)

usersRouter.put('auth/update' ,updateUser)

usersRouter.get('/auth/login', getUserAuth)

usersRouter.post('/auth/logout', logoutUser)

// maybe delete?

export default usersRouter;