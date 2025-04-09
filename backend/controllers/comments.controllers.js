import db from "../config/db.js"
import { error500 } from "../middlewares/errorHandlers.js"

export const getFundComments = (req, res) => {
    const id = req.params
    console.log(id)

    const sql = `
        SELECT * 
        FROM comments AS c
        INNER JOIN users AS u
        WHERE c.fund_id = ?
    `

    db.query(sql, id, (err, result) => {
        if (err) return error500(err, res)
        res.json({success: true, data: result})
    })
}

export const createNewComment = (req, res) => {
    const {user_id, fund_id, content} = req.body;
    console.log(req.body);

    if(!user_id ||!fund_id || !content) {
        return error500(err, res)
    }

    const sql = `
        INSERT INTO comments (user_id, fund_id, content) 
        VALUES (?, ?, ?)
    `

    db.query(sql, [user_id, fund_id, content], (err, result) => {
        if (err) return error500(err, res)
        res.json({success: true, msg: 'Pavyko irasyti duomenys!'})
    })
}