import db from "../config/db.js";
import { error500 } from "../middlewares/errorHandlers.js";

export const getUserProfileData = (req, res) => {
    const user_id = req.user.id;

    const sql = `
        SELECT * 
        FROM users 
        WHERE id = ?
    `

    db.query(sql, user_id, (err, result) => {
        if(err) return error500(err, res);
    
        res.json({success: true, data: result[0]})
    });
}

export const getUserFunds = (req, res) => {
    const user_id = req.user.id;

    const sql = `
        SELECT * 
        FROM funds 
        WHERE user_id = ?
    `

    db.query(sql, user_id, (err, result) => {
        if(err) return error500(err, res);
    
        res.json({success: true, data: result})
    });
}