"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Contact = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const ContactSchema = new Schema({
    message: {
        type: String,
    },
    name: {
        type: String,
    },
    email: {
        type: String,
    },
}, {
    timestamps: true,
});
const Contact = mongoose_1.default.model("Contact", ContactSchema);
exports.Contact = Contact;
