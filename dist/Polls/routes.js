"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const index_1 = require("./index");
const router = express_1.default.Router();
exports.router = router;
router.post("/poll", index_1.createPoll);
router.get("/", index_1.getAllPoll);
router.get("/:id", index_1.getPoll);
router.put("/:id/vote", index_1.createVote);
