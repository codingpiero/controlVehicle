import express from "express";
import { list } from "./controller.js";

const router = express.Router();

router.get('/',list);

export default router;