"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("./api/db"));
const express_1 = __importDefault(require("express"));
require('dotenv').config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
(0, db_1.default)();
app.get('/', (req, res) => {
    try {
        res.json({
            message: 'It works!',
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Server Error',
        });
    }
});
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
