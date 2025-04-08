import { v4 } from "uuid";
import db from "../config/db.js";
import { error400, error401, error500 } from "../middlewares/errorHandlers.js"
import md5 from "md5";
import fs from 'fs';

const backUrl = 'http://localhost:3000';


export const getFunds = (req, res) => {

    const sql = `
        SELECT * 
        FROM funds AS f
        INNER JOIN images as i
        ON i.fund_id = f.id 
    `

    

    db.query(sql, (err, result) => {
        if(err) return error500(res, err);
        // res.json({success: true, data: result})
        result = result.map(r => (
        {
            ...r,
            url: r.url.indexOf('http') === 0 ? r.url : backUrl + '/uploads/' + r.url
        }))
        res.json({success: true, data: result})
    });
}

export const editFund = (req, res) => {
    const user_id = req.user.id;
    const fund_id = req.params.id;
    const {title, description, fund_goal, category} = req.body;
    console.log(title, description, fund_goal, category, fund_id, user_id)

    const sql = `
        UPDATE funds 
        SET title = ?, description = ?, fund_goal = ?, category = ?
        WHERE user_id = ? AND id = ?
    `

    db.query(sql, [title, description, fund_goal, category, user_id, fund_id], (err, result) =>{
        if(err) return error500(err, res)
        res.json({success: true, message: 'sekmingai pakeistas fondas'})    
    })
}


export const deleteFund = (req, res) => {
    const fund_id = req.params.id;
    
    const sql = `
        DELETE FROM funds WHERE id = ?
    `

    db.query(sql, fund_id, (err, result) => {
        if(err) return error500(err, res)
        res.json({success: true, message: 'pavyko sekmingai istringti'})
    })
}


const saveFundImageAsFile = imageBase64String => {

    if (!imageBase64String) {
        return null;
    }

    let type, image;

    if (imageBase64String.indexOf('data:image/png;base64,') === 0) {
        type = 'png';
        image = Buffer.from(imageBase64String.replace(/^data:image\/png;base64,/, ''), 'base64');
    } else if (imageBase64String.indexOf('data:image/jpeg;base64,') === 0) {
        type = 'jpg';
        image = Buffer.from(imageBase64String.replace(/^data:image\/jpeg;base64,/, ''), 'base64');
    } else if (imageBase64String.indexOf('data:image/webp;base64,') === 0) {
        type ='webp';
        image = Buffer.from(imageBase64String.replace(/^data:image\/webp;base64,/, ''), 'base64')
    } else {
        error400(res, 'Blogas paveiksliuko formatas');
        return;
    }

    const fileName = md5(v4()) + '.' + type;

    fs.writeFileSync('backend/public/uploads/' + fileName, image);

    return fileName;
}


export const saveFundImage = (req, res) => {
    const fund_id = req.body.fund_id;
    const dbImages = [];

    req.body.images.forEach(img => {
        const fileName = saveFundImageAsFile(img.src);
        const dbImage = {
            url: fileName,
            fund_id: fund_id,
            main: img.main ? 1 : 0
        }
        dbImages.push(dbImage);
    });
    const sql = `
            INSERT INTO images
            (fund_id, url, main)
            VALUES ?
        `;

    db.query(sql, [dbImages.map(i => [i.fund_id, i.url, i.main])], (err, result) => {
        if (err) return error500(err, res); 
        res.json({success: true, message: 'sekmingai ikelta'});
    })
}

export const createFund = (req, res) => {
    console.log('aaaaaaaa')
    const user_id = req.user.id;
    
    const {title, description, category, fund_goal} = req.body;

    if(!title || !description || !category || !fund_goal) {
        return error401(res, 'uzpildyk visus laukelius')
    }

    const votes = JSON.stringify({ l: [], d: [] });

    const sql = `
        INSERT INTO funds (user_id, title, description, category, fund_goal, votes)
        VALUES (?, ?, ?, ?, ?, ?)
    `   
    db.query(sql, [user_id, title, description, category, fund_goal, votes], (err, result) => {
        if(err) return error500(err, res);
        const fund_id = result.insertId;
        
        res.json({success: true, msg: 'sekmingai ikelti duomenis', data: fund_id});
    })
    
}

export const makeFund = (req, res) => {
    const id = req.params.id;
    const data = req.body.amount;
    console.log(data, id)
    const sql = `
        UPDATE funds
        SET funded = ?
        WHERE id = ?
    `

    db.query(sql, [data, id], (err, result) => {
        if(err) return error500(err, res);
        
        res.json({success: true, msg: 'sveikiname, PAAUKOJOTE, AČIŪ'});
    })
}




// app.get('/posts/load-posts/:page', (req, res) => {
//     const page = parseInt(req.params.page);

//     setTimeout(_ => {

//         const sql = `
//         SELECT p.id, p.content, p.created_at AS postDate, p.votes, u.name, u.avatar, i.url AS mainImage
//         FROM posts AS p
//         INNER JOIN users AS u
//         ON u.id = p.user_id
//         INNER JOIN images AS i
//         ON p.id = i.post_id AND i.main = 1
//         ORDER BY p.id DESC
//         LIMIT ? OFFSET ?
//     `;

//         con.query(sql, [postsPerPage, (page - 1) * postsPerPage], (err, result) => {
//             if (err) return error500(res, err);

//             result = result.map(r => (
//                 {
//                     ...r,
//                     votes: JSON.parse(r.votes),
//                     mainImage: r.mainImage.indexOf('http') === 0 ? r.mainImage : frontURL + '/upload/' + r.mainImage
//                 }
//             ));
//             res.json({
//                 success: true,
//                 db: result
//             });

//         });

//     }, 1500);
// });


export const fetchFundedHistory = (req, res) => {
    const id = req.user.id

    const sql = `
    SELECT * 
    FROM funds_history
`

db.query(sql, (err, result) => {
    if(err) return error500(err, res);
    
    res.json({success: true, data: result});
})
    
}

export const saveInFundedHistory = (req, res) => {
    const {fund_id, amount, name} = req.body;
    const sql = `
        INSERT INTO funds_history (name, amount, fund_id)
        VALUES (?, ?, ?)
    `

    db.query(sql, [name, amount, fund_id], (err, result) => {
        console.log('aaaaaaaa')
        if(err){
            console.log(result, err)
            return error500(err, res);
        } 
        
        res.json({success: true, msg: 'sekmingai ikelti duomenys'});
    })


}