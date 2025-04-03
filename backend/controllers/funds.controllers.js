import { error500 } from "../middlewares/errorHandlers.js"

export const getFunds = (req, res) => {
    
    db.query('SELECT * FROM funds', (err, result) => {
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