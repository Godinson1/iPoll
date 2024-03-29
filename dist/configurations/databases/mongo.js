"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
mongoose_1.default
    .connect(`${process.env.MONGO_URL}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
})
    .then()
    .catch((err) => {
    console.log(err);
    console.log(err.code === "ETIMEOUT"
        ? "Hi Poll App! Please check your internet connection and try again."
        : "");
});
const mongoConnection = mongoose_1.default.connection;
exports.default = mongoConnection;
