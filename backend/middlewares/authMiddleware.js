import jwt from 'jsonwebtoken';
import { error401 } from './errorHandlers.js';


export const authMiddlewareToken = (req, res, next) => {
    const token = req.cookies?.token;

    if(!token) {
        return error401(res, 'jokio tokeno');
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded;
        next();
    } catch(error) {
        return res.status(403).json({success: false, message: 'netinkamas tokenas'});
    }
}

export const getUserData = (req, res, next) => {
    const token = req.cookies?.token;

    if(!token) {
        req.userData = null;
        return next();
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded;
        next();
    } catch(error) {
        return res.status(403).json({success: false, message: 'netinkamas tokenas'});
    }
}