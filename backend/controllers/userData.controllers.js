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

    // const sql = `
    //     SELECT * 
    //     FROM funds AS f
    //     LEFT JOIN images as i
    //     ON i.fund_id = f.id
    //     WHERE user_id = ?
    // `

    const sql = `
        SELECT f.id, f.title, f.description, f.category, f.updated_at, f.funded, f.fund_goal, f.votes,
        i.url 
        FROM funds AS f
        LEFT JOIN images as i
        ON f.id = i.fund_id AND i.main = 1
        WHERE f.user_id = ?
    `

    db.query(sql, user_id, (err, result) => {
        if(err) return error500(err, res);
    
        res.json({success: true, data: result})
    });
}