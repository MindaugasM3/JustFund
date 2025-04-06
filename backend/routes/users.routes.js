import express from 'express';
import {getUserAuth, logoutUser, registerNewUser, userAuthCheck, userAuthData} from '../controllers/users.controllers.js'

const usersRouter = express.Router();

usersRouter.get('/users', userAuthData)

usersRouter.post('/user/register', registerNewUser)

// usersRouter.put('/user/update', updateUser)

usersRouter.post('/user/login', getUserAuth)

usersRouter.delete('/user/logout', logoutUser)

usersRouter.get('/user', userAuthCheck)

// maybe delete?

export default usersRouter;