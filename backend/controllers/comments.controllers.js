import db from "../config/db.js"
import { error400, error500 } from "../middlewares/errorHandlers.js"

export const getFundComments = (req, res) => {
    const id = req.params.id;
    const userID = req.user.id;

    const sql = `
        SELECT c.id, c.user_id, c.fund_id, c.content, c.created_at, u.name, u.avatar
        FROM comments AS c
        INNER JOIN users AS u
        ON c.user_id = u.id 
        WHERE c.fund_id = ?
        ORDER BY c.created_at DESC
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

export const updateFundComment = (req, res) => {
    const {content, id} = req.body;
    const user_id = req.user.id;
    console.log(req.body)

    if(!user_id || !content || !id) {
        return error400(res, 'truksta informacijos')
    }

    const sql = `
        UPDATE comments 
        SET content = ? 
        WHERE user_id = ? AND id = ?
    `

    db.query(sql, [content, user_id, id], (err, result) => {
        if (err) return error500(err, res)
        res.json({success: true, msg: 'Pavyko irasyti duomenys!'})
    })
}

export const deleteComment = (req, res) => {
    const id = req.params.id;
    const user_id = req.user.id;
    console.log(id, user_id)

    if(!user_id || !id) {
        return error400(res, 'truksta informacijos')
    }

    const sql = `
        DELETE FROM comments 
        WHERE user_id = ? AND id = ?
    `

    db.query(sql, [user_id, id], (err, result) => {
        if (err) return error500(err, res)
        res.json({success: true, msg: 'Pavyko ištrinti duomenys!'})
    })
}