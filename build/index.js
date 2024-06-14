"use strict";
/**
 * This is the main entry point of the API server.
 * It sets up the server, connects to the database, and defines the routes.
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.app = void 0;
const db_1 = __importStar(require("./api/db"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongodb_1 = require("mongodb");
require('dotenv').config();
const body_parser_1 = __importDefault(require("body-parser"));
exports.app = (0, express_1.default)();
const port = process.env.PORT || 3000;
// parse application/x-www-form-urlencoded
exports.app.use(body_parser_1.default.json({ type: 'application/*+json' }));
// parse application/json
exports.app.use(body_parser_1.default.json());
exports.app.use((0, cors_1.default)());
(0, db_1.default)();
/**
 * GET /
 * A simple test route to check if the server is running.
 * @param req - The request object.
 * @param res - The response object.
 */
exports.app.get('/', (req, res) => {
    try {
        res.status(200).json({
            message: 'It works!',
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Server Error',
        });
    }
});
/**
 * GET /item/all
 * Get all items from the database.
 * @param req - The request object.
 * @param res - The response object.
 * @returns A JSON response containing an array of items.
 */
exports.app.get('/items/all', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const posts = yield db_1.db.collection('posts').find().toArray();
        res.json({ docs: posts });
    }
    catch (error) {
        res.status(500).json({
            message: 'Server Error',
            error: JSON.stringify(error),
        });
    }
}));
/**
 * GET /item/:id
 * Get an item by its ID from the database.
 * @param req - The request object.
 * @param res - The response object.
 * @returns A JSON response containing the item.
 */
exports.app.get('/item/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const item = yield db_1.db.collection('posts').findOne({ _id: new mongodb_1.ObjectId(id) });
        res.json(item);
    }
    catch (error) {
        res.status(500).json({
            message: 'Server Error',
            error: JSON.stringify(error),
        });
    }
}));
exports.app.post('/item', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const item = req.body;
    console.log("Item::", item);
    if (!item || !item.title || !item.content || !item.author) {
        res.status(400).json({
            message: 'Fields are missing. Please provide title, content, and author.',
        });
    }
    else {
        try {
            const result = yield db_1.db.collection('posts').insertOne(item);
            res.json(result);
        }
        catch (error) {
            res.status(500).json({
                message: 'Server Error',
                error: JSON.stringify(error),
            });
        }
    }
}));
exports.app.listen(port, () => {
    console.log(`Server running on port https://localhost:${port}`);
});
