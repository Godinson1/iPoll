import express from "express";
import { createContact } from "./index";
const router = express.Router();

router.post("/contact", createContact);

export { router };
