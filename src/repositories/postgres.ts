import { IUser } from '../entities/interfaces'
import postgresConnection from './dbConfig';

const { Pool } = require('pg');

const pool = new Pool(postgresConnection);

export async function getAllUsers() {
    return pool.query('SELECT * FROM users order by score desc');
}

async function getUserByName(user: IUser) {
    return pool.query('SELECT FROM users WHERE name=$1', [user.name]);
}

export async function upsertUser(user: IUser) {
    console.log(user);
    try {
        const res = await getUserByName(user);
        if (res.rowCount) {
            return updateUser(user);
        } else {
            return pool.query('INSERT INTO users(name, score) VALUES($1, $2)', [user.name, user.score]);
        }
    } catch (e) {
        console.log('upsertUser failed');
    }
}

export async function updateUser(user: IUser) {
    await pool.query(`UPDATE users SET score=$1 WHERE name=$2;`, [user.score, user.name]);
}