import { Router } from "express";

import { brandController } from "../controllers/brand.controller";

const router = Router();

router.get("/", brandController.getAll);
router.post("/id", brandController.getId);

export const brandRouter = router;
