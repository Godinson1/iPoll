"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const Error_1 = require("../Error");
const handleRouteError = (app) => {
    // setting fall back route and message for undefined route
    app.use((req, res, next) => {
        const error = new Error("Not found");
        error.status = http_status_codes_1.default.NOT_FOUND;
        next(error);
    });
    //Error handler helper
    app.use((err, req, res, next) => {
        Error_1.handleError({ statusCode: http_status_codes_1.default.NOT_FOUND, message: "Route not found!" }, res);
        next();
    });
    // setting fall back message for other uncaught errors in app
    app.use((error, req, res, next) => {
        res.status(error.status || http_status_codes_1.default.INTERNAL_SERVER_ERROR).json({
            error: {
                message: error.message,
            },
        });
        next();
    });
};
exports.default = handleRouteError;
