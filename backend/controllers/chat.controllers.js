import db from "../config/db.js";
import { error500 } from "../middlewares/errorHandlers.js";

export const getChatUser = (req, res) => {
    const id = req.user.id;
    console.log('aaaaaaaaa')

    const sql = `
        SELECT * FROM users
    `

    db.query(sql, (err, result) => {
        if(err) return error500(err, res)
        res.json({success: true, data: result, user_id: id})
    })
}