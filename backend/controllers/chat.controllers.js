import db from "../config/db.js";
import { error500 } from "../middlewares/errorHandlers.js";

export const getChatUser = (req, res) => {
    const id = req.user.id;

    const sql = `
        SELECT * FROM users
    `

    db.query(sql, (err, result) => {
        if(err) return error500(err, res)
        res.json({success: true, data: result, user_id: id})
    })
}

export const getMessages = (req, res) => {
    const sender_id = req.user.id;
    const receiver_id = req.params.id

    const sql = `
        SELECT * FROM messages
        WHERE from_user = ? AND to_user = ?
        OR from_user = ? AND to_user = ?
        ORDER BY created_at
    `

    db.query(sql, [sender_id, receiver_id, receiver_id, sender_id], (err, result) => {
        if(err) return error500(err, res)
            console.log(result)
        res.json({success: true, data: result})
    })
}

export const saveMessageInDb = (req, res) => {
    const {receiver_id, sender_id, message} = req.body;
    // console.log(date, receiver_id, sender_id, content)
    console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaa')

    const sql = `
        INSERT INTO messages
        (from_user, to_user, message)
        VALUES (?, ?, ?)
    `

    db.query(sql, [sender_id, receiver_id, message], (err, result) => {
        if(err) return error500(err, res)
        res.json({success: true})
    })
}