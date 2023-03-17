"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const routes_1 = require("../Polls/routes");
const routes_2 = require("../Contact/routes");
const defineRoutes = (app) => {
    app.use("/polls", routes_1.router);
    app.use("/contacts", routes_2.router);
};
exports.default = defineRoutes;
