import db from "../config/db.js";
import { faker } from "@faker-js/faker";
import {createUser} from './usersFaker.js'
import { createFund } from "./fundsFaker.js";
import { createImage } from "./imagesFaker.js";
import { createComment } from "./commentsFaker.js";

const usersCount = 10;
const fundsCount = 10;
const imagesCount = 10;
const commentsCount = 10;
let sql;

db.query('ALTER TABLE funds DROP FOREIGN KEY funds_ibfk_1', err => {
    if (err) {
        console.log('Foreign key drop klaida', err)
    } else console.log('Foreign key drop sekmingas')
});

db.query('ALTER TABLE comments DROP FOREIGN KEY comments_ibfk_1', err => {
    if (err) {
        console.log('Foreign key drop klaida', err)
    } else console.log('Foreign key drop sekmingas')
});

db.query('ALTER TABLE comments DROP FOREIGN KEY comments_ibfk_2', err => {
    if (err) {
        console.log('Foreign key drop klaida', err)
    } else console.log('Foreign key drop sekmingas')
});

db.query('ALTER TABLE messages DROP FOREIGN KEY messages_ibfk_1', err => {
    if (err) {
        console.log('Foreign key drop klaida', err)
    } else console.log('Foreign key drop sekmingas')
});

db.query('ALTER TABLE messages DROP FOREIGN KEY messages_ibfk_2', err => {
    if (err) {
        console.log('Foreign key drop klaida', err)
    } else console.log('Foreign key drop sekmingas')
});

db.query('ALTER TABLE images DROP FOREIGN KEY images_ibfk_1', err => {
    if (err) {
        console.log('Foreign key drop klaida', err)
    } else console.log('Foreign key drop sekmingas')
});



const tables = ['images', 'messages', 'comments', 'funds', 'users']

const dropTables = async () => {
    for (const table of tables){
        try {   
            db.query(`DROP TABLE IF EXISTS \`${table}\``);
            console.log(`${table} table drop sekmingas`)
        }catch (err) {
            console.log(`klaida drop ${table}:`, err)
        }
    }
}

dropTables();

sql = `
    CREATE TABLE users (
        id int UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(100) NOT NULL UNIQUE,
        email VARCHAR(255) NOT NULL UNIQUE,
        user_description TEXT NULL,
        password VARCHAR(255) NOT NULL,
        role enum('guest', 'user','admin') NOT NULL DEFAULT 'guest',
        avatar VARCHAR(255) NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
`

db.query(sql, err => {
    if (err) {
        console.log('users table klaida', err);
    } else {
        console.log('users table sukurtas');
    }
})


sql = `
    CREATE TABLE funds (
        id int UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
        user_id int UNSIGNED NOT NULL,
        title VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        category VARCHAR(100) NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        funded DECIMAL(10, 2) NOT NULL DEFAULT 0,
        fund_goal DECIMAL(10, 2) NOT NULL,
        votes TEXT NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        INDEX (user_id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
`

db.query(sql, err => {
    if (err) {
        console.log('funds table klaida', err);
    } else {
        console.log('funds table sukurtas');
    }
})


sql = `
    CREATE TABLE comments (
        id int UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
        user_id int UNSIGNED NOT NULL,
        fund_id int UNSIGNED NOT NULL,
        content VARCHAR(512) NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (fund_id) REFERENCES funds(id) ON DELETE CASCADE,
        INDEX (user_id, fund_id),
        INDEX (fund_id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
`

db.query(sql, err => {
    if (err) {
        console.log('comments table klaida', err);
    } else {
        console.log('comments table sukurtas');
    }
})


sql = `
    CREATE TABLE messages (
        id int UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
        from_user int UNSIGNED NOT NULL,
        to_user int UNSIGNED NOT NULL,
        message VARCHAR(255) NOT NULL,
        seen BOOLEAN NOT NULL DEFAULT FALSE, 
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (from_user) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (to_user) REFERENCES users(id) ON DELETE CASCADE,
        INDEX (from_user, to_user),
        INDEX (to_user)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
`

db.query(sql, err => {
    if (err) {
        console.log('messages table klaida', err);
    } else {
        console.log('messages table sukurtas');
    }
})


sql = `
    CREATE TABLE images (
        id int UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
        fund_id int UNSIGNED NOT NULL, 
        url VARCHAR(255) NOT NULL,
        main BOOLEAN NOT NULL DEFAULT FALSE,
        FOREIGN KEY (fund_id) REFERENCES funds(id) ON DELETE CASCADE,
        INDEX (fund_id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
`

db.query(sql, err => {
    if (err) {
        console.log('images table klaida', err);
    } else {
        console.log('images table sukurtas');
    }
})




// const insertIntoUsers = async _ => {

const users = await Promise.all(
        faker.helpers.multiple(createUser, {count: usersCount})
    )

sql = `
    INSERT INTO users 
    (name, email, user_description, password, role, avatar) 
    VALUES ?
`

db.query(sql, [users.map(user => [
    user.name, 
    user.email, 
    user.user_description, 
    user.password, 
    user.role,
    user.avatar
])], err => {;
        if (err) {
            console.log('Klaida ikeliant user duomenys', err)
            reject()
        } else {
            console.log('Sekmingai ikelti users duomenys')
        }
})



const funds = await Promise.all(
    faker.helpers.multiple(createFund, {count: fundsCount})
)

sql = `
    INSERT INTO funds 
    (user_id, title, description, category, funded, fund_goal, votes) 
    VALUES ?
`

db.query(sql, [funds.map(fund => [
    fund.user_id, 
    fund.title, 
    fund.description, 
    fund.category, 
    fund.funded,
    fund.fund_goal,
    fund.votes
    ])], err => {;
        if (err) {
            console.log('Klaida ikeliant funds duomenys', err)
        } else {
            console.log('Sekmingai ikelti funds duomenys')
        }
});

const comments = await Promise.all(
    faker.helpers.multiple(createComment, {count: commentsCount})
)

sql = `
    INSERT INTO comments
    (user_id, fund_id, content) 
    VALUES ?
`

db.query(sql, [comments.map(comment => [
    comment.user_id, 
    comment.fund_id, 
    comment.content, 
    ])], err => {;
        if (err) {
            console.log('Klaida ikeliant comments duomenys', err)
        } else {
            console.log('Sekmingai ikelti comments duomenys')
        }
});




const images = await Promise.all(
    faker.helpers.multiple(createImage, {count: imagesCount})
)

sql = `
    INSERT INTO images 
    (fund_id, url, main) 
    VALUES ?
`

db.query(sql, [images.map(image => [
    image.fund_id, 
    image.url, 
    image.main, 
    ])], err => {;
        if (err) {
            console.log('Klaida ikeliant images duomenys', err)
        } else {
            console.log('Sekmingai ikelti images duomenys')
        }
});

