import { Router } from "express";

import { oblastController } from "../controllers/oblast.controller";

const router = Router();

router.get("/", oblastController.getAll);

export const oblastRouter = router;
