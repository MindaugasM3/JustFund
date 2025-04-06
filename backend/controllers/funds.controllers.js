import db from "../config/db.js";
import { error401, error500 } from "../middlewares/errorHandlers.js"

export const getFunds = (req, res) => {

    const sql = `
        SELECT * 
        FROM funds AS f
        INNER JOIN images as i
        ON i.fund_id = f.id
    `
    
    db.query(sql, (err, result) => {
        if(err) return error500(res, err);
        res.json({success: true, data: result})
    });
}

export const editFund = (req, res) => {
    
}

export const createFund = (req, res) => {
    const user_id = req.user.id;
    const {title, description, category, fund_goal} = req.boyd.data;

    if(!title || !description || !category || !fund_goal) {
        return error401(res, 'uzpildyk visus laukelius')
    }

    const sql = `
        INSERT INTO funds (user_id, title, description, category, fund_goal)
        VALUES (?, ?, ?)
    `

    db.query(sql, [user_id, title, description, category, fund_goal], (err, result) => {
        if(err) return error500(err, res);
        res.json({success: true, msg: 'sekmingai ikelti duomenis'});
    })
    
}

export const deleteFund = (req, res) => {
    
}

export const postImages = (req, res) => {

}