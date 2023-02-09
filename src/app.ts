import { upsertUser, getAllUsers, updateUser } from './repositories/postgres'
import bodyParser from 'body-parser';
import { IUser } from './entities/interfaces';

const express = require('express')
var cors = require('cors')
var fs = require('fs');

const app = express()
const port = 3001

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/leaderboard', (req, res) => {
    getAllUsers().then((data) => res.send(data.rows))
});

app.post('/upsertUser', (req, res) => {
    console.log('post');
    console.log(req.body);
    upsertUser(req.body.user).then(() => res.json('ok'))
});

app.post('/updateUser', async (req, res) => {
    let user: IUser = req.body.user;

    await updateUser(user);
    res.send("ok")
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
});