import db from "../config/db.js"
import { error500 } from "../middlewares/errorHandlers.js"

export const getFundComments = (req, res) => {
    const id = req.params.id;
    const userID = req.user.id;

    const sql = `
        SELECT c.id, c.user_id, c.fund_id, c.content, c.created_at, u.name, u.avatar
        FROM comments AS c
        INNER JOIN users AS u
        ON c.user_id = u.id 
        WHERE c.fund_id = ?
    `

    db.query(sql, id, (err, result) => {
        if (err) return error500(err, res)
        res.json({success: true, data: result.map(data => (
    {...data, userID: userID}))})
    })
}

export const createNewComment = (req, res) => {
    const {fund_id, content} = req.body;
    const user_id = req.user.id;
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