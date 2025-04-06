import jwt from "jsonwebtoken";
import db from "../config/db.js"
import { error400, error401, error500 } from "../middlewares/errorHandlers.js";
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config()

const SECRET_KEY = process.env.SECRET_KEY;
const tokenExpiration = process.env.tokenExpiration;



export const userAuthData = (req, res) => {
    const user_id = req.params.id;

    const sql = `
        SELECT * FROM users WHERE id = user_id
    `

    db.query(sql, [user_id], (err, result) => {
        if(err) error500(res, err);
        res.json({success: true, data: result})
    })

}

export const registerNewUser = (req, res) => {
    const {name, email, password} = req.body;

    if(!name || !email || !password){
        return error400(res, 'uzpildikyte visus laukelius');
    }

    const sql = `
        SELECT name, email, password FROM users WHERE name = ? AND email = ?
    `

    db.query(sql, [name, email], async (err, result) => {
        if (err) return error500(res, err);
        if (result.length > 0) {
            return error400(res, 'toks vardas ar email jau nadojamas');
        } 

        const userSql = `
            INSERT INTO users (name, email, password)
            VALUES (?, ?, ?)
        `
        const hashedPassword = await bcrypt.hash(password, 10);

        db.query(userSql, [name, email, hashedPassword], (err, result) => {
            if(err) return error500(res, err);
            res.json({success: true, message: 'Vartotojo registracija sekminga'});
        });
        
    });

}

export const getUserAuth = async (req, res) => {

    const {name, password, email} = req.body;
    console.log(name, password, email)
    const sql = `
        SELECT * FROM users WHERE name = ? OR email = ?
    `

    db.query(sql, [name, email], async (err, result) => {
        if(err) return error500(res, err);
        if (result.affectedRows === 0) {
            return error400(res, 'tokio vartotojo nerasta');
        }

        const user = result[0];
    
        const comparedPassword = await bcrypt.compare(password, user.password);
        if(!comparedPassword) return error401(res, 'neteisingas slaptazodis');

        const user_id = user.id;
        const token = jwt.sign({id: user.id}, SECRET_KEY, {expiresIn: tokenExpiration})
        res.cookie('token', token, {httpOnly: true, secure: true, maxAge: 3600000*24*7});
        
        res.json({success: true, message: 'Prisijungimas sekmingas', user_id});
    });
}

export const logoutUser = (req, res) => {
    console.log('aaa')
    res.clearCookie('token', {httpOnly: true, secure: false});
    res.json({success: true, message: 'Atsijungiai'})
}

// export const updateUser = (req, res) => {
    
// }

export const userAuthCheck = (req, res) => {
    const token = req.cookies?.token;

    if(!token) {
        error401(res, 'Neprisijunges')
    }

    try {
        const decocoded = jwt.verify(token, process.env.SECRET_KEY)
        req.user = decocoded;
        return res.json({success: true, message: `prisijunges`, user_id: req.user.id});
    } catch(error){
        return res.status(403).json({success: false, message: 'netinkamas tokenas'});
    }
}