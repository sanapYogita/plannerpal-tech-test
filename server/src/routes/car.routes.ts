import express from "express";
import { getCars, getCar } from "../controllers/car.controller";

const router = express.Router();

router.get("/", getCars);
router.get("/:id", getCar);

export default router;