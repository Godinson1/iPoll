import express from "express";
import { createPoll, getAllPoll, getPoll, createVote } from "./index";
const router = express.Router();

router.post("/poll", createPoll);
router.get("/", getAllPoll);
router.get("/:id", getPoll);
router.put("/:id/vote", createVote);

export { router };
