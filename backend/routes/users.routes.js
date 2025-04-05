import express from 'express';
import {getUserAuth, logoutUser, registerNewUser, updateUser, usersData} from '../controllers/users.controllers.js'

const usersRouter = express.Router();

usersRouter.get('/users', usersData)

usersRouter.post('/user/register', registerNewUser)

usersRouter.put('/user/update' ,updateUser)

usersRouter.post('/user/login', getUserAuth)

usersRouter.delete('/user/logout', logoutUser)

// maybe delete?

export default usersRouter;