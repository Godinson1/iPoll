"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.redisConnection = exports.mongoConnection = void 0;
const mongo_1 = __importDefault(require("./mongo"));
exports.mongoConnection = mongo_1.default;
const redis_1 = __importDefault(require("./redis"));
exports.redisConnection = redis_1.default;
