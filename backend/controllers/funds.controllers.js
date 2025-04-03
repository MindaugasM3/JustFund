import db from "../config/db.js";
import { error500 } from "../middlewares/errorHandlers.js"

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
    
}

export const deleteFund = (req, res) => {
    
}