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
exports.client = void 0;
const http_1 = __importDefault(require("http"));
const app_1 = __importDefault(require("./app"));
const util_1 = require("util");
const configurations_1 = require("./configurations");
const PORT = process.env.PORT || 5000;
let client;
exports.client = client;
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    const server = http_1.default.createServer(app_1.default);
    configurations_1.mongoConnection.on("open", () => console.log("Connection to MongoDB Atlas established successfully"));
    exports.client = client = yield configurations_1.redisConnection();
    client.on("error", (err) => console.error(err));
    client.on("connect", () => console.log("Redis database connected successfully!"));
    const setAsync = util_1.promisify(client.set).bind(client);
    const getAsync = util_1.promisify(client.get).bind(client);
    //Set Total Votes
    const isExist = yield getAsync("total_app_votes");
    if (isExist === "0")
        yield setAsync(`total_app_votes`, "0");
    server.listen(PORT, () => console.log(`Server running at PORT: ${PORT}`));
});
startServer();
