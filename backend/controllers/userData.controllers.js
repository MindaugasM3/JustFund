import db from "../config/db.js";
import { error400, error500 } from "../middlewares/errorHandlers.js";

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

export const updateUserData = (req, res) => {
    const {name, email, user_description} = req.body;
    const id = req.user.id;
    console.log(name, email, user_description, id)

    if(!name || !id || !email || !user_description) {
        return error400(res, 'truksta duomenu')
    }

    const sql = `
        SELECT name, email FROM users WHERE name = ? AND email = ?
    `

    db.query(sql, [name, email], async (err, result) => {
        if (err) return error500(res, err);
        if (result.length > 1) {
            return error400(res, 'toks vardas ar email jau nadojamas');
        }


        const sql = `
            UPDATE users
            SET name = ?, email = ?, user_description = ?
            WHERE id = ?
        `

        db.query(sql, [name, email, user_description, id], (err, result) => {
            if(err) error500(err, res)
            res.json({success: true})

    })
    })
}