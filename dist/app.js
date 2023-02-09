"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const postgres_1 = require("./repositories/postgres");
const express = require('express');
var cors = require('cors');
var fs = require('fs');
const app = express();
const port = 3001;
app.use(cors());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
// app.use(bodyParser.json());
app.get('/leaderboard', (req, res) => {
    (0, postgres_1.getAllUsers)().then((data) => res.send(data.rows));
});
app.post('/upsertUser', (req, res) => {
    console.log('post');
    console.log(req.body);
    (0, postgres_1.upsertUser)(req.body.user).then(() => res.json('ok'));
});
app.post('/updateUser', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let user = req.body.user;
    yield (0, postgres_1.updateUser)(user);
    res.send("ok");
}));
app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
//# sourceMappingURL=app.js.map