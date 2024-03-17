import { Router } from "express";

import { modelController } from "../controllers/model.controller";

const router = Router();

router.post("/", modelController.getAllForBrand);
router.post("/id", modelController.getId);

export const modelRouter = router;
