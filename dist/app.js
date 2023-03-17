"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const configurations_1 = require("./configurations");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = express_1.default();
//Define middlewares
app.use(express_1.default.json());
configurations_1.defineExpressMiddlewares(app);
//Define Routes and file configuration
configurations_1.defineRoutes(app);
app.use(express_1.default.static(path_1.default.join(__dirname, "../client/build")));
console.log(path_1.default.join(__dirname, "../client/build"));
app.get("*", (req, res) => {
    res.sendFile(path_1.default.join(__dirname, "../client/build/index.html"));
});
// Error handler
configurations_1.handleRouteError(app);
exports.default = app;
