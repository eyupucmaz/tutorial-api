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
exports.seed = void 0;
const index_1 = require("./index");
const createSeed = () => {
    const posts = [];
    for (let i = 0; i < 50; i++) {
        posts.push({
            content: `This is a post ${i}. content`,
            title: `Post Title-${i}`,
            author: `Author-${i}`,
        });
    }
    return posts;
};
const seed = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const posts = createSeed();
        yield index_1.db.collection("posts").insertMany(posts);
        console.log("Database Seeded! 🌱");
        return { seedMsg: posts };
    }
    catch (error) {
        return { error: error };
    }
});
exports.seed = seed;
(0, exports.seed)();
