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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = exports.upsertUser = exports.getAllUsers = void 0;
const dbConfig_1 = __importDefault(require("./dbConfig"));
const { Pool } = require('pg');
const pool = new Pool(dbConfig_1.default);
function getAllUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        return pool.query('SELECT * FROM users order by score desc');
    });
}
exports.getAllUsers = getAllUsers;
function getUserByName(user) {
    return __awaiter(this, void 0, void 0, function* () {
        return pool.query('SELECT FROM users WHERE name=$1', [user.name]);
    });
}
function upsertUser(user) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(user);
        try {
            const res = yield getUserByName(user);
            if (res.rowCount) {
                return updateUser(user);
            }
            else {
                return pool.query('INSERT INTO users(name, score) VALUES($1, $2)', [user.name, user.score]);
            }
        }
        catch (e) {
            console.log('upsertUser failed');
        }
    });
}
exports.upsertUser = upsertUser;
function updateUser(user) {
    return __awaiter(this, void 0, void 0, function* () {
        yield pool.query(`UPDATE users SET score=$1 WHERE name=$2;`, [user.score, user.name]);
    });
}
exports.updateUser = updateUser;
//# sourceMappingURL=postgres.js.map