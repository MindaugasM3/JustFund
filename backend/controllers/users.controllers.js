import db from "../config/db.js"
import { error400, error500 } from "../middlewares/errorHandlers.js";

export const usersData = (req, res) => {
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
    const {name, email, password} = req.body.data;

    if(!name || !email || !password){
        return error400(res, 'uzpildikyte visus laukelius')
    }

    const sql = `
        SELECT name, email, password FROM users WHERE name = ? AND email = ?
    `

    db.query(sql, [name, email], (err, result) => {
        if (err) return error500(res, err)
        if (result.affectedRows > 0) {
            return error400(res, 'toks vardas ar email jau nadojamas')
        } 

        //token
    })

}

export const getUserAuth = (req, res) => {
    

    const sql = `
        SELECT * FROM users WHERE name = ? OR email = ?
    `

    db.query(sql, [name, email], (err, result) => {
        if(err) return error500(res, err);
        if (result.affectedRows === 0) {
            return error400(res, 'tokio vartotojo nerasta');
        }
    })
}

export const logoutUser = (req, res) => {
    // istrinti token
}

export const updateUser = (req, res) => {
    
}