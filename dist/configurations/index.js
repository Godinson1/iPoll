"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mongoConnection = exports.redisConnection = exports.handleRouteError = exports.defineRoutes = exports.defineExpressMiddlewares = void 0;
const express_1 = __importDefault(require("./middlewares/express"));
exports.defineExpressMiddlewares = express_1.default;
const routers_1 = __importDefault(require("./routers"));
exports.defineRoutes = routers_1.default;
const errorHandler_1 = __importDefault(require("./errorHandler"));
exports.handleRouteError = errorHandler_1.default;
const databases_1 = require("./databases");
Object.defineProperty(exports, "redisConnection", { enumerable: true, get: function () { return databases_1.redisConnection; } });
Object.defineProperty(exports, "mongoConnection", { enumerable: true, get: function () { return databases_1.mongoConnection; } });
