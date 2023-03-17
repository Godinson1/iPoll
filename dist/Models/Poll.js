"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Poll = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const PollSchema = new Schema({
    creator: {
        type: String,
        required: true,
    },
    endDate: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    options: {
        type: Array,
        required: true,
    },
    category: {
        type: String,
    },
    coverPhoto: {
        type: String,
    },
    status: {
        type: String,
    },
    total_votes: {
        type: Number,
    },
}, {
    timestamps: true,
});
const Poll = mongoose_1.default.model("Poll", PollSchema);
exports.Poll = Poll;
